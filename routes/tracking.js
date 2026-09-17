/**
 * ============================================================================
 *  routes/tracking.js — Email Click Tracking & Marketing Auto-Tagging
 * ============================================================================
 */

const express = require('express');
const db = require('../db/init');
const { sanitizeString } = require('../middleware/validator');

const router = express.Router();

/**
 * GET /api/track/click?email=...&tag=...&redirect=...
 * Tracks link clicks from marketing emails, automatically applies the specified
 * segment tag to the user/subscriber profile, and seamlessly redirects to the target page.
 */
router.get('/click', (req, res) => {
  const rawEmail = req.query.email;
  const rawTag = req.query.tag;
  const rawRedirect = req.query.redirect;

  const email = rawEmail ? sanitizeString(rawEmail).toLowerCase() : null;
  const tag = rawTag ? sanitizeString(rawTag) : null;
  const redirectUrl = rawRedirect ? sanitizeString(rawRedirect) : '/';

  const ipAddress = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '127.0.0.1';
  const userAgent = req.headers['user-agent'] || 'Unknown Browser';

  // 1. Process Auto-Tagging if email and tag are valid
  if (email && tag) {
    try {
      db.addTagsToEmail(email, tag);

      // Log Click Event
      db.prepare(
        `INSERT INTO click_events (email, tag, redirect_url, ip_address, user_agent)
         VALUES (?, ?, ?, ?, ?)`
      ).run(email, tag, redirectUrl, ipAddress, userAgent);

      console.log(`\n🎯 [Click Tracked & Tagged] Email: <${email}> + Tag: [${tag}] -> Redirecting to: ${redirectUrl}`);
    } catch (err) {
      console.error('[Click Tracking Error]', err.message);
    }
  }

  // 2. Safe Redirect
  // Allow relative URLs, hash routes, or safe same-origin/http URLs
  if (redirectUrl && (redirectUrl.startsWith('/') || redirectUrl.startsWith('#') || /^https?:\/\//i.test(redirectUrl))) {
    return res.redirect(redirectUrl);
  }

  return res.redirect('/');
});

/**
 * GET /api/track/events (Admin / Analytics Preview)
 */
router.get('/events', (req, res) => {
  try {
    const events = db
      .prepare('SELECT * FROM click_events ORDER BY created_at DESC LIMIT 100')
      .all();
    res.json(events);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
