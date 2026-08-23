<?php

declare(strict_types=1);

use App\Http\Controllers\Auth\AuthenticatedSessionController;
use Illuminate\Support\Facades\Route;
use Stancl\Tenancy\Middleware\InitializeTenancyByDomain;
use Stancl\Tenancy\Middleware\PreventAccessFromCentralDomains;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia; // Import Inertia

Route::middleware([
    'web',
    InitializeTenancyByDomain::class,
    PreventAccessFromCentralDomains::class,
])->group(function () {

    /*
    |--------------------------------------------------------------------------
    | TENANT - ROOT
    |--------------------------------------------------------------------------
    */
    Route::get('/', function () {
        if (Auth::check()) {
            return redirect()->route('dashboard');
        }

        return redirect()->route('login');
    });


    /*
    |--------------------------------------------------------------------------
    | TENANT - GUEST AUTHENTICATION
    |--------------------------------------------------------------------------
    */
    Route::middleware('guest')->group(function () {

        Route::get('/login', [
            AuthenticatedSessionController::class,
            'create',
        ])->name('login');

        Route::post('/login', [
            AuthenticatedSessionController::class,
            'store',
        ]);
    });


    /*
    |--------------------------------------------------------------------------
    | TENANT - AUTHENTICATED
    |--------------------------------------------------------------------------
    */
    Route::middleware(['auth', 'verified'])->group(function () {

        // PERBAIKAN: Menggunakan Inertia::render('Dashboard') bukan view()
        Route::get('/dashboard', function () {
            return Inertia::render('Dashboard');
        })->name('dashboard');

        Route::post('/logout', [
            AuthenticatedSessionController::class,
            'destroy',
        ])->name('logout');

    });
});