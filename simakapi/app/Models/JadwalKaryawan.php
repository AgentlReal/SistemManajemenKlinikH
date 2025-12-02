<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class JadwalKaryawan extends Model
{
    use HasFactory;

    protected $table = 'jadwal_karyawan';
    protected $primaryKey = 'id_jadwal';
    public $timestamps = false;

    protected $fillable = [
        'id_resepsionis',
        'id_dokter',
        'id_staf_lab',
        'id_kasir',
        'jam_mulai',
        'jam_selesai',
        "senin",
        "selasa",
        "rabu",
        "kamis",
        "jumat",
        "sabtu",
        "minggu"
    ];
}
