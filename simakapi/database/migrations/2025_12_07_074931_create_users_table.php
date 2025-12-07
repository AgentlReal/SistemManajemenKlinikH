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
        Schema::create('users', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('username')->unique();
            $table->string('password');
            $table->string('name')->nullable();
            $table->enum('role', ['receptionist', 'doctor', 'lab', 'cashier', 'manager', 'admin'])->nullable();
            $table->char('id_resepsionis', 4)->nullable()->index('users_ibfk_1');
            $table->char('id_dokter', 4)->nullable()->index('users_ibfk_2');
            $table->char('id_staf_lab', 4)->nullable()->index('users_ibfk_3');
            $table->char('id_kasir', 4)->nullable()->index('users_ibfk_4');
            $table->rememberToken();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('users');
    }
};
