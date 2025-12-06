
# Sistem Manajemen Klinik Haikhah

This is a clinic management system built with a React frontend and a Laravel backend.

## Project Structure

The project is divided into two main parts:

-   `simak/`: The React frontend application.
-   `simakapi/`: The Laravel backend API.

## Tech Stack

### Frontend (`simak`)

-   **Framework:** React with Vite and TypeScript
-   **Styling:** Tailwind CSS
-   **State Management:** React Query
-   **Forms:** React Hook Form with Zod for validation
-   **UI Components:** Radix UI, Lucide React, Recharts, Sonner

### Backend (`simakapi`)

-   **Framework:** Laravel 11
-   **Authentication:** Laravel Sanctum
-   **Database:** SQLite

## Getting Started

### Prerequisites

-   Node.js and npm (for the frontend)
-   PHP and Composer (for the backend)

### Frontend (`simak`)

1.  Navigate to the `simak` directory:
    ```bash
    cd simak
    ```
2.  Install the dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```

### Backend (`simakapi`)

1.  Navigate to the `simakapi` directory:
    ```bash
    cd simakapi
    ```
2.  Install the dependencies:
    ```bash
    composer install
    ```
3.  Run the development server:
    ```bash
    composer run dev
    ```

## Development Conventions

-   The frontend and backend are developed separately.
-   The frontend communicates with the backend via a REST API.
-   Authentication is handled by Laravel Sanctum.
-   API routes are defined in `simakapi/routes/api.php`.
-   Frontend components are located in `simak/src/components`.
-   The main application logic for the frontend is in `simak/src/App.tsx`.
