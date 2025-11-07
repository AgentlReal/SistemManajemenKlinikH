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
        Schema::create('hasil_lab', function (Blueprint $table) {
            $table->integer('id_hasil_lab', true);
            $table->char('id_staf_lab', 4)->nullable()->index('id_staf_lab');
            $table->integer('id_rekam_medis')->nullable()->index('id_rekam_medis');
            $table->integer('id_tarif_layanan')->nullable()->index('id_tarif_layanan');
            $table->dateTime('tanggal_pemeriksaan')->nullable()->useCurrent();
            $table->text('keterangan')->nullable();
            $table->string('hasil_pemeriksaan', 100)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('hasil_lab');
    }
};
