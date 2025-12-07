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
        Schema::create('jadwal_karyawan', function (Blueprint $table) {
            $table->integer('id_jadwal', true);
            $table->char('id_resepsionis', 4)->nullable()->index('id_resepsionis');
            $table->char('id_dokter', 4)->nullable()->index('id_dokter');
            $table->char('id_staf_lab', 4)->nullable()->index('id_staf_lab');
            $table->char('id_kasir', 4)->nullable()->index('id_kasir');
            $table->time('jam_mulai')->nullable();
            $table->time('jam_selesai')->nullable();
            $table->boolean('senin')->nullable()->default(false);
            $table->boolean('selasa')->nullable()->default(false);
            $table->boolean('rabu')->nullable()->default(false);
            $table->boolean('kamis')->nullable()->default(false);
            $table->boolean('jumat')->nullable()->default(false);
            $table->boolean('sabtu')->nullable()->default(false);
            $table->boolean('minggu')->nullable()->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('jadwal_karyawan');
    }
};
