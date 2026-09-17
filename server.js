/**
 * ============================================================================
 *  server.js — TechNova IT Digital Showroom Server Entrypoint
 * ============================================================================
 */

require('dotenv').config();

const dns = require('dns');
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

const express = require('express');
const session = require('express-session');
const path = require('path');
const db = require('./db/init');
const { AppError, errorHandler } = require('./middleware/errorHandler');

// --- Routes ---
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const categoryRoutes = require('./routes/categories');
const orderRoutes = require('./routes/orders');
const addressRoutes = require('./routes/addresses');
const couponRoutes = require('./routes/coupons');
const reviewRoutes = require('./routes/reviews');
const wishlistRoutes = require('./routes/wishlist');
const adminRoutes = require('./routes/admin');
const newsletterRoutes = require('./routes/newsletter');
const trackingRoutes = require('./routes/tracking');

const app = express();
const PORT = process.env.PORT || 3000;
const isProduction = process.env.NODE_ENV === 'production';

// Security: Validate Session Secret
let sessionSecret = process.env.SESSION_SECRET;
if (!sessionSecret) {
  if (isProduction) {
    console.error('❌ FATAL: SESSION_SECRET is not defined in production environment variables.');
    process.exit(1);
  } else {
    console.warn('⚠️ WARNING: SESSION_SECRET is not set in .env. Using development session secret.');
    sessionSecret = 'technova-dev-fallback-secret-minimum-32-chars-length';
  }
}

// Request Body Parsers
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true, limit: '1mb' }));

// Session Configuration with Hardened Cookie Security
app.use(
  session({
    secret: sessionSecret,
    resave: false,
    saveUninitialized: false,
    name: 'technova.sid',
    cookie: {
      httpOnly: true,
      secure: isProduction,
      sameSite: 'lax',
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    },
  })
);

// Static Web Assets & Uploaded Media
app.use(express.static(path.join(__dirname, 'public')));

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/addresses', addressRoutes);
app.use('/api/coupons', couponRoutes);
app.use('/api/reviews', reviewRoutes);
app.use('/api/wishlist', wishlistRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/subscribe', newsletterRoutes);
app.use('/api/newsletter', newsletterRoutes);
app.use('/api/track', trackingRoutes);

// Catch-all 404 for unhandled API endpoints
app.use('/api', (req, res, next) => {
  next(new AppError(`ไม่พบเส้นทาง API: ${req.method} ${req.originalUrl}`, 404));
});

// Centralized Global Error Handler Middleware
app.use(errorHandler);

// Initialize Database (sql.js / WASM) and Start Server
db.ready.then(() => {
  app.listen(PORT, () => {
    console.log(`\n🚀 TechNova IT Digital Showroom running on http://localhost:${PORT}`);
    console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`   Admin: admin@store.com / admin123`);
    console.log(`   VIP Client: customer@store.com / customer123\n`);
  });
});

module.exports = app;
