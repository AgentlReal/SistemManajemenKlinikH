<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StorePasienRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'NIK' => 'nullable|string|max:16|unique:pasien,NIK',
            'nama' => 'required|string|max:100',
            'nomor_telepon' => 'nullable|string|max:15',
            'email' => 'nullable|email|max:100',
            'jenis_kelamin' => 'nullable|in:Laki-laki,Perempuan',
            'tanggal_lahir' => 'nullable|date',
            'alamat' => 'nullable|string',
        ];
    }
}
