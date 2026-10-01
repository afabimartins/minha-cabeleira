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

copy /Y "LEIA-ME-BLOCO-AA-HEADERS-SEGURANCA.md" "%PROJECT%\LEIA-ME-BLOCO-AA-HEADERS-SEGURANCA.md" >nul
if errorlevel 1 goto :error

echo.
echo Bloco AA aplicado com sucesso.
echo Agora rode:
echo   npm test
echo   npm run build
echo   git status
goto :end

:error
echo.
echo ERRO ao aplicar o Bloco AA.
exit /b 1

:end
endlocal
