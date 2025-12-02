<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreJadwalKaryawanRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id_resepsionis' => 'nullable|string|max:4',
            'id_dokter' => 'nullable|string|max:4',
            'id_staf_lab' => 'nullable|string|max:4',
            'id_kasir' => 'nullable|string|max:4',
            'jam_mulai' => 'nullable|date_format:H:i:s',
            'jam_selesai' => 'nullable|date_format:H:i:s',
            "senin" => 'integer',
            "selasa" => 'integer',
            "rabu" => 'integer',
            "kamis" => 'integer',
            "jumat" => 'integer',
            "sabtu" => 'integer',
            "minggu" => 'integer',
        ];
    }
}
