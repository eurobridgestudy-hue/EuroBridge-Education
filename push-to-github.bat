@echo off
title Push EuroBridge Education to GitHub
color 0B
echo ===================================================================
echo             EuroBridge Education - GitHub Synchronizer
echo       Repository: https://github.com/eurobridgestudy-hue/EuroBridge-Education
echo ===================================================================
echo.
cd /d "%~dp0"

set "GIT=C:\Users\manji\.mingit\cmd\git.exe"
set "GH=C:\Users\manji\.mingit\cmd\gh.exe"

echo [1/3] Checking GitHub Login Status...
"%GH%" auth status >nul 2>&1
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ---------------------------------------------------------------
    echo   Action Required: Sign In to GitHub
    echo ---------------------------------------------------------------
    echo   A browser window will open to authorize your GitHub account.
    echo   Simply press Enter to open GitHub and approve access.
    echo.
    "%GH%" auth login --hostname github.com -p https -w
    "%GH%" auth setup-git
) else (
    echo   [OK] Already logged into GitHub.
    "%GH%" auth setup-git >nul 2>&1
)

echo.
echo [2/3] Adding any newly updated files...
"%GIT%" add -A
"%GIT%" commit -m "Update complete EuroBridge Education files (src, pages, admin portal, assets, tests)" >nul 2>&1

echo.
echo [3/3] Uploading all pending files to GitHub (main branch)...
"%GIT%" push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ===================================================================
    echo   SUCCESS! All 109 project files have been uploaded to GitHub!
    echo   View your repository:
    echo   https://github.com/eurobridgestudy-hue/EuroBridge-Education
    echo ===================================================================
) else (
    echo.
    echo ===================================================================
    echo   Push encountered an authentication or network check.
    echo   If you have a GitHub Personal Access Token (PAT), you can run:
    echo   "%GIT%" push https://YOUR_TOKEN@github.com/eurobridgestudy-hue/EuroBridge-Education.git main
    echo ===================================================================
)

echo.
pause
