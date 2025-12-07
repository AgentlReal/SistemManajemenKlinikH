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
        DB::statement("CREATE VIEW `view_jadwal_karyawan_lengkap` AS select `jk`.`id_jadwal` AS `id_jadwal`,'Resepsionis' AS `jenis_karyawan`,`r`.`id_resepsionis` AS `id_karyawan`,`r`.`nama` AS `nama_karyawan`,NULL AS `spesialis`,NULL AS `nomor_lisensi`,`jk`.`senin` AS `senin`,`jk`.`selasa` AS `selasa`,`jk`.`rabu` AS `rabu`,`jk`.`kamis` AS `kamis`,`jk`.`jumat` AS `jumat`,`jk`.`sabtu` AS `sabtu`,`jk`.`minggu` AS `minggu`,`jk`.`jam_mulai` AS `jam_mulai`,`jk`.`jam_selesai` AS `jam_selesai`,`r`.`jenis_kelamin` AS `jenis_kelamin`,`r`.`nomor_telepon` AS `nomor_telepon` from (`simakapi`.`jadwal_karyawan` `jk` join `simakapi`.`resepsionis` `r` on((`jk`.`id_resepsionis` = `r`.`id_resepsionis`))) where (`jk`.`id_resepsionis` is not null) union all select `jk`.`id_jadwal` AS `id_jadwal`,'Dokter' AS `jenis_karyawan`,`d`.`id_dokter` AS `id_karyawan`,`d`.`nama` AS `nama_karyawan`,`d`.`spesialis` AS `spesialis`,`d`.`nomor_lisensi` AS `nomor_lisensi`,`jk`.`senin` AS `senin`,`jk`.`selasa` AS `selasa`,`jk`.`rabu` AS `rabu`,`jk`.`kamis` AS `kamis`,`jk`.`jumat` AS `jumat`,`jk`.`sabtu` AS `sabtu`,`jk`.`minggu` AS `minggu`,`jk`.`jam_mulai` AS `jam_mulai`,`jk`.`jam_selesai` AS `jam_selesai`,`d`.`jenis_kelamin` AS `jenis_kelamin`,`d`.`nomor_telepon` AS `nomor_telepon` from (`simakapi`.`jadwal_karyawan` `jk` join `simakapi`.`dokter` `d` on((`jk`.`id_dokter` = `d`.`id_dokter`))) where (`jk`.`id_dokter` is not null) union all select `jk`.`id_jadwal` AS `id_jadwal`,'Staf Lab' AS `jenis_karyawan`,`sl`.`id_staf_lab` AS `id_karyawan`,`sl`.`nama` AS `nama_karyawan`,NULL AS `spesialis`,`sl`.`nomor_lisensi` AS `nomor_lisensi`,`jk`.`senin` AS `senin`,`jk`.`selasa` AS `selasa`,`jk`.`rabu` AS `rabu`,`jk`.`kamis` AS `kamis`,`jk`.`jumat` AS `jumat`,`jk`.`sabtu` AS `sabtu`,`jk`.`minggu` AS `minggu`,`jk`.`jam_mulai` AS `jam_mulai`,`jk`.`jam_selesai` AS `jam_selesai`,`sl`.`jenis_kelamin` AS `jenis_kelamin`,`sl`.`nomor_telepon` AS `nomor_telepon` from (`simakapi`.`jadwal_karyawan` `jk` join `simakapi`.`staf_lab` `sl` on((`jk`.`id_staf_lab` = `sl`.`id_staf_lab`))) where (`jk`.`id_staf_lab` is not null) union all select `jk`.`id_jadwal` AS `id_jadwal`,'Kasir' AS `jenis_karyawan`,`k`.`id_kasir` AS `id_karyawan`,`k`.`nama` AS `nama_karyawan`,NULL AS `spesialis`,NULL AS `nomor_lisensi`,`jk`.`senin` AS `senin`,`jk`.`selasa` AS `selasa`,`jk`.`rabu` AS `rabu`,`jk`.`kamis` AS `kamis`,`jk`.`jumat` AS `jumat`,`jk`.`sabtu` AS `sabtu`,`jk`.`minggu` AS `minggu`,`jk`.`jam_mulai` AS `jam_mulai`,`jk`.`jam_selesai` AS `jam_selesai`,`k`.`jenis_kelamin` AS `jenis_kelamin`,`k`.`nomor_telepon` AS `nomor_telepon` from (`simakapi`.`jadwal_karyawan` `jk` join `simakapi`.`kasir` `k` on((`jk`.`id_kasir` = `k`.`id_kasir`))) where (`jk`.`id_kasir` is not null) order by `jenis_karyawan`");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `view_jadwal_karyawan_lengkap`");
    }
};
