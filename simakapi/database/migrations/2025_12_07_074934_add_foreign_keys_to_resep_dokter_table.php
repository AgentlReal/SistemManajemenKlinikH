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
        Schema::table('resep_dokter', function (Blueprint $table) {
            $table->foreign(['id_dokter'], 'resep_dokter_ibfk_1')->references(['id_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign(['id_rekam_medis'], 'resep_dokter_ibfk_2')->references(['id_rekam_medis'])->on('rekam_medis')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['id_pembayaran'], 'resep_dokter_ibfk_3')->references(['id_pembayaran'])->on('transaksi_pembayaran')->onUpdate('cascade')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('resep_dokter', function (Blueprint $table) {
            $table->dropForeign('resep_dokter_ibfk_1');
            $table->dropForeign('resep_dokter_ibfk_2');
            $table->dropForeign('resep_dokter_ibfk_3');
        });
    }
};
