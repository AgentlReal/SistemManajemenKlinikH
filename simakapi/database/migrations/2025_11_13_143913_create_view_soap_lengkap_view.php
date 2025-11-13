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
        DB::statement("CREATE VIEW `view_soap_lengkap` AS select `s`.`id_soap` AS `id_soap`,`s`.`id_rekam_medis` AS `id_rekam_medis`,`s`.`id_dokter` AS `id_dokter`,`d`.`nama` AS `nama_dokter`,`s`.`subjective` AS `subjective`,`s`.`objective` AS `objective`,`s`.`assessment` AS `assessment`,`s`.`plan` AS `plan`,`s`.`tanggal_pencatatan` AS `tanggal_pencatatan` from (`simakapi`.`soap` `s` left join `simakapi`.`dokter` `d` on((`s`.`id_dokter` = `d`.`id_dokter`))) order by `s`.`tanggal_pencatatan` desc");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement("DROP VIEW IF EXISTS `view_soap_lengkap`");
    }
};
