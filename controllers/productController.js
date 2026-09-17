/**
 * ============================================================================
 *  controllers/productController.js — Product Catalog & Inventory Management
 * ============================================================================
 */

const path = require('path');
const fs = require('fs');
const db = require('../db/init');
const { AppError } = require('../middleware/errorHandler');
const { parseId, parseNumber, sanitizeString, validateEnum } = require('../middleware/validator');
const { uploadProductImages, PRODUCTS_DIR } = require('../utils/upload');

function getProductImages(productId) {
  return db
    .prepare('SELECT id, filename, sort_order FROM product_images WHERE product_id = ? ORDER BY sort_order ASC')
    .all(productId)
    .map((img) => ({
      id: img.id,
      url: img.filename.startsWith('http') ? img.filename : `/uploads/products/${img.filename}`,
    }));
}

function getRatingSummary(productId) {
  const row = db
    .prepare('SELECT AVG(rating) AS avg_rating, COUNT(*) AS review_count FROM reviews WHERE product_id = ?')
    .get(productId);
  return {
    avg_rating: row?.avg_rating ? Math.round(row.avg_rating * 10) / 10 : 0,
    review_count: row?.review_count || 0,
  };
}

const productController = {
  // GET /api/products
  getAllProducts: (req, res, next) => {
    const { category, q, sort, minPrice, maxPrice } = req.query;
    let sql = `SELECT p.*, c.name AS category_name FROM products p
               LEFT JOIN categories c ON p.category_id = c.id WHERE 1=1`;
    const params = [];

    if (category) {
      const catId = parseId(category, 'category');
      sql += ' AND p.category_id = ?';
      params.push(catId);
    }
    if (q) {
      const cleanQ = sanitizeString(q);
      if (cleanQ) {
        sql += ' AND p.title LIKE ?';
        params.push(`%${cleanQ}%`);
      }
    }
    if (minPrice !== undefined && minPrice !== '') {
      const min = parseNumber(minPrice, 'minPrice', 0);
      sql += ' AND p.price >= ?';
      params.push(min);
    }
    if (maxPrice !== undefined && maxPrice !== '') {
      const max = parseNumber(maxPrice, 'maxPrice', 0);
      sql += ' AND p.price <= ?';
      params.push(max);
    }

    const sortMap = {
      price_asc: 'p.price ASC',
      price_desc: 'p.price DESC',
      newest: 'p.created_at DESC',
    };
    if (sort && sortMap[sort]) {
      sql += ` ORDER BY ${sortMap[sort]}`;
    } else {
      sql += ' ORDER BY p.id ASC';
    }

    const products = db.prepare(sql).all(...params);

    const withExtras = products.map((p) => {
      const images = getProductImages(p.id);
      const rating = getRatingSummary(p.id);
      return { ...p, thumbnail: images[0]?.url || null, ...rating };
    });

    if (sort === 'rating') {
      withExtras.sort((a, b) => b.avg_rating - a.avg_rating);
    }

    res.json(withExtras);
  },

  // GET /api/products/categories/all
  getCategories: (req, res, next) => {
    const categories = db.prepare('SELECT * FROM categories ORDER BY id ASC').all();
    res.json(categories);
  },

  // GET /api/products/:id
  getProductById: (req, res, next) => {
    const productId = parseId(req.params.id, 'Product ID');
    const product = db
      .prepare(
        `SELECT p.*, c.name AS category_name FROM products p
         LEFT JOIN categories c ON p.category_id = c.id WHERE p.id = ?`
      )
      .get(productId);

    if (!product) throw new AppError('ไม่พบข้อมูลสินค้านี้', 404);

    const images = getProductImages(product.id);
    const rating = getRatingSummary(product.id);
    res.json({ ...product, images, ...rating });
  },

  // POST /api/products
  createProduct: (req, res, next) => {
    uploadProductImages(req, res, (err) => {
      if (err) return next(err);

      try {
        const title = sanitizeString(req.body.title);
        const description = sanitizeString(req.body.description);
        const icon = sanitizeString(req.body.icon) || '📦';
        const price = parseNumber(req.body.price, 'Price', 0);
        const stock = parseInt(req.body.stock, 10) || 0;
        const category_id = req.body.category_id ? parseId(req.body.category_id, 'Category ID') : null;

        if (!title) throw new AppError('กรุณาระบุชื่อสินค้า', 400);

        const info = db
          .prepare(
            'INSERT INTO products (category_id, title, description, price, stock, icon) VALUES (?, ?, ?, ?, ?, ?)'
          )
          .run(category_id, title, description, price, Math.max(0, stock), icon);

        const productId = info.lastInsertRowid;

        if (req.files && req.files.length > 0) {
          const insertImage = db.prepare(
            'INSERT INTO product_images (product_id, filename, sort_order) VALUES (?, ?, ?)'
          );
          req.files.forEach((file, index) => insertImage.run(productId, file.filename, index));
        }

        res.status(201).json({ id: productId });
      } catch (innerErr) {
        next(innerErr);
      }
    });
  },

  // PUT /api/products/:id
  updateProduct: (req, res, next) => {
    const productId = parseId(req.params.id, 'Product ID');

    uploadProductImages(req, res, (err) => {
      if (err) return next(err);

      try {
        const existing = db.prepare('SELECT id FROM products WHERE id = ?').get(productId);
        if (!existing) throw new AppError('ไม่พบสินค้าที่ต้องการแก้ไข', 404);

        const title = sanitizeString(req.body.title);
        const description = sanitizeString(req.body.description);
        const icon = sanitizeString(req.body.icon) || '📦';
        const price = parseNumber(req.body.price, 'Price', 0);
        const stock = parseInt(req.body.stock, 10) || 0;
        const category_id = req.body.category_id ? parseId(req.body.category_id, 'Category ID') : null;

        if (!title) throw new AppError('กรุณาระบุชื่อสินค้า', 400);

        db.prepare(
          `UPDATE products SET title=?, description=?, price=?, stock=?, icon=?, category_id=? WHERE id=?`
        ).run(title, description, price, Math.max(0, stock), icon, category_id, productId);

        if (req.files && req.files.length > 0) {
          const existingCount = db
            .prepare('SELECT COUNT(*) AS c FROM product_images WHERE product_id = ?')
            .get(productId).c;
          const insertImage = db.prepare(
            'INSERT INTO product_images (product_id, filename, sort_order) VALUES (?, ?, ?)'
          );
          req.files.forEach((file, index) => insertImage.run(productId, file.filename, existingCount + index));
        }

        res.json({ ok: true });
      } catch (innerErr) {
        next(innerErr);
      }
    });
  },

  // DELETE /api/products/:id
  deleteProduct: (req, res, next) => {
    const productId = parseId(req.params.id, 'Product ID');

    const images = db.prepare('SELECT filename FROM product_images WHERE product_id = ?').all(productId);
    images.forEach((img) => {
      if (!img.filename.startsWith('http')) {
        fs.unlink(path.join(PRODUCTS_DIR, img.filename), () => {});
      }
    });

    db.prepare('DELETE FROM product_images WHERE product_id = ?').run(productId);
    db.prepare('DELETE FROM products WHERE id = ?').run(productId);
    res.json({ ok: true });
  },

  // DELETE /api/products/:id/images/:imageId
  deleteProductImage: (req, res, next) => {
    const productId = parseId(req.params.id, 'Product ID');
    const imageId = parseId(req.params.imageId, 'Image ID');

    const image = db.prepare('SELECT * FROM product_images WHERE id = ? AND product_id = ?').get(imageId, productId);
    if (!image) throw new AppError('ไม่พบรูปภาพนี้', 404);

    if (!image.filename.startsWith('http')) {
      fs.unlink(path.join(PRODUCTS_DIR, image.filename), () => {});
    }
    db.prepare('DELETE FROM product_images WHERE id = ?').run(imageId);
    res.json({ ok: true });
  },
};

module.exports = productController;
