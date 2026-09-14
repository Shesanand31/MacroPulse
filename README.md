# MacroPulse Institutional Terminal ??????

MacroPulse is a full-featured macroeconomic intelligence and equity analytics terminal tracking sovereign monetary policies, inflation rates, sovereign yield curves, Bursa Malaysia equities, and quantitative AI model forecasting.

---

## ?? Features

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
  - Clean, formatted execution run log exports (JSON / TXT).

- **Dedicated Authentication & Session Security**:
  - Edge-to-edge, full-page Login & Registration interface.
  - 1-Click pre-filled demo analyst access and Google SSO integration.
  - Session termination confirmation popup with safety checks.
  - User profile management & institutional security settings.

---

## ??? Tech Stack

- **Frontend**: HTML5, Vanilla JavaScript (ES6+), CSS3 (Modern Glassmorphism & Cyberpunk-Dark theme)
- **Visualizations**: [Chart.js](https://www.chartjs.org/) & [Lucide Icons](https://lucide.dev/)
- **Backend API**: Python 3 (Standard library HTTP server with REST JSON endpoints)

---

## ?? Quick Start

### 1. Prerequisites
- Python 3.8+ installed
- Web browser (Chrome, Edge, Firefox, Brave)

### 2. Launch the Application
Simply double-click start_dashboard.bat, or run the Python API server from the terminal:

`ash
python api_server.py
`

### 3. Open in Browser
Visit the terminal in your browser at:
`
http://localhost:3000
`

---

## ?? Project Structure

`
dashboard-ui/
+-- assets/                  # 3D assets and visualizations
+-- css/
¦   +-- styles.css          # Main terminal styling & animations
+-- js/
¦   +-- app.js              # Application logic, charts, and routing
+-- index.html              # Core terminal markup & full-page auth
+-- api_server.py           # REST API server for quotes, macro & models
+-- start_dashboard.bat     # Windows 1-click startup script
+-- .gitignore              # Git ignore rules
+-- README.md               # Project documentation
`

---

## ?? License
MIT License. Developed for quantitative financial analysis and macroeconomic research.
