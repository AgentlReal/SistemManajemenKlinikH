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
        Schema::table('users', function (Blueprint $table) {
            $table->foreign(['id_resepsionis'], 'users_ibfk_1')->references(['id_resepsionis'])->on('resepsionis')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign(['id_dokter'], 'users_ibfk_2')->references(['id_dokter'])->on('dokter')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign(['id_staf_lab'], 'users_ibfk_3')->references(['id_staf_lab'])->on('staf_lab')->onUpdate('cascade')->onDelete('cascade');
            $table->foreign(['id_kasir'], 'users_ibfk_4')->references(['id_kasir'])->on('kasir')->onUpdate('cascade')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropForeign('users_ibfk_1');
            $table->dropForeign('users_ibfk_2');
            $table->dropForeign('users_ibfk_3');
            $table->dropForeign('users_ibfk_4');
        });
    }
};
