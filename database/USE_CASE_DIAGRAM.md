# 👥 MacroPulse Institutional Terminal — UML Use Case Diagram & Specification

This document presents the complete **UML Use Case Model** for the **MacroPulse Institutional Terminal**, illustrating interactions between human actors, the system boundary, primary use cases, `<<include>>` / `<<extend>>` relationships, and external supporting systems (APIs and databases).

---

## 📌 1. UML Use Case Diagram (Mermaid.js)

```mermaid
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'primaryColor': '#eff6ff',
    'primaryTextColor': '#0f172a',
    'primaryBorderColor': '#3b82f6',
    'lineColor': '#64748b',
    'secondaryColor': '#fef3c7',
    'tertiaryColor': '#ffffff'
  }
}}%%
flowchart LR
    %% Custom Styling
    classDef actorStyle fill:#e0e7ff,stroke:#4f46e5,stroke-width:2px,color:#1e1b4b,font-weight:bold;
    classDef extActorStyle fill:#f1f5f9,stroke:#64748b,stroke-width:1.8px,color:#0f172a,stroke-dasharray: 3 3;
    classDef ucMain fill:#eff6ff,stroke:#2563eb,stroke-width:1.8px,color:#1e3a8a,font-weight:600;
    classDef ucSub fill:#ffffff,stroke:#93c5fd,stroke-width:1.4px,color:#1e40af;

    %% -------------------------------------------------------------
    %% PRIMARY HUMAN ACTORS (Left)
    %% -------------------------------------------------------------
    Guest["👤 Guest User / Visitor"]:::actorStyle
    Analyst["👨‍💼 Senior Macro Strategist / Equity Analyst"]:::actorStyle

    %% -------------------------------------------------------------
    %% SYSTEM BOUNDARY
    %% -------------------------------------------------------------
    subgraph SystemBoundary ["System Boundary: MacroPulse Institutional Terminal"]
        %% Core Use Cases
        UC1(["UC-01: Authenticate & Manage Session"]):::ucMain
        UC2(["UC-02: Manage Portfolio Watchlist"]):::ucMain
        UC3(["UC-03: Technical & Candlestick Analysis"]):::ucMain
        UC4(["UC-04: Execute Quantitative AI Forecasting"]):::ucMain
        UC5(["UC-05: Monitor Sovereign Macro & Policy"]):::ucMain
        UC6(["UC-06: Analyze Sovereign Yield Curves"]):::ucMain
        UC7(["UC-07: Configure Workspace & Profile"]):::ucMain
        UC8(["UC-08: Export Institutional Market Report"]):::ucMain

        %% Sub-Use Cases (Includes & Extends)
        UC1_Validate(["Validate Credentials"]):::ucSub
        UC1_OAuth(["Sign In via Google OAuth 2.0"]):::ucSub
        UC1_OTP(["Recover Password via OTP"]):::ucSub

        UC2_Add(["Add Stock & Set Price Targets"]):::ucSub
        UC2_Remove(["Remove Stock from Watchlist"]):::ucSub

        UC3_Canvas(["Render HiDPI Candlestick & EMAs"]):::ucSub
        UC3_FX(["Convert Multi-Currency Base"]):::ucSub
        UC3_Depth(["Inspect Synthetic Order Book"]):::ucSub
        UC3_Sentiment(["Submit Market Sentiment Vote"]):::ucSub

        UC4_Select(["Benchmark 5 ML Architectures"]):::ucSub
        UC4_Metrics(["Compute RMSE, MAE, MAPE & Hit Rate"]):::ucSub
        UC4_Export(["Export Evaluation Run Logs (CSV)"]):::ucSub

        UC5_FRED(["Query FRED & BNM Macro Series"]):::ucSub
        UC5_Corridor(["Display Semicircular Corridor Gauge"]):::ucSub
        UC5_News(["Stream Institutional Newswire"]):::ucSub

        UC6_Spread(["Compute 10Y-2Y Inversion Spread"]):::ucSub

        UC7_Audio(["Toggle Web Audio Synth Chimes"]):::ucSub
        UC7_Pwd(["Update Password with Complexity Meter"]):::ucSub

        %% Include / Extend Relationships
        UC1 -.->|"<<include>>"| UC1_Validate
        UC1 -.->|"<<extend>>"| UC1_OAuth
        UC1 -.->|"<<extend>>"| UC1_OTP

        UC2 -.->|"<<extend>>"| UC2_Add
        UC2 -.->|"<<extend>>"| UC2_Remove

        UC3 -.->|"<<include>>"| UC3_Canvas
        UC3 -.->|"<<extend>>"| UC3_FX
        UC3 -.->|"<<extend>>"| UC3_Depth
        UC3 -.->|"<<extend>>"| UC3_Sentiment

        UC4 -.->|"<<include>>"| UC4_Select
        UC4 -.->|"<<include>>"| UC4_Metrics
        UC4 -.->|"<<extend>>"| UC4_Export

        UC5 -.->|"<<include>>"| UC5_FRED
        UC5 -.->|"<<include>>"| UC5_Corridor
        UC5 -.->|"<<include>>"| UC5_News

        UC6 -.->|"<<include>>"| UC6_Spread

        UC7 -.->|"<<extend>>"| UC7_Audio
        UC7 -.->|"<<extend>>"| UC7_Pwd
    end

    %% -------------------------------------------------------------
    %% SECONDARY EXTERNAL SYSTEM ACTORS (Right)
    %% -------------------------------------------------------------
    GoogleGIS["🏛️ Google Identity Services<br/>(OAuth 2.0 GIS)"]:::extActorStyle
    SMTPGateway["✉️ SMTP Mail Service<br/>(OTP Password Recovery)"]:::extActorStyle
    YFinanceService["📈 yfinance Engine<br/>(Bursa & US Equities)"]:::extActorStyle
    FREDService["🌐 St. Louis Fed FRED API<br/>(Macroeconomic Series)"]:::extActorStyle
    MySQLBackend[("🗄️ MySQL Database<br/>(macropulse_db)")]:::extActorStyle

    %% -------------------------------------------------------------
    %% ACTOR ASSOCIATIONS
    %% -------------------------------------------------------------
    Guest --- UC1

    Analyst --- UC1
    Analyst --- UC2
    Analyst --- UC3
    Analyst --- UC4
    Analyst --- UC5
    Analyst --- UC6
    Analyst --- UC7
    Analyst --- UC8

    %% External System Links
    UC1_OAuth --- GoogleGIS
    UC1_OTP --- SMTPGateway
    UC1_Validate --- MySQLBackend
    UC2 --- MySQLBackend
    UC3_Canvas --- YFinanceService
    UC4_Metrics --- MySQLBackend
    UC5_FRED --- FREDService
    UC6 --- YFinanceService
    UC7 --- MySQLBackend
```

