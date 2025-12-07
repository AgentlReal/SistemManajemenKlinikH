<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Poli extends Model
{
    use HasFactory, SoftDeletes;

    protected $table = 'poli';
    protected $primaryKey = 'id_poli';
    public $timestamps = false;

    protected $fillable = [
        'nama_poli',
    ];
}