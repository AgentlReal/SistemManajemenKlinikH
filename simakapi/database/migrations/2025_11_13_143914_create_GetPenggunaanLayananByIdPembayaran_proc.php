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
        DB::unprepared("CREATE DEFINER=`root`@`localhost` PROCEDURE `GetPenggunaanLayananByIdPembayaran`(IN id_bayar INT)
BEGIN
    SELECT 
		p.id_penggunaan_layanan,
        p.id_pembayaran,
        p.id_tarif_layanan,
        t.nama_layanan,
        t.tipe_layanan,
        p.kuantitas,
        p.harga_saat_itu
    FROM penggunaan_layanan p
    LEFT JOIN tarif_layanan t ON p.id_tarif_layanan = t.id_tarif_layanan
    WHERE p.id_pembayaran = id_bayar COLLATE utf8mb4_unicode_ci
    ORDER BY p.id_penggunaan_layanan;
END");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared("DROP PROCEDURE IF EXISTS GetPenggunaanLayananByIdPembayaran");
    }
};
