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
        Schema::table('soap', function (Blueprint $table) {
            $table->foreign(['id_rekam_medis'], 'soap_ibfk_1')->references(['id_rekam_medis'])->on('rekam_medis')->onUpdate('no action')->onDelete('no action');
            $table->foreign(['id_dokter'], 'soap_ibfk_2')->references(['id_dokter'])->on('dokter')->onUpdate('no action')->onDelete('no action');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('soap', function (Blueprint $table) {
            $table->dropForeign('soap_ibfk_1');
            $table->dropForeign('soap_ibfk_2');
        });
    }
};
