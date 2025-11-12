<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ViewDokterLengkap extends Model
{
    use HasFactory;

    protected $table = 'view_dokter_lengkap';
    protected $primaryKey = 'id_dokter';
    public $incrementing = false;
    public $timestamps = false;
}
