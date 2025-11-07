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
        Schema::create('dokter', function (Blueprint $table) {
            $table->char('id_dokter', 4)->primary();
            $table->integer('id_poli')->nullable()->index('id_poli');
            $table->string('nama', 150)->nullable();
            $table->date('tanggal_lahir')->nullable();
            $table->integer('gaji')->nullable();
            $table->string('nomor_telepon', 20)->nullable();
            $table->string('spesialis', 50)->nullable();
            $table->string('nomor_lisensi', 50)->nullable()->unique('nomor_lisensi');
            $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan'])->nullable();
            $table->text('alamat')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dokter');
    }
};
