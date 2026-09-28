# 📊 MacroPulse Relational Database — Entity-Relationship (ER) Diagram

This document contains the complete Entity-Relationship (ER) specification for the **MacroPulse Institutional Terminal** (`macropulse_db`), with **Key / Column Names on the LEFT** and **Data Types on the RIGHT** matching relational database design standards.

---

## 📌 Institutional ER Diagram (Mermaid.js)

```mermaid
%%{init: {'theme': 'dark'}}%%
erDiagram
    MACRO_INDICATORS ||--o{ MACRO_OBSERVATIONS : "records"
    USERS ||--|| USER_NOTIFICATION_RULES : "defines"
    USERS ||--|| USER_WORKSPACE_SETTINGS : "customizes"
    USERS ||--o{ USER_SESSIONS : "initiates"
    USERS ||--o{ PASSWORD_RESETS : "requests"
    USERS ||--o{ USER_WATCHLISTS : "bookmarks"
    STOCKS ||--o{ USER_WATCHLISTS : "cataloged_in"
    STOCKS ||--o{ MODEL_RUN_LOGS : "benchmarked_on"
    MODEL_METADATA ||--o{ MODEL_RUN_LOGS : "executes"

    LOGIN_ATTEMPTS {
        id bigint PK
        email varchar
        ip_address varchar
        is_successful tinyint
        attempted_at timestamp
    }

    MACRO_INDICATORS {
        indicator_id varchar PK
        name varchar
        unit varchar
        frequency varchar
        category varchar
        target_benchmark varchar
        created_at timestamp
    }

    MACRO_OBSERVATIONS {
        id bigint PK
        indicator_id varchar FK
        observation_date date
        observation_value decimal
        created_at timestamp
    }

    USERS {
        id int PK
        email varchar UK
        password_hash varchar
        full_name varchar
        role_title varchar
        department varchar
        timezone varchar
        bio text
        avatar_url mediumtext
        api_key varchar UK
        two_factor_enabled tinyint
        terms_accepted tinyint
        is_active tinyint
        last_login_at timestamp
        created_at timestamp
        updated_at timestamp
    }

    USER_NOTIFICATION_RULES {
        id int PK
        user_id int FK
        notify_opr tinyint
        notify_cpi tinyint
        notify_stocks tinyint
        notify_inflow tinyint
        updated_at timestamp
    }

    USER_WORKSPACE_SETTINGS {
        id int PK
        user_id int FK
        default_landing_view varchar
        benchmark_index varchar
        lookback_horizon varchar
        focus_sector varchar
        reporting_currency varchar
        polling_rate_seconds int
        audio_chimes_enabled tinyint
        updated_at timestamp
    }

    USER_SESSIONS {
        session_id varchar PK
        user_id int FK
        ip_address varchar
        user_agent varchar
        location varchar
        is_active tinyint
        created_at timestamp
        last_active_at timestamp
    }

    PASSWORD_RESETS {
        id bigint PK
        user_id int FK
        email varchar
        reset_code varchar
        token_hash varchar
        expires_at timestamp
        is_used tinyint
        created_at timestamp
    }

    STOCKS {
        symbol varchar PK
        name varchar
        exchange varchar
        country varchar
        sector varchar
        is_active tinyint
        created_at timestamp
    }

    USER_WATCHLISTS {
        id int PK
        user_id int FK
        stock_symbol varchar FK
        target_buy_price decimal
        target_sell_price decimal
        notes varchar
        added_at timestamp
    }

    MODEL_METADATA {
        model_id varchar PK
        model_name varchar
        description varchar
        algorithm varchar
        framework varchar
        created_at timestamp
    }

    MODEL_RUN_LOGS {
        id bigint PK
        model_id varchar FK
        target_symbol varchar FK
        run_type enum
        rmse decimal
        mae decimal
        mape decimal
        accuracy_score decimal
        direction_accuracy decimal
        runtime_seconds decimal
        notes varchar
        created_at timestamp
    }
```
