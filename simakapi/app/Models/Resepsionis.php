<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Resepsionis extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'resepsionis';
    protected $primaryKey = 'id_resepsionis';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id_resepsionis',
        'nama',
        'tanggal_lahir',
        'gaji',
        'nomor_telepon',
        'jenis_kelamin',
        'alamat',
    ];
}