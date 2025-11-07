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
        Schema::create('resep_dokter', function (Blueprint $table) {
            $table->integer('id_resep_dokter', true);
            $table->char('id_dokter', 4)->nullable()->index('id_dokter');
            $table->integer('id_rekam_medis')->nullable()->index('id_rekam_medis');
            $table->string('nama_obat', 100)->nullable();
            $table->text('keterangan_resep')->nullable();
            $table->dateTime('tanggal_resep')->nullable()->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('resep_dokter');
    }
};
