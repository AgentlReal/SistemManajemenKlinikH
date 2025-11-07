<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ResepDokter extends Model
{
    use HasFactory;

    protected $table = 'resep_dokter';
    protected $primaryKey = 'id_resep_dokter';
    public $timestamps = false;

    protected $fillable = [
        'id_rekam_medis',
        'id_dokter',
        'nama_obat',
        'keterangan_resep',
        'tanggal_resep',
    ];

    public function rekamMedis()
    {
        return $this->belongsTo(RekamMedis::class, 'id_rekam_medis');
    }
}
