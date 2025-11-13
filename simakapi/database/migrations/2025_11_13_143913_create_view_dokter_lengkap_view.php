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
        DB::statement("CREATE VIEW `view_dokter_lengkap` AS select `d`.`id_dokter` AS `id_dokter`,`d`.`id_poli` AS `id_poli`,`p`.`nama_poli` AS `nama_poli`,`d`.`nama` AS `nama_dokter`,`d`.`tanggal_lahir` AS `tanggal_lahir`,`d`.`gaji` AS `gaji`,`d`.`nomor_telepon` AS `nomor_telepon`,`d`.`spesialis` AS `spesialis`,`d`.`nomor_lisensi` AS `nomor_lisensi`,`d`.`jenis_kelamin` AS `jenis_kelamin`,`d`.`alamat` AS `alamat` from (`simakapi`.`dokter` `d` left join `simakapi`.`poli` `p` on((`d`.`id_poli` = `p`.`id_poli`))) order by `d`.`id_dokter`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `view_dokter_lengkap`");
    }
};
