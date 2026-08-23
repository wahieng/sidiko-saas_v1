<?php

declare(strict_types=1);

namespace App\Core\Tenant\Services;

use App\Core\Tenant\Models\Tenant;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;

class TenantService
{
    public function create(array $data): Tenant
    {
        return DB::transaction(function () use ($data) {

            $tenant = Tenant::create([
                'id' => $data['id'] ?? (string) Str::uuid(),
                'name' => $data['name'] ?? null,
                'code' => $data['code'] ?? null,
                'email' => $data['email'] ?? null,
                'phone' => $data['phone'] ?? null,
                'address' => $data['address'] ?? null,
                'is_active' => $data['is_active'] ?? true,
            ]);

            return $tenant;
        });
    }
}