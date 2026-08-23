import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import { 
    LayoutDashboard, 
    GraduationCap, 
    Users, 
    UserCheck, 
    Wallet, 
    FileText, 
    Megaphone, 
    Mail, 
    Folder, 
    Settings, 
    LogOut, 
    Building2,
    Bell,
    Search,
    ChevronDown,
    PanelLeftClose,
    PanelLeftOpen,
    Menu,
    X
} from 'lucide-react';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';

export default function AppLayout({ children, title }) {
    // Ambil auth user dan instansi_name dari Share Props Middleware
    const { auth, instansi_name } = usePage().props;
    const user = auth?.user;

    // Fallback nama instansi dari DB users tenant
    const namaInstansi = instansi_name || user?.name || 'Workspace Tenant';

    const [collapsed, setCollapsed] = useState(false);
    const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

    // Menu Utama Desktop
    const navItems = [
        { title: 'Dashboard', url: route('dashboard'), icon: LayoutDashboard, active: true },
        { title: 'Akademik', url: '#', icon: GraduationCap },
        { title: 'Siswa', url: '#', icon: Users },
        { title: 'Guru & Karyawan', url: '#', icon: UserCheck },
        { title: 'Keuangan', url: '#', icon: Wallet },
        { title: 'Laporan', url: '#', icon: FileText },
        { title: 'Pengumuman', url: '#', icon: Megaphone },
        { title: 'Pesan', url: '#', icon: Mail },
        { title: 'Dokumen', url: '#', icon: Folder },
        { title: 'Pengaturan', url: '#', icon: Settings },
    ];

    // Menu khusus Bottom Navigation HP (5 Item Utama)
    const mobileBottomItems = [
        { title: 'Beranda', url: route('dashboard'), icon: LayoutDashboard, active: true },
        { title: 'Siswa', url: '#', icon: Users },
        { title: 'Keuangan', url: '#', icon: Wallet },
        { title: 'Pesan', url: '#', icon: Mail },
    ];

    return (
        <div className="min-h-screen flex bg-[#f8fafc] pb-20 md:pb-0">
            {/* DESKTOP SIDEBAR NAVIGATION (Hidden on Mobile) */}
            <aside className={`hidden md:flex bg-white border-r border-slate-200 flex-col fixed inset-y-0 z-30 transition-all duration-300 ${collapsed ? 'w-20' : 'w-64'}`}>
                {/* LOGO SIDIKO */}
                <div className="h-16 px-4 border-b border-slate-100 flex items-center justify-between bg-[#0f172a] text-white">
                    <div className="flex items-center gap-3 overflow-hidden">
                        <div className="p-2 bg-blue-600 rounded-lg shrink-0">
                            <Building2 className="w-5 h-5 text-white" />
                        </div>
                        {!collapsed && (
                            <div className="flex flex-col">
                                <span className="font-extrabold text-lg tracking-wider">SIDIKO</span>
                                <span className="text-[10px] text-slate-400 -mt-1">School Management System</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* SELECTOR TENANT / SEKOLAH (DINAMIS SESUAI DATABASE USER TENANT) */}
                {!collapsed && (
                    <div className="p-3 border-b border-slate-100 bg-slate-50/50">
                        <div className="flex items-center justify-between p-2 bg-white rounded-lg border border-slate-200 shadow-sm cursor-pointer">
                            <div className="flex items-center gap-2 overflow-hidden">
                                <div className="w-7 h-7 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center font-bold text-xs shrink-0">
                                    {namaInstansi.substring(0, 2).toUpperCase()}
                                </div>
                                <div className="flex flex-col overflow-hidden">
                                    <span className="text-xs font-bold text-slate-800 truncate">{namaInstansi}</span>
                                    <span className="text-[10px] text-slate-500">Tahun Ajaran 2026/2027</span>
                                </div>
                            </div>
                            <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                        </div>
                    </div>
                )}

                {/* MENU UTAMA DESKTOP */}
                <div className="flex-1 overflow-y-auto px-3 py-4 space-y-1">
                    {!collapsed && <p className="px-3 text-[11px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Menu Utama</p>}
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        return (
                            <Link
                                key={item.title}
                                href={item.url}
                                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl font-medium text-sm transition-all ${
                                    item.active 
                                        ? 'bg-blue-600 text-white shadow-md shadow-blue-500/20' 
                                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                                }`}
                            >
                                <Icon className={`w-5 h-5 shrink-0 ${item.active ? 'text-white' : 'text-slate-500'}`} />
                                {!collapsed && <span className="truncate">{item.title}</span>}
                            </Link>
                        );
                    })}
                </div>

                {/* COLLAPSE TOGGLE DESKTOP */}
                <div className="p-3 border-t border-slate-100">
                    <button 
                        onClick={() => setCollapsed(!collapsed)}
                        className="w-full flex items-center gap-3 px-3 py-2 text-slate-600 hover:bg-slate-100 rounded-xl text-sm font-medium transition-colors"
                    >
                        {collapsed ? <PanelLeftOpen className="w-5 h-5" /> : <PanelLeftClose className="w-5 h-5" />}
                        {!collapsed && <span>Collapse</span>}
                    </button>
                </div>
            </aside>

            {/* MAIN CONTENT AREA */}
            <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${collapsed ? 'md:pl-20' : 'md:pl-64'}`}>
                {/* TOP NAVBAR (DESKTOP & MOBILE HEADER) */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-4 md:px-6 sticky top-0 z-20">
                    {/* MOBILE BRAND LOGO */}
                    <div className="flex items-center gap-2 md:hidden">
                        <div className="p-1.5 bg-blue-600 rounded-lg">
                            <Building2 className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-extrabold text-base tracking-wide text-slate-900">SIDIKO</span>
                    </div>

                    {/* SEARCH BAR (Desktop) */}
                    <div className="hidden md:block relative w-72 md:w-96">
                        <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Cari menu, siswa, tagihan, dll..." 
                            className="w-full pl-9 pr-4 py-2 bg-slate-100/70 border-none rounded-xl text-xs text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-600/20 transition-all"
                        />
                    </div>

                    {/* TOP RIGHT PROFILE & NOTIFICATION */}
                    <div className="flex items-center gap-3">
                        <button className="p-2 text-slate-500 hover:text-slate-800 rounded-full hover:bg-slate-100 relative">
                            <Bell className="w-5 h-5" />
                            <span className="w-2 h-2 bg-red-500 rounded-full absolute top-1.5 right-1.5 ring-2 ring-white"></span>
                        </button>

                        <div className="h-6 w-[1px] bg-slate-200"></div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="flex items-center gap-2.5 cursor-pointer">
                                    <Avatar className="h-8 w-8 md:h-9 md:w-9 border border-slate-200">
                                        <AvatarFallback className="bg-blue-50 text-blue-600 font-bold text-xs">
                                            {user?.name?.charAt(0) || 'A'}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="hidden md:flex flex-col text-left">
                                        <span className="text-xs font-bold text-slate-800 leading-snug">{user?.name || namaInstansi}</span>
                                        <span className="text-[10px] text-slate-500">{user?.email || 'Administrator'}</span>
                                    </div>
                                    <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-48 mt-2">
                                <DropdownMenuItem asChild>
                                    <Link href={route('logout')} method="post" as="button" className="w-full flex items-center text-red-600 cursor-pointer">
                                        <LogOut className="mr-2 h-4 w-4" />
                                        <span>Keluar (Logout)</span>
                                    </Link>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* CONTENT BODY */}
                <main className="flex-1 p-4 md:p-6 overflow-y-auto">
                    {children}
                </main>
            </div>

            {/* MOBILE BOTTOM NAVIGATION BAR (Khusus Tampilan HP) */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-200 z-40 px-3 py-2 flex items-center justify-around shadow-lg">
                {mobileBottomItems.map((item) => {
                    const Icon = item.icon;
                    return (
                        <Link
                            key={item.title}
                            href={item.url}
                            className={`flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all ${
                                item.active ? 'text-blue-600' : 'text-slate-400 hover:text-slate-600'
                            }`}
                        >
                            <Icon className="w-5 h-5" />
                            <span className="text-[10px] font-bold">{item.title}</span>
                        </Link>
                    );
                })}

                {/* TOMBOL MORE / MENU LAINNYA */}
                <button
                    onClick={() => setMobileDrawerOpen(true)}
                    className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl text-slate-400 hover:text-slate-600"
                >
                    <Menu className="w-5 h-5" />
                    <span className="text-[10px] font-bold">Menu</span>
                </button>
            </div>

            {/* MOBILE FULL MENU SLIDE-UP DRAWER */}
            {mobileDrawerOpen && (
                <div className="md:hidden fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex flex-col justify-end animate-in fade-in duration-200">
                    <div className="bg-white rounded-t-3xl p-5 max-h-[80vh] flex flex-col space-y-4 shadow-2xl">
                        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                            <div className="flex items-center gap-2">
                                <div className="p-1.5 bg-blue-600 rounded-lg">
                                    <Building2 className="w-4 h-4 text-white" />
                                </div>
                                <span className="font-extrabold text-base text-slate-900">Semua Menu SIDIKO</span>
                            </div>
                            <button 
                                onClick={() => setMobileDrawerOpen(false)}
                                className="p-1.5 text-slate-400 hover:text-slate-700 bg-slate-100 rounded-full"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* GRID MENU SELENGKAPNYA */}
                        <div className="grid grid-cols-4 gap-3 overflow-y-auto py-2">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                return (
                                    <Link
                                        key={item.title}
                                        href={item.url}
                                        onClick={() => setMobileDrawerOpen(false)}
                                        className="flex flex-col items-center text-center p-2 rounded-2xl hover:bg-slate-50 transition-all"
                                    >
                                        <div className={`p-3 rounded-2xl mb-1.5 ${item.active ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-600'}`}>
                                            <Icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-[11px] font-medium text-slate-700 leading-tight line-clamp-1">{item.title}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        {/* LOGOUT BUTTON IN MOBILE DRAWER */}
                        <div className="border-t border-slate-100 pt-3">
                            <Link
                                href={route('logout')}
                                method="post"
                                as="button"
                                className="w-full flex items-center justify-center gap-2 py-3 bg-red-50 text-red-600 rounded-2xl font-bold text-xs"
                            >
                                <LogOut className="w-4 h-4" />
                                <span>Keluar dari Aplikasi</span>
                            </Link>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}