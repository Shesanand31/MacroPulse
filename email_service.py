#!/usr/bin/env python3
"""
MacroPulse Email Service
Dispatches security codes and password reset instructions via SMTP.
Compatible with standard Gmail App Passwords, Outlook, SendGrid, and custom SMTP relays.
"""

import os
import sys
import json
import smtplib
import logging
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.utils import formataddr

logger = logging.getLogger("macropulse_email")
logging.basicConfig(level=logging.INFO, format="[%(asctime)s] %(levelname)s: %(message)s")

CONFIG_FILE = os.path.join(os.path.dirname(os.path.abspath(__file__)), "email_config.json")

def load_email_config():
    """Load SMTP credentials from email_config.json or environment variables."""
    cfg = {
        "enabled": False,
        "smtp_host": os.environ.get("SMTP_HOST", "smtp.gmail.com"),
        "smtp_port": int(os.environ.get("SMTP_PORT", 587)),
        "smtp_user": os.environ.get("SMTP_USER", ""),
        "smtp_password": os.environ.get("SMTP_PASSWORD", ""),
        "from_name": os.environ.get("FROM_NAME", "MacroPulse Security Desk"),
        "from_email": os.environ.get("FROM_EMAIL", "")
    }

    if os.path.exists(CONFIG_FILE):
        try:
            with open(CONFIG_FILE, "r", encoding="utf-8") as f:
                disk_cfg = json.load(f)
                cfg.update(disk_cfg)
        except Exception as e:
            logger.warning("Could not parse %s: %s", CONFIG_FILE, e)

    # Auto-enable if user and password are provided
    if cfg.get("smtp_user") and cfg.get("smtp_password") and not cfg.get("enabled"):
        cfg["enabled"] = True

    if not cfg.get("from_email") and cfg.get("smtp_user"):
        cfg["from_email"] = cfg["smtp_user"]

    return cfg

def build_reset_email_html(recipient_email, code, expires_in_minutes=15):
    """Render a responsive, institutional dark-themed HTML email."""
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>MacroPulse Security Verification</title>
  <style>
    body {{
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #0c0f17;
      color: #e2e8f0;
      margin: 0;
      padding: 30px 15px;
    }}
    .container {{
      max-width: 540px;
      margin: 0 auto;
      background: #131826;
      border: 1px solid rgba(148, 163, 184, 0.15);
      border-radius: 12px;
      padding: 32px 28px;
      box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
    }}
    .brand-header {{
      display: flex;
      align-items: center;
      gap: 12px;
      border-bottom: 1px solid rgba(148, 163, 184, 0.15);
      padding-bottom: 20px;
      margin-bottom: 24px;
    }}
    .brand-title {{
      font-size: 20px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.3px;
    }}
    .brand-subtitle {{
      font-size: 11px;
      color: #38bdf8;
      text-transform: uppercase;
      letter-spacing: 1px;
      font-weight: 600;
    }}
    .heading {{
      font-size: 18px;
      font-weight: 600;
      color: #ffffff;
      margin: 0 0 12px 0;
    }}
    .text {{
      font-size: 14px;
      line-height: 1.6;
      color: #94a3b8;
      margin: 0 0 24px 0;
    }}
    .code-box {{
      background: #1a2236;
      border: 1px solid rgba(124, 58, 237, 0.4);
      border-radius: 10px;
      padding: 20px;
      text-align: center;
      margin: 24px 0;
    }}
    .code-label {{
      font-size: 11px;
      color: #a78bfa;
      text-transform: uppercase;
      letter-spacing: 1.5px;
      font-weight: 600;
      margin-bottom: 8px;
    }}
    .code-number {{
      font-size: 36px;
      font-weight: 800;
      color: #ffffff;
      letter-spacing: 8px;
      font-family: 'Courier New', Courier, monospace;
    }}
    .alert-box {{
      background: rgba(245, 158, 11, 0.1);
      border: 1px solid rgba(245, 158, 11, 0.25);
      border-radius: 8px;
      padding: 12px 16px;
      font-size: 12px;
      color: #fcd34d;
      line-height: 1.5;
      margin-bottom: 24px;
    }}
    .footer {{
      border-top: 1px solid rgba(148, 163, 184, 0.12);
      padding-top: 20px;
      font-size: 11px;
      color: #64748b;
      line-height: 1.5;
      text-align: center;
    }}
  </style>
