@echo off
echo Creating complete project structure for Exit Interview System...

REM Create main directories
mkdir src
mkdir src\app
mkdir src\components
mkdir src\styles
mkdir src\services
mkdir src\types
mkdir src\utils
mkdir src\hooks
mkdir src\constants
mkdir public

REM Create app directory structure
mkdir src\app\dashboard
mkdir src\app\exit-interviews
mkdir src\app\auth
mkdir src\app\admin
mkdir src\app\reports

REM Create component directory structure
mkdir src\components\ui
mkdir src\components\forms
mkdir src\components\charts
mkdir src\components\layout
mkdir src\components\modals

REM Create placeholder files in app directory
echo // App root layout > src\app\layout.tsx
echo // Homepage > src\app\page.tsx
echo // Dashboard layout > src\app\dashboard\layout.tsx
echo // Dashboard page > src\app\dashboard\page.tsx
echo // Exit interviews layout > src\app\exit-interviews\layout.tsx
echo // Exit interviews page > src\app\exit-interviews\page.tsx
echo // Auth layout > src\app\auth\layout.tsx
echo // Auth page > src\app\auth\page.tsx
echo // Admin layout > src\app\admin\layout.tsx
echo // Admin page > src\app\admin\page.tsx
echo // Reports layout > src\app\reports\layout.tsx
echo // Reports page > src\app\reports\page.tsx

REM Create placeholder files in components directory
echo // Navbar component > src\components\layout\Navbar.tsx
echo // Sidebar component > src\components\layout\Sidebar.tsx
echo // DashboardLayout component > src\components\layout\DashboardLayout.tsx

echo // FormStepper component > src\components\forms\FormStepper.tsx
echo // PersonalInfoForm component > src\components\forms\PersonalInfoForm.tsx
echo // ExitReasonsForm component > src\components\forms\ExitReasonsForm.tsx
echo // ExperienceFeedbackForm component > src\components\forms\ExperienceFeedbackForm.tsx
echo // ReviewSubmitForm component > src\components\forms\ReviewSubmitForm.tsx

echo // ExitTrendChart component > src\components\charts\ExitTrendChart.tsx
echo // ExitReasonsPieChart component > src\components\charts\ExitReasonsPieChart.tsx
echo // DepartmentExitChart component > src\components\charts\DepartmentExitChart.tsx
echo // TrendLineChart component > src\components\charts\TrendLineChart.tsx

REM Create service files
echo // API service functions > src\services\api.ts
echo // Service index > src\services\index.ts

REM Create utility and type files
echo // TypeScript types > src\types\index.ts
echo // Utility functions > src\utils\index.ts
echo // Global styles > src\styles\globals.css

REM Create config files
echo // Tailwind config > tailwind.config.js
echo // PostCSS config > postcss.config.js
echo // TypeScript config > tsconfig.json
echo // Package.json > package.json
echo // README > README.md

echo Project structure created successfully!
echo.
echo Remember to copy the actual file content from your code editor into these placeholder files.