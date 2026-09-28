# 🔄 MacroPulse Institutional Terminal — System Flowchart

This document details the complete end-to-end **System Flowchart** for the **MacroPulse Institutional Terminal**, detailing the user journey from authentication and security token verification to multi-dashboard routing, real-time data ingestion, quantitative AI model benchmarking, and background event-driven telemetry.

---

## 📌 1. Complete System Flowchart (Mermaid.js)

```mermaid
%%{init: {'theme': 'dark'}}%%
flowchart TD
    Start([🚀 User Accesses MacroPulse Terminal]) --> CheckAuth{"Active Session Token?<br/>(Local Storage)"}

    %% -------------------------------------------------------------
    %% AUTHENTICATION & IDENTITY GOVERNANCE
    %% -------------------------------------------------------------
    CheckAuth -- "No / Expired" --> LoginModal["🔐 Display Authentication Portal<br/>(Email/Password, Google OAuth 2.0 GIS, OTP Reset)"]
    LoginModal --> SubmitAuth["Submit Credentials to /api/auth/*"]
    SubmitAuth --> ValidateAuth{"Valid Credentials?"}
    
    ValidateAuth -- "No" --> LogFail["Log Failed Attempt in LOGIN_ATTEMPTS"]
    LogFail --> ShowAuthErr["Display Authentication Error Banner"]
    ShowAuthErr --> LoginModal
    
    ValidateAuth -- "Yes" --> GenSession["Generate Cryptographic Session Token<br/>(mp_live_... in USER_SESSIONS)"]
    GenSession --> LoadProfile["Load User Profile & Regional Settings<br/>(USER_WORKSPACE_SETTINGS)"]

    CheckAuth -- "Yes" --> ValidateToken{"Validate Token with Server?"}
    ValidateToken -- "Valid" --> LoadProfile
    ValidateToken -- "Invalid" --> LoginModal

    %% -------------------------------------------------------------
    %% TERMINAL WORKSPACE INITIALIZATION
    %% -------------------------------------------------------------
    LoadProfile --> InitTerminal["🖥️ Initialize Institutional Workspace<br/>• Apply Theme & Regional Base Currency (MYR/USD/EUR/SGD)<br/>• Configure Polling Frequency (15s Default)<br/>• Initialize Web Audio API Synth Engine"]
    
    InitTerminal --> RouteNav{"Select Navigation View<br/>(Sidebar Tabs)"}

    %% -------------------------------------------------------------
    %% 6 MODULAR DASHBOARDS
    %% -------------------------------------------------------------
    RouteNav -->|#view-overview| ViewOverview["📊 1. Macro & Equities Overview<br/>• Ingest /api/market-pulse<br/>• Render Canvas Micro-Sparklines<br/>• Policy Rate vs. KLCI Wave Chart<br/>• Sector Rotation Breakdown"]
    
    RouteNav -->|#view-logs| ViewPolicy["🏛️ 2. Central Bank Policy & Rates<br/>• Query St. Louis Fed FRED Series<br/>• Render Policy Corridor Gauge<br/>• Streaming Real-Time Newswire Ticker"]
    
    RouteNav -->|#view-trading| ViewTrading["📈 3. Stock Analysis & Trading Terminal<br/>• Fetch yfinance Quotes (/api/stock-history)<br/>• Render HiDPI HTML5 Canvas Candlestick Chart<br/>• Compute Dynamic EMA-20 & EMA-50 Overlays<br/>• Dynamic FX Base Currency Conversion<br/>• Synthetic Order Book Depth Ladder"]
    
    RouteNav -->|#view-analytics| ViewAnalytics["🌐 4. Global FX & Sovereign Yields<br/>• Ingest MGS, UST, Bund & JGB Curves<br/>• Compute 10Y-2Y Inversion Spreads<br/>• Foreign Capital Inflows Telemetry"]
    
    RouteNav -->|#view-models| ViewModels["🧠 5. AI Model Performance Console<br/>• Benchmark 5 Architectures (BiLSTM, XGBoost...)<br/>• Compute Error Metrics (RMSE, MAE, MAPE)<br/>• Render 95% Gaussian Confidence Envelope<br/>• Audit Run Logs & RFC 4180 CSV Export"]
    
    RouteNav -->|#view-settings| ViewSettings["⚙️ 6. Workspace Settings & Governance<br/>• Profile & Bio Synchronization<br/>• Password Complexity Validation Meter<br/>• User Notification Alert Rules"]

    %% -------------------------------------------------------------
    %% BACKGROUND TELEMETRY & EVENT DISPATCHER
    %% -------------------------------------------------------------
    ViewOverview --> PollingLoop["⏱️ Background Polling Worker<br/>(Every 15 Seconds)"]
    ViewTrading --> PollingLoop
    ViewPolicy --> PollingLoop

    PollingLoop --> FetchAPI["Fetch Live Market Data & Ingest Macro Signals"]
    FetchAPI --> CheckAlerts{"Threshold Triggered?<br/>(OPR Change / Watchlist Alert)"}
    
    CheckAlerts -- "Yes" --> WebAudio["🔔 Synthesize Audio Chime Alert<br/>(Web Audio Oscillator + Toast Notification)"]
    CheckAlerts -- "No" --> RefreshUI["Update Active DOM Elements & Canvas Pixels"]
    WebAudio --> RefreshUI

    %% -------------------------------------------------------------
    %% USER INTERACTIONS & DATABASE PERSISTENCE
    %% -------------------------------------------------------------
    RefreshUI --> UserAction{"Analyst Action"}
    
    UserAction -->|Switch Tab| RouteNav
    UserAction -->|Manage Watchlist| DBWatchlist["Persist in USER_WATCHLISTS (MySQL)"] --> RefreshUI
    UserAction -->|Execute AI Model| ExecuteModel["Run Model Inference / Backtest Pipeline"] --> LogModel["Persist Metrics in MODEL_RUN_LOGS"] --> RefreshUI
    UserAction -->|Update Settings| SaveSettings["Save Preferences to USER_WORKSPACE_SETTINGS"] --> RefreshUI
    UserAction -->|Download Report| ExportReport["Generate Printable PDF / Market Report"] --> RefreshUI
    UserAction -->|Logout| TerminateSession["Invalidate Token in USER_SESSIONS<br/>& Clear Local Storage"] --> LoginModal
```

