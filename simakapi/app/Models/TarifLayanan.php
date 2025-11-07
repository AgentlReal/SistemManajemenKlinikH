<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TarifLayanan extends Model
{
    use HasFactory;

    protected $table = 'tarif_layanan';
    protected $primaryKey = 'id_tarif_layanan';
    public $timestamps = false;

    protected $fillable = [
        'tipe_layanan',
        'Harga',
        'nama_layanan',
    ];
}