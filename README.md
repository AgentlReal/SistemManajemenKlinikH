# Sistem Manajemen Klinik Haikhah

Sebuah sistem manajemen klinik yang dibangun menggunakan frontend React dan backend Laravel.

## Struktur Proyek

Proyek ini terbagi menjadi dua direktori utama:

-   `simak/`: Berisi kode sumber untuk aplikasi frontend (React).
-   `simakapi/`: Berisi kode sumber untuk API backend (Laravel).

## Teknologi yang Digunakan

### Frontend (`simak`)

-   **Framework:** React dengan Vite dan TypeScript
-   **Styling:** Tailwind CSS
-   **Manajemen State:** React Query
-   **Formulir:** React Hook Form dengan Zod untuk validasi
-   **Komponen UI:** Radix UI, Lucide React, Recharts, Sonner

### Backend (`simakapi`)

-   **Framework:** Laravel 11
-   **Autentikasi:** Laravel Sanctum
-   **Database:** SQLite

## Instalasi dan Konfigurasi

### Prasyarat

-   Node.js dan npm
-   PHP dan Composer

### Langkah Persiapan

1.  **Instal Dependensi Utama:**
    Perintah ini akan menginstal `concurrently` yang dibutuhkan untuk menjalankan kedua aplikasi secara bersamaan.
    ```bash
    npm install
    ```

2.  **Konfigurasi Database dan Lingkungan Backend:**
    -   Impor berkas `simakapi.sql` ke dalam sistem database Anda (contoh: MySQL, PostgreSQL).
    -   Salin berkas `.env.example` menjadi `.env` di dalam direktori `simakapi`.
    -   Sesuaikan isi berkas `.env` tersebut, terutama bagian koneksi database (`DB_*`), agar sesuai dengan pengaturan database Anda.

3.  **Instal Dependensi Frontend dan Backend:**
    -   Masuk ke direktori `simak` dan jalankan `npm install` untuk memasang dependensi frontend.
    -   Masuk ke direktori `simakapi` dan jalankan `composer install` untuk memasang dependensi backend.

## Menjalankan Aplikasi

Setelah semua langkah persiapan selesai, kembali ke direktori utama (root) proyek. Kemudian, jalankan perintah berikut untuk menjalankan aplikasi frontend dan backend secara bersamaan:

```bash
npm run dev
```

## Konvensi Pengembangan

-   Pengembangan frontend dan backend dilakukan secara terpisah di dalam direktorinya masing-masing.
-   Komunikasi antara frontend dan backend terjalin melalui REST API.
-   Proses autentikasi pengguna ditangani oleh Laravel Sanctum.
-   Semua rute API didefinisikan dalam berkas `simakapi/routes/api.php`.
-   Komponen-komponen antarmuka (UI) untuk frontend berada di direktori `simak/src/components`.
-   Logika utama aplikasi frontend dapat ditemukan pada berkas `simak/src/App.tsx`.
