-- ==============================================================================
-- MacroPulse Institutional Terminal - MySQL Relational Database Schema
-- Database: macropulse_db
-- Compatibility: MySQL 8.0+ / MariaDB 10.5+
-- ==============================================================================

CREATE DATABASE IF NOT EXISTS `macropulse_db`
  DEFAULT CHARACTER SET utf8mb4
  DEFAULT COLLATE utf8mb4_unicode_ci;

USE `macropulse_db`;

-- ==============================================================================
-- 1. USERS & IDENTITY
-- ==============================================================================
DROP TABLE IF EXISTS `user_sessions`;
DROP TABLE IF EXISTS `password_resets`;
DROP TABLE IF EXISTS `login_attempts`;
DROP TABLE IF EXISTS `user_workspace_settings`;
DROP TABLE IF EXISTS `user_notification_rules`;
DROP TABLE IF EXISTS `user_watchlists`;
DROP TABLE IF EXISTS `model_run_logs`;
DROP TABLE IF EXISTS `macro_observations`;
DROP TABLE IF EXISTS `model_metadata`;
DROP TABLE IF EXISTS `macro_indicators`;
DROP TABLE IF EXISTS `stocks`;
DROP TABLE IF EXISTS `users`;

CREATE TABLE `users` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(191) NOT NULL UNIQUE,
  `password_hash` VARCHAR(255) NOT NULL,
  `full_name` VARCHAR(150) NOT NULL,
  `role_title` VARCHAR(100) DEFAULT 'Senior Macro Strategist & Equity Analyst',
  `department` VARCHAR(150) DEFAULT 'MacroPulse Sovereign Macro & Bursa Equities Division',
  `timezone` VARCHAR(50) DEFAULT 'UTC+8',
  `bio` TEXT DEFAULT NULL,
  `avatar_url` MEDIUMTEXT DEFAULT NULL,
  `api_key` VARCHAR(64) DEFAULT NULL UNIQUE,
  `two_factor_enabled` TINYINT(1) DEFAULT 1,
  `terms_accepted` TINYINT(1) DEFAULT 1,
  `is_active` TINYINT(1) DEFAULT 1,
  `last_login_at` TIMESTAMP NULL DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  INDEX `idx_users_email` (`email`),
  INDEX `idx_users_api_key` (`api_key`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- 2. AUTHENTICATION SUPPORT: SESSIONS, PASSWORD RESETS & AUDIT
-- ==============================================================================
CREATE TABLE `user_sessions` (
  `session_id` VARCHAR(128) PRIMARY KEY,
  `user_id` INT UNSIGNED NOT NULL,
  `ip_address` VARCHAR(45) DEFAULT '175.143.218.42',
  `user_agent` VARCHAR(255) DEFAULT 'Microsoft Edge / Windows 11',
  `location` VARCHAR(100) DEFAULT 'Kuala Lumpur, Malaysia',
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  `last_active_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_sessions_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `password_resets` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NOT NULL,
  `email` VARCHAR(191) NOT NULL,
  `reset_code` VARCHAR(16) NOT NULL,
  `token_hash` VARCHAR(255) DEFAULT NULL,
  `expires_at` TIMESTAMP NOT NULL,
  `is_used` TINYINT(1) DEFAULT 0,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_pwreset_lookup` (`email`, `reset_code`),
  CONSTRAINT `fk_pwreset_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `login_attempts` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `email` VARCHAR(191) NOT NULL,
  `ip_address` VARCHAR(45) NOT NULL,
  `is_successful` TINYINT(1) NOT NULL,
  `attempted_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_login_audit` (`email`, `attempted_at`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- 3. USER PREFERENCES: WORKSPACE & NOTIFICATIONS
-- ==============================================================================
CREATE TABLE `user_workspace_settings` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NOT NULL UNIQUE,
  `default_landing_view` VARCHAR(50) DEFAULT 'overview',
  `benchmark_index` VARCHAR(50) DEFAULT '^KLSE',
  `lookback_horizon` VARCHAR(20) DEFAULT '3mo',
  `focus_sector` VARCHAR(50) DEFAULT 'all',
  `reporting_currency` VARCHAR(10) DEFAULT 'MYR',
  `polling_rate_seconds` INT UNSIGNED DEFAULT 15,
  `audio_chimes_enabled` TINYINT(1) DEFAULT 1,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_workspace_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `user_notification_rules` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NOT NULL UNIQUE,
  `notify_opr` TINYINT(1) DEFAULT 1,
  `notify_cpi` TINYINT(1) DEFAULT 1,
  `notify_stocks` TINYINT(1) DEFAULT 1,
  `notify_inflow` TINYINT(1) DEFAULT 1,
  `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  CONSTRAINT `fk_notifications_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- 4. STOCK CATALOG & USER WATCHLISTS
-- ==============================================================================
CREATE TABLE `stocks` (
  `symbol` VARCHAR(30) PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `exchange` VARCHAR(30) NOT NULL DEFAULT 'KLSE',
  `country` VARCHAR(10) NOT NULL DEFAULT 'MY',
  `sector` VARCHAR(100) NOT NULL,
  `is_active` TINYINT(1) DEFAULT 1,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_stocks_sector` (`sector`),
  INDEX `idx_stocks_exchange` (`exchange`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `user_watchlists` (
  `id` INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `user_id` INT UNSIGNED NOT NULL,
  `stock_symbol` VARCHAR(30) NOT NULL,
  `target_buy_price` DECIMAL(12, 4) DEFAULT NULL,
  `target_sell_price` DECIMAL(12, 4) DEFAULT NULL,
  `notes` VARCHAR(255) DEFAULT NULL,
  `added_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_user_stock` (`user_id`, `stock_symbol`),
  CONSTRAINT `fk_watchlist_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_watchlist_stock` FOREIGN KEY (`stock_symbol`) REFERENCES `stocks` (`symbol`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- 5. MACROECONOMIC INDICATORS & OBSERVATIONS
-- ==============================================================================
CREATE TABLE `macro_indicators` (
  `indicator_id` VARCHAR(50) PRIMARY KEY,
  `name` VARCHAR(150) NOT NULL,
  `unit` VARCHAR(50) NOT NULL,
  `frequency` VARCHAR(30) NOT NULL,
  `category` VARCHAR(60) NOT NULL,
  `target_benchmark` VARCHAR(100) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `macro_observations` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `indicator_id` VARCHAR(50) NOT NULL,
  `observation_date` DATE NOT NULL,
  `observation_value` DECIMAL(16, 4) NOT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY `uk_indicator_date` (`indicator_id`, `observation_date`),
  INDEX `idx_obs_date` (`observation_date`),
  CONSTRAINT `fk_observations_indicator` FOREIGN KEY (`indicator_id`) REFERENCES `macro_indicators` (`indicator_id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- 6. QUANTITATIVE AI MODELS & EXECUTION RUN LOGS
-- ==============================================================================
CREATE TABLE `model_metadata` (
  `model_id` VARCHAR(40) PRIMARY KEY,
  `model_name` VARCHAR(100) NOT NULL,
  `description` VARCHAR(255) NOT NULL,
  `algorithm` VARCHAR(100) NOT NULL,
  `framework` VARCHAR(50) DEFAULT 'PyTorch / Scikit-Learn',
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE `model_run_logs` (
  `id` BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  `model_id` VARCHAR(40) NOT NULL,
  `target_symbol` VARCHAR(30) NOT NULL,
  `run_type` ENUM('inference', 'retrain', 'backtest') NOT NULL DEFAULT 'inference',
  `rmse` DECIMAL(10, 5) NOT NULL,
  `mae` DECIMAL(10, 5) NOT NULL,
  `mape` DECIMAL(8, 4) NOT NULL,
  `accuracy_score` DECIMAL(6, 2) NOT NULL,
  `direction_accuracy` DECIMAL(6, 2) NOT NULL,
  `runtime_seconds` DECIMAL(8, 3) NOT NULL,
  `notes` VARCHAR(255) DEFAULT NULL,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  INDEX `idx_runlogs_model` (`model_id`, `target_symbol`),
  INDEX `idx_runlogs_created` (`created_at`),
  CONSTRAINT `fk_runlogs_model` FOREIGN KEY (`model_id`) REFERENCES `model_metadata` (`model_id`) ON DELETE CASCADE,
  CONSTRAINT `fk_runlogs_stock` FOREIGN KEY (`target_symbol`) REFERENCES `stocks` (`symbol`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

-- ==============================================================================
-- SEED DATA INGESTION
-- ==============================================================================

-- 1. Default User: Alex Morgan (Default Password: SecurePass123!)
INSERT INTO `users` (`id`, `email`, `password_hash`, `full_name`, `role_title`, `department`, `timezone`, `bio`, `api_key`, `two_factor_enabled`, `last_login_at`)
VALUES (
  1,
  'alex.morgan@macropulse.ai',
  'SecurePass123!',
  'Alex Morgan',
  'Senior Macro Strategist & Equity Analyst',
  'MacroPulse Sovereign Macro & Bursa Equities Division',
  'UTC+8',
  'Macroeconomic research strategist tracking BNM OPR monetary policy, headline CPI inflation, GDP expansion trends, sovereign yield curves, and Bursa Malaysia blue-chip equities.',
  'mp_live_a48f93e0b21c4d7e6f8510a9',
  1,
  NOW()
) ON DUPLICATE KEY UPDATE `email`=`email`;

-- 2. Default User Workspace Settings
INSERT INTO `user_workspace_settings` (`user_id`, `default_landing_view`, `benchmark_index`, `lookback_horizon`, `focus_sector`, `reporting_currency`, `polling_rate_seconds`, `audio_chimes_enabled`)
VALUES (1, 'overview', '^KLSE', '3mo', 'all', 'MYR', 15, 1)
ON DUPLICATE KEY UPDATE `user_id`=`user_id`;

-- 3. Default User Notification Rules
INSERT INTO `user_notification_rules` (`user_id`, `notify_opr`, `notify_cpi`, `notify_stocks`, `notify_inflow`)
VALUES (1, 1, 1, 1, 1)
ON DUPLICATE KEY UPDATE `user_id`=`user_id`;

-- 4. Active Session
INSERT INTO `user_sessions` (`session_id`, `user_id`, `ip_address`, `user_agent`, `location`, `is_active`)
VALUES ('sess_live_998124f0a2', 1, '175.143.218.42', 'Microsoft Edge 134 / Windows 11', 'Kuala Lumpur, Malaysia', 1)
ON DUPLICATE KEY UPDATE `session_id`=`session_id`;

-- 5. Seed Equities Catalog (Bursa Malaysia Blue Chips & Global Tech)
INSERT INTO `stocks` (`symbol`, `name`, `exchange`, `country`, `sector`) VALUES
('1155.KL', 'Malayan Banking Berhad (Maybank)', 'KLSE', 'MY', 'Financial Services'),
('5347.KL', 'Tenaga Nasional Berhad', 'KLSE', 'MY', 'Utilities & Power'),
('1295.KL', 'Public Bank Berhad', 'KLSE', 'MY', 'Financial Services'),
('1023.KL', 'CIMB Group Holdings', 'KLSE', 'MY', 'Financial Services'),
('5183.KL', 'Petronas Chemicals Group', 'KLSE', 'MY', 'Basic Materials'),
('0166.KL', 'Inari Amertron Berhad', 'KLSE', 'MY', 'Technology & AI Semi'),
('6033.KL', 'Petronas Gas Berhad', 'KLSE', 'MY', 'Utilities & Energy'),
('3816.KL', 'MISC Berhad', 'KLSE', 'MY', 'Energy Transportation'),
('4715.KL', 'Genting Berhad', 'KLSE', 'MY', 'Consumer Services'),
('5225.KL', 'IHH Healthcare Berhad', 'KLSE', 'MY', 'Healthcare'),
('7084.KL', 'QL Resources Berhad', 'KLSE', 'MY', 'Consumer Staples'),
('5296.KL', 'MR D.I.Y. Group', 'KLSE', 'MY', 'Consumer Discretionary'),
('0097.KL', 'ViTrox Corporation', 'KLSE', 'MY', 'Technology Semi'),
('7113.KL', 'Top Glove Corporation', 'KLSE', 'MY', 'Healthcare Equipment'),
('5099.KL', 'Capital A Berhad (AirAsia)', 'KLSE', 'MY', 'Aviation'),
('4677.KL', 'YTL Power International', 'KLSE', 'MY', 'Utilities & AI Data Centers'),
('5398.KL', 'Gamuda Berhad', 'KLSE', 'MY', 'Engineering & Construction'),
('5211.KL', 'Sunway Berhad', 'KLSE', 'MY', 'Conglomerate & Real Estate'),
('4863.KL', 'Telekom Malaysia Berhad', 'KLSE', 'MY', 'Telecommunications'),
('6947.KL', 'CelcomDigi Berhad', 'KLSE', 'MY', 'Telecommunications'),
('1015.KL', 'AMMB Holdings Berhad (AmBank)', 'KLSE', 'MY', 'Financial Services'),
('5168.KL', 'Hartalega Holdings Berhad', 'KLSE', 'MY', 'Healthcare'),
('NVDA', 'NVIDIA Corporation', 'NASDAQ', 'US', 'Semiconductors & AI'),
('AAPL', 'Apple Inc.', 'NASDAQ', 'US', 'Consumer Technology'),
('MSFT', 'Microsoft Corporation', 'NASDAQ', 'US', 'Cloud & Enterprise AI'),
('GOOGL', 'Alphabet Inc. (Google)', 'NASDAQ', 'US', 'Digital Services & AI'),
('AMZN', 'Amazon.com, Inc.', 'NASDAQ', 'US', 'E-Commerce & Cloud'),
('TSM', 'Taiwan Semiconductor (TSMC)', 'NYSE', 'TW', 'Semiconductors'),
('PLTR', 'Palantir Technologies', 'NYSE', 'US', 'AI Software & Analytics'),
('^KLSE', 'FTSE Bursa Malaysia KLCI', 'INDEX', 'MY', 'National Stock Index'),
('^GSPC', 'S&P 500 Index', 'INDEX', 'US', 'Market Benchmark')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- 6. Seed Watchlist for Default User
INSERT INTO `user_watchlists` (`user_id`, `stock_symbol`, `target_buy_price`, `target_sell_price`, `notes`) VALUES
(1, '1155.KL', 9.80, 10.80, 'Top dividend banking leader with resilient NIM and loan growth.'),
(1, '5347.KL', 12.80, 15.00, 'Beneficiary of grid upgrades and regional data center energy demand.'),
(1, '0166.KL', 2.90, 3.80, 'OSAT semiconductor supplier positioned for 5G/AI optical ramp.'),
(1, 'NVDA', 115.00, 145.00, 'Global benchmark for AI accelerated compute and Blackwell GPUs.')
ON DUPLICATE KEY UPDATE `notes`=VALUES(`notes`);

-- 7. Seed Macroeconomic Indicators
INSERT INTO `macro_indicators` (`indicator_id`, `name`, `unit`, `frequency`, `category`, `target_benchmark`) VALUES
('BNM_OPR', 'Bank Negara Malaysia Overnight Policy Rate', '%', 'Bi-Monthly', 'Monetary Policy', 'Target: 3.00%'),
('BNM_CPI', 'Malaysia Headline Consumer Price Index', '% YoY', 'Monthly', 'Inflation', 'Band: 1.5% - 2.5%'),
('BNM_GDP', 'Malaysia Real GDP Growth Rate', '% YoY', 'Quarterly', 'Economic Growth', 'Target: 4.5% - 5.5%'),
('FEDFUNDS', 'Federal Funds Effective Rate (FRED)', '%', 'Monthly', 'Central Bank Policy', '5.25 - 5.50%'),
('CPIAUCSL', 'Consumer Price Index (Headline CPI)', 'Index 1982-84=100', 'Monthly', 'Inflation', '2.0% YoY'),
('GDPC1', 'Real Gross Domestic Product (Real GDP)', 'Billions of Chd 2017 $', 'Quarterly', 'Economic Growth', 'Trend: 2.5%'),
('DGS10', '10-Year Treasury Constant Maturity', '%', 'Daily', 'Sovereign Yields', 'Benchmark Bond'),
('T10Y2Y', '10Y-2Y Treasury Yield Spread', '%', 'Daily', 'Yield Curve', 'Recession Spread Indicator'),
('UNRATE', 'Civilian Unemployment Rate', '%', 'Monthly', 'Labor Market', 'Full Employment ~4.0%')
ON DUPLICATE KEY UPDATE `name`=VALUES(`name`);

-- 8. Seed AI Quantitative Models
INSERT INTO `model_metadata` (`model_id`, `model_name`, `description`, `algorithm`, `framework`) VALUES
('lstm', 'Stacked Bidirectional LSTM', 'Captures sequential market temporal dependencies with bidirectional recurrence.', 'BiLSTM + Attention', 'PyTorch 2.3'),
('random_forest', 'Multi-Factor Random Forest', 'Ensemble bagging tree algorithm resilient to macroeconomic noise and outliers.', 'Random Forest Regressor', 'Scikit-Learn'),
('xgboost', 'Extreme Gradient Boosting (XGBoost)', 'High-speed gradient boosted decision trees with L1/L2 regularization.', 'Gradient Boosted Trees', 'XGBoost 2.0'),
('arima', 'SARIMAX Auto-Regressive Benchmark', 'Classical econometric benchmark integrating seasonal macroeconomic covariates.', 'SARIMAX (2,1,2)', 'Statsmodels'),
('transformer', 'PatchTST Time-Series Transformer', 'State-of-the-art patch-based attention mechanism for multi-horizon forecasting.', 'PatchTST Multi-Head Attention', 'PyTorch 2.3')
ON DUPLICATE KEY UPDATE `model_name`=VALUES(`model_name`);

-- 9. Seed Baseline Model Execution Run Logs
INSERT INTO `model_run_logs` (`model_id`, `target_symbol`, `run_type`, `rmse`, `mae`, `mape`, `accuracy_score`, `direction_accuracy`, `runtime_seconds`, `notes`) VALUES
('lstm', '1155.KL', 'inference', 0.08420, 0.06150, 1.4800, 98.52, 78.40, 2.450, 'Baseline daily inference on Maybank historical bars'),
('random_forest', '1155.KL', 'inference', 0.10420, 0.07920, 1.8400, 98.16, 72.10, 0.890, 'Macro factor ensemble evaluation'),
('xgboost', '1155.KL', 'inference', 0.09180, 0.06840, 1.5900, 98.41, 75.80, 1.120, 'Gradient boosted tree validation'),
('transformer', '1155.KL', 'backtest', 0.07840, 0.05420, 1.2900, 98.71, 81.20, 3.820, '5-fold walk-forward validation out-of-sample')
ON DUPLICATE KEY UPDATE `notes`=VALUES(`notes`);

-- ==============================================================================
-- End of Schema Definition
-- ==============================================================================
