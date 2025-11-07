<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreKasirRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id_kasir' => 'required|string|max:4',
            'nama' => 'nullable|string|max:150',
            'tanggal_lahir' => 'nullable|date',
            'nomor_telepon' => 'nullable|string|max:20',
            'alamat' => 'nullable|string',
            'gaji' => 'nullable|integer',
            'jenis_kelamin' => 'nullable|in:Laki-laki,Perempuan',
        ];
    }
}
