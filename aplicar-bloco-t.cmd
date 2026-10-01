@echo off
setlocal

REM Execute este arquivo tendo a raiz do projeto Minha Cabeleira como pasta atual.
set "PATCH=%~dp0"
set "PROJECT=%CD%"

if not exist "%PROJECT%\src\App\HomePage.tsx" (
  echo.
  echo ERRO: execute este arquivo a partir da raiz do projeto Minha Cabeleira.
  echo Pasta atual: %PROJECT%
  echo.
  exit /b 1
)

echo Aplicando Bloco T...

copy /Y "%PATCH%src\App\HomePage.tsx" "%PROJECT%\src\App\HomePage.tsx" >nul
copy /Y "%PATCH%src\App\BrandMark.tsx" "%PROJECT%\src\App\BrandMark.tsx" >nul
copy /Y "%PATCH%src\App\AnalysisResultView.tsx" "%PROJECT%\src\App\AnalysisResultView.tsx" >nul

copy /Y "%PATCH%src\assets\hero-hair-anik-paul.webp" "%PROJECT%\src\assets\hero-hair-anik-paul.webp" >nul
copy /Y "%PATCH%src\assets\minha-cabeleira-logo-mark-ui.png" "%PROJECT%\src\assets\minha-cabeleira-logo-mark-ui.png" >nul
copy /Y "%PATCH%src\assets\hair-care-tima-miroshnichenko.webp" "%PROJECT%\src\assets\hair-care-tima-miroshnichenko.webp" >nul
copy /Y "%PATCH%src\assets\hair-coily-augusto-carneiro.webp" "%PROJECT%\src\assets\hair-coily-augusto-carneiro.webp" >nul
copy /Y "%PATCH%src\assets\hair-man-alax-matias.webp" "%PROJECT%\src\assets\hair-man-alax-matias.webp" >nul
copy /Y "%PATCH%src\assets\hair-straight-hanna-pad.webp" "%PROJECT%\src\assets\hair-straight-hanna-pad.webp" >nul
copy /Y "%PATCH%src\assets\hair-wavy-caique-araujo.webp" "%PROJECT%\src\assets\hair-wavy-caique-araujo.webp" >nul

copy /Y "%PATCH%LEIA-ME-BLOCO-T-PERFORMANCE.md" "%PROJECT%\LEIA-ME-BLOCO-T-PERFORMANCE.md" >nul

echo.
echo Bloco T aplicado.
echo Agora rode:
echo   npm test
echo   npm run build
echo   git status
endlocal
