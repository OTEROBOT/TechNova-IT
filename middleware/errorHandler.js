/**
 * ============================================================================
 *  middleware/errorHandler.js — Centralized Error Handling & AppError Class
 * ============================================================================
 */

class AppError extends Error {
  constructor(message, statusCode = 500, details = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Higher-order async route handler wrapper that eliminates try/catch boilerplate
 * and safely forwards errors to Express next(err)
 */
function asyncHandler(fn) {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
}

/**
 * Global Express centralized error handling middleware
 */
function errorHandler(err, req, res, next) {
  let statusCode = err.statusCode || (res.statusCode !== 200 ? res.statusCode : 500);
  if (statusCode < 400 || statusCode > 599) statusCode = 500;

  let message = err.message || 'เกิดข้อผิดพลาดบางอย่างในเซิร์ฟเวอร์';

  // Handle Multer file upload errors
  if (err.name === 'MulterError') {
    statusCode = 400;
    if (err.code === 'LIMIT_FILE_SIZE') {
      message = 'ขนาดไฟล์เกินขีดจำกัดที่กำหนด (สูงสุด 5MB สำหรับรูปสินค้า / 3MB สำหรับโปรไฟล์)';
    } else if (err.code === 'LIMIT_UNEXPECTED_FILE') {
      message = 'ชื่อฟิลด์หรือจำนวนไฟล์ที่อัปโหลดไม่ถูกต้อง';
    } else if (err.code === 'LIMIT_FILE_COUNT') {
      message = 'จำนวนไฟล์เกินขีดจำกัดที่กำหนด (สูงสุด 5 รูป)';
    } else {
      message = `ข้อผิดพลาดในการอัปโหลดไฟล์: ${err.message}`;
    }
  }

  // Handle invalid JSON body syntax errors
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    statusCode = 400;
    message = 'โครงสร้างข้อมูล JSON ที่ส่งมาไม่ถูกต้อง (Malformed JSON)';
  }

  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction && statusCode === 500) {
    console.error('[Unhandled Internal Error]', err);
  }

  res.status(statusCode).json({
    error: message,
    ...(err.details ? { details: err.details } : {}),
    ...(!isProduction && statusCode === 500 ? { stack: err.stack } : {}),
  });
}

module.exports = {
  AppError,
  asyncHandler,
  errorHandler,
};
