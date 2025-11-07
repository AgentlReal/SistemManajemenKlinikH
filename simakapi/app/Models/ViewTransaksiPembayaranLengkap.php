<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ViewTransaksiPembayaranLengkap extends Model
{
    use HasFactory;

    protected $table = 'view_transaksi_pembayaran_lengkap';
    protected $primaryKey = 'id_pembayaran';
    public $incrementing = false;
    public $timestamps = false;
}
