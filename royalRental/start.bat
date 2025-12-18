@echo off
echo Installing dependencies...
call npm install
echo.
echo Starting Royal Rental server...
echo.
echo ===================================
echo Server URL: http://localhost:3000
echo Admin Portal: http://localhost:3000/admin.html
echo Agent Portal: http://localhost:3000/agent.html
echo.
echo Admin Credentials:
echo Email: admin@royalrental.com
echo Password: admin123
echo ===================================
echo.
npm run dev
