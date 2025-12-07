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
        Schema::create('staf_lab', function (Blueprint $table) {
            $table->char('id_staf_lab', 4)->primary();
            $table->string('nama', 150)->nullable();
            $table->date('tanggal_lahir')->nullable();
            $table->string('nomor_telepon', 20)->nullable();
            $table->integer('gaji')->nullable();
            $table->text('alamat')->nullable();
            $table->string('nomor_lisensi', 50)->nullable()->unique('nomor_lisensi');
            $table->enum('jenis_kelamin', ['Laki-laki', 'Perempuan'])->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('staf_lab');
    }
};
