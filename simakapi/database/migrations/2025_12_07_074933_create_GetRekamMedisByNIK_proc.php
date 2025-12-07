<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared("CREATE DEFINER=`root`@`localhost` PROCEDURE `GetRekamMedisByNIK`(IN p_nik VARCHAR(16))
BEGIN
    SELECT 
        rm.id_rekam_medis,
        rm.id_pasien,
        rm.tanggal_pencatatan
    FROM rekam_medis rm
    LEFT JOIN pasien p ON rm.id_pasien = p.id_pasien
    WHERE p.NIK = p_nik COLLATE utf8mb4_unicode_ci;
END");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared("DROP PROCEDURE IF EXISTS GetRekamMedisByNIK");
    }
};
