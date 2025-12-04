<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreKlinikRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id_klinik' => 'required|integer',
            'nama_klinik' => 'nullable|string|max:255',
            'izin_operasional' => 'nullable|string|max:100',
            'alamat' => 'nullable|string',
            'nomor_telepon' => 'nullable|string|max:50',
            'email' => 'nullable|email|max:100',
            'jam_operasional' => 'nullable|string|max:100',
        ];
    }
}
