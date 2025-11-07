<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TransaksiPembayaran extends Model
{
    use HasFactory;

    protected $table = 'transaksi_pembayaran';
    protected $primaryKey = 'id_pembayaran';
    public $timestamps = false;

    protected $fillable = [
        'id_kasir',
        'status_pembayaran',
        'jumlah_total',
        'metode_pembayaran',
        'tanggal_transaksi',
    ];
}