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
        DB::statement("CREATE VIEW `view_transaksi_pembayaran_lengkap` AS select `tp`.`id_pembayaran` AS `id_pembayaran`,coalesce(`p`.`nama`,'Pasien Tidak Ditemukan') AS `nama_pasien`,`tp`.`tanggal_transaksi` AS `tanggal_transaksi`,(case when (`tp`.`status_pembayaran` = 'Lunas') then coalesce(sum((`pl`.`kuantitas` * `pl`.`harga_saat_itu`)),0) else coalesce(sum((`pl`.`kuantitas` * `tl`.`Harga`)),0) end) AS `jumlah_total`,`tp`.`status_pembayaran` AS `status_pembayaran`,coalesce(`tp`.`metode_pembayaran`,'Belum Dipilih') AS `metode_pembayaran` from ((((`simakapi`.`transaksi_pembayaran` `tp` left join `simakapi`.`antrian` `a` on((`tp`.`id_antrian` = `a`.`id_antrian`))) left join `simakapi`.`pasien` `p` on((`a`.`id_pasien` = `p`.`id_pasien`))) left join `simakapi`.`penggunaan_layanan` `pl` on((`tp`.`id_pembayaran` = `pl`.`id_pembayaran`))) left join `simakapi`.`tarif_layanan` `tl` on((`pl`.`id_tarif_layanan` = `tl`.`id_tarif_layanan`))) group by `tp`.`id_pembayaran`,`p`.`nama`,`tp`.`tanggal_transaksi`,`tp`.`status_pembayaran`,`tp`.`metode_pembayaran` order by `tp`.`tanggal_transaksi` desc");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `view_transaksi_pembayaran_lengkap`");
    }
};
