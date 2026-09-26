#!/usr/bin/env python3
"""
MacroPulse MySQL Database Setup & Migration Runner
Reads database/schema.sql and deploys all tables and seeds to MySQL.

Usage:
  py database/setup_db.py
  py database/setup_db.py --user root --password YourPassword
  py database/setup_db.py --check
"""

import os
import sys
import json
import argparse
import getpass

def main():
    parser = argparse.ArgumentParser(description="Initialize MacroPulse MySQL Database")
    parser.add_argument("--host", default=None, help="MySQL Host (default: localhost)")
    parser.add_argument("--port", type=int, default=None, help="MySQL Port (default: 3306)")
    parser.add_argument("--user", default=None, help="MySQL User (default: root)")
    parser.add_argument("--password", default=None, help="MySQL Password")
    parser.add_argument("--check", action="store_true", help="Only test connection without running migrations")
    args = parser.parse_args()

    db_dir = os.path.dirname(os.path.abspath(__file__))
    config_path = os.path.join(db_dir, "db_config.json")
    schema_path = os.path.join(db_dir, "schema.sql")

    # Load configuration file
    config = {
        "host": "localhost",
        "port": 3306,
        "user": "root",
        "password": "",
        "database": "macropulse_db"
    }
    if os.path.exists(config_path):
        try:
            with open(config_path, "r", encoding="utf-8") as f:
                config.update(json.load(f))
        except Exception:
            pass

    # CLI arguments override config file
    if args.host: config["host"] = args.host
    if args.port: config["port"] = args.port
    if args.user: config["user"] = args.user
    if args.password is not None: config["password"] = args.password

    print("==================================================================")
    print("  MacroPulse Institutional Terminal - MySQL Database Setup")
    print("==================================================================")
    print(f"  Target Host : {config['host']}:{config['port']}")
    print(f"  Target User : {config['user']}")
    print(f"  Database    : {config['database']}")
    print("==================================================================\n")

    try:
        import mysql.connector
    except ImportError:
        print("[Error] 'mysql-connector-python' is not installed.")
        print("Please run: py -m pip install mysql-connector-python")
        sys.exit(1)

    # Attempt connection to MySQL server
    conn = None
    try:
        conn = mysql.connector.connect(
            host=config["host"],
            port=config["port"],
            user=config["user"],
            password=config["password"]
        )
    except mysql.connector.Error as err:
        if err.errno == 1045 and not config["password"] and sys.stdin.isatty():
            print("[Auth] Password required for MySQL user 'root'.")
            entered_pw = getpass.getpass("Enter MySQL Password: ")
            config["password"] = entered_pw
            try:
                conn = mysql.connector.connect(
                    host=config["host"],
                    port=config["port"],
                    user=config["user"],
                    password=config["password"]
                )
            except Exception as e2:
                print(f"[Error] Failed to connect: {e2}")
                sys.exit(1)
        else:
            print(f"[Error] MySQL Connection Failed: {err}")
            print("\nTip: Edit database/db_config.json with your MySQL password or run:")
            print(f"  py database/setup_db.py --user {config['user']} --password YOUR_PASSWORD\n")
            sys.exit(1)

    print(f"[OK] Successfully connected to MySQL Server {conn.get_server_info()}!")

    if args.check:
        print("[OK] Connection check passed.")
        conn.close()
        return

    # Read schema.sql
    if not os.path.exists(schema_path):
        print(f"[Error] Schema file not found at: {schema_path}")
        conn.close()
        sys.exit(1)

    with open(schema_path, "r", encoding="utf-8") as f:
        schema_sql = f.read()

    print("[Info] Applying schema and seed statements from database/schema.sql...")
    cursor = conn.cursor()

    # Split SQL into individual executable statements
    statements = []
    current_stmt = []
    for line in schema_sql.splitlines():
        stripped = line.strip()
        if stripped.startswith("--") or not stripped:
            continue
        current_stmt.append(line)
        if stripped.endswith(";"):
            stmt_str = "\n".join(current_stmt).strip()
            if stmt_str:
                statements.append(stmt_str)
            current_stmt = []

    success_count = 0
    for idx, stmt in enumerate(statements, 1):
        try:
            cursor.execute(stmt)
            success_count += 1
        except mysql.connector.Error as err:
            # Ignore duplicate key updates or notices
            print(f"  [Warning in stmt {idx}] {err.msg}")

    conn.commit()
    print(f"[OK] Executed {success_count} SQL statements successfully!")

    # Verify tables created
    cursor.execute(f"USE `{config['database']}`;")
    cursor.execute("SHOW TABLES;")
    tables = [row[0] for row in cursor.fetchall()]

    print(f"\n[OK] Database '{config['database']}' is initialized with {len(tables)} tables:")
    for t in tables:
        cursor.execute(f"SELECT COUNT(*) FROM `{t}`;")
        cnt = cursor.fetchone()[0]
        print(f"  * {t:<26} ({cnt} rows)")

    cursor.close()
    conn.close()

    # Update db_config.json if successful
    try:
        with open(config_path, "w", encoding="utf-8") as f:
            json.dump(config, f, indent=2)
        print(f"\n[OK] Connection configuration saved to database/db_config.json.")
    except Exception:
        pass

    print("\n==================================================================")
    print("  MySQL Database Setup Complete!")
    print("  Your MacroPulse Terminal is now fully database-backed.")
    print("==================================================================\n")

if __name__ == "__main__":
    main()
