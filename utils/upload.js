/**
 * ============================================================================
 *  utils/upload.js — Hardened File Upload Handler (Multer)
 * ============================================================================
 *  Security Hardening:
 *   1. Cryptographically secure random filenames (crypto.randomUUID())
 *   2. Strict Dual-Verification: File extension + MIME-Type whitelisting
 *   3. File size limits (5MB for products, 3MB for avatar)
 *   4. Directory traversal prevention (zero usage of raw original filenames)
 * ============================================================================
 */

const multer = require('multer');
const path = require('path');
const fs = require('fs');
const crypto = require('crypto');
const { AppError } = require('../middleware/errorHandler');

const UPLOADS_ROOT = path.join(__dirname, '..', 'public', 'uploads');
const PRODUCTS_DIR = path.join(UPLOADS_ROOT, 'products');
const AVATARS_DIR = path.join(UPLOADS_ROOT, 'avatars');

// Ensure destination directories exist
for (const dir of [PRODUCTS_DIR, AVATARS_DIR]) {
  fs.mkdirSync(dir, { recursive: true });
}

// Allowed extensions and MIME types
const ALLOWED_MIME_TYPES = new Set(['image/jpeg', 'image/png', 'image/webp', 'image/gif']);
const ALLOWED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif']);

function imageFileFilter(req, file, cb) {
  const ext = path.extname(file.originalname).toLowerCase();
  const mime = file.mimetype.toLowerCase();

  if (ALLOWED_EXTENSIONS.has(ext) && ALLOWED_MIME_TYPES.has(mime)) {
    cb(null, true);
  } else {
    cb(new AppError('รองรับเฉพาะไฟล์รูปภาพ (.jpg .jpeg .png .webp .gif) เท่านั้น', 400), false);
  }
}

function makeStorage(destinationDir) {
  return multer.diskStorage({
    destination: (req, file, cb) => cb(null, destinationDir),
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const safeExtension = ALLOWED_EXTENSIONS.has(ext) ? ext : '.png';
      // Cryptographically secure UUID to eliminate path traversal / collision
      const uniqueName = `${crypto.randomUUID()}${safeExtension}`;
      cb(null, uniqueName);
    },
  });
}

const uploadProductImages = multer({
  storage: makeStorage(PRODUCTS_DIR),
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB per file
    files: 5,                  // Maximum 5 files
  },
}).array('images', 5);

const uploadAvatar = multer({
  storage: makeStorage(AVATARS_DIR),
  fileFilter: imageFileFilter,
  limits: {
    fileSize: 3 * 1024 * 1024, // 3MB
    files: 1,
  },
}).single('avatar');

module.exports = {
  uploadProductImages,
  uploadAvatar,
  PRODUCTS_DIR,
  AVATARS_DIR,
};
