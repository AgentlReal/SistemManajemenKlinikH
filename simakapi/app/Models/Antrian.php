<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Antrian extends Model
{
    use HasFactory;

    protected $table = 'antrian';
    protected $primaryKey = 'id_antrian';
    public $timestamps = false;

    protected $fillable = [
        'id_resepsionis',
        'id_dokter',
        'id_pasien',
        'tanggal',
        'keluhan',
        'nomor_antrian',
        'keterangan',
    ];
}