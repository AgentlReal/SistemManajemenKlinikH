<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreAntrianRequest extends FormRequest
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
            'keluhan' => 'nullable|string',
            'nomor_antrian' => 'nullable|string|max:10',
        ];
    }
}