---

## 📋 2. Comprehensive Use Case Specification Table (For FYP Chapter 3)

| UC ID | Use Case Name | Primary Actor | Supporting Systems | Description | Relationship |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **UC-01** | **Authenticate & Manage Session** | Guest / Analyst | MySQL, Google OAuth, SMTP | Enables user registration, email/password login, Google OAuth 2.0 sign-in, and 6-digit OTP password recovery. | `<<include>>` Validate Credentials<br>`<<extend>>` Google OAuth<br>`<<extend>>` OTP Reset |
| **UC-02** | **Manage Portfolio Watchlist** | Analyst | MySQL Database | Allows analysts to bookmark Bursa Malaysia (`.KL`) and US tickers, set target entry/exit prices, and write investment notes. | `<<extend>>` Add Stock<br>`<<extend>>` Remove Stock |
| **UC-03** | **Technical & Candlestick Analysis** | Analyst | `yfinance` Data Service | Renders HiDPI HTML5 Canvas candlesticks, volume bars, dual EMAs (20/50), currency conversions (MYR/USD/EUR/SGD), order book ladder, and sentiment voting. | `<<include>>` Render Canvas<br>`<<extend>>` FX Conversion<br>`<<extend>>` Order Book<br>`<<extend>>` Sentiment Vote |
| **UC-04** | **Execute Quantitative AI Forecasting** | Analyst | MySQL Database | Benchmarks 5 machine learning models (BiLSTM, XGBoost, Prophet, SARIMAX, PatchTST), projects multi-horizon price targets with 95% confidence intervals, and exports CSV logs. | `<<include>>` Benchmark ML<br>`<<include>>` Compute Metrics<br>`<<extend>>` Export CSV Logs |
| **UC-05** | **Monitor Sovereign Macro & Policy** | Analyst | St. Louis Fed (FRED) API | Ingests BNM OPR, headline inflation, GDP growth, and Federal Reserve series with in-memory TTL caching, policy corridor gauge, and real-time streaming newswire. | `<<include>>` Query FRED<br>`<<include>>` Corridor Gauge<br>`<<include>>` Stream Newswire |
| **UC-06** | **Analyze Sovereign Yield Curves** | Analyst | `yfinance` Data Service | Renders multi-country sovereign bond term structures (MGS, UST, Bund, JGB) from $1\text{M}$ to $30\text{Y}$ and detects $10\text{Y}-2\text{Y}$ yield curve inversion. | `<<include>>` 10Y-2Y Inversion Spread |
| **UC-07** | **Configure Workspace & Profile** | Analyst | MySQL Database | Enables updates to analyst bio, avatar upload, password complexity validation, audio chime toggles, and notification alert thresholds. | `<<extend>>` Web Audio Synth<br>`<<extend>>` Password Meter |
| **UC-08** | **Export Institutional Market Report** | Analyst | Browser Print / PDF | Generates a formatted, printable PDF executive summary of real-time macroeconomic indicators, technical charts, and AI model performance metrics. | Standalone |

---

## 🎭 3. Actor Definitions

| Actor | Category | Description |
| :--- | :--- | :--- |
| **Guest User / Visitor** | Human (Primary) | Unauthenticated user visiting the portal who can sign up, log in, or initiate OTP password resets. |
| **Senior Macro Strategist / Equity Analyst** | Human (Primary) | Fully authenticated institutional user with access to all 6 trading and macroeconomic dashboards, quantitative models, and personal workspace settings. |
| **Google Identity Services (OAuth 2.0 GIS)** | External System (Secondary) | Cloud OAuth 2.0 authentication service used for one-click corporate single sign-on. |
| **SMTP Mail Service** | External System (Secondary) | Automated transactional email service delivering 15-minute expiration OTP codes for password recovery. |
| **yfinance Data Engine** | External System (Secondary) | High-speed financial quotes provider delivering live tick and historical OHLCV data for Bursa Malaysia (`.KL`) and US equity markets. |
| **St. Louis Fed (FRED) API** | External System (Secondary) | Official REST endpoint for sovereign macroeconomic time series (FEDFUNDS, CPI, GDP, Treasury Yields). |
| **MySQL Database (`macropulse_db`)** | Persistence System (Secondary) | Relational database persisting users, sessions, watchlists, workspace preferences, and model telemetry logs. |
