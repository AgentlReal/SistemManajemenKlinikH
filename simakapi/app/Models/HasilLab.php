<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HasilLab extends Model
{
    use HasFactory;

    protected $table = 'hasil_lab';
    protected $primaryKey = 'id_hasil_lab';
    public $timestamps = false;

    protected $fillable = [
        'id_staf_lab',
        'id_rekam_medis',
        'id_tarif_layanan',
        'tanggal_pemeriksaan',
        'keterangan',
        'hasil_pemeriksaan',
    ];

    public function rekamMedis()
    {
        return $this->belongsTo(RekamMedis::class, 'id_rekam_medis');
    }
}