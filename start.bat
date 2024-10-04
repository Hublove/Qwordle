@echo off

:: Start the development server
start "Dev" bun run dev

:: Change to the database directory and start PocketBase
cd .\database\
start "Pocketbase" pocketbase.exe serve

:: Change to the backend directory and start the server
cd ..\backend\
start "Backend" bun .\server.js

:: Keep the window open
pause