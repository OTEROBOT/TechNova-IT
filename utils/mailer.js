/**
 * ============================================================================
 *  utils/mailer.js — TechNova IT Store Email Dispatcher (ระบบส่งอีเมล)
 * ============================================================================
 *  ภาษาที่ใช้: JavaScript (Node.js) + Nodemailer + Inline HTML Email Template
 *
 *  📌 ไฟล์นี้ทำหน้าที่อะไร?
 *  - ไฟล์นี้คือศูนย์กลางการส่งอีเมลทั้งหมดของเว็บไซต์ TechNova IT Store
 *  - ส่งอีเมลยืนยันการติดตามข่าวสาร (Newsletter Welcome Email)
 *  - ส่งอีเมลต้อนรับเมื่อลูกค้าสมัครสมาชิกใหม่ (Registration Welcome Email)
 *  - ส่งอีเมลลิงก์รีเซ็ตรหัสผ่าน (Password Reset Email)
 *
 *  📌 ไฟล์ที่เก็บอีเมลและรหัสผ่าน Gmail อยู่ที่ไหน?
 *  - อยู่ที่ไฟล์: `.env` (ที่โฟลเดอร์ root ของโปรเจกต์)
 *  - ตัวแปรใน .env มีดังนี้:
 *      GMAIL_USER=your-email@gmail.com
 *      GMAIL_APP_PASSWORD=xxxx xxxx xxxx xxxx
 *      SITE_URL=http://localhost:3000
 *
 *  📌 ข้อควรรู้เกี่ยวกับ Gmail App Password:
 *  - รหัสผ่าน 16 หลักนี้เป็น "รหัสผ่านสำหรับแอป (App Password)" ที่ได้จาก Google Account
 *    (Security -> 2-Step Verification -> App Passwords)
 *  - ระบบจะทำการลบช่องว่าง (space) ออกให้อัตโนมัติ ป้องกันปัญหา copy-paste ติดวรรค
 * ============================================================================
 */

const nodemailer = require('nodemailer');
const dns = require('dns');

// Force IPv4 DNS resolution across Node.js to resolve ENETUNREACH on Render Linux containers
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

// Strict IPv4 DNS lookup to guarantee no IPv6 (ENETUNREACH) issues on Render containers
function ipv4Lookup(hostname, options, callback) {
  return dns.lookup(hostname, { family: 4, all: false }, callback);
}

// 1. ดึงค่า Config จากไฟล์ .env และกำจัดช่องว่าง (Whitespace) ออกจากรหัสผ่านอัตโนมัติ
const GMAIL_USER = (process.env.GMAIL_USER || '').trim();
const gmailPassword = (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, '');
const SITE_URL = process.env.SITE_URL || 'http://localhost:3000';

// 2. ตรวจสอบความถูกต้องของการตั้งค่า Gmail
const isConfigured =
  Boolean(GMAIL_USER) &&
  Boolean(gmailPassword) &&
  !GMAIL_USER.includes('your-email') &&
  !gmailPassword.includes('your16digit') &&
  !gmailPassword.includes('xxxx');

// 3. สร้างตัวส่งอีเมล (Primary: Port 465 SSL | Fallback: Port 587 STARTTLS) พร้อม Strict IPv4
let primaryTransporter = null;
let fallbackTransporter = null;

if (isConfigured) {
  // Primary: Port 465 SSL with IPv4 Lookup
  primaryTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    lookup: ipv4Lookup, // 👈 บังคับใช้ IPv4 ผ่าน DNS lookup function
    auth: {
      user: GMAIL_USER,
      pass: gmailPassword,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000,
  });

  // Fallback: Port 587 STARTTLS with IPv4 Lookup
  fallbackTransporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    lookup: ipv4Lookup, // 👈 บังคับใช้ IPv4 ผ่าน DNS lookup function
    auth: {
      user: GMAIL_USER,
      pass: gmailPassword,
    },
    tls: {
      rejectUnauthorized: false,
    },
    connectionTimeout: 15000,
    greetingTimeout: 15000,
    socketTimeout: 15000,
  });

  // ตรวจสอบการเชื่อมต่อ SMTP บน Server Boot
  primaryTransporter.verify((error) => {
    if (error) {
      console.warn('⚠️ Nodemailer Primary (Port 465 SSL) notice:', error.message);
      if (fallbackTransporter) {
        fallbackTransporter.verify((fErr) => {
          if (fErr) {
            console.error('❌ Nodemailer Fallback (Port 587 STARTTLS) error:', fErr.message);
          } else {
            console.log('✅ Nodemailer Fallback Transporter is ready via Port 587 (IPv4 STARTTLS).');
          }
        });
      }
    } else {
      console.log('✅ Nodemailer Transporter is ready to send emails via Port 465 (IPv4 SSL).');
    }
  });
}

// Unified Dispatcher with automatic Port 465 -> Port 587 IPv4 Fallback
async function executeSendMail(mailOptions) {
  if (!isConfigured) {
    throw new Error('Email service is not configured');
  }

  // Attempt 1: Port 465 (SSL IPv4)
  if (primaryTransporter) {
    try {
      return await primaryTransporter.sendMail(mailOptions);
    } catch (primaryErr) {
      console.warn(`⚠️ [Mailer] Primary Port 465 attempt failed (${primaryErr.message}). Retrying via Port 587 (IPv4 STARTTLS)...`);
      if (fallbackTransporter) {
        return await fallbackTransporter.sendMail(mailOptions);
      }
      throw primaryErr;
    }
  }

  // Attempt 2: Fallback Port 587
  if (fallbackTransporter) {
    return await fallbackTransporter.sendMail(mailOptions);
  }

  throw new Error('No active mail transporter');
}

/**
 * ฟังก์ชันตรวจสอบว่าเป็นอีเมลทดสอบจำลองหรือไม่ (เช่น @technova.com, @example.com, @test.com)
 * ช่วยป้องกันไม่ให้ Gmail Mailer-Daemon ตีกลับอีเมล ("Address not found") ตอนรัน Test Suite
 */
function isTestOrDummyEmail(email) {
  if (!email || typeof email !== 'string') return true;
  const dummyDomains = [
    'technova.com',
    'technova-store.com',
    'technova-test.com',
    'example.com',
    'test.com',
    'domain.com',
    'localhost',
    'dummy.com',
  ];
  const domain = email.split('@')[1]?.toLowerCase();
  return dummyDomains.includes(domain) || process.env.NODE_ENV === 'test';
}

