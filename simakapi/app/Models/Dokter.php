<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Dokter extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'dokter';
    protected $primaryKey = 'id_dokter';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id_dokter',
        'id_poli',
        'nama',
        'tanggal_lahir',
        'gaji',
        'nomor_telepon',
        'spesialis',
        'nomor_lisensi',
        'jenis_kelamin',
        'alamat',
    ];
}