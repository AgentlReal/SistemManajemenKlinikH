<?php

namespace App\Providers;

use App\Models\Dokter;
use App\Models\JadwalKaryawan;
use App\Models\Kasir;
use App\Models\Resepsionis;
use App\Models\StafLab;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Resepsionis::deleting(function ($resepsionis) {
            JadwalKaryawan::where('id_resepsionis', $resepsionis->id_resepsionis)->delete();
        });

        Dokter::deleting(function ($dokter) {
            JadwalKaryawan::where('id_dokter', $dokter->id_dokter)->delete();
        });

        Kasir::deleting(function ($kasir) {
            JadwalKaryawan::where('id_kasir', $kasir->id_kasir)->delete();
        });

        StafLab::deleting(function ($stafLab) {
            JadwalKaryawan::where('id_staf_lab', $stafLab->id_staf_lab)->delete();
        });
    }
}
