# 🔄 MacroPulse Institutional Terminal — Clean System Flowchart

A structured, clean, textbook-grade **System Flowchart** for the **MacroPulse Institutional Terminal**, organized into 4 distinct modular architectural layers to eliminate line crossing and clutter.

---

## 📌 1. Clean Structured Flowchart (Mermaid.js)

```mermaid
%%{init: {'theme': 'dark'}}%%
flowchart TD
    %% -----------------------------------------------------------------
    %% LAYER 1: AUTHENTICATION & ACCESS CONTROL
    %% -----------------------------------------------------------------
    subgraph L1 ["1. Authentication & Identity Layer"]
        Start([🚀 Start: User Access]) --> CheckAuth{"Valid Session<br/>Token?"}
        
        CheckAuth -- No --> AuthPortal["🔐 Login / OAuth 2.0 / OTP Reset"]
        AuthPortal --> VerifyCreds{"Valid<br/>Credentials?"}
        VerifyCreds -- No --> LogFail["Log to LOGIN_ATTEMPTS"] --> AuthPortal
        VerifyCreds -- Yes --> CreateSession["Issue Session (USER_SESSIONS)"]
        
        CheckAuth -- Yes --> LoadSettings["Load USER_WORKSPACE_SETTINGS"]
        CreateSession --> LoadSettings
    end

    %% -----------------------------------------------------------------
    %% LAYER 2: WORKSPACE & NAVIGATION DISPATCHER
    %% -----------------------------------------------------------------
    subgraph L2 ["2. Workspace & Routing Layer"]
        LoadSettings --> InitWorkspace["🖥️ Initialize Workspace (Theme, Currency, Polling)"]
        InitWorkspace --> Dispatcher{"Select Dashboard"}
        
        Dispatcher --> V1["📊 1. Macro & Equities"]
        Dispatcher --> V2["🏛️ 2. Central Bank Policy"]
        Dispatcher --> V3["📈 3. Stock Candlesticks"]
        Dispatcher --> V4["🌐 4. Global FX & Yields"]
        Dispatcher --> V5["🧠 5. AI Model Console"]
        Dispatcher --> V6["⚙️ 6. Profile & Settings"]
    end

    %% -----------------------------------------------------------------
    %% LAYER 3: DATA PROCESSING & QUANTITATIVE AI
    %% -----------------------------------------------------------------
    subgraph L3 ["3. Analytics & Processing Engine"]
        V1 --> IngestMarket["Ingest Live Market Pulse & Sector Data"]
        V2 --> IngestFRED["Query St. Louis Fed FRED REST API"]
        V3 --> IngestQuotes["Ingest yfinance Quotes & Order Book"]
        V4 --> IngestYields["Ingest Sovereign Curves (MGS/UST/Bund)"]
        
        IngestMarket & IngestFRED & IngestQuotes & IngestYields --> CanvasEngine["HTML5 Canvas 2D Vector Rendering<br/>(Candlesticks, EMAs, Corridors, Gauges)"]
        
        V5 --> AIModel["Execute Model (BiLSTM, XGBoost, Prophet...)"]
        AIModel --> CalcMetrics["Calculate Evaluation Metrics (RMSE, MAE, MAPE)"]
        
        V6 --> SaveConfig["Update User Preferences & Password"]
    end

    %% -----------------------------------------------------------------
    %% LAYER 4: NOTIFICATIONS & PERSISTENCE
    %% -----------------------------------------------------------------
    subgraph L4 ["4. Alerts, Persistence & Lifecycle"]
        CanvasEngine --> CheckAlert{"Threshold<br/>Exceeded?"}
        CheckAlert -- Yes --> AudioAlert["🔔 Web Audio API Chime & Toast"]
        CheckAlert -- No --> DisplayUI["Display Visual Analytics Output"]
        AudioAlert --> DisplayUI
        
        CalcMetrics --> SaveModelRun[(Save to MODEL_RUN_LOGS)]
        SaveConfig --> SaveSettingsDB[(Save to USER_WORKSPACE_SETTINGS)]
        
        DisplayUI --> UserAction{"Analyst Action"}
        UserAction -- "Switch View" --> Dispatcher
        UserAction -- "Logout" --> Exit([🔒 Invalidate Session & Exit])
    end
```

---

## 📌 2. Simplified High-Level Executive Flowchart (For FYP Overview Slides)

If you need a very high-level, compact version for presentation slides or thesis executive summaries:

```mermaid
%%{init: {'theme': 'dark'}}%%
flowchart TD
    A([User Access]) --> B{Authenticated?}
    B -- No --> C[Login / 2FA / Google OAuth]
    C --> D[Generate Session Token]
    B -- Yes --> E[Load Workspace Preferences]
    D --> E
    
    E --> F{Select Dashboard View}
    
    F --> G[Macro & Equities Surveillance]
    F --> H[Stock Analysis & Canvas Candlesticks]
    F --> I[Quantitative AI Model Benchmarking]
    F --> J[Workspace Settings & Security]
    
    G & H --> K[Real-Time Ingestion: yfinance & FRED]
    K --> L[Render High-DPI Charts & Sparklines]
    
    I --> M[Inference: BiLSTM / XGBoost / Prophet]
    M --> N[(Log Telemetry to MySQL DB)]
    
    J --> O[(Save Settings & Profile)]
    
    L & N & O --> P{Action?}
    P -- Navigate --> F
    P -- Logout --> Q([End Session])
```
