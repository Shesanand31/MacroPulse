# 🔄 MacroPulse Institutional Terminal — Academic System Flowchart

A software engineering system flowchart adhering strictly to standard Mermaid.js syntax without parser errors, formatted with the exact visual language of your reference diagram:
* **Vertical Alignment**: **`Start`** at the top of the main vertical spine and **`End`** directly at the bottom of the exact same spine.
* **Terminators (`Start` / `End`)**: Rounded pill shapes (`([Start])`, `([End])`) with purple outlines.
* **Decisions**: Diamond shapes (`{Decision?}`) with clean blue outlines and `Yes` / `No` branches.
* **Input / Output Operations**: Slanted amber parallelograms (`[/Input or Display Data/]`).
* **Internal Processes**: Soft pink rectangles (`[Process Step]`).

---

## 📌 1. Vertically Aligned Mermaid.js Flowchart (Start $\leftrightarrow$ End)

```mermaid
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'primaryColor': '#fce7f3',
    'primaryTextColor': '#1e1b4b',
    'primaryBorderColor': '#ec4899',
    'lineColor': '#475569',
    'secondaryColor': '#fef3c7',
    'tertiaryColor': '#ffffff'
  }
}}%%
flowchart TD
    %% Custom Styling Classes matching your reference image
    classDef terminal fill:#f3e8ff,stroke:#a855f7,stroke-width:2.5px,color:#1e1b4b,font-weight:bold;
    classDef decision fill:#ffffff,stroke:#3b82f6,stroke-width:1.8px,color:#1e1b4b;
    classDef process fill:#fce7f3,stroke:#ec4899,stroke-width:1.5px,color:#1e1b4b;
    classDef io fill:#fef3c7,stroke:#d97706,stroke-width:1.5px,color:#1e1b4b;

    %% -----------------------------------------------------------------
    %% 1. AUTHENTICATION & VERTICAL SPINE (Start at Top)
    %% -----------------------------------------------------------------
    StartNode(["Start"]):::terminal --> NewUser{"New User?"}
    
    %% Registration branch to the right
    NewUser -- "Yes" --> Signup["Signup"]
    Signup --> ValidateSignup{"Validate Credentials?"}
    ValidateSignup -- "No" --> Signup
    ValidateSignup -- "Yes" --> CreateAccount["Create Account"] --> Login["Login"]
    
    %% Spine continues straight down
    NewUser -- "No" --> Login
    Login --> EnterCreds[/"Enter Login Details"/]
    EnterCreds --> ValidCreds{"Valid User Credentials?"}
    ValidCreds -- "No" --> ResetPW["Reset Password"] --> Login
    ValidCreds -- "Yes" --> Dashboard["View User Dashboard"]

    %% -----------------------------------------------------------------
    %% 2. WATCHLIST MANAGEMENT (Matching Folders in reference)
    %% -----------------------------------------------------------------
    Dashboard --> ManageWatchlist{"Manage Watchlist?"}
    
    %% Watchlist sub-branch to the right
    ManageWatchlist -- "Yes" --> AddStock{"Add New Stock?"}
    AddStock -- "Yes" --> EnterStock[/"Enter Stock Symbol & Price Target"/]
    EnterStock --> UpdateWatchlist["Update Watchlist Data"] --> AnalyzeStock

    AddStock -- "No" --> RemoveStock{"Remove Stock?"}
    RemoveStock -- "Yes" --> PromptRemove[/"Prompt Delete Confirmation"/]
    PromptRemove --> UpdateWatchlist
    RemoveStock -- "No" --> AnalyzeStock

    %% Spine continues straight down
    ManageWatchlist -- "No" --> AnalyzeStock

    %% -----------------------------------------------------------------
    %% 3. MAIN VERTICAL SPINE & HORIZONTAL PIPELINES
    %% -----------------------------------------------------------------
    AnalyzeStock{"Analyze Stock?"}
    
    %% Equities & AI Forecast Branch (Horizontal Decision Chain to the right)
    AnalyzeStock -- "Yes" --> DisplayStock["Display Stock Terminal"]
    DisplayStock --> FetchOHLCV["Fetch OHLCV yfinance Data"]
    FetchOHLCV --> RenderCandle[/"Render Canvas Candlestick & EMAs"/]
    
    RenderCandle --> RunAI{"Run AI Price Prediction?"}
    RunAI -- "Yes" --> SelectModel[/"Select Model: BiLSTM, XGBoost, Prophet"/]
    SelectModel --> ExecAI["Execute Inference Algorithm"]
    ExecAI --> DisplayForecast[/"Display Forecast Target & Loss Metrics"/]
    
    DisplayForecast --> ExportCSV{"Export Run Log CSV?"}
    ExportCSV -- "Yes" --> DownloadCSV[/"Download Evaluation Run Logs"/] --> Dashboard
    ExportCSV -- "No" --> Dashboard

    RunAI -- "No" --> ChangeCurrency{"Change Base Currency?"}
    ChangeCurrency -- "Yes" --> SelectCurr[/"Select Currency: MYR, USD, EUR, SGD"/]
    SelectCurr --> ConvertPrice["Recalculate Exchange Rates"]
    ConvertPrice --> DisplayCurr[/"Display Converted Price Badge"/] --> Dashboard

    ChangeCurrency -- "No" --> ViewOrderBook{"View Order Book?"}
    ViewOrderBook -- "Yes" --> DisplayBook[/"Display Synthetic Depth Ladder"/] --> Dashboard

    ViewOrderBook -- "No" --> SentimentVote{"Vote Market Sentiment?"}
    SentimentVote -- "Yes" --> SubmitVote[/"Submit Bullish or Bearish Vote"/]
    SubmitVote --> UpdateSentiment["Update Sentiment Score"] --> Dashboard
    SentimentVote -- "No" --> Dashboard

    %% Spine continues straight down
    AnalyzeStock -- "No" --> ViewMacro{"Monitor Macro Indicators?"}
    ViewMacro -- "Yes" --> FetchMacro["Query FRED API & BNM Series"]
    FetchMacro --> DisplayGauge[/"Display Policy Corridor Gauge & Newswire"/] --> Dashboard

    %% Spine continues straight down
    ViewMacro -- "No" --> ViewYields{"Analyze Sovereign Yield Curves?"}
    ViewYields -- "Yes" --> FetchYields["Ingest MGS, UST & Bund Yields"]
    FetchYields --> DisplayYields[/"Display 10Y-2Y Spread & Term Structure"/] --> Dashboard

    %% Spine continues straight down
    ViewYields -- "No" --> ViewProfile{"View User Profile?"}
    ViewProfile -- "Yes" --> DisplayProfile["View User Details"]
    DisplayProfile --> UpdateProfile{"Update User Details?"}
    UpdateProfile -- "Yes" --> EnterProfile[/"Enter User Details & Alert Rules"/]
    EnterProfile --> SaveProfile["Update User Details"] --> Dashboard
    UpdateProfile -- "No" --> Dashboard

    %% Spine terminates straight down (Aligned vertically below Start)
    ViewProfile -- "No" --> Logout{"Logout?"}
    Logout -- "No" --> Dashboard
    Logout -- "Yes" --> EndNode(["End"]):::terminal

    %% -----------------------------------------------------------------
    %% CLASS ASSIGNMENTS
    %% -----------------------------------------------------------------
    class StartNode,EndNode terminal;
    class NewUser,ValidateSignup,ValidCreds,ManageWatchlist,AddStock,RemoveStock,AnalyzeStock,RunAI,ExportCSV,ChangeCurrency,ViewOrderBook,SentimentVote,ViewMacro,ViewYields,ViewProfile,UpdateProfile,Logout decision;
    class Signup,CreateAccount,Login,ResetPW,Dashboard,UpdateWatchlist,DisplayStock,FetchOHLCV,ExecAI,ConvertPrice,UpdateSentiment,FetchMacro,FetchYields,DisplayProfile,SaveProfile process;
    class EnterCreds,EnterStock,PromptRemove,RenderCandle,SelectModel,DisplayForecast,DownloadCSV,SelectCurr,DisplayCurr,DisplayBook,SubmitVote,DisplayGauge,DisplayYields,EnterProfile io;
```
