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
        Schema::create('antrian', function (Blueprint $table) {
            $table->integer('id_antrian', true);
            $table->char('id_resepsionis', 4)->nullable()->index('id_resepsionis');
            $table->char('id_dokter', 4)->nullable()->index('id_dokter');
            $table->integer('id_pasien')->nullable()->index('id_pasien');
            $table->dateTime('tanggal')->nullable()->useCurrent();
            $table->text('keluhan')->nullable();
            $table->string('nomor_antrian', 10)->nullable();
            $table->enum('keterangan', ['Menunggu', 'Berlangsung', 'Selesai', 'Batal'])->nullable()->default('Menunggu');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('antrian');
    }
};
