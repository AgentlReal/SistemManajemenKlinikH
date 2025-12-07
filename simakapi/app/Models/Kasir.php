<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Kasir extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'kasir';
    protected $primaryKey = 'id_kasir';
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;

    protected $fillable = [
        'id_kasir',
        'nama',
        'tanggal_lahir',
        'nomor_telepon',
        'alamat',
        'gaji',
        'jenis_kelamin',
    ];
}