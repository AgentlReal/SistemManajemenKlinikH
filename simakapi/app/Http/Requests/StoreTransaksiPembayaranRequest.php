<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreTransaksiPembayaranRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'id_kasir' => 'nullable|string|max:4',
            'status_pembayaran' => 'nullable|in:Lunas,Belum Lunas',
            'jumlah_total' => 'nullable|integer',
            'metode_pembayaran' => 'nullable|in:Tunai,Transfer bank',
            'tanggal_transaksi' => 'nullable|date',
        ];
    }
}
