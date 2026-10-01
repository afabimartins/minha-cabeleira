@echo off
setlocal
cd /d "%~dp0"
copy /Y "src\App\ContactPage.tsx" "%CD%\..\..\minha-cabeleira\src\App\ContactPage.tsx" >nul
copy /Y "LEIA-ME-BLOCO-Y1-CONTATO-EMAIL.md" "%CD%\..\..\minha-cabeleira\LEIA-ME-BLOCO-Y1-CONTATO-EMAIL.md" >nul
echo.
echo Bloco Y.1 aplicado.
echo Agora rode:
echo   npm test
echo   npm run build
echo   git status
endlocal
