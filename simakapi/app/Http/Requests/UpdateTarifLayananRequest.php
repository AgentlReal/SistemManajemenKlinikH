<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateTarifLayananRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'tipe_layanan' => 'nullable|in:Dokter,Laboratorium,Administrasi',
            'Harga' => 'nullable|integer',
            'nama_layanan' => 'nullable|string|max:100',
        ];
    }
}
