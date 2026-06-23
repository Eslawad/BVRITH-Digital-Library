@echo off
setlocal

cd /d "%~dp0functions"
call npm.cmd install
if errorlevel 1 exit /b 1

cd /d "%~dp0"
call npx.cmd firebase-tools deploy --only functions
if errorlevel 1 exit /b 1

echo.
echo Automatic daily AI news deployment completed.
endlocal
