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
        Schema::create('kasir', function (Blueprint $table) {
            $table->char('id_kasir', 4)->primary();
            $table->string('nama', 150)->nullable();
            $table->date('tanggal_lahir')->nullable();
            $table->string('nomor_telepon', 20)->nullable()->unique('nomor_telepon');
            $table->text('alamat')->nullable();
            $table->integer('gaji')->nullable();
            $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan'])->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kasir');
    }
};
