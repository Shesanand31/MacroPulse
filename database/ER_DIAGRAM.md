# 📊 MacroPulse Relational Database — Entity-Relationship (ER) Diagram

This document contains the complete Entity-Relationship (ER) specifications for the **MacroPulse Terminal**, featuring both the **Core Analytics Schema** (Assets, DailyStockPrices, Forecast_Logs, Macroeconomic_Indicators) and the **Full Institutional Schema**.

---

## 📌 1. Core Analytics ER Diagram (Matching System Design)

```mermaid
erDiagram
    Assets ||--o{ DailyStockPrices : "Asset_ID"
    Assets ||--o{ Forecast_Logs : "Asset_ID"

    Assets {
        int Asset_ID PK "NOT NULL"
        varchar Ticker_Symbol "VARCHAR(100) NOT NULL"
        varchar Company_Name "VARCHAR(100)"
        varchar Sector "VARCHAR(100)"
        varchar Currency "VARCHAR(15) NOT NULL"
    }

    DailyStockPrices {
        int Price_ID PK "NOT NULL"
        int Asset_ID FK "INTEGER NOT NULL"
        date Trading_Date "DATE"
        decimal Open_Price "DECIMAL(8,2)"
        decimal High_Price "DECIMAL(8,2)"
        decimal Low_Price "DECIMAL(8,2)"
        decimal Close_Price "DECIMAL(8,2)"
        decimal Adj_Close "DECIMAL(8,2)"
        bigint Volume "Volume"
    }

    Forecast_Logs {
        int Log_ID PK "NOT NULL"
        int Asset_ID FK "INTEGER NOT NULL"
        date Forecast_Date "DATE"
        varchar Model_Type "VARCHAR(100)"
        decimal Predicted_Close_Price "DECIMAL(8,2)"
        decimal Actual_Close_Price "DECIMAL(8,2)"
        decimal MAE_Score "DECIMAL(8,2)"
        decimal RMSE_Score "DECIMAL(8,2)"
        decimal MAPE_Score "DECIMAL(8,2)"
        int Prediction_Direction "INTEGER (1=Up, 0=Down)"
    }

    Macroeconomic_Indicators {
        int Indicator_ID PK "NOT NULL"
        date Record_Date "DATE"
        varchar Frequency_Type "VARCHAR(100)"
        decimal Opr_Rate "DECIMAL(8,2)"
        decimal Inflation_Rate_Cpi "DECIMAL(8,2)"
        decimal GDP_Growth "DECIMAL(8,2)"
        decimal Unemployment_Rate "DECIMAL(8,2)"
        decimal Exchange_Rate_MYR "DECIMAL(8,2)"
    }
```

---

## 🛠️ 2. DBML Code (for https://dbdiagram.io)

