@echo off
setlocal
set "PROJECT=%CD%"
cd /d "%~dp0"

copy /Y "src\App\PrivacyPage.tsx" "%PROJECT%\src\App\PrivacyPage.tsx" >nul
if errorlevel 1 goto :error

copy /Y "src\App\ContactPage.tsx" "%PROJECT%\src\App\ContactPage.tsx" >nul
if errorlevel 1 goto :error

copy /Y "LEIA-ME-BLOCO-Z-PRIVACIDADE.md" "%PROJECT%\LEIA-ME-BLOCO-Z-PRIVACIDADE.md" >nul
if errorlevel 1 goto :error

echo.
echo Bloco Z aplicado com sucesso.
echo Agora rode:
echo   npm test
echo   npm run build
echo   git status
goto :end

:error
echo.
echo ERRO ao aplicar o Bloco Z.
echo Confirme que este comando foi executado a partir da raiz do projeto minha-cabeleira.
exit /b 1

:end
endlocal
