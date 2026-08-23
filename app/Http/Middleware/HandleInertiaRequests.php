<?php

namespace App\Http\Middleware;

use Illuminate\Http\Request;
use Inertia\Middleware;
use App\Models\User;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that is loaded on the first page visit.
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determine the current asset version.
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @return array<string, mixed>
     */
    

    public function share(Request $request): array
    {
        $instansiName = null;

        // Cek apakah ada tenant aktif di domain ini
        if (function_exists('tenant') && tenant()) {
            try {
                // Ambil nama user/admin pertama di database tenant yang aktif
                $tenantAdmin = User::first();
                $instansiName = $tenantAdmin?->name;
            } catch (\Exception $e) {
                // Jika DB tenant belum terhubung, fallback ke data bawaan tenant
                $instansiName = tenant('name') ?? tenant('id');
            }
        }

        return array_merge(parent::share($request), [
            'auth' => [
                'user' => $request->user(),
            ],
            // Meneruskan variabel instansi_name ke React Inertia
            'instansi_name' => $instansiName ?? 'Workspace Tenant',
        ]);
    }
}
