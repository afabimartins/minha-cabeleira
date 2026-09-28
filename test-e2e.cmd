@echo off
setlocal

echo ================================================
echo MINHA CABELEIRA - PLAYWRIGHT E2E
echo ================================================
echo.

call npx playwright test

if errorlevel 1 (
  echo.
  echo ================================================
  echo TESTE E2E FALHOU
  echo ================================================
  exit /b 1
)

echo.
echo ================================================
echo TESTE E2E PASSOU
echo ================================================
