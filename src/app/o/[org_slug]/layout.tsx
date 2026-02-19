"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
    BarChart3,
    Users,
    Settings,
    LayoutDashboard,
    Bell,
    Search,
    Grid,
    Calendar as CalendarIcon,
    Home,
    Briefcase
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export default function OrgLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { org_slug: string };
}) {
    const pathname = usePathname();

    const navItems = [
        { name: 'Dashboard', href: `/o/${params.org_slug}`, icon: LayoutDashboard },
        { name: 'Leads', href: `/o/${params.org_slug}/leads`, icon: Users },
        { name: 'Property', href: `#`, icon: Home },
        { name: 'Transaction', href: `#`, icon: Briefcase },
        { name: 'Calendar', href: `#`, icon: CalendarIcon },
    ];

    return (
        <div className="min-h-screen bg-[#F8F9FB] text-slate-900 font-sans">
            {/* Top Navigation Bar */}
            <header className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-slate-200">
                <div className="max-w-[1600px] mx-auto px-6 h-20 flex items-center justify-between">
                    {/* Logo & Brand */}
                    <div className="flex items-center gap-12">
                        <Link href="/" className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20">
                                <Grid className="w-6 h-6 text-white" />
                            </div>
                            <span className="text-xl font-bold tracking-tight text-slate-800">
                                Guanaco <span className="text-primary">Lab</span>
                            </span>
                        </Link>

                        {/* Main Nav Items */}
                        <nav className="hidden md:flex items-center gap-1">
                            {navItems.map((item) => {
                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={cn(
                                            "px-5 py-2.5 rounded-full text-sm font-medium transition-all flex items-center gap-2",
                                            isActive
                                                ? "bg-primary text-white shadow-md shadow-primary/20"
                                                : "text-slate-500 hover:text-slate-800 hover:bg-slate-100"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4">
                        {/* Search Bar */}
                        <div className="hidden lg:flex items-center relative group">
                            <Search className="absolute left-3 w-4 h-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                            <input
                                type="text"
                                placeholder="Search..."
                                className="pl-10 pr-4 py-2 bg-slate-100 border-none rounded-full text-sm w-64 focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                        </div>

                        {/* Notifications */}
                        <button className="relative p-2.5 hover:bg-slate-100 rounded-full transition-colors">
                            <Bell className="w-5 h-5 text-slate-500" />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
                        </button>

                        {/* User Profile */}
                        <div className="flex items-center gap-3 pl-4 border-l border-slate-200 ml-2">
                            <div className="text-right hidden sm:block">
                                <p className="text-sm font-bold text-slate-800">Anne H.</p>
                                <p className="text-[11px] text-slate-400 font-medium">Agent Sales</p>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden overflow-hidden">
                                <img
                                    src="https://ui-avatars.com/api/?name=Anne+H&background=6366f1&color=fff"
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                        </div>

                        <Link
                            href={`/o/${params.org_slug}/settings`}
                            className="p-2.5 hover:bg-slate-100 rounded-full transition-colors text-slate-500"
                        >
                            <Settings className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </header>

            {/* Main Content Area */}
            <main className="max-w-[1600px] mx-auto px-6 py-8">
                {children}
            </main>
        </div>
    );
}
