<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ViewJadwalKaryawanLengkap extends Model
{
    use HasFactory;

    protected $table = 'view_jadwal_karyawan_lengkap';
    protected $primaryKey = 'id_jadwal';
    public $incrementing = false;
    public $timestamps = false;
}
