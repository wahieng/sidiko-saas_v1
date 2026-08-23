<?php

declare(strict_types=1);

namespace App\Core\Tenant\Services;

use App\Core\Tenant\Models\Tenant;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class TenantProvisioningService
{
    public function register(array $data): Tenant
    {
        /*
        |--------------------------------------------------------------------------
        | 1. Generate Tenant ID & School Code
        |--------------------------------------------------------------------------
        */

        $tenantId = $this->generateTenantId(
            $data['nama_sekolah']
        );

        $code = $this->generateSchoolCode(
            $data['nama_sekolah']
        );

        /*
        |--------------------------------------------------------------------------
        | 2. Create Tenant di Central Database
        |--------------------------------------------------------------------------
        */

        $tenant = Tenant::create([
            'id' => $tenantId,

            'data' => [
                'nama_sekolah' => $data['nama_sekolah'],
                'code' => $code,
                'email' => $data['email'],
                'is_active' => true,
            ],
        ]);

        /*
        |--------------------------------------------------------------------------
        | 3. Create Database Tenant
        |--------------------------------------------------------------------------
        */

        $tenant->database()
            ->manager()
            ->createDatabase($tenant);

        /*
        |--------------------------------------------------------------------------
        | 4. Build Tenant Database Connection
        |--------------------------------------------------------------------------
        */

        $baseConfig = config(
            'database.connections.mysql'
        );

        $tenantConfig = $tenant->database()
            ->manager()
            ->makeConnectionConfig(
                $baseConfig,
                $tenant->database()->getName()
            );

        config([
            'database.connections.tenant' => $tenantConfig,
        ]);

        DB::purge('tenant');
        DB::reconnect('tenant');

        /*
        |--------------------------------------------------------------------------
        | 5. Run Tenant Migrations
        |--------------------------------------------------------------------------
        */

        Artisan::call('migrate', [
            '--database' => 'tenant',
            '--path' => database_path('migrations/tenant'),
            '--realpath' => true,
            '--force' => true,
        ]);

        /*
        |--------------------------------------------------------------------------
        | 6. Create Initial Admin User
        |--------------------------------------------------------------------------
        |
        | User dibuat langsung di database tenant.
        |
        */

        DB::connection('tenant')
            ->table('users')
            ->insert([
                'name' => $data['nama_sekolah'],
                'email' => $data['email'],
                'password' => Hash::make(
                    $data['password']
                ),
                'created_at' => now(),
                'updated_at' => now(),
            ]);

        /*
        |--------------------------------------------------------------------------
        | 7. Create Tenant Domain
        |--------------------------------------------------------------------------
        */

        $tenant->domains()->create([
            'domain' => $tenant->id . '.localhost',
        ]);

        
        return $tenant;
    }



    /*
    |--------------------------------------------------------------------------
    | Generate Tenant ID
    |--------------------------------------------------------------------------
    */

    protected function generateTenantId(
        string $namaSekolah
    ): string {
        $base = Str::slug($namaSekolah);

        $id = $base;
        $counter = 2;

        while (
            Tenant::where('id', $id)->exists()
        ) {
            $id = $base . '-' . $counter;
            $counter++;
        }

        return $id;
    }

    /*
    |--------------------------------------------------------------------------
    | Generate School Code
    |--------------------------------------------------------------------------
    */

    protected function generateSchoolCode(
        string $namaSekolah
    ): string {
        $base = strtoupper(
            Str::slug($namaSekolah, '_')
        );

        $code = $base;
        $counter = 2;

        while (
            Tenant::where('data->code', $code)->exists()
        ) {
            $code = $base . '_' . $counter;
            $counter++;
        }

        return $code;
    }
}