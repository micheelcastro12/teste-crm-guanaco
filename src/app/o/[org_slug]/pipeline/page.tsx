"use client";

import { Trello, Plus, MoreHorizontal, User } from 'lucide-react';

const COLUMNS = [
    { id: 'new', title: 'Novo Lead', count: 12, color: 'bg-blue-500' },
    { id: 'contact', title: 'Em Contato', count: 5, color: 'bg-purple-500' },
    { id: 'visit', title: 'Visita Agendada', count: 3, color: 'bg-orange-500' },
    { id: 'negotiation', title: 'Negociação', count: 2, color: 'bg-emerald-500' },
];

const MOCK_LEADS = [
    { id: 1, name: 'Ricardo Santos', interest: 'Residencial Guanaco', value: 'R$ 450k', status: 'new' },
    { id: 2, name: 'Juliana Lima', interest: 'Cobertura Central', value: 'R$ 1.2M', status: 'contact' },
    { id: 3, name: 'Marcos Oliveira', interest: 'Casa de Condomínio', value: 'R$ 890k', status: 'visit' },
];

export default function PipelinePage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#1B2559]">Pipeline de Vendas</h1>
                    <p className="text-sm text-[#A3AED0]">Gerencie seus leads através do funil comercial</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/30 hover:scale-105 transition-all">
                    <Plus className="w-4 h-4" />
                    Novo Card
                </button>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
                {COLUMNS.map((column) => (
                    <div key={column.id} className="min-w-[300px] w-[300px] flex flex-col gap-4">
                        <div className="flex items-center justify-between px-2">
                            <div className="flex items-center gap-3">
                                <div className={`w-2 h-2 rounded-full ${column.color}`}></div>
                                <h3 className="font-bold text-[#1B2559]">{column.title}</h3>
                                <span className="text-xs font-bold text-[#A3AED0] bg-white px-2 py-0.5 rounded-full border border-slate-100">
                                    {column.count}
                                </span>
                            </div>
                            <button className="text-[#A3AED0] hover:text-[#1B2559]">
                                <MoreHorizontal className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex flex-col gap-4 min-h-[500px] bg-slate-50/50 p-3 rounded-2xl border-2 border-dashed border-slate-100">
                            {MOCK_LEADS.filter(l => l.status === column.id).map((lead) => (
                                <div key={lead.id} className="bg-white p-4 rounded-xl shadow-sm border border-slate-100 hover:shadow-md transition-all cursor-pointer group">
                                    <div className="flex justify-between items-start mb-3">
                                        <span className="text-[10px] font-bold text-primary bg-blue-50 px-2 py-0.5 rounded-lg uppercase tracking-wider">
                                            {lead.interest}
                                        </span>
                                        <button className="text-[#A3AED0] opacity-0 group-hover:opacity-100 transition-opacity">
                                            <MoreHorizontal className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <h4 className="text-sm font-bold text-[#1B2559] mb-1">{lead.name}</h4>
                                    <p className="text-xs text-[#A3AED0] mb-4">{lead.value}</p>
                                    <div className="flex items-center justify-between">
                                        <div className="flex -space-x-2">
                                            <div className="w-6 h-6 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center">
                                                <User className="w-3 h-3 text-[#A3AED0]" />
                                            </div>
                                        </div>
                                        <Trello className="w-3 h-3 text-[#A3AED0]" />
                                    </div>
                                </div>
                            ))}
                            {column.id === 'new' && (
                                <button className="w-full py-3 flex items-center justify-center gap-2 text-[#A3AED0] hover:text-primary hover:bg-white rounded-xl border border-transparent hover:border-slate-100 transition-all text-sm font-medium">
                                    <Plus className="w-4 h-4" />
                                    Adicionar Lead
                                </button>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
