"use client";

import { useEffect, useState } from 'react';
import {
    Users,
    ArrowUpRight,
    DollarSign,
    Home,
    CheckCircle2,
    MoreHorizontal,
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    TrendingUp,
    Clock
} from 'lucide-react';
import {
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

const performanceData = [
    { name: 'Jan', revenue: 45, visits: 30 },
    { name: 'Feb', revenue: 52, visits: 35 },
    { name: 'Mar', revenue: 48, visits: 40 },
    { name: 'Apr', revenue: 61, visits: 45 },
    { name: 'May', revenue: 55, visits: 50 },
    { name: 'Jun', revenue: 67, visits: 55 },
    { name: 'Jul', revenue: 70, visits: 60 },
];

const STATS = [
    { label: 'Leads Ativos', value: '120', trend: '+12%', icon: Users, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Receita Total', value: 'R$ 96.7K', trend: '+12%', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Imóveis Ativos', value: '23', trend: '+12%', icon: Home, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Fechamentos', value: '42', trend: null, icon: CheckCircle2, color: 'text-blue-500', bg: 'bg-blue-50' },
];

export default function Dashboard({ params }: { params: { org_slug: string } }) {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch(`/api/leads?org_slug=${params.org_slug}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setLeads(data.slice(0, 5));
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [params.org_slug]);

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STATS.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-all">
                        <div className="flex justify-between items-start mb-4">
                            <div className={stat.bg + " p-2.5 rounded-xl"}>
                                <stat.icon className={"w-5 h-5 " + stat.color} />
                            </div>
                            {stat.trend && (
                                <div className="flex items-center gap-1 text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full text-[11px] font-bold">
                                    <ArrowUpRight className="w-3 h-3" />
                                    {stat.trend}
                                </div>
                            )}
                        </div>
                        <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-slate-800 mt-1">{stat.value}</h3>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">Performance</h2>
                            <div className="flex items-center gap-4 mt-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-blue-500"></div>
                                    <span className="text-xs text-slate-500 font-medium">Receita</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-sky-400"></div>
                                    <span className="text-xs text-slate-500 font-medium">Visitas</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                                <Area type="monotone" dataKey="revenue" stroke="#3b82f6" strokeWidth={3} fillOpacity={0.1} fill="#3b82f6" />
                                <Area type="monotone" dataKey="visits" stroke="#38bdf8" strokeWidth={3} fill="transparent" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex-1">
                        <h2 className="text-lg font-bold text-slate-800 mb-6">Lembretes</h2>
                        <div className="space-y-6">
                            <div className="flex items-center gap-4 cursor-pointer">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-800">Follow-Ups</p>
                                    <p className="text-xs text-slate-400">15 leads pendentes</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-lg font-bold text-slate-800">Leads Recentes</h2>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-slate-400 text-xs font-semibold uppercase tracking-wider">
                                <th className="pb-4">Nome</th>
                                <th className="pb-4">Interesse</th>
                                <th className="pb-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {leads.map((lead) => (
                                <tr key={lead.id} className="group">
                                    <td className="py-4 font-bold text-sm text-slate-800">{lead.name}</td>
                                    <td className="py-4 text-sm text-slate-600">{lead.interest || 'Apartamento'}</td>
                                    <td className="py-4 uppercase text-[10px] font-bold text-blue-600">
                                        <span className="bg-blue-50 px-2 py-1 rounded-full">{lead.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
