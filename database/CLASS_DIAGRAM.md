# 📐 MacroPulse Institutional Terminal — UML Class Diagram

This document contains the **UML Class Diagram** representing the static structural design of the **MacroPulse Institutional Terminal**, detailing the core domain entities, operational methods, attributes, and relationships.

---

## 📌 1. UML Class Diagram (Mermaid.js)

```mermaid
%%{init: {
  'theme': 'base',
  'themeVariables': {
    'primaryColor': '#eff6ff',
    'primaryTextColor': '#0f172a',
    'primaryBorderColor': '#3b82f6',
    'lineColor': '#475569',
    'secondaryColor': '#f8fafc',
    'tertiaryColor': '#ffffff'
  }
}}%%
classDiagram
    class User {
        +int userID
        +String name
        +String email
        +String passwordHash
        +Object notificationPreferences
        +login() boolean
        +register() boolean
        +updateProfile() boolean
        +updateNotificationToggles() void
    }

    class AssetWatchlist {
        +int watchlistID
        +int userID
        +List tickerSymbols
        +addAsset(ticker) boolean
        +removeAsset(ticker) boolean
        +fetchWatchlistDetails() List
    }

    class AssetEquity {
        +String ticker
        +String companyName
        +double currentPrice
        +double percentageChange
        +long volume
        +fetchRealTimePrice() void
        +getHistoricalData(timeframe) List
    }

    class MacroIndicator {
        +String indicatorName
        +double currentValue
        +double directionalShift
        +String lastUpdated
        +fetchLatestMacroGrid() List
        +getHistoricalTrends() List
    }

    class AnalyticsDashboard {
        +List activeStocks
        +List activeMacroVariables
        +renderAssetPriceCanvas() void
        +displayMacroOverlayChart() void
        +computeStatisticalCorrelationMatrix() Matrix
    }

    class PredictionModel {
        +int modelID
        +String modelType
        +double meanAbsoluteError
        +double rootMeanSquaredError
        +double meanAbsolutePercentageError
        +runForecastingHorizon(ticker) List
        +getAlgorithmBenchmarks() Map
    }

    %% Relationships
    User "1" --> "1" AssetWatchlist : manages
    AssetWatchlist "1" o-- "1..*" AssetEquity : contains
    AnalyticsDashboard "1" o-- "1..*" MacroIndicator : cross_references
    AnalyticsDashboard "1" o-- "1..*" AssetEquity : aggregates
    AnalyticsDashboard "1" --> "1..*" PredictionModel : displays_benchmarks
    PredictionModel "1" ..> "1" AssetEquity : forecasts
```

---

## 📋 2. Class Responsibilities & Multiplicity Reference

| Class Name | Primary Responsibility | Key Associations |
| :--- | :--- | :--- |
| **`User`** | Manages analyst authentication, session states, and alert preferences. | Holds a $1 : 1$ directional association to `AssetWatchlist` via `manages`. |
| **`AssetWatchlist`** | Maintains personal bookmarked equities for portfolio surveillance. | Aggregates `AssetEquity` ($1 : 1..*$) via `contains`. |
| **`AssetEquity`** | Models stock market assets with live quotes, OHLCV bars, and volume. | Contained in `AssetWatchlist`, aggregated by `AnalyticsDashboard`, target of `PredictionModel` forecasts. |
| **`MacroIndicator`** | Captures sovereign economic time series (OPR, CPI, GDP, FRED series). | Aggregated by `AnalyticsDashboard` ($1 : 1..*$) via `cross_references`. |
| **`AnalyticsDashboard`** | Central UI coordinator that renders Canvas candlesticks and correlation matrices. | Aggregates `MacroIndicator`, `AssetEquity`, and associates to `PredictionModel`. |
| **`PredictionModel`** | Executes ML inference (BiLSTM, XGBoost, Prophet) and logs error metrics ($MAE$, $RMSE$, $MAPE$). | Depends on `AssetEquity` ($1 : 1$) via `forecasts`. |
