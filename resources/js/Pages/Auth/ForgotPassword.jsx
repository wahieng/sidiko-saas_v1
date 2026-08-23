import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { 
    Building2, 
    Mail, 
    ArrowLeft, 
    Send, 
    ShieldCheck, 
    Sparkles, 
    CheckCircle2 
} from 'lucide-react';

export default function ForgotPassword({ status }) {
    // Ambil instansi_name langsung dari share props Inertia (tabel users tenant)
    const { instansi_name } = usePage().props;

    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('password.email'));
    };

    return (
        <div className="min-h-screen flex bg-slate-50 font-sans">
            {/* HEAD TITLE DINAMIS SESUAI DATABASE USERS TENANT */}
            <Head title={`Lupa Kata Sandi - ${instansi_name}`} />

            {/* SISI KIRI: PROMO & BRANDING BANNER (Hidden di HP) */}
            <div className="hidden lg:flex lg:w-1/2 bg-slate-900 text-white flex-col justify-between p-12 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-600/20 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/20 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />

                <div className="relative z-10 flex items-center gap-3">
                    <div className="p-2.5 bg-blue-600 rounded-xl shadow-lg shadow-blue-500/30">
                        <Building2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                        <span className="font-extrabold text-xl tracking-wider block leading-none">SIDIKO</span>
                        <span className="text-[10px] text-slate-400">School Management System</span>
                    </div>
                </div>

                <div className="relative z-10 my-auto space-y-6 max-w-lg">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>Pemulihan Akses Akun Terenkripsi</span>
                    </div>

                    <h1 className="text-4xl font-extrabold tracking-tight text-white leading-tight">
                        Lupa kata sandi Anda? Jangan khawatir.
                    </h1>

                    <p className="text-slate-400 text-sm leading-relaxed">
                        Sistem kami akan mengirimkan instruksi dan tautan khusus untuk mengatur ulang kata sandi akun Anda secara aman.
                    </p>

                    <div className="space-y-3 pt-2">
                        {[
                            'Verifikasi email terdaftar secara otomatis',
                            'Tautan reset aman dan berlaku dalam jangka waktu terbatas',
                            'Proses cepat tanpa mengubah data historis akun'
                        ].map((item, idx) => (
                            <div key={idx} className="flex items-center gap-3 text-xs text-slate-300 font-medium">
                                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                                <span>{item}</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="relative z-10 pt-6 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-500">
                    <span>© 2026 SIDIKO SaaS Platform. All rights reserved.</span>
                    <span className="flex items-center gap-1 text-slate-400">
                        <ShieldCheck className="w-4 h-4 text-emerald-500" /> System Protected
                    </span>
                </div>
            </div>

            {/* SISI KANAN: FORM LUPA PASSWORD */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 sm:p-12">
                <div className="w-full max-w-md space-y-8">
                    
                    <div className="text-center lg:text-left space-y-2">
                        <div className="flex items-center justify-center gap-2 lg:hidden mb-6">
                            <div className="p-2 bg-blue-600 rounded-xl text-white">
                                <Building2 className="w-5 h-5" />
                            </div>
                            <span className="font-extrabold text-xl tracking-wide text-slate-900">SIDIKO</span>
                        </div>

                        {/* BADGE NAME DARI TABEL USERS TENANT */}
                        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-200 rounded-lg text-slate-700 text-xs font-bold">
                            <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                            <span>{instansi_name}</span>
                        </div>

                        <h2 className="text-2xl font-bold tracking-tight text-slate-900">
                            Atur Ulang Kata Sandi
                        </h2>
                        <p className="text-xs text-slate-500 leading-relaxed">
                            Masukkan alamat email terdaftar Anda. Kami akan mengirimkan tautan khusus untuk membuat kata sandi baru.
                        </p>
                    </div>

                    {status && (
                        <div className="p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-medium space-y-1">
                            <p className="font-bold">Tautan Reset Terkirim!</p>
                            <p>{status}</p>
                        </div>
                    )}

                    <form onSubmit={submit} className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-xs font-bold text-slate-700 block">
                                Alamat Email Terdaftar
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
                                    autoFocus
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                            </div>
                            {errors.email && (
                                <p className="text-[11px] text-red-600 font-semibold mt-1">{errors.email}</p>
                            )}
                        </div>

                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full flex items-center justify-center gap-2 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs font-bold transition-all shadow-lg shadow-blue-500/25 disabled:opacity-50 cursor-pointer"
                        >
                            <Send className="w-4 h-4" />
                            <span>{processing ? 'Mengirim Tautan...' : 'Kirim Tautan Reset Password'}</span>
                        </button>
                    </form>

                    <div className="text-center border-t border-slate-100 pt-6">
                        <Link
                            href={route('login')}
                            className="inline-flex items-center gap-2 text-xs text-slate-600 hover:text-blue-600 font-bold transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Kembali ke Halaman Login</span>
                        </Link>
                    </div>

                </div>
            </div>
        </div>
    );
}