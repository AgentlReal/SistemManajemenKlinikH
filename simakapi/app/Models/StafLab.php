<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class StafLab extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'staf_lab';
    protected $primaryKey = 'id_staf_lab';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id_staf_lab',
        'nama',
        'tanggal_lahir',
        'nomor_telepon',
        'gaji',
        'alamat',
        'nomor_lisensi',
        'jenis_kelamin',
    ];
}