# 📈 MacroPulse Terminal
### Institutional Macroeconomic & Equity Analytics Platform — Real-Time Financial Intelligence

The **MacroPulse Terminal** powers the real-time financial intelligence and quantitative research engine behind the MacroPulse platform. It integrates sovereign monetary policy surveillance, dual-exchange equity analysis (Bursa Malaysia & US markets), high-performance HTML5 Canvas candlestick charting, and quantitative AI price forecasting into a unified institutional workspace.

---

## 📌 Table of Contents
- [🔍 Overview](#-overview)
- [✨ Key Features](#-key-features)
- [🛠 Tech Stack](#-tech-stack)
- [🏗 System Architecture](#-system-architecture)
- [📁 Project Structure](#-project-structure)
- [🚀 Quick Start](#-quick-start)
- [📊 RESTful API Specification](#-restful-api-specification)
- [📜 Copyright & License](#-copyright--license)

---

## 🔍 Overview
The **MacroPulse Terminal** is a high-performance financial intelligence application designed for portfolio managers, macroeconomists, and quantitative analysts. The platform orchestrates:

- **Real-Time Macroeconomic Surveillance**: Tracking Bank Negara Malaysia (BNM) Overnight Policy Rate (OPR), headline CPI inflation, GDP growth rate, and St. Louis Fed FRED indicators.
- **Dual-Exchange Technical Trading**: Low-latency quote ingestion and technical analysis across Bursa Malaysia (`.KL`) blue-chips and US equities (`NVDA`, `AAPL`, `MSFT`, `TSLA`).
- **High-DPI HTML5 Canvas Charting Engine**: Native 2D vector pixel-rendering engine supporting candlestick bodies, wicks, volume histograms, dual moving averages ($\text{EMA}_{20}$ & $\text{EMA}_{50}$), and crosshair HUDs.
- **Multi-Currency Reporting**: Real-time base currency conversion (MYR, USD, EUR, SGD) dynamically calculating purchasing power equivalents across international assets.
- **Quantitative Machine Learning Telemetry**: Empirical benchmarking across 5 model architectures (Bidirectional LSTM, XGBoost, Meta Prophet, SARIMAX, and PatchTST Transformer) with confidence interval bands and historical evaluation run logs.
- **Session & Identity Governance**: Secure authentication, parameterized SQL persistence, Google OAuth 2.0 (GIS) integration, and SMTP 2-step OTP password recovery.

---

## ✨ Key Features

### 📊 1. Macro & Equities Overview Dashboard (`#view-overview`)
- Executive metric scorecards with dynamic linear-gradient Canvas micro-sparklines.
- Dual-series macro trend wave chart visualizing policy correlation against benchmark equity indices (FBM KLCI).
- Real-time sector rotation breakdown across Banking, Technology, Utilities, and Consumer Staples.

### 🏛️ 2. Central Bank Policy & Rates Dashboard (`#view-logs`)
- Dynamic **St. Louis Fed (FRED)** intelligence explorer querying series (`FEDFUNDS`, `CPIAUCSL`, `GDPC1`, `UNRATE`, `DGS10`, `T10Y2Y`) with in-memory TTL caching.
- Semicircular SVG policy corridor gauge mapping the central bank target rate against inflation.
- **Institutional Newswire Feed**: Event-driven streaming ticker with audio chimes and non-blocking category filters.

### 📈 3. Stock Analysis & Trading Terminal (`#view-trading`)
- **Native HTML5 Canvas Candlestick Engine**: Retina/HiDPI auto-scaling renderer for OHLCV bars, moving averages, and volume histograms.
- Dynamic Foreign Exchange (FX) base currency badge (e.g. `≈ €2.18 EUR` / `≈ RM 10.46 MYR`) recalculating asset prices in real time.
- Live dual-sided synthetic order book depth ladder with bid/ask spreads.
- **AI Projected Outlook & Upcoming Stats**: Forward 5D, 15D, and 30D price targets, expected support/resistance levels, suggested stop-loss, and user sentiment voting.

### 🌐 4. Global FX & Sovereign Bond Yields (`#view-analytics`)
- Interactive **Sovereign Yield Curve (Term Structure)** engine comparing maturities ($1\text{M}$ to $30\text{Y}$) across Malaysia (MGS), United States (UST), Germany (Bund), and Japan (JGB).
- Inversion detection calculating term structure spreads ($10\text{Y} - 2\text{Y}$) and duration risk.
- Cross-border capital flows telemetry and global foreign reserves treemap (IMF COFER).

### 🧠 5. AI Model Performance & Evaluation Console (`#view-models`)
- Statistical validation metrics ($RMSE$, $MAE$, $MAPE$, $R^2$, and Directional Hit Rate) calculated out-of-sample.
- Visual forecast projection with 95% Gaussian Confidence Interval envelopes ($\hat{y} \pm 1.96 \cdot \text{RMSE}$).
- Residual error distribution histogram and training loss curves across 20 epochs.
- Cross-model comparative leaderboard ranking models to assign the **Production Champion**.
- **Audit Run Logs**: Filterable execution traces with one-click RFC 4180 CSV export facility.

### ⚙️ 6. Workspace Customization & Profile Governance (`#view-settings`)
- Analyst profile management with image upload, department designation, and bio synchronization.
- Regional defaults configuration (Base Currency, Polling Frequency, Audio Chimes).
- Multi-tier security governance with live password complexity validation meter.

---

## 🛠 Tech Stack

### Frontend Architecture
- **Language**: Vanilla JavaScript (ES6+ Object-Oriented Architecture), HTML5, CSS3
- **Graphics Engine**: Native HTML5 Canvas 2D Vector Pixel Engine (Custom Candlestick & Sparkline Draw Loops)
- **Visualizations**: [Chart.js](https://www.chartjs.org/) & [Lucide Icons](https://lucide.dev/)
- **Audio Synthesizer**: Web Audio API (`AudioContext`, Oscillator & Envelope Gain Nodes)
- **Styling**: Glassmorphism with Cyberpunk-Dark theme, CSS Variables, and Print Media Queries

### Backend & API Framework
- **Runtime**: Python 3.8+
- **Server Framework**: Lightweight REST API engine (`http.server` with multithreading)
- **Data Ingestion**: `yfinance` (Bursa Malaysia `.KL` & US Equities), Federal Reserve Economic Data (St. Louis Fed FRED REST API)
- **Email Service**: Python `smtplib` with TLS/SSL for 2-step OTP password verification

### Database & Relational Persistence
- **RDBMS**: MySQL 8.0+ / SQLite fallback support
- **Client Driver**: `mysql-connector-python` with connection pooling
- **Security**: Parameterized queries (SQLi protection), PBKDF2/SHA-256 password hashing, cryptographic session tokens (`mp_live_...`)

---

## 🏗 System Architecture

The MacroPulse system architecture operates as 4 interconnected, decoupled layers:

```
┌────────────────────────────────────────────────────────────────────────┐
│                   1️⃣ FRONTEND APPLICATION LAYER (SPA)                   │
│  ┌───────────────────────┐  ┌──────────────────────┐  ┌─────────────┐  │
│  │ HTML5 Canvas Charts   │  │ Web Audio API Chime  │  │ DOM View    │  │
│  │ (Candlesticks & HUD)  │  │ (Synthesizer Engine) │  │ Controllers │  │
│  └───────────────────────┘  └──────────────────────┘  └─────────────┘  │
└───────────────────────────────────┬────────────────────────────────────┘
                                    │ HTTP / REST JSON Endpoints
┌───────────────────────────────────▼────────────────────────────────────┐
│                  2️⃣ BACKEND ORCHESTRATION LAYER (Python)                │
│  ┌───────────────────────┐  ┌──────────────────────┐  ┌─────────────┐  │
│  │ Data Ingestion Engine │  │ Quantitative AI      │  │ CSV Export  │  │
│  │ (Dual-Ticker Resolver)│  │ Evaluation Pipeline  │  │ Serializer  │  │
│  └───────────────────────┘  └──────────────────────┘  └─────────────┘  │
└──────────────────┬────────────────────────────────┬────────────────────┘
                   │                                │
┌──────────────────▼───────────┐      ┌─────────────▼────────────────────┐
│ 3️⃣ DATABASE LAYER (MySQL/DB) │      │ 4️⃣ EXTERNAL PROVIDERS & APIS     │
│ - User Credentials & Tokens  │      │ - Yahoo Finance API (Equities)   │
│ - Workspace Customizations   │      │ - St. Louis Fed FRED Database    │
│ - Model Execution Run Logs   │      │ - Google Identity Services (GIS) │
│ - Connection Pooling         │      │ - SMTP Relay Dispatcher          │
└──────────────────────────────┘      └──────────────────────────────────┘
```

1. **Frontend Layer (Single-Page Application)**:
   - Houses the client-side state singleton (`state.baseCurrency`, `currentUser`), Canvas drawing routines, and responsive views.
   - Manages asynchronous dispatching without triggering full-page browser reloads.

2. **Backend Orchestration Layer (Python REST Server)**:
   - Serves normalized JSON payloads for equities, macroeconomic indicators, and quantitative model benchmarks.
   - Computes statistical performance metrics ($RMSE$, $MAE$, $MAPE$) and coordinates multi-threaded SMTP email deliveries.

3. **Database & Relational Persistence Layer (MySQL / SQLite)**:
   - Stores user identities, salted hashes, workspace defaults, watchlists, and model audit records across 12 relational tables.

4. **External Financial & Data Services**:
   - Ingests market data from Yahoo Finance and official macroeconomic time-series from the Federal Reserve Bank of St. Louis.

---

## 📁 Project Structure

```text
MacroPulse/
├── assets/                          # Static branding, avatars, and visual assets
├── css/
│   └── styles.css                   # Master stylesheet (Glassmorphic dark design, responsive grids)
├── database/
│   ├── db.py                        # Database access layer (Parameterized queries & pooling)
│   ├── db_config.example.json       # Template MySQL connection configuration
│   ├── schema.sql                   # Relational DDL definitions & initial seed data
│   └── setup_db.py                  # Automated database migration and initialization script
├── js/
│   └── app.js                       # Client-side SPA controller & Canvas charting engine
├── .gitignore                       # Git exclusion rules (Shields local secrets & caches)
├── api_server.py                    # Multi-threaded Python REST API server
├── email_config.example.json        # Template SMTP credentials configuration
├── email_service.py                 # Multi-threaded email dispatcher for security codes
├── google_auth_config.json          # Google Identity Services (GIS) client configuration
├── index.html                       # Single Page Application core HTML5 entrypoint
├── README.md                        # Master project documentation
└── test_email.py                    # SMTP testing utility
```

---

## 🚀 Quick Start

### 1. Prerequisites
- **Python 3.8+** installed (`python --version`)
- Modern web browser (Google Chrome, Microsoft Edge, Mozilla Firefox)
- *(Optional)* **MySQL 8.0+** Server for persistent database storage

### 2. Installation & Setup
Clone the repository:
```bash
git clone https://github.com/Shesanand31/MacroPulse.git
cd MacroPulse
```

Install Python dependencies:
```bash
pip install yfinance mysql-connector-python
```

*(Optional)* Configure local secrets:
- Copy `database/db_config.example.json` to `database/db_config.json` and insert your MySQL credentials.
- Copy `email_config.example.json` to `email_config.json` if configuring real SMTP notifications.

### 3. Launch the Server
Start the Python REST API server:
```bash
python api_server.py
```

### 4. Access the Terminal
Open your web browser and navigate to:
```
http://localhost:3000
```

---

## 📊 RESTful API Specification

| HTTP Method | Endpoint | Consuming View | Description |
|:---|:---|:---|:---|
| `GET` | `/api/macro/overview` | Overview Dashboard | Ingests benchmark Malaysian macro indicators (OPR, CPI, GDP, KLCI). |
| `GET` | `/api/macro/series?id={id}` | Policy & Rates | Historical time-series observations from St. Louis Fed FRED database. |
| `GET` | `/api/stock/quote?symbol={s}` | Trading Terminal | Real-time OHLCV candles, pricing, and volume via Yahoo Finance. |
| `GET` | `/api/sovereign-yields` | Global FX & Yields | Multi-nation sovereign term structure curves ($1\text{M}$ to $30\text{Y}$). |
| `GET` | `/api/models/performance` | Model Performance | Out-of-sample evaluation telemetry ($RMSE$, $MAE$, $MAPE$, $R^2$). |
| `GET` | `/api/models/export?format=csv`| Model Performance | Streams RFC 4180-compliant CSV download of historical training logs. |
| `POST` | `/api/auth/login` | Authentication Modal | Validates credentials and returns authorized session object. |
| `POST` | `/api/auth/register` | Authentication Modal | Registers user with unique API key and default preferences. |
| `GET` | `/api/auth/forgot?email={e}`| Authentication Modal | Dispatches 6-digit one-time password (OTP) verification code. |
| `POST` | `/api/user/workspace` | Workspace Settings | Persists user reporting base currency, polling rate, and chime toggles. |

---

## 📜 Copyright & License

**Copyright © 2026 Shesanand31 / MacroPulse**  
All rights reserved.

This project was engineered as a comprehensive Final Year Project (FYP) and institutional financial analytics system. Unauthorized copying, distribution, or commercial exploitation without prior written consent from the author is strictly prohibited.
