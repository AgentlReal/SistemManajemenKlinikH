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
        DB::unprepared("CREATE DEFINER=`root`@`localhost` PROCEDURE `GetHasilLabByNIK`(IN `p_nik` VARCHAR(16))
BEGIN
    SELECT 
    	h.id_hasil_lab,
    	h.id_staf_lab,
    	h.id_rekam_medis,
    	s.nama as nama_staf_lab,
    	h.jenis_pemeriksaan,
    	h.tanggal_pemeriksaan,
    	h.keterangan,
    	h.hasil_pemeriksaan
    FROM hasil_lab h
    LEFT JOIN staf_lab s ON h.id_staf_lab = s.id_staf_lab
    LEFT JOIN rekam_medis rm ON h.id_rekam_medis = rm.id_rekam_medis
    LEFT JOIN pasien p ON rm.id_pasien = p.id_pasien
    WHERE p.NIK = p_nik COLLATE utf8mb4_unicode_ci
    ORDER BY h.tanggal_pemeriksaan DESC;
END");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared("DROP PROCEDURE IF EXISTS GetHasilLabByNIK");
    }
};
