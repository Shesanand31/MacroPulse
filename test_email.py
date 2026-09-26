#!/usr/bin/env python3
"""
MacroPulse Email Testing Utility
Tests SMTP configuration by dispatching a sample security code to a target email.

Usage:
  py test_email.py your_email@gmail.com
  py test_email.py --dry-run
"""

import sys
import argparse
import email_service

def main():
    parser = argparse.ArgumentParser(description="Test MacroPulse SMTP Email Dispatch")
    parser.add_argument("recipient", nargs="?", default="alex.morgan@macropulse.ai", help="Destination email address")
    parser.add_argument("--code", default="739102", help="6-digit security code to test with")
    parser.add_argument("--dry-run", action="store_true", help="Render HTML and print without sending")
    args = parser.parse_args()

    cfg = email_service.load_email_config()
    print("==================================================================")
    print("  MacroPulse Email Dispatch Tester")
    print("==================================================================")
    print(f"  SMTP Host     : {cfg.get('smtp_host')}:{cfg.get('smtp_port')}")
    print(f"  SMTP User     : {cfg.get('smtp_user') or '(Unconfigured)'}")
    print(f"  From Name     : {cfg.get('from_name')}")
    print(f"  Target Email  : {args.recipient}")
    print(f"  Test Code     : {args.code}")
    print(f"  SMTP Enabled  : {cfg.get('enabled')}")
    print("==================================================================\n")

    if args.dry_run:
        print("[Dry Run] Generating sample HTML email message...")
        html = email_service.build_reset_email_html(args.recipient, args.code)
        print(f"[OK] Rendered HTML successfully ({len(html)} bytes).")
        print("\nPlain text preview:")
        print(f"Subject: MacroPulse Security: Your Reset Code is {args.code}")
        print(f"Code: {args.code}")
        return

    if not cfg.get("smtp_user") or not cfg.get("smtp_password"):
        print("[Notice] SMTP is not yet configured in email_config.json.")
        print("To send real emails to your inbox:")
        print("1. Open 'email_config.json'")
        print("2. Enter your Gmail/Outlook address in 'smtp_user'")
        print("3. Enter your Google App Password (16 letters) in 'smtp_password'")
        print("4. Set 'enabled': true and re-run this script!\n")
        return

    print(f"Sending test security code to '{args.recipient}'...")
    res = email_service.send_password_reset_code(args.recipient, args.code)
    if res.get("sent"):
        print(f"[SUCCESS] Test email successfully delivered to {args.recipient}!")
        print("Please check your email inbox (and spam/promotions folder).")
    else:
        print(f"[FAILED] Could not send email: {res.get('reason')}")

if __name__ == "__main__":
    main()
