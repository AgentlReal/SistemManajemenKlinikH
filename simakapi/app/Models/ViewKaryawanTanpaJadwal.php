<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ViewKaryawanTanpaJadwal extends Model
{
    use HasFactory;

    protected $table = 'view_karyawan_tanpa_jadwal';
    // This view does not have a single primary key, so we won't define it.
    public $incrementing = false;
    public $timestamps = false;
}
