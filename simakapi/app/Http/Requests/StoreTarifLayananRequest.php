<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTarifLayananRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tipe_layanan' => 'nullable|in:Dokter,Laboratorium',
            'Harga' => 'nullable|integer',
            'nama_layanan' => 'nullable|string|max:100',
        ];
    }
}
