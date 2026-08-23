import AppLayout from '@/Layouts/AppLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Users, UserCheck, Wallet, ArrowUpRight, Megaphone } from 'lucide-react';

export default function Dashboard({ auth }) {
    const activities = [
        { title: 'Pembayaran diterima dari Ahmad Rizki', sub: 'Rp 500.000', time: '2 menit yang lalu', color: 'bg-blue-50 text-blue-600' },
        { title: 'Tagihan baru dibuat untuk 12 siswa', sub: '', time: '15 menit yang lalu', color: 'bg-amber-50 text-amber-600' },
        { title: 'Data siswa diperbarui oleh Operator', sub: '', time: '1 jam yang lalu', color: 'bg-emerald-50 text-emerald-600' },
    ];

    return (
        <AppLayout title="Dashboard">
            <Head title="Dashboard Tenant" />

            <div className="space-y-6">
                {/* HEADER & DATE RANGE SELECTOR */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Dashboard</h1>
                        <p className="text-xs text-slate-500 mt-0.5">Ringkasan informasi sekolah Anda</p>
                    </div>
                    <div className="bg-white border border-slate-200 text-slate-700 px-3 py-1.5 rounded-xl text-xs font-semibold shadow-sm w-fit">
                        01 Mei 2026 - 31 Mei 2026
                    </div>
                </div>

                {/* GRID STATISTIK KARTU (4 COLUMN) */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="border border-slate-200/80 shadow-sm rounded-2xl bg-white">
                        <CardContent className="p-5 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-500">Jumlah Siswa</p>
                                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">1.850</h3>
                                <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                                    <ArrowUpRight className="w-3 h-3" /> +24 dari bulan lalu
                                </p>
                            </div>
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                <Users className="w-6 h-6" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-slate-200/80 shadow-sm rounded-2xl bg-white">
                        <CardContent className="p-5 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-500">Jumlah Guru</p>
                                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">120</h3>
                                <p className="text-[11px] text-blue-600 font-semibold mt-1 flex items-center gap-1">
                                    <ArrowUpRight className="w-3 h-3" /> +2 dari bulan lalu
                                </p>
                            </div>
                            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
                                <UserCheck className="w-6 h-6" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-slate-200/80 shadow-sm rounded-2xl bg-white">
                        <CardContent className="p-5 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-500">Tagihan Belum Lunas</p>
                                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">Rp 125.750.000</h3>
                                <p className="text-[11px] text-slate-400 font-medium mt-1">32% dari total tagihan</p>
                            </div>
                            <div className="p-3 bg-amber-50 text-amber-600 rounded-2xl">
                                <Wallet className="w-6 h-6" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border border-slate-200/80 shadow-sm rounded-2xl bg-white">
                        <CardContent className="p-5 flex items-center justify-between">
                            <div>
                                <p className="text-xs font-semibold text-slate-500">Pembayaran Bulan Ini</p>
                                <h3 className="text-2xl font-extrabold text-slate-900 mt-1">Rp 85.650.000</h3>
                                <p className="text-[11px] text-emerald-600 font-semibold mt-1 flex items-center gap-1">
                                    <ArrowUpRight className="w-3 h-3" /> +15% dari bulan lalu
                                </p>
                            </div>
                            <div className="p-3 bg-emerald-50 text-emerald-600 rounded-2xl">
                                <Wallet className="w-6 h-6" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* GRAFIK & AKTIVITAS DUA KOLOM */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* AREA AKTIVITAS TERBARU (1/3 WIDTH) */}
                    <Card className="border border-slate-200/80 shadow-sm rounded-2xl bg-white lg:col-span-1">
                        <CardContent className="p-6">
                            <h3 className="font-bold text-slate-900 text-sm mb-4">Aktivitas Terbaru</h3>
                            <div className="space-y-4">
                                {activities.map((act, idx) => (
                                    <div key={idx} className="flex items-start gap-3">
                                        <div className={`p-2 rounded-xl text-xs ${act.color} shrink-0 mt-0.5`}>
                                            <Wallet className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-xs font-semibold text-slate-800 leading-snug">{act.title}</p>
                                            <p className="text-[11px] text-slate-400 mt-0.5">{act.time}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>

                    {/* BANNER PENGUMUMAN (2/3 WIDTH) */}
                    <Card className="border border-slate-200/80 shadow-sm rounded-2xl bg-white lg:col-span-2">
                        <CardContent className="p-6 flex flex-col justify-between h-full space-y-4">
                            <div>
                                <div className="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-wider">
                                    <Megaphone className="w-4 h-4" />
                                    <span>Pengumuman Terbaru</span>
                                </div>
                                <h3 className="text-base font-bold text-slate-900 mt-2">
                                    PPDB Tahun Ajaran 2026/2027 Telah Dibuka secara Resmi
                                </h3>
                                <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                                    Silakan informasikan kepada calon siswa & wali murid untuk melakukan verifikasi berkas secara mandiri melalui portal pendaftaran.
                                </p>
                            </div>
                            <div className="flex items-center justify-between border-t border-slate-100 pt-4 text-xs">
                                <span className="text-slate-400">20 Mei 2026</span>
                                <button className="text-blue-600 font-bold hover:underline">Lihat Semua Pengumuman &rarr;</button>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}