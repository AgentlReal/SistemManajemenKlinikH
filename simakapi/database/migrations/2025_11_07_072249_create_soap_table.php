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
        Schema::create('soap', function (Blueprint $table) {
            $table->integer('id_soap', true);
            $table->integer('id_rekam_medis')->nullable()->index('id_rekam_medis');
            $table->char('id_dokter', 4)->nullable()->index('id_dokter');
            $table->text('subjective')->nullable();
            $table->text('objective')->nullable();
            $table->text('assessment')->nullable();
            $table->text('plan')->nullable();
            $table->dateTime('tanggal_pencatatan')->nullable()->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('soap');
    }
};
