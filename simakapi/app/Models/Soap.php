<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Soap extends Model
{
    use HasFactory;

    protected $table = 'soap';
    protected $primaryKey = 'id_soap';
    public $timestamps = false;

    protected $fillable = [
        'id_rekam_medis',
        'id_dokter',
        'subjective',
        'objective',
        'assessment',
        'plan',
        'tanggal_pencatatan',
    ];

    public function rekamMedis()
    {
        return $this->belongsTo(RekamMedis::class, 'id_rekam_medis');
    }
}