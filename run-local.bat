@echo off
title EuroBridge Education - Local Server
cd /d "%~dp0"
echo ========================================================
echo   Starting EuroBridge Education Local Development Server
echo   Opening: http://localhost:8080
echo ========================================================
start http://localhost:8080
"%USERPROFILE%\.bun\bin\bun.exe" run dev
pause
