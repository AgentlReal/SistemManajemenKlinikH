<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StorePasienRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'NIK' => [
                'nullable',
                'string',
                'max:16',
                Rule::unique('pasien', 'NIK')->where(function ($query) {
                    return $query->whereNull('deleted_at');
                }),
            ],
            'nama' => 'required|string|max:100',
            'nomor_telepon' => 'nullable|string|max:15',
            'jenis_kelamin' => 'nullable|in:Laki-laki,Perempuan',
            'tanggal_lahir' => 'nullable|date',
            'alamat' => 'nullable|string',
        ];
    }
}