/**
 * ============================================================================
 *  1. ส่งอีเมลต้อนรับสมาชิกที่กดติดตามข่าวสาร (Newsletter Welcome Email)
 * ============================================================================
 *  ดีไซน์: Dark Cyberpunk Sci-Fi Luxury Frame (ตรงตามภาพตัวอย่างที่ 2)
 *  - หัวข้อ: THANK YOU FOR SUBSCRIBING / ขอบคุณที่สมัครรับข่าวสารจาก TechNova
 *  - 3 ฟีเจอร์: ดีลพิเศษเฉพาะสมาชิก / อัปเดตเทคโนโลยีล่าสุด / สิทธิพิเศษและกิจกรรม
 *  - โค้ดส่วนลด VIP: WELCOME10
 *  - ปุ่ม CTA: Explore Products → (สำรวจผลิตภัณฑ์ของเรา)
 * ============================================================================
 */
async function sendNewsletterWelcomeEmail(toEmail) {
  if (!toEmail || typeof toEmail !== 'string') {
    return { success: false, error: 'Invalid recipient email' };
  }
  const cleanEmail = toEmail.trim().toLowerCase();

  // ป้องกันการส่งหาโดเมนทดสอบจำลอง
  if (isTestOrDummyEmail(cleanEmail)) {
    console.log(`\n📧 [Test Simulation] Newsletter Welcome for <${cleanEmail}> — simulated dispatch OK (no bounce).\n`);
    return { simulated: true, toEmail: cleanEmail };
  }

  if (!isConfigured || (!primaryTransporter && !fallbackTransporter)) {
    console.log('\n📧 [โหมดจำลอง - บันทึกอีเมลแล้ว]');
    console.log(`   ส่งอีเมลต้อนรับ Newsletter ไปยัง: ${cleanEmail}\n`);
    return { simulated: true, toEmail: cleanEmail };
  }

  const mailOptions = {
    from: `"TechNova IT Store" <${GMAIL_USER}>`,
    to: cleanEmail,
    subject: '⚡ THANK YOU FOR SUBSCRIBING — ยินดีต้อนรับสู่ TechNova IT',
    html: `
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank you for subscribing - TechNova IT</title>
</head>
<body style="margin: 0; padding: 0; background-color: #07090E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #FFFFFF;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #07090E; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Container Box -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #0B0E14; border-radius: 20px; overflow: hidden; border: 1px solid #1E293B; box-shadow: 0 20px 50px rgba(0, 0, 0, 0.8), 0 0 30px rgba(0, 180, 255, 0.15);">
          
          <!-- Top Logo & Tagline -->
          <tr>
            <td align="center" style="padding: 40px 30px 20px; background: linear-gradient(180deg, #0F172A 0%, #0B0E14 100%);">
              <!-- TN Hex Logo -->
              <div style="display: inline-block; padding: 12px; border-radius: 16px; background: rgba(0, 180, 255, 0.08); border: 1px solid rgba(0, 210, 255, 0.3); margin-bottom: 14px; box-shadow: 0 0 20px rgba(0, 180, 255, 0.2);">
                <table role="presentation" border="0" cellspacing="0" cellpadding="0">
                  <tr>
                    <td align="center" style="font-size: 26px; font-weight: 900; letter-spacing: 2px; color: #00D2FF; font-family: monospace;">
                      ⬡ TN ⬡
                    </td>
                  </tr>
                </table>
              </div>
              <div style="font-size: 22px; font-weight: 800; letter-spacing: 3px; color: #FFFFFF; text-transform: uppercase;">
                TECHNOVA <span style="background: #0071E3; color: #fff; font-size: 13px; padding: 2px 8px; border-radius: 4px; vertical-align: middle;">IT</span>
              </div>
              <div style="font-size: 11px; font-weight: 600; letter-spacing: 2.5px; color: #38BDF8; margin-top: 6px; text-transform: uppercase;">
                SMART TECH, SMART CHOICE
              </div>
              <div style="font-size: 12px; font-weight: 600; letter-spacing: 3px; color: #94A3B8; margin-top: 14px; font-style: italic;">
                INNOVATION + INTELLIGENCE + YOU
              </div>
            </td>
          </tr>

          <!-- Cyberpunk Metallic Welcome Frame -->
          <tr>
            <td align="center" style="padding: 10px 30px 20px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(145deg, #0F172A 0%, #070A10 100%); border-radius: 18px; border: 2px solid #0284C7; box-shadow: 0 0 25px rgba(2, 132, 199, 0.35), inset 0 0 15px rgba(2, 132, 199, 0.2); padding: 32px 20px;">
                <tr>
                  <td align="center">
                    <h1 style="margin: 0; font-size: 26px; font-weight: 900; letter-spacing: 2px; color: #E2E8F0; text-transform: uppercase; line-height: 1.3; text-shadow: 0 0 15px rgba(56, 189, 248, 0.4);">
                      THANK YOU FOR<br/>SUBSCRIBING
                    </h1>
                    <div style="font-size: 16px; font-weight: 500; color: #38BDF8; margin-top: 10px; letter-spacing: 0.5px;">
                      ขอบคุณที่สมัครรับข่าวสารจาก TechNova
                    </div>
                    <!-- Circuit Accent -->
                    <div style="margin-top: 16px; font-size: 20px; color: #0284C7;">
                      ━━━━ ❖ ━━━━
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 3 Feature Icon Badges -->
          <tr>
            <td style="padding: 15px 30px 25px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <!-- Feature 1 -->
                  <td width="33.33%" align="center" style="padding: 10px 5px; vertical-align: top;">
                    <div style="width: 52px; height: 52px; line-height: 52px; border-radius: 14px; background: rgba(0, 180, 255, 0.1); border: 1.5px solid #00D2FF; font-size: 22px; margin-bottom: 10px; box-shadow: 0 0 15px rgba(0, 210, 255, 0.3);">
                      🏷️
                    </div>
                    <div style="font-size: 12px; font-weight: 600; color: #E2E8F0; line-height: 1.4;">
                      ดีลพิเศษ<br/>เฉพาะสมาชิก
                    </div>
                  </td>
                  <!-- Feature 2 -->
                  <td width="33.33%" align="center" style="padding: 10px 5px; vertical-align: top;">
                    <div style="width: 52px; height: 52px; line-height: 52px; border-radius: 14px; background: rgba(0, 180, 255, 0.1); border: 1.5px solid #00D2FF; font-size: 22px; margin-bottom: 10px; box-shadow: 0 0 15px rgba(0, 210, 255, 0.3);">
                      💻
                    </div>
                    <div style="font-size: 12px; font-weight: 600; color: #E2E8F0; line-height: 1.4;">
                      อัปเดตเทคโนโลยี<br/>ล่าสุดก่อนใคร
                    </div>
                  </td>
                  <!-- Feature 3 -->
                  <td width="33.33%" align="center" style="padding: 10px 5px; vertical-align: top;">
                    <div style="width: 52px; height: 52px; line-height: 52px; border-radius: 14px; background: rgba(0, 180, 255, 0.1); border: 1.5px solid #00D2FF; font-size: 22px; margin-bottom: 10px; box-shadow: 0 0 15px rgba(0, 210, 255, 0.3);">
                      🎧
                    </div>
                    <div style="font-size: 12px; font-weight: 600; color: #E2E8F0; line-height: 1.4;">
                      สิทธิพิเศษ<br/>และกิจกรรม VIP
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- VIP Discount Badge Box -->
          <tr>
            <td align="center" style="padding: 0 30px 25px;">
              <table role="presentation" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(180deg, #0A192F 0%, #040D1A 100%); border-radius: 14px; border: 1.5px solid #0284C7; padding: 18px 32px; box-shadow: 0 0 25px rgba(2, 132, 199, 0.3);">
                <tr>
                  <td align="center">
                    <div style="font-size: 11px; font-weight: 700; color: #38BDF8; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 6px;">
                      ⚡ YOUR VIP DISCOUNT IS HERE
                    </div>
                    <div style="font-size: 24px; font-weight: 900; color: #FFFFFF; letter-spacing: 3px; font-family: monospace; background: rgba(2, 132, 199, 0.25); padding: 8px 24px; border-radius: 8px; border: 1px dashed #38BDF8; display: inline-block;">
                      WELCOME10
                    </div>
                    <div style="font-size: 12px; color: #94A3B8; margin-top: 8px;">
                      รับส่วนลดพิเศษ 10% สำหรับการสั่งซื้อทุกรายการในโชว์รูม
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Primary CTA Button -->
          <tr>
            <td align="center" style="padding: 10px 30px 35px;">
              <a href="${SITE_URL}/#/products" style="display: inline-block; background: linear-gradient(135deg, #0284C7 0%, #004BA8 100%); color: #FFFFFF; font-weight: 700; font-size: 16px; letter-spacing: 1px; padding: 16px 44px; border-radius: 999px; text-decoration: none; box-shadow: 0 8px 24px rgba(2, 132, 199, 0.45), 0 0 15px rgba(56, 189, 248, 0.3); border: 1px solid rgba(255, 255, 255, 0.2);">
                Explore Products →<br/>
                <span style="font-size: 12px; font-weight: 500; opacity: 0.9;">สำรวจผลิตภัณฑ์ของเรา</span>
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 24px 30px; background-color: #06080C; border-top: 1px solid #1E293B;">
              <div style="font-size: 13px; color: #94A3B8; font-weight: 600; margin-bottom: 4px;">
                ด้วยความรักจาก TechNova IT
              </div>
              <div style="font-size: 11px; letter-spacing: 2px; color: #64748B; text-transform: uppercase; margin-bottom: 12px;">
                INNOVATION • SERVICE • YOU
              </div>
              <div style="font-size: 11px; color: #475569; line-height: 1.5;">
                อีเมลนี้ส่งถึงคุณ (${cleanEmail}) เนื่องจากคุณได้ลงทะเบียนรับข่าวสารที่ TechNova IT Store<br/>
                © 2026 TechNova Corporation. All rights reserved.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };

  try {
    const info = await executeSendMail(mailOptions);
    console.log(`\n📬 [Mailer] Successfully sent Newsletter Welcome Email to ${cleanEmail} (Message ID: ${info.messageId})\n`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error(`\n❌ [Mailer Error] Failed to send Newsletter Welcome Email to ${cleanEmail}:`, err.message);
    return { success: false, error: err.message };
  }
}

/**
 * ============================================================================
 *  2. ส่งอีเมลต้อนรับเมื่อลูกค้าสมัครสมาชิกใหม่ (Registration Welcome Email)
 * ============================================================================
 *  ดีไซน์: Dark Luxury Tech Showroom Showcase (ตรงตามภาพตัวอย่างที่ 1)
 *  - ปรับแต่งการ์ดสินค้าและข้อความต้อนรับตามสายเทคโนโลยีที่ลูกค้าเลือก (Tech Profile)
 *  - โลโก้: TN TechNova IT
 *  - หัวข้อ: Welcome to Tech Nova! / Hello [ชื่อลูกค้า],
 *  - กล่องนีออน: YOUR SPECIAL WELCOME GIFT: 10% OFF YOUR FIRST ORDER! [CODE: WELCOME10]
 *  - 3 สินค้าแนะนำเฉพาะสายเทคโนโลยีของผู้สมัคร (Gaming, Creator, Enterprise, Custom Keyboards)
 *  - ปุ่ม CTA: [ Shop Now ]
 *  - โซเชียลมีเดีย & ข้อกำหนด
 * ============================================================================
 */
function getProfileShowcase(interest) {
  const norm = (interest || '').toLowerCase();
  if (norm.includes('creator') || norm.includes('3d') || norm.includes('graphic')) {
    return {
      profileLabel: '🎨 CONTENT CREATION & 3D STUDIO',
      badgeColor: '#EC4899',
      products: [
        {
          tag: 'Pro Display',
          icon: '🖥️',
          price: '฿18,900',
          title: 'ColorPro 4K OLED',
          desc: '100% DCI-P3, HDR1000 Studio Display',
        },
        {
          tag: 'Workstation GPU',
          icon: '⚡',
          price: '฿74,900',
          title: 'RTX 4090 Titanium',
          desc: '24GB VRAM, NVLink 8K Video Render',
        },
        {
          tag: 'High-Speed NVMe',
          icon: '💾',
          price: '฿11,500',
          title: 'Samsung 990 PRO 4TB',
          desc: 'PCIe 4.0 NVMe, 7450 MB/s Read',
        },
      ],
    };
  } else if (norm.includes('enterprise') || norm.includes('workstation') || norm.includes('business')) {
    return {
      profileLabel: '💼 ENTERPRISE & WORKSTATION',
      badgeColor: '#10B981',
      products: [
        {
          tag: 'Network Core',
          icon: '📡',
          price: '฿32,900',
          title: 'UniFi Dream Wall 10G',
          desc: 'Wi-Fi 7 Enterprise Gateway & SFP+',
        },
        {
          tag: 'Pro Dock',
          icon: '🔌',
          price: '฿14,500',
          title: 'CalDigit TS4 Thunderbolt',
          desc: '18-in-1 Ports, 98W Power Delivery',
        },
        {
          tag: 'ECC Workstation',
          icon: '🏢',
          price: '฿129,900',
          title: 'NovaStation Enterprise',
          desc: 'Dual Xeon, 128GB ECC RAM Server',
        },
      ],
    };
  } else if (norm.includes('keyboard') || norm.includes('desk') || norm.includes('custom')) {
    return {
      profileLabel: '⌨️ CUSTOM KEYBOARDS & DESK SETUP',
      badgeColor: '#A855F7',
      products: [
        {
          tag: 'Custom Keyboard',
          icon: '⌨️',
          price: '฿7,490',
          title: 'Keychron Q1 Max CNC',
          desc: 'Full Aluminum, Gateron Jupiter, QMK',
        },
        {
          tag: 'Esports Mouse',
          icon: '🖱️',
          price: '฿5,290',
          title: 'G PRO X Superlight 2',
          desc: 'HERO 2 Sensor, 60g Ultra-Lightweight',
        },
        {
          tag: 'Solid Desk Base',
          icon: '🔋',
          price: '฿4,290',
          title: 'Nomad MagSafe Stand',
          desc: 'Solid Metal CNC, Fast Qi2 Charging',
        },
      ],
    };
  }

  // Default: PC Gaming & Esports
  return {
    profileLabel: '🎮 PC GAMING & ESPORTS',
    badgeColor: '#00D2FF',
    products: [
      {
        tag: 'Smart Earbuds',
        icon: '🎧',
        price: '฿1,290',
        title: 'Acoustic Pro Wireless',
        desc: 'Bluetooth 5.3, ANC, 40h Battery',
      },
      {
        tag: 'Mech Keyboard',
        icon: '⌨️',
        price: '฿3,490',
        title: 'Viper X Mechanical',
        desc: 'Gateron Switches, RGB, Ultra-fast',
      },
      {
        tag: 'Curved Monitor',
        icon: '🖥️',
        price: '฿8,900',
        title: 'Horizon Ultra 34"',
        desc: '4K, 144Hz Curved, FreeSync Premium',
      },
    ],
  };
}

async function sendRegistrationWelcomeEmail(toEmail, userName, preferences = {}) {
  if (!toEmail || typeof toEmail !== 'string') {
    return { success: false, error: 'Invalid recipient email' };
  }
  const cleanEmail = toEmail.trim().toLowerCase();
  const displayName = (userName || 'Client').trim();
  const primaryInterest = preferences.primary_interest || preferences.primaryInterest || 'gaming';
  const showcase = getProfileShowcase(primaryInterest);

  // ป้องกันการส่งหาโดเมนทดสอบจำลอง
  if (isTestOrDummyEmail(cleanEmail)) {
    console.log(`\n📧 [Test Simulation] Registration Welcome for <${cleanEmail}> (${displayName} - ${showcase.profileLabel}) — simulated dispatch OK.\n`);
    return { simulated: true, toEmail: cleanEmail, profile: showcase.profileLabel };
  }

  if (!isConfigured || (!primaryTransporter && !fallbackTransporter)) {
    console.log('\n📧 [โหมดจำลอง - สมัครสมาชิกใหม่]');
    console.log(`   ส่งอีเมลต้อนรับการสมัครสมาชิกไปยัง: ${cleanEmail} (${displayName})\n`);
    return { simulated: true, toEmail: cleanEmail, profile: showcase.profileLabel };
  }

  const mailOptions = {
    from: `"TechNova IT Store" <${GMAIL_USER}>`,
    to: cleanEmail,
    subject: `🎉 Welcome to Tech Nova, ${displayName}! — บัญชีของคุณพร้อมใช้งานแล้ว`,
    html: `
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to Tech Nova!</title>
</head>
<body style="margin: 0; padding: 0; background-color: #0B0E14; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #FFFFFF;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #0B0E14; padding: 30px 10px;">
    <tr>
      <td align="center">
        <!-- Container Card -->
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 620px; background: #0E131F; border-radius: 24px; overflow: hidden; border: 1px solid #1E293B; box-shadow: 0 25px 50px rgba(0, 0, 0, 0.8), 0 0 35px rgba(0, 180, 255, 0.15);">
          
          <!-- Logo & Header -->
          <tr>
            <td align="center" style="padding: 40px 30px 15px; background: linear-gradient(180deg, #131B2E 0%, #0E131F 100%);">
              <!-- TN Hexagon Badge -->
              <div style="display: inline-block; padding: 12px; border-radius: 16px; background: rgba(0, 180, 255, 0.1); border: 1.5px solid #00D2FF; margin-bottom: 12px; box-shadow: 0 0 20px rgba(0, 180, 255, 0.3);">
                <div style="font-size: 26px; font-weight: 900; letter-spacing: 2px; color: #00D2FF; font-family: monospace;">
                  ⬡ TN ⬡
                </div>
              </div>
              <div style="font-size: 22px; font-weight: 800; letter-spacing: 3px; color: #FFFFFF; text-transform: uppercase;">
                TECHNOVA <span style="background: #0071E3; color: #fff; font-size: 13px; padding: 2px 8px; border-radius: 4px; vertical-align: middle;">IT</span>
              </div>
              <div style="font-size: 11px; font-weight: 600; letter-spacing: 2px; color: #38BDF8; margin-top: 4px; text-transform: uppercase;">
                SMART TECH, SMART CHOICE
              </div>

              <!-- Main Title -->
              <h1 style="margin: 24px 0 6px; font-size: 28px; font-weight: 800; color: #FFFFFF; letter-spacing: -0.5px;">
                Welcome to Tech Nova!
              </h1>
              <div style="font-size: 16px; color: #94A3B8; font-weight: 500;">
                Hello <span style="color: #38BDF8; font-weight: 700;">${displayName}</span>,
              </div>

              <!-- Selected Tech Profile Chip -->
              <div style="display: inline-block; margin-top: 12px; padding: 5px 14px; background: rgba(0, 180, 255, 0.12); border: 1px solid rgba(0, 210, 255, 0.3); border-radius: 100px; font-size: 11.5px; font-weight: 700; color: #38BDF8; letter-spacing: 0.5px;">
                YOUR TECH PROFILE: ${showcase.profileLabel}
              </div>
            </td>
          </tr>

          <!-- Neon Glow Welcome Gift Box -->
          <tr>
            <td align="center" style="padding: 10px 30px 25px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(180deg, rgba(2, 132, 199, 0.2) 0%, rgba(14, 23, 42, 0.9) 100%); border-radius: 16px; border: 2px solid #00D2FF; box-shadow: 0 0 25px rgba(0, 210, 255, 0.4), inset 0 0 15px rgba(0, 210, 255, 0.2); padding: 24px 20px;">
                <tr>
                  <td align="center">
                    <div style="font-size: 12px; font-weight: 700; color: #38BDF8; letter-spacing: 2px; text-transform: uppercase;">
                      YOUR SPECIAL WELCOME GIFT:
                    </div>
                    <div style="font-size: 24px; font-weight: 900; color: #FFFFFF; margin: 8px 0 14px; letter-spacing: 0.5px; text-shadow: 0 0 10px rgba(0, 210, 255, 0.5);">
                      10% OFF YOUR FIRST ORDER!
                    </div>
                    <div style="display: inline-block; background: #0071E3; color: #FFFFFF; font-weight: 800; font-size: 15px; letter-spacing: 2px; padding: 8px 24px; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.3); font-family: monospace; box-shadow: 0 4px 14px rgba(0, 113, 227, 0.5);">
                      CODE: WELCOME10
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- 3 Dynamic Product Showcase Cards (Based on User Tech Profile) -->
          <tr>
            <td style="padding: 10px 20px 25px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  
                  ${showcase.products
                    .map(
                      (p) => `
                  <td width="33.33%" align="center" style="padding: 0 6px; vertical-align: top;">
                    <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #131A2B; border-radius: 14px; border: 1px solid #1E293B; padding: 14px 10px; height: 100%; box-shadow: 0 6px 16px rgba(0,0,0,0.4);">
                      <tr>
                        <td align="center">
                          <div style="font-size: 11px; font-weight: 700; color: #94A3B8; text-transform: uppercase; margin-bottom: 8px;">
                            ${p.tag}
                          </div>
                          <!-- Product Icon & Price Badge -->
                          <div style="position: relative; width: 68px; height: 68px; line-height: 68px; border-radius: 12px; background: rgba(0, 180, 255, 0.08); border: 1px solid rgba(0, 210, 255, 0.2); font-size: 32px; margin: 0 auto 10px;">
                            ${p.icon}
                            <div style="font-size: 10px; font-weight: 800; color: #38BDF8; background: #0F172A; border: 1px solid #0284C7; border-radius: 4px; padding: 1px 4px; line-height: normal; margin-top: -10px;">
                              ${p.price}
                            </div>
                          </div>
                          <div style="font-size: 12px; font-weight: 700; color: #FFFFFF; line-height: 1.3; margin-bottom: 4px;">
                            ${p.title}
                          </div>
                          <div style="font-size: 10px; color: #64748B; line-height: 1.3; margin-bottom: 12px; min-height: 26px;">
                            ${p.desc}
                          </div>
                          <a href="${SITE_URL}/#/products" style="display: block; background: #0284C7; color: #FFFFFF; font-size: 11px; font-weight: 700; padding: 7px 0; border-radius: 6px; text-decoration: none;">
                            Add to Cart
                          </a>
                        </td>
                      </tr>
                    </table>
                  </td>`
                    )
                    .join('')}

                </tr>
              </table>
            </td>
          </tr>

          <!-- Primary Shop Now Button -->
          <tr>
            <td align="center" style="padding: 10px 30px 20px;">
              <a href="${SITE_URL}/#/products" style="display: inline-block; background: linear-gradient(135deg, #0071E3 0%, #0284C7 100%); color: #FFFFFF; font-weight: 700; font-size: 16px; padding: 15px 50px; border-radius: 999px; text-decoration: none; box-shadow: 0 8px 24px rgba(0, 113, 227, 0.5), 0 0 15px rgba(0, 210, 255, 0.35);">
                Shop Now
              </a>
              <div style="font-size: 11px; color: #64748B; margin-top: 14px;">
                *Coupon code valid for 14 days. Terms and conditions apply.*
              </div>
            </td>
          </tr>

          <!-- Social Icons & Footer -->
          <tr>
            <td align="center" style="padding: 24px 30px; background-color: #070A10; border-top: 1px solid #1E293B;">
              <!-- Social links -->
              <div style="margin-bottom: 14px;">
                <a href="${SITE_URL}" style="display: inline-block; width: 32px; height: 32px; line-height: 32px; border-radius: 50%; background: #1E293B; color: #94A3B8; text-decoration: none; margin: 0 5px; font-size: 14px;">🌐</a>
                <a href="${SITE_URL}" style="display: inline-block; width: 32px; height: 32px; line-height: 32px; border-radius: 50%; background: #1E293B; color: #94A3B8; text-decoration: none; margin: 0 5px; font-size: 14px;">📘</a>
                <a href="${SITE_URL}" style="display: inline-block; width: 32px; height: 32px; line-height: 32px; border-radius: 50%; background: #1E293B; color: #94A3B8; text-decoration: none; margin: 0 5px; font-size: 14px;">📸</a>
              </div>
              <div style="font-size: 11px; color: #64748B; line-height: 1.6;">
                อีเมลนี้ส่งถึงคุณ (${cleanEmail}) เนื่องจากการลงทะเบียนสมาชิกที่ <a href="${SITE_URL}" style="color: #38BDF8; text-decoration: none;">TechNova IT Digital Showroom</a><br/>
                Address: TechNova IT Digital Showroom, 2026 Tech Valley, Bangkok<br/>
                © 2026 TechNova Corporation. All rights reserved.
              </div>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };

  try {
    const info = await executeSendMail(mailOptions);
    console.log(`\n📬 [Mailer] Successfully sent Registration Welcome Email to ${cleanEmail} (Message ID: ${info.messageId})\n`);
    return { success: true, messageId: info.messageId, profile: showcase.profileLabel };
  } catch (err) {
    console.error(`\n❌ [Mailer Error] Failed to send Registration Welcome Email to ${cleanEmail}:`, err.message);
    return { success: false, error: err.message };
  }
}

