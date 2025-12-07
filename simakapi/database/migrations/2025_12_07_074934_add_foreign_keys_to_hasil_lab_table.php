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
        Schema::table('hasil_lab', function (Blueprint $table) {
            $table->foreign(['id_staf_lab'], 'hasil_lab_ibfk_1')->references(['id_staf_lab'])->on('staf_lab')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['id_rekam_medis'], 'hasil_lab_ibfk_2')->references(['id_rekam_medis'])->on('rekam_medis')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('hasil_lab', function (Blueprint $table) {
            $table->dropForeign('hasil_lab_ibfk_1');
            $table->dropForeign('hasil_lab_ibfk_2');
        });
    }
};
