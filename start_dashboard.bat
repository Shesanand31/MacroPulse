@echo off
title MacroPulse Terminal & Server Launcher
echo ========================================================
echo        MacroPulse Stocks & Macro Dashboard
echo ========================================================
echo.
echo Starting Python API server on http://localhost:3000 ...
start "" http://localhost:3000
py api_server.py
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo 'py' command failed, trying 'python'...
    python api_server.py
)
pause
