@echo off
chcp 65001 >nul
setlocal

rem ============================================================
rem SUBIR VIAJE A BARCELONA A GITHUB
rem Git + Git LFS
rem ============================================================

cd /d "%~dp0"

echo.
echo ============================================
echo   Subir cambios a GitHub
echo   viajeabarcelonanoviembre
echo ============================================
echo.

rem ------------------------------------------------------------
rem 1. Comprobar repositorio Git
rem ------------------------------------------------------------

if not exist .git (
    echo [INFO] Inicializando repositorio Git local...
    git init -b main

    echo [INFO] Agregando repositorio remoto...
    git remote add origin https://github.com/jigomez-gr/viajeabarcelonanoviembre.git
)

rem ------------------------------------------------------------
rem 2. Comprobar Git LFS
rem ------------------------------------------------------------

git lfs version >nul 2>&1

if errorlevel 1 (
    echo.
    echo [ERROR] Git LFS no esta instalado.
    echo No se subira nada.
    echo.
    pause
    exit /b 1
)

rem Activar Git LFS
git lfs install >nul 2>&1

echo [OK] Git LFS disponible.
echo.

rem ------------------------------------------------------------
rem IMPORTANTE:
rem NO ejecutamos git lfs migrate.
rem La migracion ya se hizo y NO debe repetirse.
rem ------------------------------------------------------------

echo Cambios detectados:
echo.
git status -s
echo.

rem ------------------------------------------------------------
rem 3. Preguntar mensaje
rem ------------------------------------------------------------

set /p MSG="Describe brevemente el cambio (Enter para mensaje automatico): "

if "%MSG%"=="" set MSG=Actualizacion del %date% %time%

rem ------------------------------------------------------------
rem 4. Añadir cambios
rem Git LFS se encarga automaticamente de los MP4 configurados
rem en .gitattributes
rem ------------------------------------------------------------

echo.
echo Anadiendo cambios...
git add -A

if errorlevel 1 (
    echo.
    echo [ERROR] No se pudieron preparar los cambios.
    pause
    exit /b 1
)

rem ------------------------------------------------------------
rem 5. Comprobar si realmente hay algo que guardar
rem ------------------------------------------------------------

git diff --cached --quiet

if not errorlevel 1 (
    echo.
    echo No hay cambios nuevos para crear un commit.
    echo.
    goto SUBIR
)

rem ------------------------------------------------------------
rem 6. Commit
rem ------------------------------------------------------------

echo.
echo Creando commit...

git commit -m "%MSG%"

if errorlevel 1 (
    echo.
    echo [ERROR] No se pudo crear el commit.
    pause
    exit /b 1
)

rem ------------------------------------------------------------
rem 7. Consultar GitHub SIN mezclar nada
rem ------------------------------------------------------------

:SUBIR

echo.
echo Comprobando GitHub...
git fetch origin

if errorlevel 1 (
    echo.
    echo [ERROR] No se pudo consultar GitHub.
    pause
    exit /b 1
)

rem ------------------------------------------------------------
rem 8. Comprobar si GitHub tiene commits nuevos
rem ------------------------------------------------------------

git merge-base --is-ancestor origin/main main >nul 2>&1

if errorlevel 1 (
    echo.
    echo ============================================
    echo   ATENCION
    echo ============================================
    echo.
    echo GitHub contiene cambios que esta copia local
    echo no tiene.
    echo.
    echo NO voy a ejecutar pull ni rebase automaticamente.
    echo Asi evitamos conflictos y problemas con Git LFS.
    echo.
    echo Consulta antes de continuar.
    echo.
    pause
    exit /b 1
)

rem ------------------------------------------------------------
rem 9. Subir
rem ------------------------------------------------------------

echo.
echo Subiendo a GitHub...
echo.

git push -u origin main

if errorlevel 1 (
    echo.
    echo ============================================
    echo   ERROR AL SUBIR
    echo ============================================
    echo.
    echo No se ha modificado tu copia local.
    echo Revisa el mensaje anterior.
    echo.
    pause
    exit /b 1
)

echo.
echo ============================================
echo   SUBIDA CORRECTA
echo ============================================
echo.
echo Los archivos LFS permanecen como archivos
echo reales en tu carpeta de trabajo.
echo.
echo GitHub almacena internamente sus punteros LFS.
echo.
pause