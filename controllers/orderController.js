/**
 * ============================================================================
 *  controllers/orderController.js — Order Placement & Transaction Engine
 * ============================================================================
 */

const db = require('../db/init');
const { AppError } = require('../middleware/errorHandler');
const { parseId, sanitizeString, validateEnum } = require('../middleware/validator');
const { sendOrderConfirmationEmail, sendOrderShippedEmail } = require('../utils/mailer');

function attachItemsToOrders(orders) {
  if (!orders || orders.length === 0) return;
  const getItems = db.prepare(
    `SELECT oi.*, p.title, p.icon, p.price AS current_product_price
     FROM order_items oi
     JOIN products p ON oi.product_id = p.id
     WHERE oi.order_id = ?`
  );
  for (const order of orders) {
    order.items = getItems.all(order.id);
  }
}

const orderController = {
  // POST /api/orders
  createOrder: (req, res, next) => {
    const { items, address_id, coupon_code } = req.body;
    const userId = req.session.user.id;

    if (!Array.isArray(items) || items.length === 0) {
      throw new AppError('ไม่มีรายการสินค้าในตะกร้า', 400);
    }
    if (!address_id) {
      throw new AppError('กรุณาเลือกที่อยู่จัดส่ง', 400);
    }

    const addressId = parseId(address_id, 'Address ID');
    const address = db.prepare('SELECT id FROM addresses WHERE id = ? AND user_id = ?').get(addressId, userId);
    if (!address) throw new AppError('ที่อยู่จัดส่งไม่ถูกต้อง หรือไม่ได้เป็นของบัญชีนี้', 400);

    // Validate item stocks and compute subtotal
    const getProduct = db.prepare('SELECT * FROM products WHERE id = ?');
    let subtotal = 0;
    const validatedItems = [];

    for (const item of items) {
      const pId = parseId(item.product_id, 'Product ID');
      const qty = parseInt(item.quantity, 10);
      if (isNaN(qty) || qty <= 0) {
        throw new AppError('จำนวนสินค้าต้องมากกว่า 0', 400);
      }

      const product = getProduct.get(pId);
      if (!product) throw new AppError('มีรายการสินค้าที่ไม่ถูกต้องในตะกร้า', 400);
      if (product.stock < qty) {
        throw new AppError(`${product.title} สินค้ามีไม่เพียงพอ (คงเหลือ ${product.stock} ชิ้น)`, 400);
      }

      subtotal += product.price * qty;
      validatedItems.push({ product_id: pId, quantity: qty, unit_price: product.price });
    }

    // Coupon verification on server side
    let discount = 0;
    let appliedCouponCode = null;
    let coupon = null;

    if (coupon_code) {
      const cleanCode = sanitizeString(coupon_code).toUpperCase();
      coupon = db.prepare('SELECT * FROM coupons WHERE code = ? AND active = 1').get(cleanCode);
      if (!coupon) throw new AppError('โค้ดส่วนลดไม่ถูกต้องหรือถูกปิดใช้งานแล้ว', 400);

      if (coupon.expires_at && new Date(coupon.expires_at) < new Date()) {
        throw new AppError('โค้ดส่วนลดนี้หมดอายุการใช้งานแล้ว', 400);
      }
      if (coupon.usage_limit && coupon.used_count >= coupon.usage_limit) {
        throw new AppError('โค้ดส่วนลดนี้ถูกใช้ครบตามจำนวนสิทธิ์แล้ว', 400);
      }
      if (subtotal < coupon.min_order) {
        throw new AppError(`ยอดสั่งซื้อขั้นต่ำสำหรับโค้ดนี้คือ ฿${coupon.min_order.toLocaleString()}`, 400);
      }

      discount = coupon.type === 'percent' ? (subtotal * coupon.value) / 100 : coupon.value;
      discount = Math.min(discount, subtotal);
      appliedCouponCode = coupon.code;
    }

    const total = Math.max(0, subtotal - discount);

    // Atomic Transaction: Create Order + Create Items + Decrement Stock + Increment Coupon Usage
    const insertOrder = db.prepare(
      'INSERT INTO orders (user_id, address_id, total_price, discount_amount, coupon_code, status) VALUES (?, ?, ?, ?, ?, ?)'
    );
    const insertItem = db.prepare(
      'INSERT INTO order_items (order_id, product_id, quantity, unit_price) VALUES (?, ?, ?, ?)'
    );
    const updateStock = db.prepare('UPDATE products SET stock = stock - ? WHERE id = ?');

    const executeCheckout = db.transaction(() => {
      const orderInfo = insertOrder.run(userId, addressId, total, discount, appliedCouponCode, 'pending');
      const orderId = orderInfo.lastInsertRowid;

      for (const item of validatedItems) {
        insertItem.run(orderId, item.product_id, item.quantity, item.unit_price);
        updateStock.run(item.quantity, item.product_id);
      }

      if (coupon) {
        db.prepare('UPDATE coupons SET used_count = used_count + 1 WHERE id = ?').run(coupon.id);
      }

      return orderId;
    });

    const orderId = executeCheckout();

    // 1. Order-Based Auto-Tagging
    const orderItemsWithCat = db
      .prepare(
        `SELECT oi.*, p.title, p.category_id, c.name AS category_name
         FROM order_items oi
         JOIN products p ON oi.product_id = p.id
         LEFT JOIN categories c ON p.category_id = c.id
         WHERE oi.order_id = ?`
      )
      .all(orderId);

    const tagsToAssign = ['Customer-Paid'];
    for (const it of orderItemsWithCat) {
      if (it.category_name) {
        tagsToAssign.push(`Bought-${it.category_name.trim()}`);
      }
    }
    db.addTagsToUserId(userId, tagsToAssign);

    // 2. Trigger Post-Purchase Order Confirmation Email (Asynchronous)
    const userObj = db.prepare('SELECT name, email FROM users WHERE id = ?').get(userId);
    const addressObj = db.prepare('SELECT * FROM addresses WHERE id = ?').get(addressId) || {};
    if (userObj) {
      sendOrderConfirmationEmail({
        orderId,
        email: userObj.email,
        name: userObj.name,
        items: orderItemsWithCat,
        subtotal,
        discount,
        total,
        address: addressObj,
        couponCode: appliedCouponCode,
      }).catch((err) => console.error('[Order Confirmation Mail Error]', err.message));
    }

    res.status(201).json({ order_id: orderId, subtotal, discount, total });
  },

  // GET /api/orders/my
  getMyOrders: (req, res, next) => {
    const orders = db
      .prepare('SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC')
      .all(req.session.user.id);
    attachItemsToOrders(orders);
    res.json(orders);
  },

  // GET /api/orders/:id
  getOrderById: (req, res, next) => {
    const orderId = parseId(req.params.id, 'Order ID');
    const order = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
    if (!order) throw new AppError('ไม่พบคำสั่งซื้อนี้', 404);

    if (order.user_id !== req.session.user.id && req.session.user.role !== 'admin') {
      throw new AppError('ไม่มีสิทธิ์เข้าถึงคำสั่งซื้อนี้', 403);
    }

    attachItemsToOrders([order]);
    const address = db.prepare('SELECT * FROM addresses WHERE id = ?').get(order.address_id);
    res.json({ ...order, address });
  },

  // GET /api/orders (Admin)
  getAllOrders: (req, res, next) => {
    const { status } = req.query;
    let sql = `SELECT o.*, u.name AS customer_name, u.email
               FROM orders o
               JOIN users u ON o.user_id = u.id`;
    const params = [];

    if (status) {
      const cleanStatus = sanitizeString(status);
      sql += ' WHERE o.status = ?';
      params.push(cleanStatus);
    }

    sql += ' ORDER BY o.created_at DESC';
    const orders = db.prepare(sql).all(...params);
    attachItemsToOrders(orders);
    res.json(orders);
  },

  // PUT /api/orders/:id/status (Admin)
  updateStatus: (req, res, next) => {
    const orderId = parseId(req.params.id, 'Order ID');
    const { status } = req.body;
    const validStatuses = ['pending', 'paid', 'shipped', 'delivered', 'cancelled'];
    validateEnum(status, validStatuses, 'Order Status');

    const existing = db.prepare('SELECT * FROM orders WHERE id = ?').get(orderId);
    if (!existing) throw new AppError('ไม่พบคำสั่งซื้อนี้', 404);

    let trackingNumber = req.body.tracking_number ? sanitizeString(req.body.tracking_number) : existing.tracking_number;
    let carrier = req.body.carrier ? sanitizeString(req.body.carrier) : (existing.carrier || 'TechNova Express');

    if (status === 'shipped' && !trackingNumber) {
      trackingNumber = `TNX-${String(orderId).padStart(4, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
    }

    db.prepare('UPDATE orders SET status = ?, tracking_number = ?, carrier = ? WHERE id = ?').run(
      status,
      trackingNumber || null,
      carrier || null,
      orderId
    );

    // If status changed to 'shipped', send Shipping Notification Email
    if (status === 'shipped') {
      const userObj = db.prepare('SELECT name, email FROM users WHERE id = ?').get(existing.user_id);
      const addressObj = db.prepare('SELECT * FROM addresses WHERE id = ?').get(existing.address_id) || {};
      const orderItems = db
        .prepare(
          `SELECT oi.*, p.title
           FROM order_items oi
           JOIN products p ON oi.product_id = p.id
           WHERE oi.order_id = ?`
        )
        .all(orderId);

      if (userObj) {
        sendOrderShippedEmail({
          orderId,
          email: userObj.email,
          name: userObj.name,
          items: orderItems,
          total: existing.total_price,
          trackingNumber: trackingNumber || 'TNX-EXPRESS-01',
          carrier: carrier || 'TechNova Express',
          address: addressObj,
        }).catch((err) => console.error('[Order Shipped Mail Error]', err.message));
      }
    }

    res.json({ ok: true, status, tracking_number: trackingNumber, carrier });
  },
};

module.exports = orderController;
