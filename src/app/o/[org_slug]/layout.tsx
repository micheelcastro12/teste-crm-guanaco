"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Users, LayoutDashboard, Bell, Search, Grid, Home, Briefcase, Calendar as CalendarIcon, Settings } from 'lucide-react';

export default function OrgLayout({ children, params }: { children: React.ReactNode; params: { org_slug: string } }) {
    const pathname = usePathname();
    const navItems = [
        { name: 'Dashboard', href: `/o/${params.org_slug}`, icon: LayoutDashboard },
        { name: 'Leads', href: `/o/${params.org_slug}/leads`, icon: Users },
        { name: 'Property', href: `#`, icon: Home },
        { name: 'Transaction', href: `#`, icon: Briefcase },
        { name: 'Calendar', href: `#`, icon: CalendarIcon },
    ];

    return (
        <div className="min-h-screen bg-[#F4F7FE] text-[#1B2559]">
            <header className="sticky top-0 z-40 w-full glass-nav">
                <div className="max-w-[1700px] mx-auto px-10 h-[84px] flex items-center justify-between">
                    <div className="flex items-center gap-16">
                        <Link href="/" className="flex items-center gap-3">
                            <div className="w-11 h-11 bg-primary rounded-[14px] flex items-center justify-center shadow-xl shadow-primary/20">
                                <Grid className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-2xl font-black tracking-tight text-[#1B2559]">Guanaco <span className="font-medium text-primary">Lab</span></span>
                        </Link>
                        <nav className="hidden md:flex items-center gap-2">
                            {navItems.map((item) => (
                                <Link key={item.name} href={item.href} className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all ${pathname === item.href ? "text-primary bg-white shadow-sm" : "text-[#A3AED0] hover:text-[#1B2559] hover:bg-white/50"}`}>{item.name}</Link>
                            ))}
                        </nav>
                    </div>
                    <div className="flex items-center gap-6">
                        <div className="hidden lg:flex items-center relative">
                            <Search className="absolute left-4 w-4 h-4 text-[#A3AED0]" />
                            <input type="text" placeholder="Pequisar..." className="pl-12 pr-6 py-3 bg-[#F4F7FE] border-none rounded-full text-sm w-72 focus:ring-2 focus:ring-primary/20 outline-none transition-all placeholder:text-[#A3AED0]" />
                        </div>
                        <button className="relative p-3 bg-white rounded-full shadow-sm text-[#A3AED0] hover:text-primary"><Bell className="w-5 h-5" /></button>
                        <div className="w-12 h-12 rounded-full border-[3px] border-white shadow-lg overflow-hidden"><img src="https://ui-avatars.com/api/?name=Anne+H&background=4318FF&color=fff" alt="Avatar" className="w-full h-full object-cover" /></div>
                    </div>
                </div>
            </header>
            <main className="max-w-[1700px] mx-auto px-10 py-10">{children}</main>
        </div>
    );
}