---

## 🔍 2. Detailed Breakdown by Architectural Phase

### Phase 1: Identity Verification & Session Initialization
1. **Entry Point**: The analyst connects to the client application (`index.html`).
2. **Token Verification**: The browser inspects `localStorage` for a cryptographic session token (`mp_live_...`).
3. **Authentication Modal**: If no active session exists, the portal offers:
   - **Password-based login** (hashed with PBKDF2/SHA-256 against `users`).
   - **Google OAuth 2.0 (GIS)** identity verification.
   - **SMTP 2-Step OTP Password Reset** (transmitting a 15-minute 6-digit recovery code).
4. **Audit Enforcement**: Successful logins issue an entry in `user_sessions`. Failed attempts trigger an increment in `login_attempts` to defend against brute-force attacks.

### Phase 2: Workspace Customization & Routing
1. **Preference Hydration**: The terminal loads settings from `user_workspace_settings`:
   - Selected Base Currency (`MYR`, `USD`, `EUR`, `SGD`).
   - Polling Frequency (defaults to 15s).
   - Audio Chimes (Web Audio API synth).
2. **Dashboard Dispatcher**: The analyst is routed to their preferred landing view or selects any of the 6 specialized dashboards via sidebar navigation.

### Phase 3: Real-Time Data Ingestion & Analytics
- **Bursa Malaysia & US Equities Engine**: Fetches live tick and OHLCV bars using the Python `yfinance` microservice wrapper.
- **FRED Intelligence Engine**: Directly queries St. Louis Fed endpoints (`FEDFUNDS`, `CPIAUCSL`, `GDPC1`, `UNRATE`) with TTL caching.
- **Canvas Rendering Engine**: Executes double-buffered pixel rendering loops for candlestick wicks, bodies, moving averages, and crosshairs at 60 FPS without DOM overhead.

### Phase 4: Quantitative AI Forecasting & Benchmarking
- Users select an asset and AI architecture (Stacked BiLSTM, XGBoost, Prophet, SARIMAX, PatchTST).
- The system evaluates forecast horizons (5D, 15D, 30D), computes statistical loss metrics ($RMSE$, $MAE$, $MAPE$, directional accuracy), and stores the telemetry trace in `model_run_logs`.
