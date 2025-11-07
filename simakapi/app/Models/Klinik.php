<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Klinik extends Model
{
    use HasFactory;

    protected $table = 'klinik';
    protected $primaryKey = 'id_klinik';
    public $timestamps = false;

    protected $fillable = [
        'nama_klinik',
        'izin_operasional',
        'alamat',
        'nomor_telepon',
        'email',
        'jam_operasional',
    ];
}