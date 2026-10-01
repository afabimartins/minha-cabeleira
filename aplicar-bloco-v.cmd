@echo off
setlocal

if not exist "src\App\App.tsx" (
  echo ERRO: execute este arquivo na raiz do projeto Minha Cabeleira.
  exit /b 1
)

copy /Y "%~dp0src\App\MethodologyPage.tsx" "src\App\MethodologyPage.tsx" >nul
copy /Y "%~dp0src\App\App.tsx" "src\App\App.tsx" >nul
copy /Y "%~dp0src\App\SiteSeo.tsx" "src\App\SiteSeo.tsx" >nul
copy /Y "%~dp0src\App\site-seo.test.ts" "src\App\site-seo.test.ts" >nul
copy /Y "%~dp0src\App\SiteFooter.tsx" "src\App\SiteFooter.tsx" >nul
copy /Y "%~dp0scripts\generate-sitemap.mjs" "scripts\generate-sitemap.mjs" >nul

echo Bloco V aplicado com sucesso.
echo Agora rode: npm test
echo Depois: npm run build
endlocal
