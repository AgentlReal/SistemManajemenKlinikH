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
        DB::statement("CREATE VIEW `view_hasil_lab_lengkap` AS select `h`.`id_hasil_lab` AS `id_hasil_lab`,`h`.`id_staf_lab` AS `id_staf_lab`,`h`.`id_rekam_medis` AS `id_rekam_medis`,`s`.`nama` AS `nama_staf_lab`,`h`.`jenis_pemeriksaan` AS `jenis_pemeriksaan`,`h`.`tanggal_pemeriksaan` AS `tanggal_pemeriksaan`,`h`.`keterangan` AS `keterangan`,`h`.`hasil_pemeriksaan` AS `hasil_pemeriksaan` from (`simakapi`.`hasil_lab` `h` left join `simakapi`.`staf_lab` `s` on((`h`.`id_staf_lab` = `s`.`id_staf_lab`))) order by `h`.`tanggal_pemeriksaan` desc");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `view_hasil_lab_lengkap`");
    }
};
