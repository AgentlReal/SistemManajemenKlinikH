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
        Schema::create('klinik', function (Blueprint $table) {
            $table->integer('id_klinik', true);
            $table->string('nama_klinik')->nullable();
            $table->string('izin_operasional', 100)->nullable();
            $table->text('alamat')->nullable();
            $table->string('nomor_telepon', 50)->nullable();
            $table->string('email', 100)->nullable();
            $table->string('jam_operasional', 100)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('klinik');
    }
};
