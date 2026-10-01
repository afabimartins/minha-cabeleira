@echo off
setlocal
set "PROJECT=%CD%"
cd /d "%~dp0"

if not exist "%PROJECT%\public" (
  echo.
  echo ERRO: pasta public nao encontrada.
  echo Execute este arquivo a partir da raiz do projeto minha-cabeleira.
  exit /b 1
)

copy /Y "public\_headers" "%PROJECT%\public\_headers" >nul
if errorlevel 1 goto :error

copy /Y "LEIA-ME-BLOCO-AB-CSP-REPORT-ONLY.md" "%PROJECT%\LEIA-ME-BLOCO-AB-CSP-REPORT-ONLY.md" >nul
if errorlevel 1 goto :error

echo.
echo Bloco AB aplicado com sucesso.
echo CSP em modo REPORT-ONLY: nenhum recurso sera bloqueado.
echo Agora rode:
echo   npm test
echo   npm run build
echo   git status
goto :end

:error
echo.
echo ERRO ao aplicar o Bloco AB.
exit /b 1

:end
endlocal
