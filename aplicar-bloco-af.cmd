@echo off
setlocal

set "PATCH=%~dp0"
set "PROJECT=%~1"

if "%PROJECT%"=="" set "PROJECT=%CD%"

if not exist "%PROJECT%\src\App" (
  echo.
  echo ERRO: nao encontrei a pasta src\App em:
  echo   %PROJECT%
  echo.
  echo Rode este arquivo passando a pasta do projeto, por exemplo:
  echo   aplicar-bloco-af.cmd "C:\Users\Profissional\Projects\minha-cabeleira"
  exit /b 1
)

copy /Y "%PATCH%src\App\AnalysisResultView.tsx" "%PROJECT%\src\App\AnalysisResultView.tsx" >nul || goto :error
copy /Y "%PATCH%src\App\styles.css" "%PROJECT%\src\App\styles.css" >nul || goto :error
copy /Y "%PATCH%src\App\analysis-pdf.ts" "%PROJECT%\src\App\analysis-pdf.ts" >nul || goto :error

copy /Y "%PATCH%src\domain\analysis-result.ts" "%PROJECT%\src\domain\analysis-result.ts" >nul || goto :error
copy /Y "%PATCH%src\domain\routine-product-selection.ts" "%PROJECT%\src\domain\routine-product-selection.ts" >nul || goto :error
copy /Y "%PATCH%src\domain\routine-product-selection.test.ts" "%PROJECT%\src\domain\routine-product-selection.test.ts" >nul || goto :error

copy /Y "%PATCH%e2e\site.spec.ts" "%PROJECT%\e2e\site.spec.ts" >nul || goto :error
copy /Y "%PATCH%LEIA-ME-BLOCO-AF-SEPARACAO-TECNICA-PRODUTOS.md" "%PROJECT%\LEIA-ME-BLOCO-AF-SEPARACAO-TECNICA-PRODUTOS.md" >nul || goto :error

echo.
echo Bloco AF aplicado com sucesso.
echo.
echo Agora, na raiz do projeto, rode:
echo   npm test
echo   npm run build
echo.
echo Depois, valide uma analise completa e o PDF localmente antes do deploy.
exit /b 0

:error
echo.
echo ERRO ao aplicar o Bloco AF.
exit /b 1
