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
        DB::unprepared("CREATE DEFINER=`root`@`localhost` PROCEDURE `GetSOAPByNIK`(IN `p_nik` VARCHAR(16))
BEGIN
    SELECT 
        s.id_soap,
        s.id_rekam_medis,
        s.id_dokter,
        d.nama as nama_dokter,
        s.subjective,
        s.objective,
        s.assessment,
        s.plan,
        s.tanggal_pencatatan
    FROM soap s
    LEFT JOIN dokter d ON s.id_dokter = d.id_dokter
    LEFT JOIN rekam_medis rm ON s.id_rekam_medis = rm.id_rekam_medis
    LEFT JOIN pasien p ON rm.id_pasien = p.id_pasien
    WHERE p.NIK = p_nik COLLATE utf8mb4_unicode_ci
    ORDER BY s.tanggal_pencatatan DESC;
END");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared("DROP PROCEDURE IF EXISTS GetSOAPByNIK");
    }
};
