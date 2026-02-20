"use client";

import { useState } from 'react';
import {
    Plus,
    Search,
    Filter,
    MoreHorizontal,
    User,
    Calendar as CalendarIcon,
    MapPin
} from 'lucide-react';
import NewLeadModal from '@/components/NewLeadModal';
import { MOCK_LEADS } from '@/lib/mockData';

interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: string;
    origin: string;
    city?: string;
    neighborhood?: string;
    interest?: string;
    created_at: string;
}

export default function LeadsList({ params }: { params: { org_slug: string } }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const leads = MOCK_LEADS;

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-slate-800">Lista de Leads</h1>
                    <p className="text-slate-500 text-sm">Gerencie todos os seus contatos em um só lugar</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20"
                >
                    <Plus className="w-5 h-5" />
                    Novo Lead
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                {/* Search & Filter Bar */}
                <div className="p-4 border-b border-slate-50 bg-slate-50/30 flex flex-col md:flex-row items-center gap-4">
                    <div className="relative flex-1 w-full">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nome, email ou telefone..."
                            className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full md:w-auto">
                        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-white border border-slate-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition-colors flex-1 md:flex-none">
                            <Filter className="w-4 h-4" />
                            <span>Filtros</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-800 border border-slate-800 rounded-xl text-sm font-medium text-white hover:bg-slate-700 transition-colors flex-1 md:flex-none">
                            <span>Exportar</span>
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Nome do Contato</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Interesse & Local</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Status</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest">Data de Cadastro</th>
                                <th className="px-6 py-4 text-[11px] font-bold text-slate-400 uppercase tracking-widest text-right">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {leads.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-16 text-center">
                                        <div className="flex flex-col items-center gap-2">
                                            <User className="w-12 h-12 text-slate-200" />
                                            <p className="text-slate-400 font-medium">Nenhum lead encontrado</p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                leads.map((lead) => (
                                    <tr
                                        key={lead.id}
                                        className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                                        onClick={() => window.location.href = `/o/${params.org_slug}/leads/${lead.id}`}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                                    {lead.name[0]}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-bold text-slate-800 group-hover:text-primary transition-colors">{lead.name}</p>
                                                    <p className="text-[11px] text-slate-400 font-medium">{lead.email || lead.phone}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="space-y-1">
                                                <p className="text-sm text-slate-600 font-medium">{lead.interest || 'Interesse Geral'}</p>
                                                <div className="flex items-center gap-1 text-[11px] text-slate-400">
                                                    <MapPin className="w-3 h-3" />
                                                    <span>{lead.neighborhood || '---'}, {lead.city || '---'}</span>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold uppercase tracking-wide border border-blue-100/50">
                                                {lead.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                                <CalendarIcon className="w-4 h-4 text-slate-300" />
                                                {new Date(lead.created_at).toLocaleDateString('pt-BR')}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <button className="p-2 text-slate-300 hover:text-slate-600 hover:bg-white rounded-lg transition-all border border-transparent hover:border-slate-200">
                                                <MoreHorizontal className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination Placeholder */}
                <div className="p-4 border-t border-slate-50 bg-slate-50/30 flex justify-between items-center">
                    <p className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Mostrando {leads.length} leads</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 text-xs font-bold text-slate-400 bg-white border border-slate-200 rounded-lg opacity-50 cursor-not-allowed">Anterior</button>
                        <button className="px-3 py-1.5 text-xs font-bold text-primary bg-white border border-primary/20 rounded-lg hover:bg-primary/5">Próximo</button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <NewLeadModal
                    orgId={params.org_slug}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={() => { }}
                />
            )}
        </div>
    );
}