</head>
<body>
  <div class="container">
    <div class="brand-header">
      <div>
        <div class="brand-title">MacroPulse</div>
        <div class="brand-subtitle">Institutional Security Desk</div>
      </div>
    </div>

    <h1 class="heading">Password Reset Verification Code</h1>
    <p class="text">
      We received a request to reset the password for your MacroPulse Terminal account (<strong>{recipient_email}</strong>). Use the verification code below to authorize your password update:
    </p>

    <div class="code-box">
      <div class="code-label">Verification Code</div>
      <div class="code-number">{code}</div>
    </div>

    <div class="alert-box">
      ⚠️ <strong>Security Notice:</strong> This single-use verification code will expire in <strong>{expires_in_minutes} minutes</strong>. If you did not initiate this request, your account remains secure and you can safely disregard this email.
    </div>

    <div class="footer">
      MacroPulse Financial Intelligence & Analytics Terminal<br>
      Automated Security Notification • Please do not reply directly to this email.
    </div>
  </div>
</body>
</html>
"""

def send_password_reset_code(to_email, code, expires_in_minutes=10):
    """
    Send verification code via SMTP.
    Returns: dict with status info { "sent": bool, "reason": str, ... }
    """
    cfg = load_email_config()

    # Check if SMTP is enabled and configured
    if not cfg.get("enabled") or not cfg.get("smtp_user") or not cfg.get("smtp_password"):
        logger.info("SMTP is unconfigured or disabled in email_config.json. Simulation mode active.")
        return {
            "sent": False,
            "reason": "SMTP unconfigured in email_config.json",
            "recipient": to_email,
            "code": code,
            "demoMode": True
        }

    smtp_host = cfg["smtp_host"]
    smtp_port = cfg["smtp_port"]
    smtp_user = cfg["smtp_user"]
    smtp_pass = cfg["smtp_password"]
    from_name = cfg["from_name"]
    from_email = cfg["from_email"] or smtp_user

    # Prepare message
    msg = MIMEMultipart("alternative")
    msg["Subject"] = f"MacroPulse Security: Your Reset Code is {code}"
    msg["From"] = formataddr((from_name, from_email))
    msg["To"] = to_email

    # Plain text version
    plain_text = f"""MacroPulse Institutional Terminal
Password Reset Verification Code

We received a request to reset your password for {to_email}.
Your 6-digit verification code is:

{code}

