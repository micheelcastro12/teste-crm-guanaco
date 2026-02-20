"use client";

import { useEffect, useState } from 'react';
import {
    Users,
    ArrowUpRight,
    ArrowDownRight,
    DollarSign,
    Home,
    CheckCircle2,
    MoreHorizontal,
    Calendar as CalendarIcon,
    ChevronLeft,
    ChevronRight,
    TrendingUp,
    Clock,
    Search
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

import { MOCK_LEADS, MOCK_STATS } from '@/lib/mockData';

const performanceData = [
    { name: 'Jan', revenue: 45, visits: 30 },
    { name: 'Feb', revenue: 52, visits: 35 },
    { name: 'Mar', revenue: 48, visits: 40 },
    { name: 'Apr', revenue: 61, visits: 45 },
    { name: 'May', revenue: 55, visits: 50 },
    { name: 'Jun', revenue: 67, visits: 55 },
    { name: 'Jul', revenue: 70, visits: 60 },
];

export default function Dashboard({ params }: { params: { org_slug: string } }) {
    // Lead data is now static for the mock version
    const leads = MOCK_LEADS.slice(0, 5);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            {/* 1. Metric Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {MOCK_STATS.map((stat, i) => {
                    const Icon = [Users, DollarSign, Home, CheckCircle2][i];
                    const colors = [
                        { text: 'text-blue-500', bg: 'bg-blue-50' },
                        { text: 'text-emerald-500', bg: 'bg-emerald-50' },
                        { text: 'text-orange-500', bg: 'bg-orange-50' },
                        { text: 'text-purple-500', bg: 'bg-purple-50' }
                    ][i];

                    return (
                        <div key={i} className="bg-white p-6 rounded-[20px] premium-shadow card-hover border border-transparent">
                            <div className="flex justify-between items-start mb-4">
                                <div className={colors.bg + " w-12 h-12 rounded-2xl flex items-center justify-center"}>
                                    <Icon className={"w-6 h-6 " + colors.text} />
                                </div>
                                {stat.trend && (
                                    <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-[11px] font-bold ${stat.isUp ? 'text-emerald-500 bg-emerald-50' : 'text-red-500 bg-red-50'}`}>
                                        {stat.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                        {stat.trend}
                                    </div>
                                )}
                            </div>
                            <p className="text-[#A3AED0] text-sm font-medium tracking-tight uppercase">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-[#1B2559] mt-1">{stat.value}</h3>
                        </div>
                    );
                })}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* 2. Main Performance Chart */}
                <div className="lg:col-span-8 bg-white p-8 rounded-[20px] premium-shadow border border-transparent">
                    <div className="flex justify-between items-center mb-8">
                        <div>
                            <h2 className="text-xl font-bold text-[#1B2559]">Performance Mensal</h2>
                            <p className="text-sm text-[#A3AED0] mt-1">Visão geral de crescimento da unidade</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                <span className="text-xs text-[#2B3674] font-bold">Receita</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <div className="w-3 h-3 rounded-full bg-blue-200"></div>
                                <span className="text-xs text-[#2B3674] font-bold">Visitas</span>
                            </div>
                        </div>
                    </div>

                    <div className="h-[320px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={performanceData}>
                                <defs>
                                    <linearGradient id="colorPrimary" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#4318FF" stopOpacity={0.1} />
                                        <stop offset="95%" stopColor="#4318FF" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E9EDF7" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#A3AED0', fontSize: 12, fontWeight: 500 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#A3AED0', fontSize: 12, fontWeight: 500 }}
                                />
                                <Tooltip
                                    contentStyle={{ borderRadius: '16px', border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.05)' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="revenue"
                                    stroke="#4318FF"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorPrimary)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="visits"
                                    stroke="#A3AED0"
                                    strokeWidth={2}
                                    fill="transparent"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* 3. Sidebar Widgets */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-6 rounded-[20px] premium-shadow">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-bold text-[#1B2559]">Lembretes</h2>
                            <button className="p-2 bg-[#F4F7FE] rounded-lg text-primary hover:bg-blue-100 transition-colors">
                                <ArrowUpRight className="w-4 h-4" />
                            </button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                                <div className="w-10 h-10 bg-blue-50 text-blue-500 rounded-xl flex items-center justify-center">
                                    <Clock className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-[#1B2559]">Seguimentos Pendentes</p>
                                    <p className="text-[11px] text-[#A3AED0]">15 leads precisam de atenção</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-4 p-3 rounded-xl hover:bg-slate-50 transition-colors cursor-pointer">
                                <div className="w-10 h-10 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
                                    <TrendingUp className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-sm font-bold text-[#1B2559]">Metas da Semana</p>
                                    <p className="text-[11px] text-[#A3AED0]">85% da meta batida</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-primary p-6 rounded-[20px] premium-shadow text-white relative overflow-hidden group">
                        <TrendingUp className="absolute -bottom-4 -right-4 w-24 h-24 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                        <h3 className="text-sm font-bold mb-2">Relatório Semanal</h3>
                        <p className="text-xs opacity-80 leading-relaxed max-w-[180px]">Você teve um aumento de 12% na conversão de leads esta semana.</p>
                        <button className="mt-4 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-xl text-xs font-bold transition-all">Ver Detalhes</button>
                    </div>
                </div>
            </div>

            {/* 4. Leads Contact List */}
            <div className="bg-white p-8 rounded-[20px] premium-shadow border border-transparent">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-xl font-bold text-[#1B2559]">Contatos Recentes</h2>
                        <p className="text-sm text-[#A3AED0] mt-1">Últimos leads integrados via Meta Ads</p>
                    </div>
                    <button className="text-primary text-sm font-bold hover:underline">Ver Todos</button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead>
                            <tr className="text-left text-[#A3AED0] text-[11px] font-bold uppercase tracking-[0.1em]">
                                <th className="pb-4">Nome & Perfil</th>
                                <th className="pb-4">Interesse Princ.</th>
                                <th className="pb-4">Status Atual</th>
                                <th className="pb-4 text-right">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {leads.map((lead) => (
                                <tr key={lead.id} className="group hover:bg-slate-50/50 transition-colors">
                                    <td className="py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-[12px] bg-[#F4F7FE] flex items-center justify-center text-primary font-bold">
                                                {lead.name[0]}
                                            </div>
                                            <div>
                                                <p className="text-sm font-bold text-[#1B2559]">{lead.name}</p>
                                                <p className="text-[11px] text-[#A3AED0]">{lead.city || 'São Paulo, SP'}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5">
                                        <p className="text-sm text-[#2B3674] font-medium">{lead.interest || 'Apartamento 3 dorm.'}</p>
                                    </td>
                                    <td className="py-5">
                                        <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-wider">
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="py-5 text-right">
                                        <button className="p-2 text-[#A3AED0] hover:text-primary hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-100">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
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
