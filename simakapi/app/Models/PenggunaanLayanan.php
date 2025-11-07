<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class PenggunaanLayanan extends Model
{
    use HasFactory;

    protected $table = 'penggunaan_layanan';
    protected $primaryKey = 'id_penggunaan_layanan';
    public $incrementing = true;
    public $timestamps = false;

    protected $fillable = [
        'id_pembayaran',
        'id_tarif_layanan',
        'kuantitas',
        'harga_saat_itu',
    ];
}
