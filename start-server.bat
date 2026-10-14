@echo off
title Competitive Exam Awareness Server
cd /d "%~dp0"
echo ========================================================
echo   Competitive Exam Awareness Platform - Local Server
echo ========================================================
echo.
echo Launching server on http://localhost:3000 ...
echo.

:: Open default browser to localhost:3000
start "" "http://localhost:3000"

:: Try Python server first (standard on most Windows machines)
python -m http.server 3000 2>nul
if %errorlevel% equ 0 goto done

:: Try Node / npx serve if Python is not installed
call npx --yes serve -l 3000 .
if %errorlevel% equ 0 goto done

:: Fallback: Open index.html directly in browser if no local runtime is available
echo.
echo Notice: Python or Node server not detected. Opening direct local web interface...
start "" "index.html"

:done
pause
