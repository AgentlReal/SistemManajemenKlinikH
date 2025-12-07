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
        DB::statement("CREATE VIEW `view_antrian_lengkap` AS select `a`.`id_antrian` AS `id_antrian`,`p`.`id_pasien` AS `id_pasien`,`d`.`id_dokter` AS `id_dokter`,`a`.`nomor_antrian` AS `nomor_antrian`,`p`.`nama` AS `nama_pasien`,`po`.`nama_poli` AS `poli`,`d`.`nama` AS `nama_dokter`,`a`.`keluhan` AS `keluhan`,`a`.`tanggal` AS `tanggal`,`a`.`keterangan` AS `keterangan` from (((`simakapi`.`antrian` `a` left join `simakapi`.`pasien` `p` on((`a`.`id_pasien` = `p`.`id_pasien`))) left join `simakapi`.`dokter` `d` on((`a`.`id_dokter` = `d`.`id_dokter`))) left join `simakapi`.`poli` `po` on((`d`.`id_poli` = `po`.`id_poli`))) order by `a`.`tanggal` desc,`a`.`id_antrian` desc");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `view_antrian_lengkap`");
    }
};
