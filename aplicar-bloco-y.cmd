@echo off
setlocal

cd /d "%~dp0"
set "ROOT=%CD%\..\..\minha-cabeleira"

if not exist "%ROOT%\package.json" (
  echo ERRO: projeto Minha Cabeleira nao encontrado em:
  echo %ROOT%
  echo.
  echo Execute este arquivo a partir da estrutura indicada no README.
  exit /b 1
)

copy /Y "src\App\ContactPage.tsx" "%ROOT%\src\App\ContactPage.tsx" >nul
copy /Y "src\App\App.tsx" "%ROOT%\src\App\App.tsx" >nul
copy /Y "src\App\SiteFooter.tsx" "%ROOT%\src\App\SiteFooter.tsx" >nul
copy /Y "src\App\SiteSeo.tsx" "%ROOT%\src\App\SiteSeo.tsx" >nul
copy /Y "src\App\site-seo.test.ts" "%ROOT%\src\App\site-seo.test.ts" >nul
copy /Y "scripts\generate-sitemap.mjs" "%ROOT%\scripts\generate-sitemap.mjs" >nul
copy /Y "LEIA-ME-BLOCO-Y-CONTATO.md" "%ROOT%\LEIA-ME-BLOCO-Y-CONTATO.md" >nul
copy /Y "aplicar-bloco-y.cmd" "%ROOT%\aplicar-bloco-y.cmd" >nul

echo Bloco Y aplicado com sucesso.
echo.
echo Agora execute no projeto:
echo   npm test
echo   npm run build
echo   git status

endlocal
