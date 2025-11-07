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
        Schema::table('antrian', function (Blueprint $table) {
            $table->foreign(['id_resepsionis'], 'antrian_ibfk_1')->references(['id_resepsionis'])->on('resepsionis')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['id_dokter'], 'antrian_ibfk_2')->references(['id_dokter'])->on('dokter')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['id_pasien'], 'antrian_ibfk_3')->references(['id_pasien'])->on('pasien')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('antrian', function (Blueprint $table) {
            $table->dropForeign('antrian_ibfk_1');
            $table->dropForeign('antrian_ibfk_2');
            $table->dropForeign('antrian_ibfk_3');
        });
    }
};
