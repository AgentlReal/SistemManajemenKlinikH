<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStafLabRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $stafLabId = $this->route('staf_lab');

        return [
            'nama' => 'nullable|string|max:150',
            'tanggal_lahir' => 'nullable|date',
            'nomor_telepon' => 'nullable|string|max:20',
            'gaji' => 'nullable|integer',
            'alamat' => 'nullable|string',
            'nomor_lisensi' => 'nullable|string|max:50|unique:staf_lab,nomor_lisensi,' . $stafLabId . ',id_staf_lab',
            'jenis_kelamin' => 'nullable|in:Laki-laki,Perempuan',
        ];
    }
}
