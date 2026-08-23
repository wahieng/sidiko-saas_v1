<?php

declare(strict_types=1);

namespace App\Core\Tenant\Controllers;

use App\Core\Tenant\Requests\RegisterTenantRequest;
use App\Core\Tenant\Services\TenantProvisioningService;
use Illuminate\Http\RedirectResponse;
use Illuminate\View\View;

class TenantRegistrationController
{
    public function create(): View
    {
        return view('auth.register');
    }

    public function store(
        RegisterTenantRequest $request,
        TenantProvisioningService $provisioningService
    ): RedirectResponse {
        $tenant = $provisioningService->register(
            $request->validated()
        );

        $domain = $tenant->domains()->first();

        return redirect()->away(
            'http://' . $domain->domain . ':8000/login'
        );
    }
}