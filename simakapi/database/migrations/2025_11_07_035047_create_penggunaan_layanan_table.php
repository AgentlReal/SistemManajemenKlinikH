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
        Schema::create('penggunaan_layanan', function (Blueprint $table) {
            $table->integer('id_penggunaan_layanan', true);
            $table->integer('id_pembayaran')->nullable()->index('id_pembayaran');
            $table->integer('id_tarif_layanan')->nullable()->index('id_tarif_layanan');
            $table->integer('kuantitas')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('penggunaan_layanan');
    }
};
