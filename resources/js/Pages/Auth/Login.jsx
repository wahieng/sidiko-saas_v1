import { useEffect, useState } from 'react';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { 
    Building2, 
    Lock, 
    Mail, 
    Eye, 
    EyeOff, 
    ShieldCheck, 
    Sparkles, 
    CheckCircle2,
    ArrowRight
} from 'lucide-react';

export default function Login({ status, canResetPassword }) {
    // Ambil instansi_name yang berasal dari nama di tabel users DB tenant
    const { instansi_name } = usePage().props;
    const namaInstansi = instansi_name || 'Workspace Tenant';

    const [showPassword, setShowPassword] = useState(false);

    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    useEffect(() => {
        return () => {
            reset('password');
        };
    }, []);

    const submit = (e) => {
        e.preventDefault();
        post(route('login'));
    };

    return (
        <div className="min-h-screen flex bg-slate-50 font-sans">
            <Head title={`Login Workspace - ${namaInstansi}`} />

            {/* SISI KIRI: PROMO & BRANDING BANNER (Hidden di HP) */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white flex-col justify-between p-12 relative overflow-hidden">
                {/* Background Glow Effect */}
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />

                {/* Header Logo Platform */}
                <div className="relative z-10 flex items-center gap-3">
                    <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/30">
                        <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <span className="font-extrabold text-xl tracking-wider block leading-none">SIDIKO</span>
                        <span className="text-[10px] text-slate-400">School Management System</span>
                    </div>
                </div>

                {/* Content Banner Mid */}
                <div className="relative z-10 my-auto space-y-6 max-w-lg">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Isolasi Database & Portal Tenant Aman</span>
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
                        Solusi Manajemen Sekolah Terpadu & Real-time.
                    </h1>

                    <p className="text-slate-400 text-sm leading-relaxed">
                        Akses modul akademik, rekapitulasi pembayaran SPP, presensi siswa, hingga laporan operasional instansi dalam satu portal resmi.
                    </p>

                    {/* Features List Checklist */}
                    <div className="space-y-3 pt-2">
                        {[
                            'Akses khusus tenant terlindungi enkripsi',
                            'Integrasi presensi & WhatsApp Gateway',
                            'Laporan keuangan & tagihan terintegrasi'
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Footer Banner */}
                <div className="relative z-10 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                    <span>© 2026 SIDIKO SaaS Platform. All rights reserved.</span>
                    <span className="flex items-center gap-1 text-slate-400">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" /> System Protected
                    </span>
                </div>
            </div>

            {/* SISI KANAN: FORM LOGIN WORKSPACE */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    
                    {/* Header Tenant info */}
                    <div className="text-center lg:text-left space-y-2">
                        {/* Mobile Brand Logo */}
                        <div className="flex items-center justify-center gap-2 lg:hidden mb-6">
                            <div className="p-2 bg-blue-600 rounded-xl text-white">
                                <Building2 className="w-5 h-5" />
                            </div>
                            <span className="font-extrabold text-xl tracking-wide text-slate-900">SIDIKO</span>
                        </div>

                        {/* Tenant Identity Tag Dinamis */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-slate-700 text-xs font-bold">
                            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span>{namaInstansi}</span>
                        </div>

                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                            Selamat Datang Kembali
                        </h2>
                        <p className="text-xs text-slate-500">
                            Masukkan akun pengguna Anda untuk mengakses workspace tenant.
                        </p>
                    </div>

                    {status && (
                        <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium">
                            {status}
                        </div>
                    )}

                    {/* FORM INPUT LOGIN */}
                    <form onSubmit={submit} className="space-y-5">
                        {/* INPUT EMAIL */}
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 block">
                                Email / NIP / NISN
                            </label>
                            <div className="relative">
                                <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    id="email"
                                    type="email"
                                    name="email"
                                    value={data.email}
                                    placeholder="nama@sekolah.sch.id"
                                    className={`w-full pl-10 pr-4 py-2.5 bg-white border ${
                                        errors.email ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:ring-blue-600/20'
                                    } rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:border-blue-600 transition-all shadow-sm`}
                                    autoComplete="username"
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                            </div>
                            {errors.email && (
                                <p className="text-[11px] text-red-600 font-semibold mt-1">{errors.email}</p>
                            )}
                        </div>

                        {/* INPUT PASSWORD */}
                        <div className="space-y-1.5">
                            <div className="flex items-center justify-between">
                                <label className="text-xs font-bold text-slate-700 block">
                                    Kata Sandi
                                </label>
                                {canResetPassword && (
                                    <Link
                                        href={route('password.request')}
                                        className="text-xs text-blue-600 font-bold hover:underline"
                                    >
                                        Lupa Password?
                                    </Link>
                                )}
                            </div>
                            <div className="relative">
                                <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input
                                    id="password"
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={data.password}
                                    placeholder="••••••••"
                                    className={`w-full pl-10 pr-10 py-2.5 bg-white border ${
                                        errors.password ? 'border-red-500 focus:ring-red-500/20' : 'border-slate-200 focus:ring-blue-600/20'
                                    } rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:border-blue-600 transition-all shadow-sm`}
                                    autoComplete="current-password"
                                    onChange={(e) => setData('password', e.target.value)}
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-[11px] text-red-600 font-semibold mt-1">{errors.password}</p>
                            )}
                        </div>

                        {/* REMEMBER ME CHECKBOX */}
                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    name="remember"
                                    checked={data.remember}
                                    onChange={(e) => setData('remember', e.target.checked)}
                                    className="w-4 h-4 rounded text-blue-600 focus:ring-blue-500 border-slate-300"
                                />
                                <span className="text-xs text-slate-600 font-medium">Ingat saya di perangkat ini</span>
                            </label>
                        </div>

                        {/* SUBMIT BUTTON */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 cursor-pointer"
                        >
                            <span>{processing ? 'Memproses Masuk...' : 'Masuk ke Workspace'}</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </form>

                    {/* FOOTER ASSISTANCE */}
                    <div className="text-center border-t border-slate-100 pt-6">
                        <p className="text-xs text-slate-500">
                            Mengalami kendala akun?{' '}
                            <a href="#" className="text-blue-600 font-bold hover:underline">
                                Hubungi Operator Sekolah
                            </a>
                        </p>
                    </div>

                </div>
            </div>
        </div>
    );
}