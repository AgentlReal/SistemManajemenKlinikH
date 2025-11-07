<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ViewAntrianLengkap extends Model
{
    use HasFactory;

    protected $table = 'view_antrian_lengkap';
    protected $primaryKey = 'id_antrian';
    public $incrementing = false;
    public $timestamps = false;
}
