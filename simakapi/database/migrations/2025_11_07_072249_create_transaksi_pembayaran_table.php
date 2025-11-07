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
        Schema::create('transaksi_pembayaran', function (Blueprint $table) {
            $table->integer('id_pembayaran', true);
            $table->integer('id_antrian')->nullable()->index('fk_transaksi_pembayaran_antrian');
            $table->char('id_kasir', 4)->nullable()->index('id_kasir');
            $table->enum('status_pembayaran', ['Lunas', 'Belum Lunas'])->nullable()->default('Belum Lunas');
            $table->enum('metode_pembayaran', ['Tunai', 'Transfer bank'])->nullable();
            $table->dateTime('tanggal_transaksi')->nullable()->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transaksi_pembayaran');
    }
};
