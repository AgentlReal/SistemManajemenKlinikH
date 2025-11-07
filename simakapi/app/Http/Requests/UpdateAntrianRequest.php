<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateAntrianRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id_resepsionis' => 'nullable|string|max:4',
            'id_dokter' => 'nullable|string|max:4',
            'id_pasien' => 'nullable|integer',
            'tanggal' => 'nullable|date',
            'keluhan' => 'nullable|string',
            'nomor_antrian' => 'nullable|string|max:10',
            'keterangan' => 'nullable|in:Menunggu,Diproses,Selesai,Batal',
        ];
    }
}
