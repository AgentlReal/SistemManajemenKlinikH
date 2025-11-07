<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RekamMedis extends Model
{
    use HasFactory;

    protected $table = 'rekam_medis';
    protected $primaryKey = 'id_rekam_medis';
    public $timestamps = false;

    protected $fillable = [
        'id_pasien',
        'tanggal_pencatatan',
    ];

    public function pasien()
    {
        return $this->belongsTo(Pasien::class, 'id_pasien');
    }

    public function hasilLabs()
    {
        return $this->hasMany(HasilLab::class, 'id_rekam_medis');
    }

        public function soaps()

        {

            return $this->hasMany(Soap::class, 'id_rekam_medis');

        }

    

        public function resepDokters()

        {

            return $this->hasMany(ResepDokter::class, 'id_rekam_medis');

        }

    }

    