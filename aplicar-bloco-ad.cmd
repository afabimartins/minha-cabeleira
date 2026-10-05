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
  echo   aplicar-bloco-ad.cmd "C:\Users\Profissional\Projects\minha-cabeleira"
  exit /b 1
)

copy /Y "%PATCH%src\App\analysis-data.ts" "%PROJECT%\src\App\analysis-data.ts" >nul || goto :error
copy /Y "%PATCH%src\App\analysis-presentation.ts" "%PROJECT%\src\App\analysis-presentation.ts" >nul || goto :error
copy /Y "%PATCH%src\App\live-catalog-analysis.test.ts" "%PROJECT%\src\App\live-catalog-analysis.test.ts" >nul || goto :error
copy /Y "%PATCH%src\App\recommendation-coverage.test.ts" "%PROJECT%\src\App\recommendation-coverage.test.ts" >nul || goto :error

copy /Y "%PATCH%src\domain\analysis-result-engine.ts" "%PROJECT%\src\domain\analysis-result-engine.ts" >nul || goto :error
copy /Y "%PATCH%src\domain\goal-fallback-recommendation.ts" "%PROJECT%\src\domain\goal-fallback-recommendation.ts" >nul || goto :error
copy /Y "%PATCH%src\domain\minimal-routine.ts" "%PROJECT%\src\domain\minimal-routine.ts" >nul || goto :error
copy /Y "%PATCH%src\domain\personalization.ts" "%PROJECT%\src\domain\personalization.ts" >nul || goto :error

copy /Y "%PATCH%src\domain\rules\scalp-oiliness.rule.ts" "%PROJECT%\src\domain\rules\scalp-oiliness.rule.ts" >nul || goto :error
copy /Y "%PATCH%src\domain\rules\scalp-dryness.rule.ts" "%PROJECT%\src\domain\rules\scalp-dryness.rule.ts" >nul || goto :error

copy /Y "%PATCH%src\domain\recommendation-rules\heat-protection.rule.ts" "%PROJECT%\src\domain\recommendation-rules\heat-protection.rule.ts" >nul || goto :error
copy /Y "%PATCH%src\domain\recommendation-rules\chemical-process-care.rule.ts" "%PROJECT%\src\domain\recommendation-rules\chemical-process-care.rule.ts" >nul || goto :error
copy /Y "%PATCH%src\domain\recommendation-rules\scalp-oiliness-support.rule.ts" "%PROJECT%\src\domain\recommendation-rules\scalp-oiliness-support.rule.ts" >nul || goto :error
copy /Y "%PATCH%src\domain\recommendation-rules\scalp-dryness-support.rule.ts" "%PROJECT%\src\domain\recommendation-rules\scalp-dryness-support.rule.ts" >nul || goto :error

copy /Y "%PATCH%supabase\008_mercado_livre_affiliate_links.sql" "%PROJECT%\supabase\008_mercado_livre_affiliate_links.sql" >nul || goto :error
copy /Y "%PATCH%LEIA-ME-BLOCO-AD-COBERTURA-RECOMENDACOES.md" "%PROJECT%\LEIA-ME-BLOCO-AD-COBERTURA-RECOMENDACOES.md" >nul || goto :error

echo.
echo Bloco AD aplicado com sucesso.
echo.
echo Agora, na raiz do projeto, rode:
echo   npm test
echo   npm run build
echo   git status
exit /b 0

:error
echo.
echo ERRO ao aplicar o Bloco AD.
exit /b 1
