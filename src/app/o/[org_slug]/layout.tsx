import Link from 'next/link';
import { LayoutDashboard, Users, Settings, Database } from 'lucide-react';

export default function OrgLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { org_slug: string };
}) {
    const { org_slug } = params;

    const navItems = [
        { name: 'Dashboard', href: `/o/${org_slug}`, icon: LayoutDashboard },
        { name: 'Leads', href: `/o/${org_slug}/leads`, icon: Users },
        { name: 'Configurações', href: `/o/${org_slug}/settings`, icon: Settings },
    ];

    return (
        <div className="flex min-h-screen bg-gray-50">
            {/* Sidebar */}
            <aside className="fixed inset-y-0 left-0 w-64 border-r bg-white shadow-sm hidden md:flex flex-col">
                <div className="p-6 border-b">
                    <Link href={`/o/${org_slug}`} className="flex items-center gap-2 font-bold text-xl text-primary">
                        <Database className="w-6 h-6" />
                        <span>Real CRM</span>
                    </Link>
                    <p className="text-xs text-gray-500 mt-1 uppercase tracking-wider">{org_slug}</p>
                </div>
                <nav className="flex-1 p-4 space-y-1">
                    {navItems.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="flex items-center gap-3 px-3 py-2 rounded-md text-gray-600 hover:bg-gray-100 hover:text-primary transition-colors"
                        >
                            <item.icon className="w-5 h-5" />
                            <span>{item.name}</span>
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 md:ml-64 p-8">
                {children}
            </main>
        </div>
    );
}
