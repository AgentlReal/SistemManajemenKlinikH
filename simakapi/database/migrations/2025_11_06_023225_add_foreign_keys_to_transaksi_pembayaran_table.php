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
        Schema::table('transaksi_pembayaran', function (Blueprint $table) {
            $table->foreign(['id_kasir'], 'transaksi_pembayaran_ibfk_1')->references(['id_kasir'])->on('kasir')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('transaksi_pembayaran', function (Blueprint $table) {
            $table->dropForeign('transaksi_pembayaran_ibfk_1');
        });
    }
};
