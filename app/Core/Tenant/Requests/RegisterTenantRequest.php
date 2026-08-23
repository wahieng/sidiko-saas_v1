<?php

declare(strict_types=1);

namespace App\Core\Tenant\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class RegisterTenantRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'nama_sekolah' => [
                'required',
                'string',
                'max:255',
                Rule::unique('tenants', 'data->nama_sekolah'),
            ],

            'email' => [
                'required',
                'email',
                'max:255',
            ],

            'password' => [
                'required',
                'string',
                'min:8',
                'confirmed',
            ],
        ];
    }

    public function messages(): array
    {
        return [
            'nama_sekolah.unique' =>
                'Nama sekolah tersebut sudah terdaftar.',
        ];
    }
}