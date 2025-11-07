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
        Schema::create('tarif_layanan', function (Blueprint $table) {
            $table->integer('id_tarif_layanan', true);
            $table->enum('tipe_layanan', ['Dokter', 'Laboratorium'])->nullable();
            $table->integer('Harga')->nullable();
            $table->string('nama_layanan', 100)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tarif_layanan');
    }
};
