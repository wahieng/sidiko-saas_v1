<?php

declare(strict_types=1);

namespace App\Core\Tenant\Models;

use Stancl\Tenancy\Database\Concerns\HasDatabase;
use Stancl\Tenancy\Database\Concerns\HasDomains;
use Stancl\Tenancy\Database\Models\Tenant as BaseTenant;
use Stancl\Tenancy\Contracts\TenantWithDatabase;

class Tenant extends BaseTenant implements TenantWithDatabase
{
    use HasDatabase;
    use HasDomains;

    protected $table = 'tenants';

    protected $guarded = [];

    protected $casts = [
        'data' => 'array',
    ];
}