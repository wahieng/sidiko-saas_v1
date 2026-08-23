<x-guest-layout>
    <!-- HEADER DINAMIS (DITAMBAHKAN) -->
    <div class="mb-6 text-center">
        <span class="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold {{ $badgeColor }}">
            {{ $isTenant ? 'Tenant Workspace' : 'Central Admin' }}
        </span>

        <h2 class="mt-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-100">
            {{ $title }}
        </h2>
        <p class="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {{ $subTitle }}
        </p>
    </div>

    <!-- Session Status -->
    <x-auth-session-status class="mb-4" :status="session('status')" />

    <form method="POST" action="{{ route('login') }}">
        @csrf

        <!-- Email Address -->
        <div>
            <x-input-label for="email" :value="__('Email')" />
            <x-text-input id="email" class="block mt-1 w-full" type="email" name="email" :value="old('email')" required autofocus autocomplete="username" />
            <x-input-error :messages="$errors->get('email')" class="mt-2" />
        </div>

        <!-- Password -->
        <div class="mt-4">
            <x-input-label for="password" :value="__('Password')" />

            <x-text-input id="password" class="block mt-1 w-full"
                            type="password"
                            name="password"
                            required autocomplete="current-password" />

            <x-input-error :messages="$errors->get('password')" class="mt-2" />
        </div>

        <!-- Remember Me -->
        <div class="block mt-4">
            <label for="remember_me" class="inline-flex items-center">
                <input id="remember_me" type="checkbox" class="rounded dark:bg-gray-900 border-gray-300 dark:border-gray-700 text-indigo-600 shadow-sm focus:ring-indigo-500 dark:focus:ring-indigo-600 dark:focus:ring-offset-gray-800" name="remember">
                <span class="ms-2 text-sm text-gray-600 dark:text-gray-400">{{ __('Remember me') }}</span>
            </label>
        </div>

        <div class="flex items-center justify-end mt-4">
            @if (Route::has('password.request'))
                <a class="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800" href="{{ route('password.request') }}">
                    {{ __('Forgot your password?') }}
                </a>
            @endif

            <x-primary-button class="ms-3">
                {{ __('Log in') }}
            </x-primary-button>
        </div>

        <!-- CATATAN KHUSUS SUPER ADMIN (DITAMBAHKAN) -->
        @if(!$isTenant)
            <div class="mt-6 p-3 bg-red-50 dark:bg-red-950/40 rounded-md text-xs text-red-700 dark:text-red-300 text-center border border-red-200 dark:border-red-800">
                ⚠️ Portal khusus Central Super Admin. Akses tidak sah akan dicatat.
            </div>
        @endif
    </form>
</x-guest-layout>