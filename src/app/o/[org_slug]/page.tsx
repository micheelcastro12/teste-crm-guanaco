"use client";

import { useEffect, useState } from 'react';
import { Users, ArrowUpRight, ArrowDownRight, DollarSign, Home, CheckCircle2, MoreHorizontal, Clock, TrendingUp } from 'lucide-react';
import { XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from 'recharts';

const performanceData = [
    { name: 'Jan', revenue: 45, visits: 30 }, { name: 'Fev', revenue: 52, visits: 35 }, { name: 'Mar', revenue: 48, visits: 40 },
    { name: 'Abr', revenue: 61, visits: 45 }, { name: 'Mai', revenue: 55, visits: 50 }, { name: 'Jun', revenue: 67, visits: 55 }, { name: 'Jul', revenue: 70, visits: 60 },
];

const STATS = [
    { label: 'Leads Ativos', value: '120', trend: '+12%', isUp: true, icon: Users, color: 'text-blue-500', bg: 'bg-blue-50' },
    { label: 'Receita Est.', value: 'R$ 96.7K', trend: '+8%', isUp: true, icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Imóveis Ativos', value: '23', trend: '-2%', isUp: false, icon: Home, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Fechamentos', value: '42', trend: null, isUp: true, icon: CheckCircle2, color: 'text-purple-500', bg: 'bg-purple-50' },
];

export default function Dashboard({ params }: { params: { org_slug: string } }) {
    const [leads, setLeads] = useState<any[]>([]);

    useEffect(() => {
        fetch(`/api/leads?org_slug=${params.org_slug}`).then(res => res.json()).then(data => { if (Array.isArray(data)) setLeads(data.slice(0, 5)); });
    }, [params.org_slug]);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STATS.map((stat, i) => (
                    <div key={i} className="bg-white p-6 rounded-[20px] premium-shadow border border-transparent transition-all hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-4">
                            <div className={stat.bg + " w-12 h-12 rounded-2xl flex items-center justify-center"}><stat.icon className={"w-6 h-6 " + stat.color} /></div>
                            {stat.trend && <div className={`px-2 py-1 rounded-full text-[11px] font-bold ${stat.isUp ? 'text-emerald-500 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>{stat.trend}</div>}
                        </div>
                        <p className="text-[#A3AED0] text-sm font-medium uppercase tracking-tight">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-[#1B2559] mt-1">{stat.value}</h3>
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-white p-8 rounded-[20px] premium-shadow">
                    <h2 className="text-xl font-bold text-[#1B2559] mb-8">Performance Mensal</h2>
                    <div className="h-[320px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E9EDF7" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#A3AED0', fontSize: 12 }} dy={10} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#A3AED0', fontSize: 12 }} />
                                <Tooltip contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }} />
                                <Area type="monotone" dataKey="revenue" stroke="#4318FF" strokeWidth={4} fillOpacity={0.1} fill="#4318FF" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>
                <div className="lg:col-span-4 bg-white p-6 rounded-[20px] premium-shadow">
                    <h2 className="text-lg font-bold text-[#1B2559] mb-6">Lembretes</h2>
                    <div className="space-y-4">
                        <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 cursor-pointer">
                            <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center"><Clock className="w-5 h-5" /></div>
                            <div><p className="text-sm font-bold text-[#1B2559]">Pendências</p><p className="text-[11px] text-[#A3AED0]">15 leads aguardando</p></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
