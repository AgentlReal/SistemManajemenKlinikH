<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdatePasienRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $pasienId = $this->route('pasien');

        return [
            'NIK' => 'nullable|string|max:16|unique:pasien,NIK,' . $pasienId . ',id_pasien',
            'nama' => 'required|string|max:100',
            'nomor_telepon' => 'nullable|string|max:15',
            'jenis_kelamin' => 'nullable|in:Laki-laki,Perempuan',
            'tanggal_lahir' => 'nullable|date',
            'alamat' => 'nullable|string',
        ];
    }
}
