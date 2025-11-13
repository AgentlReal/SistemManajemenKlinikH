<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreResepDokterRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'id_rekam_medis' => 'required|exists:rekam_medis,id_rekam_medis',
            'id_dokter' => 'required|string|max:4',
            'id_pembayaran' => 'required|integer',
            'nama_obat' => 'required|string|max:255',
            'keterangan_resep' => 'required|string',
            'tanggal_resep' => 'required|date',
        ];
    }
}