Copy and paste this snippet directly into [dbdiagram.io](https://dbdiagram.io) to generate the exact dark-grid visual diagram with crow's foot connectors:

```dbml
Table Assets {
  Asset_ID int [pk, not null]
  Ticker_Symbol varchar(100) [not null]
  Company_Name varchar(100)
  Sector varchar(100)
  Currency varchar(15) [not null]
}

Table DailyStockPrices {
  Price_ID int [pk, not null]
  Asset_ID integer [not null]
  Trading_Date date
  Open_Price decimal(8,2)
  High_Price decimal(8,2)
  Low_Price decimal(8,2)
  Close_Price decimal(8,2)
  Adj_Close decimal(8,2)
  Volume bigint
}

Table Forecast_Logs {
  Log_ID int [pk, not null]
  Asset_ID integer [not null]
  Forecast_Date date
  Model_Type varchar(100)
  Predicted_Close_Price decimal(8,2)
  Actual_Close_Price decimal(8,2)
  MAE_Score decimal(8,2)
  RMSE_Score decimal(8,2)
  MAPE_Score decimal(8,2)
  Prediction_Direction integer
}

Table Macroeconomic_Indicators {
  Indicator_ID int [pk, not null]
  Record_Date date
  Frequency_Type varchar(100)
  Opr_Rate decimal(8,2)
  Inflation_Rate_Cpi decimal(8,2)
  GDP_Growth decimal(8,2)
  Unemployment_Rate decimal(8,2)
  Exchange_Rate_MYR decimal(8,2)
}

Ref: Assets.Asset_ID < DailyStockPrices.Asset_ID
Ref: Assets.Asset_ID < Forecast_Logs.Asset_ID
```

---

## 🗄️ 3. SQL DDL Table Creation Script

```sql
CREATE TABLE `Assets` (
  `Asset_ID` INT AUTO_INCREMENT PRIMARY KEY,
  `Ticker_Symbol` VARCHAR(100) NOT NULL UNIQUE,
  `Company_Name` VARCHAR(100) NULL,
  `Sector` VARCHAR(100) NULL,
  `Currency` VARCHAR(15) NOT NULL DEFAULT 'MYR'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `DailyStockPrices` (
  `Price_ID` INT AUTO_INCREMENT PRIMARY KEY,
  `Asset_ID` INT NOT NULL,
  `Trading_Date` DATE NOT NULL,
  `Open_Price` DECIMAL(8,2) NULL,
  `High_Price` DECIMAL(8,2) NULL,
  `Low_Price` DECIMAL(8,2) NULL,
  `Close_Price` DECIMAL(8,2) NULL,
  `Adj_Close` DECIMAL(8,2) NULL,
  `Volume` BIGINT NULL,
  CONSTRAINT `fk_prices_asset` FOREIGN KEY (`Asset_ID`) 
    REFERENCES `Assets` (`Asset_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Forecast_Logs` (
  `Log_ID` INT AUTO_INCREMENT PRIMARY KEY,
  `Asset_ID` INT NOT NULL,
  `Forecast_Date` DATE NOT NULL,
  `Model_Type` VARCHAR(100) NOT NULL,
  `Predicted_Close_Price` DECIMAL(8,2) NOT NULL,
  `Actual_Close_Price` DECIMAL(8,2) NULL,
  `MAE_Score` DECIMAL(8,2) NULL,
  `RMSE_Score` DECIMAL(8,2) NULL,
  `MAPE_Score` DECIMAL(8,2) NULL,
  `Prediction_Direction` INT NULL,
  CONSTRAINT `fk_forecast_asset` FOREIGN KEY (`Asset_ID`) 
    REFERENCES `Assets` (`Asset_ID`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE `Macroeconomic_Indicators` (
  `Indicator_ID` INT AUTO_INCREMENT PRIMARY KEY,
  `Record_Date` DATE NOT NULL,
  `Frequency_Type` VARCHAR(100) NOT NULL,
  `Opr_Rate` DECIMAL(8,2) NULL,
  `Inflation_Rate_Cpi` DECIMAL(8,2) NULL,
  `GDP_Growth` DECIMAL(8,2) NULL,
  `Unemployment_Rate` DECIMAL(8,2) NULL,
  `Exchange_Rate_MYR` DECIMAL(8,2) NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
```

---

## 🏛️ 4. Full Institutional Schema (Auth & User Governance)

```mermaid
erDiagram
    USERS ||--o{ USER_SESSIONS : "initiates"
    USERS ||--o{ PASSWORD_RESETS : "requests"
    USERS ||--|| USER_WORKSPACE_SETTINGS : "customizes"
    USERS ||--|| USER_NOTIFICATION_RULES : "defines"
    USERS ||--o{ USER_WATCHLISTS : "bookmarks"
    STOCKS ||--o{ USER_WATCHLISTS : "cataloged_in"
    STOCKS ||--o{ MODEL_RUN_LOGS : "benchmarked_on"
    MODEL_METADATA ||--o{ MODEL_RUN_LOGS : "executes"
    MACRO_INDICATORS ||--o{ MACRO_OBSERVATIONS : "records"

    USERS {
        int id PK
        varchar email UK
        varchar password_hash
        varchar full_name
        varchar role_title
        varchar department
        varchar timezone
        text bio
        mediumtext avatar_url
        varchar api_key UK
        tinyint two_factor_enabled
        tinyint terms_accepted
        tinyint is_active
        timestamp last_login_at
        timestamp created_at
        timestamp updated_at
    }

    USER_SESSIONS {
        varchar session_id PK
        int user_id FK
        varchar ip_address
        varchar user_agent
        varchar location
        tinyint is_active
        timestamp created_at
        timestamp last_active_at
    }

    PASSWORD_RESETS {
        bigint id PK
        int user_id FK
        varchar email
        varchar reset_code
        varchar token_hash
        timestamp expires_at
        tinyint is_used
        timestamp created_at
    }

    USER_WORKSPACE_SETTINGS {
        int id PK
        int user_id FK
        varchar default_landing_view
        varchar benchmark_index
        varchar lookback_horizon
        varchar focus_sector
        varchar reporting_currency
        int polling_rate_seconds
        tinyint audio_chimes_enabled
        timestamp updated_at
    }

    USER_NOTIFICATION_RULES {
        int id PK
        int user_id FK
        tinyint notify_opr
        tinyint notify_cpi
        tinyint notify_stocks
        tinyint notify_inflow
        timestamp updated_at
    }

    STOCKS {
        varchar symbol PK
        varchar name
        varchar exchange
        varchar country
        varchar sector
        tinyint is_active
        timestamp created_at
    }

    USER_WATCHLISTS {
        int id PK
        int user_id FK
        varchar stock_symbol FK
        decimal target_buy_price
        decimal target_sell_price
        varchar notes
        timestamp added_at
    }

    MACRO_INDICATORS {
        varchar indicator_id PK
        varchar name
        varchar unit
        varchar frequency
        varchar category
        varchar target_benchmark
        timestamp created_at
    }

    MACRO_OBSERVATIONS {
        bigint id PK
        varchar indicator_id FK
        date observation_date
        decimal observation_value
        timestamp created_at
    }

    MODEL_METADATA {
        varchar model_id PK
        varchar model_name
        varchar description
        varchar algorithm
        varchar framework
        timestamp created_at
    }

    MODEL_RUN_LOGS {
        bigint id PK
        varchar model_id FK
        varchar target_symbol FK
        enum run_type
        decimal rmse
        decimal mae
        decimal mape
        decimal accuracy_score
        decimal direction_accuracy
        decimal runtime_seconds
        varchar notes
        timestamp created_at
    }
```
