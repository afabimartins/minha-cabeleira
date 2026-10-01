@echo off
setlocal

set "PATCH=%~dp0"

echo.
echo ========================================
echo  Minha Cabeleira - BLOCO U
echo  LCP + contraste da Home
echo ========================================
echo.

if not exist ".\src\App\HomePage.tsx" (
  echo ERRO: execute este arquivo na raiz do projeto Minha Cabeleira.
  exit /b 1
)

if not exist ".\public" mkdir ".\public"
if not exist ".\src\assets" mkdir ".\src\assets"

copy /Y "%PATCH%index.html" ".\index.html" >nul || exit /b 1
copy /Y "%PATCH%src\App\HomePage.tsx" ".\src\App\HomePage.tsx" >nul || exit /b 1
copy /Y "%PATCH%src\App\styles.css" ".\src\App\styles.css" >nul || exit /b 1
copy /Y "%PATCH%src\assets\minha-cabeleira-logo-mark-ui.png" ".\src\assets\minha-cabeleira-logo-mark-ui.png" >nul || exit /b 1
copy /Y "%PATCH%public\hero-hair-480.webp" ".\public\hero-hair-480.webp" >nul || exit /b 1
copy /Y "%PATCH%public\hero-hair-768.webp" ".\public\hero-hair-768.webp" >nul || exit /b 1
copy /Y "%PATCH%public\hero-hair-1024.webp" ".\public\hero-hair-1024.webp" >nul || exit /b 1
copy /Y "%PATCH%public\hero-hair-1280.webp" ".\public\hero-hair-1280.webp" >nul || exit /b 1

echo BLOCO U aplicado com sucesso.
echo.
echo Agora execute:
echo   npm test
echo   npm run build
echo   git status
echo.
endlocal
