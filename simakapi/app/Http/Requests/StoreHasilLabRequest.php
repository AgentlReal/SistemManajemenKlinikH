<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreHasilLabRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id_staf_lab' => 'nullable|string|max:4',
            'id_rekam_medis' => 'nullable|integer',
            'jenis_pemeriksaan' => 'nullable|string|max:100',
            'tanggal_pemeriksaan' => 'nullable|date',
            'keterangan' => 'nullable|string',
            'hasil_pemeriksaan' => 'nullable|string|max:100',
        ];
    }
}