/**
 * ============================================================================
 *  3. ส่งอีเมลลิงก์รีเซ็ตรหัสผ่าน (Password Reset Email)
 * ============================================================================
 */
async function sendResetPasswordEmail(toEmail, resetToken) {
  const resetLink = `${SITE_URL}/#/reset-password?token=${resetToken}`;

  if (!isConfigured || (!primaryTransporter && !fallbackTransporter)) {
    console.log('\n📧 [โหมดจำลอง - ยังไม่ได้ตั้งค่า Gmail ใน .env]');
    console.log(`   ลิงก์รีเซ็ตรหัสผ่านสำหรับ ${toEmail}:`);
    console.log(`   ${resetLink}\n`);
    return { simulated: true, resetLink };
  }

  const mailOptions = {
    from: `"TechNova IT Store" <${GMAIL_USER}>`,
    to: toEmail,
    subject: '🔒 รีเซ็ตรหัสผ่านบัญชี TechNova IT ของคุณ',
    html: `
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>Reset Password</title>
</head>
<body style="margin: 0; padding: 0; background-color: #07090E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #FFFFFF;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #07090E; padding: 40px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 520px; background-color: #0F172A; border-radius: 18px; overflow: hidden; border: 1px solid #1E293B; box-shadow: 0 20px 40px rgba(0, 0, 0, 0.7);">
          <tr>
            <td align="center" style="padding: 36px 30px;">
              <div style="font-size: 20px; font-weight: 800; letter-spacing: 2px; color: #00D2FF; margin-bottom: 16px;">
                ⬡ TECHNOVA IT
              </div>
              <h2 style="margin: 0 0 12px; font-size: 22px; font-weight: 700; color: #FFFFFF;">
                รีเซ็ตรหัสผ่านบัญชีของคุณ
              </h2>
              <p style="margin: 0 0 24px; font-size: 14px; line-height: 1.6; color: #94A3B8;">
                คุณได้ส่งคำขอรีเซ็ตรหัสผ่านสำหรับบัญชี TechNova IT กรุณากดปุ่มด้านล่างเพื่อตั้งรหัสผ่านใหม่ (ลิงก์นี้จะหมดอายุภายใน 1 ชั่วโมง)
              </p>
              <a href="${resetLink}" style="display: inline-block; background: linear-gradient(135deg, #0071E3 0%, #0284C7 100%); color: #FFFFFF; font-weight: 700; font-size: 15px; padding: 14px 36px; border-radius: 999px; text-decoration: none; box-shadow: 0 6px 20px rgba(0, 113, 227, 0.4);">
                ตั้งรหัสผ่านใหม่ (Reset Password)
              </a>
              <p style="margin: 24px 0 0; font-size: 12px; color: #64748B;">
                หากคุณไม่ได้เป็นผู้ส่งคำขอนี้ สามารถเพิกเฉยต่ออีเมลนี้ได้อย่างปลอดภัย
              </p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>
    `,
  };

  try {
    await executeSendMail(mailOptions);
    return { simulated: false, resetLink };
  } catch (err) {
    console.error('[Reset Password Mail Error]', err.message);
    return { simulated: false, resetLink, error: err.message };
  }
}

