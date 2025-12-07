<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pasien extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'pasien';
    protected $primaryKey = 'id_pasien';
    public $timestamps = false;

    protected $fillable = [
        'NIK',
        'nama',
        'nomor_telepon',
        'jenis_kelamin',
        'tanggal_lahir',
        'alamat',
    ];

    public function rekamMedis()
    {
        return $this->hasMany(RekamMedis::class, 'id_pasien');
    }
}