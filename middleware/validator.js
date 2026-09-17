/**
 * ============================================================================
 *  middleware/validator.js — Input Validation & XSS Defense Utilities
 * ============================================================================
 */

const { AppError } = require('./errorHandler');

/**
 * Basic XSS string sanitizer: removes raw dangerous HTML tags and control chars
 */
function sanitizeString(str) {
  if (typeof str !== 'string') return '';
  return str
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, '')
    .trim();
}

/**
 * Strict RFC email regex validation
 */
function isValidEmail(email) {
  if (typeof email !== 'string') return false;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(email.trim());
}

/**
 * Parse and validate positive integer ID from route params or query
 */
function parseId(val, fieldName = 'ID') {
  const num = parseInt(val, 10);
  if (isNaN(num) || num <= 0 || !Number.isInteger(Number(val))) {
    throw new AppError(`ค่า ${fieldName} ต้องเป็นจำนวนเต็มบวกที่ถูกต้อง`, 400);
  }
  return num;
}

/**
 * Parse and validate numeric value with optional bounds
 */
function parseNumber(val, fieldName = 'Number', min = 0, max = Infinity) {
  const num = parseFloat(val);
  if (isNaN(num) || num < min || num > max) {
    throw new AppError(`ค่า ${fieldName} ต้องอยู่ระหว่าง ${min} ถึง ${max}`, 400);
  }
  return num;
}

/**
 * Validate input against whitelist of allowed enum values
 */
function validateEnum(val, allowedValues, fieldName = 'Field') {
  if (!allowedValues.includes(val)) {
    throw new AppError(`ค่า ${fieldName} ไม่ถูกต้อง (รองรับเฉพาะ: ${allowedValues.join(', ')})`, 400);
  }
  return val;
}

module.exports = {
  sanitizeString,
  isValidEmail,
  parseId,
  parseNumber,
  validateEnum,
};
