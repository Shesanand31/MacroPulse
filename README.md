# MacroPulse Institutional Terminal 📈🇲🇾

MacroPulse is a full-featured macroeconomic intelligence and equity analytics terminal tracking sovereign monetary policies, inflation rates, sovereign yield curves, Bursa Malaysia equities, and quantitative AI model forecasting.

---

## ⚡ Features

- **Macro & Equities Overview**:
  - Real-time tracking of Bank Negara Malaysia (BNM) Overnight Policy Rate (OPR), Headline CPI Inflation, GDP Growth, and the FTSE Bursa Malaysia KLCI (FBM KLCI).
  - Benchmark vs Macro indicator correlation charts.
  - Sector performance breakdown (Banking, AI & Semiconductors, Utilities, Consumer, Industrial).

- **Global FX & Sovereign Yields**:
  - Interactive Sovereign Yield Curve modeling (MGS vs US Treasuries).
  - Central bank foreign reserves & currency exchange tracking.
  - Interactive geopolitical and macroeconomic risk map.

- **Quantitative AI & Model Telemetry**:
  - Deep learning model forecasting (Inflation, GDP, and Equity index targets).
  - One-click model retraining & backtest simulation.
  - Clean, formatted execution run log exports (JSON / CSV / LOG).

- **Dedicated Authentication & Session Security**:
  - Edge-to-edge, full-page Login & Registration interface.
  - Password Reset / Forgot Password recovery flow with 6-digit verification code.
  - 1-Click pre-filled demo analyst access and Google SSO integration.
  - Session termination confirmation popup with safety checks.
  - User profile management & institutional security settings with live password strength evaluation.

---

## 🛠️ Tech Stack

- **Frontend**: HTML5, Vanilla JavaScript (ES6+), CSS3 (Modern Glassmorphism & Cyberpunk-Dark theme)
- **Visualizations**: [Chart.js](https://www.chartjs.org/) & [Lucide Icons](https://lucide.dev/)
- **Backend API**: Python 3 (`http.server` standard library with REST JSON endpoints, `yfinance`, `curl_cffi`)
- **Database**: MySQL 8.0+ (`mysql-connector-python` connection pooling, schema migrations & seed data)

---

## 🗄️ MySQL Database Architecture & Setup

MacroPulse is backed by a relational **MySQL 8.0+** database (`macropulse_db`) comprising 12 normalized tables:

| Category | Tables | Description |
| :--- | :--- | :--- |
| **Authentication & Users** | `users`, `user_sessions`, `password_resets`, `login_attempts` | Full account credentials, session telemetry, and password resets |
| **User Preferences** | `user_workspace_settings`, `user_notification_rules` | Default views, benchmark index, polling interval, audio toggles |
| **Equities & Watchlists** | `stocks`, `user_watchlists` | 30+ Bursa Malaysia & US equities catalog and user price targets |
| **Macroeconomics** | `macro_indicators`, `macro_observations` | BNM OPR, CPI, GDP, and St. Louis Fed FRED time-series observations |
| **Quantitative AI** | `model_metadata`, `model_run_logs` | Deep learning models (LSTM, Transformer) and execution run telemetry |

### 🚀 Initializing the Database

1. **Option A: Automated Python Migration Runner**
   ```bash
   py database/setup_db.py --user root --password YOUR_MYSQL_PASSWORD
   ```
   *(Or configure your credentials in `database/db_config.json` and run `py database/setup_db.py`)*

2. **Option B: MySQL Workbench / Command Line Import**
   Open MySQL Workbench or the MySQL CLI and execute:
   ```bash
   mysql -u root -p < database/schema.sql
   ```

---

## 🚀 Quick Start

### 1. Prerequisites
- Python 3.8+ installed
- Web browser (Chrome, Edge, Firefox, Brave)
- (Optional) MySQL 8.0+ Server

### 2. Launch the Application
Simply double-click `start_dashboard.bat`, or run the Python API server from the terminal:

```bash
py api_server.py
```

### 3. Open in Browser
Visit the terminal in your browser at:
```
http://localhost:3000
```

---

## 📂 Project Structure

```
dashboard-ui/
├── assets/                  # 3D assets and visualizations
├── css/
│   └── styles.css          # Main terminal styling & animations
├── database/
│   ├── schema.sql          # Complete DDL tables, constraints, and seed data
│   ├── db_config.json      # MySQL host, port, user, and password configuration
│   ├── setup_db.py         # Automated database creation & migration runner
│   └── db.py               # Connection pooling & Python query helper module
├── js/
│   └── app.js              # Application logic, charts, and routing
├── index.html              # Core terminal markup & full-page auth
├── api_server.py           # REST API server for quotes, macro, DB status & models
├── start_dashboard.bat     # Windows 1-click startup script
├── .gitignore              # Git ignore rules
└── README.md               # Project documentation
```

---

## 📄 License
MIT License. Developed for quantitative financial analysis and macroeconomic research.
