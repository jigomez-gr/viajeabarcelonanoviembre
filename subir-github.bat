@echo off
setlocal EnableExtensions

title SUBIR PROYECTO A GITHUB CON GIT LFS

echo.
echo ============================================================
echo        SUBIR PROYECTO A GITHUB - GIT + GIT LFS
echo ============================================================
echo.

REM ------------------------------------------------------------
REM 1. COMPROBAR QUE ESTAMOS EN UN REPOSITORIO GIT
REM ------------------------------------------------------------

git rev-parse --is-inside-work-tree >nul 2>&1

if errorlevel 1 (
    echo ERROR:
    echo Esta carpeta no parece ser un repositorio Git.
    echo.
    echo Ejecuta este BAT desde la carpeta raiz del proyecto.
    echo.
    pause
    exit /b 1
)

echo [OK] Repositorio Git encontrado.
echo.


REM ------------------------------------------------------------
REM 2. COMPROBAR GIT LFS
REM ------------------------------------------------------------

echo Comprobando Git LFS...

git lfs version >nul 2>&1

if errorlevel 1 (
    echo.
    echo ERROR: Git LFS no esta instalado.
    echo.
    echo Puedes instalarlo con:
    echo.
    echo winget install GitHub.GitLFS
    echo.
    pause
    exit /b 1
)

echo [OK] Git LFS instalado.
echo.


REM ------------------------------------------------------------
REM 3. INICIALIZAR GIT LFS
REM ------------------------------------------------------------

echo Inicializando Git LFS...

git lfs install

if errorlevel 1 goto ERROR_GENERAL

echo.


REM ------------------------------------------------------------
REM 4. CONFIGURAR FORMATOS GRANDES PARA LFS
REM ------------------------------------------------------------

echo Configurando archivos multimedia para Git LFS...

git lfs track "*.mp4"
git lfs track "*.mov"
git lfs track "*.webm"

echo.
echo [OK] MP4, MOV y WEBM gestionados mediante Git LFS.
echo.


REM ------------------------------------------------------------
REM 5. ANADIR .GITATTRIBUTES
REM ------------------------------------------------------------

if exist ".gitattributes" (
    git add .gitattributes
)

REM ------------------------------------------------------------
REM 6. DETECTAR ARCHIVOS MP4 QUE YA ESTUVIERAN EN GIT NORMAL
REM ------------------------------------------------------------

echo Comprobando archivos grandes ya incluidos en Git...
echo.

git lfs migrate info --include="*.mp4,*.mov,*.webm"

echo.


REM ------------------------------------------------------------
REM 7. MIGRAR VIDEOS YA PRESENTES EN COMMITS LOCALES
REM
REM Esto soluciona casos como itinerario-4.mp4 que ya estaba
REM incluido en un commit normal antes de configurar LFS.
REM ------------------------------------------------------------

echo Migrando videos existentes a Git LFS...
echo.

git lfs migrate import --include="*.mp4,*.mov,*.webm" --include-ref=refs/heads/main

if errorlevel 1 (
    echo.
    echo ADVERTENCIA:
    echo No se ha podido realizar la migracion automatica.
    echo Continuaremos y comprobaremos el repositorio.
    echo.
)

echo.


REM ------------------------------------------------------------
REM 8. ANADIR TODOS LOS CAMBIOS
REM ------------------------------------------------------------

echo Anadiendo archivos...

git add -A

if errorlevel 1 goto ERROR_GENERAL

echo [OK] Archivos preparados.
echo.


REM ------------------------------------------------------------
REM 9. MOSTRAR ARCHIVOS LFS
REM ------------------------------------------------------------

echo ============================================================
echo ARCHIVOS GESTIONADOS POR GIT LFS
echo ============================================================
echo.

git lfs ls-files

echo.


REM ------------------------------------------------------------
REM 10. MOSTRAR ESTADO
REM ------------------------------------------------------------

echo ============================================================
echo ESTADO DEL REPOSITORIO
echo ============================================================
echo.

git status

echo.


REM ------------------------------------------------------------
REM 11. COMPROBAR SI HAY CAMBIOS PARA COMMIT
REM ------------------------------------------------------------

git diff --cached --quiet

if errorlevel 1 (
    goto HACER_COMMIT
) else (
    goto SIN_CAMBIOS
)


:HACER_COMMIT

echo ============================================================
echo CREANDO COMMIT
echo ============================================================
echo.

set "FECHA=%date% %time%"

git commit -m "Actualizacion %FECHA%"

if errorlevel 1 goto ERROR_GENERAL

echo.
echo [OK] Commit creado.
echo.

goto PULL


:SIN_CAMBIOS

echo No hay cambios nuevos que guardar en un commit.
echo.

goto PULL


REM ------------------------------------------------------------
REM 12. ACTUALIZAR DESDE GITHUB
REM ------------------------------------------------------------

:PULL

echo ============================================================
echo ACTUALIZANDO DESDE GITHUB
echo ============================================================
echo.

git pull --rebase origin main

if errorlevel 1 (
    echo.
    echo ============================================================
    echo ERROR EN GIT PULL
    echo ============================================================
    echo.
    echo Puede existir un conflicto con GitHub.
    echo.
    echo NO se realizara el push automaticamente.
    echo.
    pause
    exit /b 1
)

echo.
echo [OK] Repositorio actualizado.
echo.


REM ------------------------------------------------------------
REM 13. PUSH
REM ------------------------------------------------------------

echo ============================================================
echo SUBIENDO A GITHUB
echo ============================================================
echo.

git push origin main

if errorlevel 1 goto ERROR_PUSH


REM ------------------------------------------------------------
REM 14. COMPROBAR LFS
REM ------------------------------------------------------------

echo.
echo ============================================================
echo COMPROBANDO GIT LFS
echo ============================================================
echo.

git lfs status

echo.


REM ------------------------------------------------------------
REM FINAL
REM ------------------------------------------------------------

echo ============================================================
echo.
echo              TODO CORRECTO
echo.
echo El proyecto se ha subido correctamente a GitHub.
echo Los videos grandes estan gestionados mediante Git LFS.
echo.
echo ============================================================
echo.

pause
exit /b 0


:ERROR_PUSH

echo.
echo ============================================================
echo ERROR AL SUBIR A GITHUB
echo ============================================================
echo.
echo GitHub ha rechazado el push.
echo.
echo Comprueba los mensajes anteriores.
echo.
echo Archivos LFS actuales:
echo.

git lfs ls-files

echo.
pause
exit /b 1


:ERROR_GENERAL

echo.
echo ============================================================
echo SE HA PRODUCIDO UN ERROR
echo ============================================================
echo.
echo Se ha detenido el proceso para evitar problemas
echo con el repositorio.
echo.
pause
exit /b 1