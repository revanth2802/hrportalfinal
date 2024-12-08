@echo off

rem This script activates a virtual environment for Windows.
rem It temporarily modifies the code page, PATH, and environment variables.

rem Save the current code page and switch to UTF-8
for /f "tokens=2 delims=:." %%i in ('"%SystemRoot%\System32\chcp.com"') do (
    set ORIGINAL_CODEPAGE=%%i
)
if defined ORIGINAL_CODEPAGE (
    "%SystemRoot%\System32\chcp.com" 65001 > nul
)

rem Define the virtual environment path
set VIRTUAL_ENV=C:\Users\joash\Desktop\Hr_portal_final\hr_portal\hr_portal_env

rem Backup the current prompt if not already backed up
if not defined PROMPT set PROMPT=$P$G
if defined SAVED_PROMPT set PROMPT=%SAVED_PROMPT%

rem Save the existing Python home and prompt for restoration later
if defined PYTHONHOME set SAVED_PYTHONHOME=%PYTHONHOME%
set PYTHONHOME=

set SAVED_PROMPT=%PROMPT%
set PROMPT=(hr_portal_env) %PROMPT%

rem Backup the current PATH, or set it if not already saved
if defined SAVED_PATH set PATH=%SAVED_PATH%
if not defined SAVED_PATH set SAVED_PATH=%PATH%

rem Update the PATH to include the virtual environment's Scripts directory
set PATH=%VIRTUAL_ENV%\Scripts;%PATH%

rem Display the virtual environment prompt
set ENV_PROMPT=(hr_portal_env)

:EXIT
rem Restore the original code page if it was modified
if defined ORIGINAL_CODEPAGE (
    "%SystemRoot%\System32\chcp.com" %ORIGINAL_CODEPAGE% > nul
    set ORIGINAL_CODEPAGE=
)