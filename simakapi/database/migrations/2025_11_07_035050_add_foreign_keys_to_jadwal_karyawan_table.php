<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('jadwal_karyawan', function (Blueprint $table) {
            $table->foreign(['id_resepsionis'], 'jadwal_karyawan_ibfk_1')->references(['id_resepsionis'])->on('resepsionis')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['id_dokter'], 'jadwal_karyawan_ibfk_2')->references(['id_dokter'])->on('dokter')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['id_staf_lab'], 'jadwal_karyawan_ibfk_3')->references(['id_staf_lab'])->on('staf_lab')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['id_kasir'], 'jadwal_karyawan_ibfk_4')->references(['id_kasir'])->on('kasir')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('jadwal_karyawan', function (Blueprint $table) {
            $table->dropForeign('jadwal_karyawan_ibfk_1');
            $table->dropForeign('jadwal_karyawan_ibfk_2');
            $table->dropForeign('jadwal_karyawan_ibfk_3');
            $table->dropForeign('jadwal_karyawan_ibfk_4');
        });
    }
};
