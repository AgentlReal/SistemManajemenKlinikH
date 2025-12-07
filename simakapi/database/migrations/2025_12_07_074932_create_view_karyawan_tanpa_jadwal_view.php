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
        DB::statement("CREATE VIEW `view_karyawan_tanpa_jadwal` AS select 'Dokter' AS `jenis_karyawan`,`d`.`id_dokter` AS `id_karyawan`,`d`.`nama` AS `nama_karyawan`,`d`.`spesialis` AS `spesialis`,`p`.`nama_poli` AS `unit_kerja`,`d`.`nomor_telepon` AS `nomor_telepon`,`d`.`jenis_kelamin` AS `jenis_kelamin`,NULL AS `jabatan_lainnya` from (`simakapi`.`dokter` `d` join `simakapi`.`poli` `p` on((`d`.`id_poli` = `p`.`id_poli`))) where `d`.`id_dokter` in (select distinct `simakapi`.`jadwal_karyawan`.`id_dokter` from `simakapi`.`jadwal_karyawan` where (`simakapi`.`jadwal_karyawan`.`id_dokter` is not null)) is false union all select 'Resepsionis' AS `jenis_karyawan`,`r`.`id_resepsionis` AS `id_karyawan`,`r`.`nama` AS `nama_karyawan`,NULL AS `spesialis`,'Front Office' AS `unit_kerja`,`r`.`nomor_telepon` AS `nomor_telepon`,`r`.`jenis_kelamin` AS `jenis_kelamin`,NULL AS `jabatan_lainnya` from `simakapi`.`resepsionis` `r` where `r`.`id_resepsionis` in (select distinct `simakapi`.`jadwal_karyawan`.`id_resepsionis` from `simakapi`.`jadwal_karyawan` where (`simakapi`.`jadwal_karyawan`.`id_resepsionis` is not null)) is false union all select 'Staf Lab' AS `jenis_karyawan`,`sl`.`id_staf_lab` AS `id_karyawan`,`sl`.`nama` AS `nama_karyawan`,NULL AS `spesialis`,'Laboratorium' AS `unit_kerja`,`sl`.`nomor_telepon` AS `nomor_telepon`,`sl`.`jenis_kelamin` AS `jenis_kelamin`,`sl`.`nomor_lisensi` AS `jabatan_lainnya` from `simakapi`.`staf_lab` `sl` where `sl`.`id_staf_lab` in (select distinct `simakapi`.`jadwal_karyawan`.`id_staf_lab` from `simakapi`.`jadwal_karyawan` where (`simakapi`.`jadwal_karyawan`.`id_staf_lab` is not null)) is false union all select 'Kasir' AS `jenis_karyawan`,`k`.`id_kasir` AS `id_karyawan`,`k`.`nama` AS `nama_karyawan`,NULL AS `spesialis`,'Administrasi' AS `unit_kerja`,`k`.`nomor_telepon` AS `nomor_telepon`,`k`.`jenis_kelamin` AS `jenis_kelamin`,NULL AS `jabatan_lainnya` from `simakapi`.`kasir` `k` where `k`.`id_kasir` in (select distinct `simakapi`.`jadwal_karyawan`.`id_kasir` from `simakapi`.`jadwal_karyawan` where (`simakapi`.`jadwal_karyawan`.`id_kasir` is not null)) is false order by `jenis_karyawan`,`id_karyawan`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `view_karyawan_tanpa_jadwal`");
    }
};
