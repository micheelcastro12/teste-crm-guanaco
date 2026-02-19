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
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area
} from 'recharts';

// Mock performance data
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
    { label: 'Active Leads', value: '120', trend: '+12%', icon: Users, color: 'text-amber-500', bg: 'bg-amber-50' },
    { label: 'Total Revenue', value: '$96.7K', trend: '+12%', icon: DollarSign, color: 'text-emerald-500', bg: 'bg-emerald-50' },
    { label: 'Active Listing', value: '23', trend: '+12%', icon: Home, color: 'text-orange-500', bg: 'bg-orange-50' },
    { label: 'Total Closed', value: '42', trend: null, icon: CheckCircle2, color: 'text-blue-500', bg: 'bg-blue-50' },
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
            {/* 1. Header Metrics Grid */}
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

            {/* 2. Main Analytics Section */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Performance Chart */}
                <div className="lg:col-span-8 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-10">
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">Performance</h2>
                            <div className="flex items-center gap-4 mt-1">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                                    <span className="text-xs text-slate-500 font-medium">Revenue</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 rounded-full bg-sky-400"></div>
                                    <span className="text-xs text-slate-500 font-medium">Visit</span>
                                </div>
                            </div>
                        </div>
                        <select className="text-sm bg-slate-50 border-none rounded-lg px-3 py-1.5 outline-none font-medium text-slate-600 cursor-pointer">
                            <option>Monthly</option>
                            <option>Weekly</option>
                        </select>
                    </div>

                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceData}>
                                <defs>
                                    <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#94a3b8', fontSize: 12 }}
                                    tickFormatter={(value) => `${value}%`}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorRev)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="visits"
                                    stroke="#38bdf8"
                                    strokeWidth={3}
                                    fill="transparent"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Reminders / Activity Box */}
                <div className="lg:col-span-4 flex flex-col gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex-1">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-slate-800">Reminder</h2>
                            <button className="text-slate-400">
                                <ArrowUpRight className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="space-y-6">
                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                                    <Clock className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-800">Follow-Ups</p>
                                    <p className="text-xs text-slate-400">15 leads need to be followed up</p>
                                </div>
                                <div className="w-8 h-8 rounded-full border-2 border-slate-100 flex items-center justify-center text-[10px] font-bold">
                                    {">"}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                                    <Users className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-800">Visits</p>
                                    <p className="text-xs text-slate-400">3 Leads visit today</p>
                                </div>
                                <div className="w-8 h-8 rounded-full border-2 border-slate-100 flex items-center justify-center text-[10px] font-bold">
                                    {">"}
                                </div>
                            </div>

                            <div className="flex items-center gap-4 group cursor-pointer">
                                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center">
                                    <TrendingUp className="w-6 h-6" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-sm font-bold text-slate-800">Expire Listings</p>
                                    <p className="text-xs text-slate-400">2 Listings expiring soon</p>
                                </div>
                                <div className="w-8 h-8 rounded-full border-2 border-slate-100 flex items-center justify-center text-[10px] font-bold">
                                    {">"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* 3. Bottom Row: Table & Calendar */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Recent Leads Table */}
                <div className="lg:col-span-8 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-800">Leads Contact</h2>
                        <button className="text-primary text-sm font-bold">View All</button>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="text-left text-slate-400 text-xs font-semibold uppercase tracking-wider">
                                    <th className="pb-4">Name</th>
                                    <th className="pb-4">Interest</th>
                                    <th className="pb-4">Status</th>
                                    <th className="pb-4 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {leads.map((lead) => (
                                    <tr key={lead.id} className="group">
                                        <td className="py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-primary font-bold">
                                                    {lead.name[0]}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800">{lead.name}</p>
                                                    <p className="text-xs text-slate-400">{lead.city || 'Brazil'}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <p className="text-sm text-slate-600">{lead.interest || 'Apartment'}</p>
                                        </td>
                                        <td className="py-4">
                                            <span className="px-2.5 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase">
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="py-4 text-right">
                                            <button className="p-2 text-slate-300 hover:text-slate-600">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Mini Calendar */}
                <div className="lg:col-span-4 bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-lg font-bold text-slate-800">June 2025</h2>
                        <div className="flex gap-2">
                            <button className="p-1 hover:bg-slate-50 rounded"><ChevronLeft className="w-4 h-4 text-slate-400" /></button>
                            <button className="p-1 hover:bg-slate-50 rounded"><ChevronRight className="w-4 h-4 text-slate-400" /></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-7 gap-2 mb-4">
                        {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, i) => (
                            <div key={i} className="text-center text-[10px] font-bold text-slate-300 uppercase">{d}</div>
                        ))}
                        {[...Array(31)].map((_, i) => {
                            const day = i + 1;
                            const isSelected = day === 21;
                            return (
                                <div
                                    key={i}
                                    className={cn(
                                        "h-8 flex items-center justify-center text-xs font-medium rounded-lg cursor-pointer transition-colors",
                                        isSelected ? "bg-primary text-white shadow-lg shadow-primary/20" : "text-slate-600 hover:bg-slate-50"
                                    )}
                                >
                                    {day}
                                </div>
                            );
                        })}
                    </div>

                    <div className="mt-8 pt-6 border-t border-slate-100">
                        <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest mb-4">Upcoming Schedule</p>
                        <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 border-l-4 border-l-primary">
                            <p className="text-xs font-bold text-slate-800">Visit Client Michael Reynolds</p>
                            <p className="text-[10px] text-slate-400 mt-1">742 Oak Street, Denver, CO 80220</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

function cn(...inputs: any[]) {
    return inputs.filter(Boolean).join(' ');
}
