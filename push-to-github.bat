@echo off
title Push Competitive Exam Awareness to GitHub
cd /d "%~dp0"
set "GIT=C:\Users\Dell\AppData\Local\GitHubDesktop\app-3.6.7\resources\app\git\cmd\git.exe"

echo ========================================================
echo   Push Competitive Exam Awareness to GitHub
echo ========================================================
echo.
echo Your local Git repository is initialized and committed on branch 'main'.
echo.
echo If you have not created the repository on GitHub yet:
echo 1. Open https://github.com/new in your browser
echo 2. Set Repository name to: competitive-exam-awareness
echo 3. Leave "Initialize with README" UNCHECKED
echo 4. Click "Create repository"
echo.
set /p REPO_URL="Enter your GitHub Repository URL (or press Enter for https://github.com/TirthakHalmare/competitive-exam-awareness.git): "

if "%REPO_URL%"=="" (
  set "REPO_URL=https://github.com/TirthakHalmare/competitive-exam-awareness.git"
)

echo.
echo Adding remote origin: %REPO_URL% ...
"%GIT%" remote remove origin 2>nul
"%GIT%" remote add origin %REPO_URL%
"%GIT%" branch -M main

echo Pushing to GitHub...
"%GIT%" push -u origin main

if %errorlevel% equ 0 (
  echo.
  echo [SUCCESS] Code successfully pushed to GitHub!
  echo Repository: %REPO_URL%
) else (
  echo.
  echo [NOTE] If the push was rejected because the repository doesn't exist yet,
  echo please create it at https://github.com/new and re-run this script.
)

echo.
pause