This code will expire in {expires_in_minutes} minutes.
If you did not make this request, you can safely ignore this email.
"""
    html_text = build_reset_email_html(to_email, code, expires_in_minutes)

    msg.attach(MIMEText(plain_text, "plain", "utf-8"))
    msg.attach(MIMEText(html_text, "html", "utf-8"))

    try:
        logger.info("Connecting to SMTP relay at %s:%s for %s...", smtp_host, smtp_port, to_email)
        server = smtplib.SMTP(smtp_host, smtp_port, timeout=12)
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(smtp_user, smtp_pass)
        server.send_message(msg)
        server.quit()
        logger.info("Email successfully dispatched to %s via %s!", to_email, smtp_host)
        return {
            "sent": True,
            "recipient": to_email,
            "smtp_host": smtp_host
        }
    except Exception as e:
        logger.error("Failed to send email to %s via SMTP: %s", to_email, e)
        return {
            "sent": False,
            "reason": str(e),
            "recipient": to_email,
            "code": code,
            "demoMode": True
        }

def build_welcome_email_html(recipient_name, recipient_email, is_google=False):
    """Render an institutional, modern dark-themed Welcome & Registration Confirmation HTML email."""
    auth_method = "Google Single Sign-On (OAuth 2.0)" if is_google else "Institutional Credentials (Encrypted)"
    return f"""<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Welcome to MacroPulse</title>
  <style>
    body {{
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      background-color: #0c0f17;
      color: #e2e8f0;
      margin: 0;
      padding: 30px 15px;
    }}
    .container {{
      max-width: 560px;
      margin: 0 auto;
      background: #131826;
      border: 1px solid rgba(148, 163, 184, 0.15);
      border-radius: 14px;
      padding: 36px 30px;
      box-shadow: 0 12px 30px rgba(0, 0, 0, 0.5);
    }}
    .brand-header {{
      display: flex;
      align-items: center;
      gap: 14px;
      border-bottom: 1px solid rgba(148, 163, 184, 0.15);
      padding-bottom: 22px;
      margin-bottom: 26px;
    }}
    .brand-badge {{
      background: linear-gradient(135deg, #0284c7, #2563eb);
      width: 42px;
      height: 42px;
      border-radius: 10px;
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: 800;
      font-size: 22px;
      color: #ffffff;
      margin-right: 12px;
      vertical-align: middle;
    }}
    .brand-title {{
      font-size: 22px;
      font-weight: 700;
      color: #ffffff;
      letter-spacing: -0.4px;
      display: inline-block;
      vertical-align: middle;
    }}
    .brand-subtitle {{
      font-size: 11px;
      color: #38bdf8;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      font-weight: 600;
      margin-top: 2px;
    }}
    .heading {{
      font-size: 20px;
      font-weight: 700;
      color: #ffffff;
      margin: 0 0 14px 0;
    }}
    .welcome-pill {{
      display: inline-block;
      background: rgba(16, 185, 129, 0.15);
      border: 1px solid rgba(16, 185, 129, 0.35);
      color: #10b981;
      padding: 5px 14px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 600;
      margin-bottom: 16px;
    }}
    .text {{
      font-size: 14px;
      line-height: 1.65;
      color: #94a3b8;
      margin: 0 0 20px 0;
    }}
    .info-card {{
      background: #1a2236;
      border: 1px solid rgba(56, 189, 248, 0.25);
      border-radius: 10px;
      padding: 18px 22px;
      margin: 22px 0;
    }}
    .info-row {{
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid rgba(148, 163, 184, 0.08);
      font-size: 13px;
    }}
    .info-row:last-child {{
      border-bottom: none;
      padding-bottom: 0;
    }}
    .info-label {{
      color: #64748b;
      font-weight: 500;
    }}
    .info-val {{
      color: #f1f5f9;
      font-weight: 600;
      text-align: right;
    }}
    .feature-list {{
      margin: 20px 0;
      padding: 0;
      list-style: none;
    }}
    .feature-item {{
      padding: 8px 0;
      font-size: 13px;
      color: #cbd5e1;
      display: flex;
      align-items: center;
      gap: 10px;
    }}
    .btn-container {{
      text-align: center;
      margin: 28px 0 24px 0;
    }}
    .cta-btn {{
      display: inline-block;
      background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
      color: #ffffff !important;
      text-decoration: none;
      padding: 13px 32px;
      border-radius: 8px;
      font-size: 14px;
      font-weight: 600;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.35);
      letter-spacing: 0.2px;
    }}
    .security-notice {{
      background: rgba(148, 163, 184, 0.05);
      border: 1px solid rgba(148, 163, 184, 0.12);
      border-radius: 8px;
      padding: 14px 16px;
      font-size: 12px;
      color: #94a3b8;
      line-height: 1.5;
      margin-top: 24px;
    }}
    .footer {{
      border-top: 1px solid rgba(148, 163, 184, 0.12);
      padding-top: 22px;
      margin-top: 28px;
      font-size: 11px;
      color: #64748b;
      line-height: 1.6;
      text-align: center;
    }}
  </style>
