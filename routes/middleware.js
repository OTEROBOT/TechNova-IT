/**
 * ============================================================================
 *  routes/middleware.js
 * ============================================================================
 *  ภาษาที่ใช้: JavaScript (Node.js / Express)
 *
 *  ฟังก์ชันเหล่านี้เรียกว่า "middleware" — เป็นตัวเช็คสิทธิ์ก่อนให้ request
 *  วิ่งไปถึง route handler จริง ใช้แทรกไว้ในนิยาม route แบบนี้:
 *
 *    router.post('/products', requireAdmin, (req, res) => { ... })
 *                              ^^^^^^^^^^^^
 *                         เช็คสิทธิ์ก่อน ถ้าผ่านค่อยรันฟังก์ชันจริงต่อ
 *
 *  - requireLogin  : ต้อง login แล้วเท่านั้น (ลูกค้าหรือแอดมินก็ได้)
 *  - requireAdmin  : ต้อง login และ role ต้องเป็น 'admin' เท่านั้น
 *  - blockBanned   : กันไม่ให้ user ที่ถูกแอดมินระงับบัญชี (is_banned) ใช้งานต่อ
 * ============================================================================
 */

const db = require('../db/init');

function requireLogin(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: 'กรุณาเข้าสู่ระบบก่อน' });
  }
  next();
}

function requireAdmin(req, res, next) {
  if (!req.session.user || req.session.user.role !== 'admin') {
    return res.status(403).json({ error: 'ต้องเป็นแอดมินเท่านั้น' });
  }
  next();
}

// เช็คทุก request ที่ login อยู่ว่ายังไม่ถูกระงับบัญชี (เผื่อแอดมินเพิ่งแบนระหว่าง session ยังไม่หมดอายุ)
function blockBanned(req, res, next) {
  if (req.session.user) {
    const user = db.prepare('SELECT is_banned FROM users WHERE id = ?').get(req.session.user.id);
    if (user && user.is_banned) {
      req.session.destroy(() => {});
      return res.status(403).json({ error: 'บัญชีนี้ถูกระงับการใช้งาน กรุณาติดต่อผู้ดูแลระบบ' });
    }
  }
  next();
}

module.exports = { requireLogin, requireAdmin, blockBanned };
