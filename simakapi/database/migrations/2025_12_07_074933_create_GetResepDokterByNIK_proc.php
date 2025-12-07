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
        DB::unprepared("CREATE DEFINER=`root`@`localhost` PROCEDURE `GetResepDokterByNIK`(IN p_nik VARCHAR(16))
BEGIN
    SELECT 
		r.id_resep_dokter,
        r.id_dokter,
        r.id_rekam_medis,
        r.id_pembayaran,
        d.nama AS nama_dokter,
        r.nama_obat,
        r.keterangan_resep,
        r.tanggal_resep
    FROM resep_dokter r
    LEFT JOIN dokter d ON r.id_dokter = d.id_dokter
    LEFT JOIN rekam_medis rm ON r.id_rekam_medis = rm.id_rekam_medis
    LEFT JOIN pasien p ON rm.id_pasien = p.id_pasien
    WHERE p.NIK = p_nik COLLATE utf8mb4_unicode_ci
    ORDER BY r.tanggal_resep DESC;
END");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared("DROP PROCEDURE IF EXISTS GetResepDokterByNIK");
    }
};