/**
 * ============================================================================
 *  4. ส่งอีเมลยืนยันการสั่งซื้อสำเร็จ (Order Confirmation Email)
 * ============================================================================
 */
async function sendOrderConfirmationEmail({
  orderId,
  email,
  name,
  items = [],
  subtotal = 0,
  discount = 0,
  total = 0,
  address = {},
  couponCode = null,
}) {
  if (!email || typeof email !== 'string') return { success: false, error: 'Invalid recipient email' };
  const cleanEmail = email.trim().toLowerCase();
  const customerName = name || 'VIP Client';
  const orderNum = `#TN-${String(orderId).padStart(5, '0')}`;

  if (isTestOrDummyEmail(cleanEmail) || !isConfigured || (!primaryTransporter && !fallbackTransporter)) {
    console.log(`\n📧 [Email Simulation] Order Confirmation for ${cleanEmail} (Order: ${orderNum}, Total: ฿${total.toLocaleString()})`);
    return { simulated: true, toEmail: cleanEmail, orderId };
  }

  const itemsRows = items
    .map(
      (item) => `
      <tr>
        <td style="padding: 12px 10px; border-bottom: 1px solid #1E293B; font-size: 13.5px; color: #E2E8F0;">
          <div style="font-weight: 700;">${item.title || 'TechNova Hardware'}</div>
          <div style="font-size: 11px; color: #94A3B8; margin-top: 2px;">฿${(item.unit_price || 0).toLocaleString()} × ${item.quantity || 1}</div>
        </td>
        <td align="right" style="padding: 12px 10px; border-bottom: 1px solid #1E293B; font-size: 13.5px; font-weight: 700; color: #00D2FF; font-family: monospace;">
          ฿${((item.unit_price || 0) * (item.quantity || 1)).toLocaleString()}
        </td>
      </tr>`
    )
    .join('');

  const fullAddress = address.address_line
    ? `${address.recipient_name || customerName}, ${address.address_line}, ${address.subdistrict || ''} ${address.district || ''}, ${address.province || ''} ${address.postal_code || ''}`
    : 'TechNova Express Showroom Delivery';

  const mailOptions = {
    from: `"TechNova IT Store" <${GMAIL_USER}>`,
    to: cleanEmail,
    subject: `⚡ ยืนยันคำสั่งซื้อ ${orderNum} — TechNova IT Digital Showroom`,
    html: `
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>Order Confirmation - ${orderNum}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #07090E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #FFFFFF;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #07090E; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #0B0E14; border-radius: 20px; overflow: hidden; border: 1px solid #1E293B; box-shadow: 0 20px 50px rgba(0,0,0,0.8);">
          <!-- Header -->
          <tr>
            <td align="center" style="padding: 35px 30px 20px; background: linear-gradient(180deg, #0F172A 0%, #0B0E14 100%);">
              <div style="font-size: 22px; font-weight: 900; letter-spacing: 2px; color: #00D2FF; font-family: monospace;">⬡ TECHNOVA IT ⬡</div>
              <div style="font-size: 11px; letter-spacing: 2px; color: #38BDF8; margin-top: 4px; text-transform: uppercase;">ORDER CONFIRMATION</div>
              <h1 style="margin: 16px 0 6px; font-size: 24px; font-weight: 800; color: #FFFFFF;">คำสั่งซื้อของคุณได้รับการยืนยันแล้ว</h1>
              <div style="font-size: 14px; color: #94A3B8;">ขอบคุณที่เลือกสรรอุปกรณ์เทคโนโลยีระดับพรีเมียมจาก TechNova</div>
            </td>
          </tr>

          <!-- Order Summary Card -->
          <tr>
            <td style="padding: 10px 30px 20px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background: #0F172A; border-radius: 14px; border: 1px solid #1E293B; padding: 20px;">
                <tr>
                  <td>
                    <div style="font-size: 12px; color: #94A3B8; text-transform: uppercase; letter-spacing: 1px;">หมายเลขคำสั่งซื้อ</div>
                    <div style="font-size: 20px; font-weight: 800; color: #00D2FF; font-family: monospace; margin-top: 4px;">${orderNum}</div>
                  </td>
                  <td align="right">
                    <span style="font-size: 11px; font-weight: 700; padding: 4px 12px; border-radius: 999px; background: rgba(56, 189, 248, 0.15); color: #38BDF8; border: 1px solid rgba(56, 189, 248, 0.3);">
                      CONFIRMED
                    </span>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top: 14px; font-size: 12.5px; color: #94A3B8; line-height: 1.5; border-top: 1px solid #1E293B; margin-top: 12px;">
                    <b style="color: #E2E8F0;">ที่อยู่จัดส่ง:</b> ${fullAddress}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Items Table -->
          <tr>
            <td style="padding: 0 30px 20px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0">
                <thead>
                  <tr style="border-bottom: 2px solid #334155;">
                    <th align="left" style="padding: 8px 10px; font-size: 12px; color: #94A3B8; text-transform: uppercase;">รายการสินค้า</th>
                    <th align="right" style="padding: 8px 10px; font-size: 12px; color: #94A3B8; text-transform: uppercase;">ยอดรวม</th>
                  </tr>
                </thead>
                <tbody>
                  ${itemsRows}
                </tbody>
              </table>

              <!-- Financial Totals -->
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin-top: 14px;">
                <tr>
                  <td style="padding: 4px 10px; font-size: 13px; color: #94A3B8;">ยอดรวมสินค้า:</td>
                  <td align="right" style="padding: 4px 10px; font-size: 13px; color: #E2E8F0; font-family: monospace;">฿${subtotal.toLocaleString()}</td>
                </tr>
                ${
                  discount > 0
                    ? `<tr>
                  <td style="padding: 4px 10px; font-size: 13px; color: #10B981;">ส่วนลดพิเศษ (${couponCode || 'Voucher'}):</td>
                  <td align="right" style="padding: 4px 10px; font-size: 13px; color: #10B981; font-family: monospace;">-฿${discount.toLocaleString()}</td>
                </tr>`
                    : ''
                }
                <tr>
                  <td style="padding: 10px 10px; font-size: 16px; font-weight: 800; color: #FFFFFF; border-top: 1px solid #334155;">ยอดชำระสุทธิ:</td>
                  <td align="right" style="padding: 10px 10px; font-size: 20px; font-weight: 900; color: #00D2FF; font-family: monospace; border-top: 1px solid #334155;">฿${total.toLocaleString()}</td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding: 10px 30px 30px;">
              <a href="${SITE_URL}/#/account" style="display: inline-block; background: linear-gradient(135deg, #0284C7 0%, #004BA8 100%); color: #FFFFFF; font-weight: 700; font-size: 15px; padding: 14px 38px; border-radius: 999px; text-decoration: none; box-shadow: 0 6px 20px rgba(2,132,199,0.4);">
                ตรวจสอบสถานะคำสั่งซื้อ →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 20px 30px; background-color: #070A10; border-top: 1px solid #1E293B; font-size: 11px; color: #64748B;">
              © 2026 TechNova IT Corporation. High-End Showroom &amp; Technology Concierge.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  };

  try {
    const info = await executeSendMail(mailOptions);
    console.log(`\n📬 [Mailer] Successfully sent Order Confirmation Email to ${cleanEmail} (${orderNum})`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error(`\n❌ [Mailer Error] Failed to send Order Confirmation Email to ${cleanEmail}:`, err.message);
    return { success: false, error: err.message };
  }
}

/**
 * ============================================================================
 *  5. ส่งอีเมลแจ้งการจัดส่งสินค้า (Order Shipped & Tracking Email)
 * ============================================================================
 */
async function sendOrderShippedEmail({
  orderId,
  email,
  name,
  items = [],
  total = 0,
  trackingNumber = 'TNX-EXPRESS-01',
  carrier = 'TechNova Express',
  address = {},
}) {
  if (!email || typeof email !== 'string') return { success: false, error: 'Invalid recipient email' };
  const cleanEmail = email.trim().toLowerCase();
  const customerName = name || 'VIP Client';
  const orderNum = `#TN-${String(orderId).padStart(5, '0')}`;

  if (isTestOrDummyEmail(cleanEmail) || !isConfigured || (!primaryTransporter && !fallbackTransporter)) {
    console.log(`\n📧 [Email Simulation] Order Shipped for ${cleanEmail} (Order: ${orderNum}, Tracking: ${trackingNumber})`);
    return { simulated: true, toEmail: cleanEmail, orderId, trackingNumber };
  }

  const mailOptions = {
    from: `"TechNova IT Store" <${GMAIL_USER}>`,
    to: cleanEmail,
    subject: `🚀 พัสดุของคุณถูกจัดส่งแล้ว! ${orderNum} [${trackingNumber}]`,
    html: `
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>Your order has shipped - ${orderNum}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #07090E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #FFFFFF;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #07090E; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #0B0E14; border-radius: 20px; overflow: hidden; border: 1px solid #1E293B; box-shadow: 0 20px 50px rgba(0,0,0,0.8);">
          <!-- Header -->
          <tr>
            <td align="center" style="padding: 35px 30px 20px; background: linear-gradient(180deg, #0F172A 0%, #0B0E14 100%);">
              <div style="font-size: 32px; margin-bottom: 8px;">🚀</div>
              <div style="font-size: 11px; letter-spacing: 2px; color: #10B981; text-transform: uppercase; font-weight: 700;">DISPATCH NOTICE</div>
              <h1 style="margin: 12px 0 6px; font-size: 24px; font-weight: 800; color: #FFFFFF;">พัสดุของคุณกำลังเดินทาง!</h1>
              <div style="font-size: 14px; color: #94A3B8;">สินค้าจากคำสั่งซื้อ ${orderNum} ถูกส่งมอบให้แก่เจ้าหน้าที่ขนส่งเรียบร้อยแล้ว</div>
            </td>
          </tr>

          <!-- Tracking Box -->
          <tr>
            <td style="padding: 10px 30px 25px;">
              <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background: linear-gradient(145deg, #0A192F 0%, #061122 100%); border-radius: 14px; border: 1.5px solid #00D2FF; padding: 22px; box-shadow: 0 0 25px rgba(0, 210, 255, 0.25);">
                <tr>
                  <td align="center">
                    <div style="font-size: 11px; font-weight: 700; color: #38BDF8; letter-spacing: 1.5px; text-transform: uppercase;">
                      ขนส่งโดย: ${carrier || 'TechNova Express'}
                    </div>
                    <div style="font-size: 22px; font-weight: 900; color: #FFFFFF; letter-spacing: 2px; font-family: monospace; background: rgba(0, 210, 255, 0.15); padding: 8px 20px; border-radius: 8px; border: 1px dashed #00D2FF; margin: 12px 0 6px; display: inline-block;">
                      ${trackingNumber}
                    </div>
                    <div style="font-size: 12px; color: #94A3B8; margin-top: 4px;">
                      คาดการณ์ถึงปลายทางภายใน 1-2 วันทำการ
                    </div>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Button -->
          <tr>
            <td align="center" style="padding: 0 30px 30px;">
              <a href="${SITE_URL}/#/account" style="display: inline-block; background: linear-gradient(135deg, #10B981 0%, #059669 100%); color: #FFFFFF; font-weight: 700; font-size: 15px; padding: 14px 38px; border-radius: 999px; text-decoration: none; box-shadow: 0 6px 20px rgba(16,185,129,0.4);">
                ตรวจสอบพัสดุและรายละเอียดคำสั่งซื้อ →
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 20px 30px; background-color: #070A10; border-top: 1px solid #1E293B; font-size: 11px; color: #64748B;">
              อีเมลนี้ส่งถึงคุณ (${cleanEmail}) เกี่ยวกับสถานะคำสั่งซื้อจาก TechNova IT Store
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  };

  try {
    const info = await executeSendMail(mailOptions);
    console.log(`\n📬 [Mailer] Successfully sent Order Shipped Email to ${cleanEmail} (${orderNum})`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error(`\n❌ [Mailer Error] Failed to send Order Shipped Email to ${cleanEmail}:`, err.message);
    return { success: false, error: err.message };
  }
}

/**
 * ============================================================================
 *  6. ส่งอีเมลแคมเปญการตลาดตามกลุ่มเป้าหมาย (Marketing Campaign Blast with Click Tracking)
 * ============================================================================
 */
async function sendCampaignEmail({
  toEmail,
  name = 'Tech Enthusiast',
  subject = '⚡ ข้อเสนอพิเศษสำหรับคุณจาก TechNova IT',
  headline = 'ข้อเสนอสุดเอ็กซ์คลูซีฟ',
  content = '',
  ctaText = 'สำรวจข้อเสนอทันที →',
  ctaTrackingUrl = '',
  bannerBadge = '🔥 VIP EXCLUSIVE',
}) {
  if (!toEmail || typeof toEmail !== 'string') return { success: false, error: 'Invalid recipient email' };
  const cleanEmail = toEmail.trim().toLowerCase();
  const recipientName = name || 'VIP Member';

  if (isTestOrDummyEmail(cleanEmail) || !isConfigured || (!primaryTransporter && !fallbackTransporter)) {
    console.log(`\n📧 [Campaign Simulation] To: ${cleanEmail} | Subject: "${subject}" | Tracking CTA: ${ctaTrackingUrl}`);
    return { simulated: true, toEmail: cleanEmail, subject };
  }

  const formattedContent = (content || '')
    .split('\n\n')
    .filter(Boolean)
    .map((para) => `<p style="margin: 0 0 14px; font-size: 14.5px; line-height: 1.7; color: #CBD5E1;">${para}</p>`)
    .join('');

  const mailOptions = {
    from: `"TechNova Private Dispatch" <${GMAIL_USER}>`,
    to: cleanEmail,
    subject: subject,
    html: `
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <title>${subject}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #07090E; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; color: #FFFFFF;">
  <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #07090E; padding: 30px 10px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" border="0" cellspacing="0" cellpadding="0" style="max-width: 600px; background-color: #0B0E14; border-radius: 20px; overflow: hidden; border: 1px solid #1E293B; box-shadow: 0 20px 50px rgba(0,0,0,0.8), 0 0 25px rgba(0, 210, 255, 0.15);">
          <!-- Header -->
          <tr>
            <td align="center" style="padding: 35px 30px 20px; background: linear-gradient(180deg, #0F172A 0%, #0B0E14 100%);">
              <div style="font-size: 22px; font-weight: 900; letter-spacing: 2px; color: #00D2FF; font-family: monospace;">⬡ TECHNOVA IT ⬡</div>
              <div style="display: inline-block; margin-top: 10px; font-size: 11px; font-weight: 800; letter-spacing: 1.5px; color: #38BDF8; background: rgba(56, 189, 248, 0.12); border: 1px solid rgba(56, 189, 248, 0.3); padding: 3px 12px; border-radius: 999px;">
                ${bannerBadge}
              </div>
              <h1 style="margin: 18px 0 6px; font-size: 24px; font-weight: 800; color: #FFFFFF; line-height: 1.3;">${headline}</h1>
              <div style="font-size: 14px; color: #94A3B8;">เรียนคุณ ${recipientName}</div>
            </td>
          </tr>

          <!-- Body Content -->
          <tr>
            <td style="padding: 20px 35px 25px; background-color: #0B0E14;">
              ${formattedContent || `<p style="margin: 0 0 14px; font-size: 14.5px; line-height: 1.7; color: #CBD5E1;">เราคัดสรรข้อเสนอและอุปกรณ์ฮาร์ดแวร์ที่ดีที่สุดให้ตรงกับความต้องการของคุณเป็นพิเศษ</p>`}
            </td>
          </tr>

          <!-- CTA Button with embedded Click Tracking -->
          <tr>
            <td align="center" style="padding: 10px 35px 35px;">
              <a href="${ctaTrackingUrl || SITE_URL}" style="display: inline-block; background: linear-gradient(135deg, #0071E3 0%, #00D2FF 100%); color: #07090E; font-weight: 800; font-size: 15px; letter-spacing: 0.5px; padding: 16px 42px; border-radius: 999px; text-decoration: none; box-shadow: 0 8px 25px rgba(0, 210, 255, 0.45);">
                ${ctaText}
              </a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td align="center" style="padding: 20px 30px; background-color: #070A10; border-top: 1px solid #1E293B; font-size: 11px; color: #64748B;">
              อีเมลนี้ส่งถึงคุณ (${cleanEmail}) จาก TechNova Private Dispatch<br/>
              © 2026 TechNova Corporation. All rights reserved.
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
  };

  try {
    const info = await executeSendMail(mailOptions);
    console.log(`\n📬 [Mailer] Successfully sent Campaign Email to ${cleanEmail}`);
    return { success: true, messageId: info.messageId };
  } catch (err) {
    console.error(`\n❌ [Mailer Error] Failed to send Campaign Email to ${cleanEmail}:`, err.message);
    return { success: false, error: err.message };
  }
}

module.exports = {
  sendResetPasswordEmail,
  sendNewsletterWelcomeEmail,
  sendRegistrationWelcomeEmail,
  sendOrderConfirmationEmail,
  sendOrderShippedEmail,
  sendCampaignEmail,
};