</head>
<body>
  <div class="container">
    <div class="brand-header">
      <div class="brand-badge">M</div>
      <div style="display: inline-block; vertical-align: middle;">
        <div class="brand-title">MacroPulse</div>
        <div class="brand-subtitle">Institutional Financial Terminal</div>
      </div>
    </div>

    <div class="welcome-pill">✓ Registration Successfully Completed</div>

    <h1 class="heading">Welcome to MacroPulse, {recipient_name}!</h1>
    <p class="text">
      Your account for <strong>MacroPulse Institutional Terminal</strong> has been successfully registered and activated. You now have full access to sovereign monetary analytics, real-time equity intelligence, and quantitative AI forecasting models.
    </p>

    <div class="info-card">
      <div class="info-row">
        <span class="info-label">Account Name:</span>
        <span class="info-val">{recipient_name}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Registered Email:</span>
        <span class="info-val">{recipient_email}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Authentication Method:</span>
        <span class="info-val">{auth_method}</span>
      </div>
      <div class="info-row">
        <span class="info-label">Institutional Access:</span>
        <span class="info-val" style="color: #38bdf8;">Quantitative / Retail Investor</span>
      </div>
      <div class="info-row">
        <span class="info-label">Database Status:</span>
        <span class="info-val" style="color: #10b981;">Active • MySQL Synchronized</span>
      </div>
    </div>

    <div style="font-size: 13px; font-weight: 600; color: #f8fafc; margin-bottom: 8px;">
      Core Terminal Capabilities:
    </div>
    <ul class="feature-list">
      <li class="feature-item">📈 <strong>Live Bursa &amp; US Equities:</strong> Interactive candlestick charts with SMA &amp; RSI technical overlays.</li>
      <li class="feature-item">🇲🇾 <strong>Sovereign Monetary Policy:</strong> Bank Negara Malaysia (BNM) OPR, CPI Inflation &amp; Real GDP tracking.</li>
      <li class="feature-item">🤖 <strong>Quantitative AI Forecasting:</strong> Deep learning predictions powered by PatchTST &amp; LSTM models.</li>
      <li class="feature-item">📄 <strong>Company Intelligence Briefs:</strong> Sensitivity scorecards and printable executive PDF reports.</li>
    </ul>

    <div class="btn-container">
      <a href="http://localhost:3000" class="cta-btn" target="_blank">Launch MacroPulse Terminal &rarr;</a>
    </div>

    <div class="security-notice">
      🔒 <strong>Security Advisory:</strong> MacroPulse will never ask for your password via email. If you did not create this account, please contact the security desk immediately.
    </div>

    <div class="footer">
      MacroPulse Financial Intelligence &amp; Analytics Terminal<br>
      Automated Registration Confirmation • Please do not reply directly to this email.
    </div>
  </div>
</body>
</html>
"""

def send_welcome_email(to_email, recipient_name="Analyst", is_google=False):
    """
    Dispatch an onboarding welcome confirmation email upon successful user registration.
    Returns: dict with status info { "sent": bool, "reason": str, ... }
    """
    cfg = load_email_config()

    if not cfg.get("enabled") or not cfg.get("smtp_user") or not cfg.get("smtp_password"):
        logger.info("SMTP disabled or unconfigured. Welcome email logged in simulation mode for %s.", to_email)
        return {
            "sent": False,
            "reason": "SMTP unconfigured",
            "recipient": to_email,
            "demoMode": True
        }

    smtp_host = cfg["smtp_host"]
    smtp_port = cfg["smtp_port"]
    smtp_user = cfg["smtp_user"]
    smtp_pass = cfg["smtp_password"]
    from_name = cfg["from_name"]
    from_email = cfg["from_email"] or smtp_user

    msg = MIMEMultipart("alternative")
    msg["Subject"] = "Welcome to MacroPulse — Your Account is Successfully Registered! 📈"
    msg["From"] = formataddr((from_name, from_email))
    msg["To"] = to_email

    plain_text = f"""Welcome to MacroPulse, {recipient_name}!

Your institutional account for MacroPulse ({to_email}) has been successfully registered and activated.

Account Details:
- Name: {recipient_name}
- Email: {to_email}
- Access Tier: Quantitative / Retail Investor
- Terminal URL: http://localhost:3000

Features available to you:
- Bank Negara Malaysia (BNM) OPR, CPI & GDP Macro Indicators
- Live Bursa Malaysia & Global Equity Candlestick Intelligence
- Quantitative AI Forecasting (PatchTST, LSTM, Transformer)
- Institutional Company Analysis & PDF Reports

Thank you for joining MacroPulse.
"""
    html_text = build_welcome_email_html(recipient_name, to_email, is_google)

    msg.attach(MIMEText(plain_text, "plain", "utf-8"))
    msg.attach(MIMEText(html_text, "html", "utf-8"))

    try:
        logger.info("Dispatching welcome email to %s via %s:%s...", to_email, smtp_host, smtp_port)
        server = smtplib.SMTP(smtp_host, smtp_port, timeout=12)
        server.ehlo()
        server.starttls()
        server.ehlo()
        server.login(smtp_user, smtp_pass)
        server.send_message(msg)
        server.quit()
        logger.info("Welcome email successfully delivered to %s!", to_email)
        return {"sent": True, "recipient": to_email}
    except Exception as e:
        logger.error("Failed to send welcome email to %s: %s", to_email, e)
        return {"sent": False, "reason": str(e), "recipient": to_email}
