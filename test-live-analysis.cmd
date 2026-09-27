@echo off
setlocal
cd /d "%~dp0"

echo.
echo ==============================================
echo  MINHA CABELEIRA - TESTE AUTOMATICO AO VIVO
echo ==============================================
echo.
echo Este teste:
echo - consulta o catalogo REAL no Supabase
echo - simula as 20 respostas do questionario
echo - executa o motor de analise
echo - exige damage_protection
echo - confere Vult + Elseve
echo - confere a ordem por menor preco
echo.

call npx vitest run src\App\live-catalog-analysis.test.ts --reporter=verbose

if errorlevel 1 (
  echo.
  echo ==============================================
  echo  TESTE FALHOU
  echo ==============================================
  echo Veja a mensagem acima para identificar a etapa.
  exit /b 1
)

echo.
echo ==============================================
echo  TESTE AUTOMATICO PASSOU
echo ==============================================
echo.
exit /b 0
