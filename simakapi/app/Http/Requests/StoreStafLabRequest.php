<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreStafLabRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id_staf_lab' => 'required|string|max:4',
            'nama' => 'nullable|string|max:150',
            'tanggal_lahir' => 'nullable|date',
            'nomor_telepon' => 'nullable|string|max:20',
            'gaji' => 'nullable|integer',
            'alamat' => 'nullable|string',
            'nomor_lisensi' => 'nullable|string|max:50|unique:staf_lab,nomor_lisensi',
            'jenis_kelamin' => 'nullable|in:Laki-laki,Perempuan',
        ];
    }
}
