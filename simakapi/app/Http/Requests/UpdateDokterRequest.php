<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateDokterRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $dokterId = $this->route('dokter');

        return [
            'id_poli' => 'nullable|integer',
            'nama' => 'nullable|string|max:150',
            'tanggal_lahir' => 'nullable|date',
            'gaji' => 'nullable|integer',
            'nomor_telepon' => 'nullable|string|max:20',
            'spesialis' => 'nullable|string|max:50',
            'nomor_lisensi' => 'nullable|string|max:50|unique:dokter,nomor_lisensi,' . $dokterId . ',id_dokter',
            'jenis_kelamin' => 'nullable|in:Laki-laki,Perempuan',
            'alamat' => 'nullable|string',
        ];
    }
}
