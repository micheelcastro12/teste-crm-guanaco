"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    Users,
    Settings,
    LayoutDashboard,
    Bell,
    Search,
    Grid,
    Calendar as CalendarIcon,
    Home,
    Briefcase,
    Menu,
    X,
    Trello
} from 'lucide-react';
import { useState } from 'react';

export default function OrgLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { org_slug: string };
}) {
    const pathname = usePathname();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const navItems = [
        { name: 'Dashboard', href: `/o/${params.org_slug}`, icon: LayoutDashboard },
        { name: 'Leads', href: `/o/${params.org_slug}/leads`, icon: Users },
        { name: 'Empreendimentos', href: `/o/${params.org_slug}/developments`, icon: Home },
        { name: 'Pipeline', href: `/o/${params.org_slug}/pipeline`, icon: Trello },
        { name: 'Calendário', href: `/o/${params.org_slug}/calendar`, icon: CalendarIcon },
        { name: 'Configurações', href: `/o/${params.org_slug}/settings`, icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-[#F4F7FE] text-[#1B2559]">
            {/* Top Navigation Bar: Glassmorphism Style */}
            <header className="sticky top-0 z-50 w-full glass-nav px-4 md:px-10">
                <div className="max-w-[1700px] mx-auto h-[84px] flex items-center justify-between">
                    {/* Logo & Brand */}
                    <div className="flex items-center gap-4 lg:gap-16">
                        <Link href="/" className="flex items-center gap-3 shrink-0">
                            <div className="w-10 h-10 md:w-11 md:h-11 bg-primary rounded-[14px] flex items-center justify-center shadow-xl shadow-primary/20">
                                <Grid className="w-5 h-5 md:w-6 md:h-6 text-white" />
                            </div>
                            <span className="text-xl md:text-2xl font-black tracking-tight text-[#1B2559]">
                                Guanaco <span className="font-medium text-primary">Lab</span>
                            </span>
                        </Link>

                        {/* Main Nav Items (Desktop) */}
                        <nav className="hidden xl:flex items-center gap-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={`px-4 py-2.5 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${isActive
                                            ? "text-primary bg-white shadow-sm"
                                            : "text-[#A3AED0] hover:text-[#1B2559] hover:bg-white/50"
                                            }`}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-3 md:gap-6">
                        {/* Search Bar (Hidden on mobile) */}
                        <div className="hidden lg:flex items-center relative">
                            <Search className="absolute left-4 w-4 h-4 text-[#A3AED0]" />
                            <input
                                type="text"
                                placeholder="Pesquisar..."
                                className="pl-12 pr-6 py-3 bg-[#F4F7FE] border-none rounded-full text-sm w-48 xl:w-72 focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-[#A3AED0]"
                            />
                        </div>

                        {/* Notifications */}
                        <button className="relative p-2.5 bg-white rounded-full shadow-sm hover:shadow-md transition-all text-[#A3AED0] hover:text-primary">
                            <Bell className="w-5 h-5 text-current" />
                            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        {/* Divider (Hidden on mobile) */}
                        <div className="hidden sm:block w-[1px] h-8 bg-[#E9EDF7]"></div>

                        {/* User Profile */}
                        <div className="flex items-center gap-3">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-[#1B2559]">Anne H.</p>
                                <p className="text-[11px] text-[#A3AED0] font-bold uppercase tracking-wider">Líder Comercial</p>
                            </div>
                            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full border-[3px] border-white shadow-lg overflow-hidden shrink-0">
                                <img
                                    src="https://ui-avatars.com/api/?name=Anne+H&background=4318FF&color=fff"
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        {/* Mobile Menu Toggle (Visible on XL-) */}
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="xl:hidden p-2.5 bg-white rounded-full shadow-sm text-[#1B2559]"
                        >
                            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                {isMobileMenuOpen && (
                    <div className="xl:hidden bg-white border-t border-[#E9EDF7] py-4 px-6 animate-in slide-in-from-top duration-300">
                        <nav className="flex flex-col gap-2">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={`flex items-center gap-4 px-4 py-3 rounded-xl text-base font-bold transition-all ${isActive
                                            ? "text-primary bg-blue-50"
                                            : "text-[#A3AED0] hover:text-[#1B2559] hover:bg-slate-50"
                                            }`}
                                    >
                                        <item.icon className="w-5 h-5" />
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                        {/* Mobile Search */}
                        <div className="mt-6 lg:hidden relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0]" />
                            <input
                                type="text"
                                placeholder="Pesquisar..."
                                className="w-full pl-12 pr-6 py-4 bg-[#F4F7FE] border-none rounded-2xl text-sm outline-none focus:ring-2 focus:ring-primary/20"
                            />
                        </div>
                    </div>
                )}
            </header>

            {/* Main Content Area */}
            <main className="max-w-[1700px] mx-auto px-4 md:px-10 py-6 md:py-10">
                {children}
            </main>
        </div>
    );
}
