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
        DB::unprepared("CREATE DEFINER=`root`@`localhost` PROCEDURE `GetPasienByRekamMedis`(IN `p_id_rekam_medis` INT)
BEGIN
    SELECT 
        p.id_pasien,
        p.NIK,
        p.nama,
        p.nomor_telepon,
        p.jenis_kelamin,
        p.tanggal_lahir,
        p.alamat
    FROM pasien p
    LEFT JOIN rekam_medis rm ON p.id_pasien = rm.id_pasien
    WHERE rm.id_rekam_medis = p_id_rekam_medis COLLATE utf8mb4_unicode_ci;
END");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared("DROP PROCEDURE IF EXISTS GetPasienByRekamMedis");
    }
};
