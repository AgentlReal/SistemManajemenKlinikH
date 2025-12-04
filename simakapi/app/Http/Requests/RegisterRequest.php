<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RegisterRequest extends FormRequest
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
            'username' => 'required|string|max:255|unique:users',
            'password' => 'required|string|min:2',
            'id_resepsionis' => 'nullable|string|max:4',
            'id_dokter' => 'nullable|string|max:4',
            'id_staf_lab' => 'nullable|string|max:4',
            'id_kasir' => 'nullable|string|max:4',
        ];
    }
}
