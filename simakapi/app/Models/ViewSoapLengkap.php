<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ViewSoapLengkap extends Model
{
    use HasFactory;

    protected $table = 'view_soap_lengkap';
    protected $primaryKey = 'id_soap';
    public $incrementing = false;
    public $timestamps = false;
}
