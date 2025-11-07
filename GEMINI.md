
# GEMINI.md

## Project Overview

This project is a clinic management system, named "Sistem Manajemen Klinik Haikhah". It consists of a React frontend and a Laravel backend.

**Frontend:**

*   **Framework:** React with Vite and TypeScript
*   **Styling:** Tailwind CSS
*   **State Management:** React Query
*   **Forms:** React Hook Form with Zod for validation
*   **UI Components:** Radix UI, Lucide React, Recharts, Sonner

**Backend:**

*   **Framework:** Laravel 11
*   **Authentication:** Laravel Sanctum
*   **Database:** SQLite (based on the `database/database.sqlite` file)

## Building and Running

### Frontend (`simak`)

1.  **Install dependencies:**
    ```bash
    npm install
    ```
2.  **Run in development mode:**
    ```bash
    npm run dev
    ```
3.  **Build for production:**
    ```bash
    npm run build
    ```
4.  **Lint the code:**
    ```bash
    npm run lint
    ```

### Backend (`simakapi`)

1.  **Install dependencies:**
    ```bash
    composer install
    ```
2.  **Run in development mode:**
    ```bash
    composer run dev
    ```
    This will start the Laravel development server, the queue listener, the log viewer, and the Vite development server for the frontend assets.

## Development Conventions

*   The frontend follows the standard structure of a Vite-based React application.
*   The backend follows the standard structure of a Laravel application.
*   The frontend and backend communicate via a REST API.
*   Authentication is handled by Laravel Sanctum, which uses tokens.
*   The API routes are defined in `simakapi/routes/api.php`.
*   The frontend components are located in `simak/src/components`.
*   The main application logic for the frontend is in `simak/src/App.tsx`.
