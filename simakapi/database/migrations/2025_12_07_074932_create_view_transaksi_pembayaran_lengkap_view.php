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
        DB::statement("CREATE VIEW `view_transaksi_pembayaran_lengkap` AS select `tp`.`id_pembayaran` AS `id_pembayaran`,`tp`.`id_antrian` AS `id_antrian`,`tp`.`id_kasir` AS `id_kasir`,coalesce(`p`.`nama`,'Pasien Tidak Ditemukan') AS `nama_pasien`,coalesce(sum((`pl`.`kuantitas` * `pl`.`harga_saat_itu`)),0) AS `jumlah_total`,`tp`.`status_pembayaran` AS `status_pembayaran`,coalesce(`tp`.`metode_pembayaran`,'Belum Dipilih') AS `metode_pembayaran`,`tp`.`tanggal_transaksi` AS `tanggal_transaksi` from (((`simakapi`.`transaksi_pembayaran` `tp` left join `simakapi`.`antrian` `a` on((`tp`.`id_antrian` = `a`.`id_antrian`))) left join `simakapi`.`pasien` `p` on((`a`.`id_pasien` = `p`.`id_pasien`))) left join `simakapi`.`penggunaan_layanan` `pl` on((`tp`.`id_pembayaran` = `pl`.`id_pembayaran`))) group by `tp`.`id_pembayaran`,`tp`.`id_antrian`,`tp`.`id_kasir`,`p`.`nama`,`tp`.`status_pembayaran`,`tp`.`metode_pembayaran`,`tp`.`tanggal_transaksi` order by `tp`.`tanggal_transaksi` desc");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `view_transaksi_pembayaran_lengkap`");
    }
};
