"use client";

import { useEffect, useState } from 'react';
import { Search, Filter, MoreHorizontal, Plus } from 'lucide-react';
import NewLeadModal from '@/components/NewLeadModal';

export default function LeadsList({ params }: { params: { org_slug: string } }) {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchLeads = () => {
        fetch(`/api/leads?org_slug=${params.org_slug}`)
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) setLeads(data);
                setLoading(false);
            });
    };

    useEffect(() => {
        fetchLeads();
    }, [params.org_slug]);

    if (loading) return <div className="p-12 text-center text-gray-500">Carregando Leads...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-2xl font-bold text-gray-900">Lista de Leads</h1>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Novo Lead
                </button>
            </div>

            <div className="bg-white rounded-lg border shadow-sm overflow-hidden">
                <div className="p-4 border-b bg-gray-50 flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Buscar por nome, email ou telefone..."
                            className="w-full pl-10 pr-4 py-2 rounded-md border text-sm"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-3 py-2 border rounded-md text-sm bg-white hover:bg-gray-50">
                        <Filter className="w-4 h-4" />
                        <span>Filtros</span>
                    </button>
                </div>

                <table className="w-full text-left text-sm">
                    <thead>
                        <tr className="bg-gray-50 border-b">
                            <th className="px-6 py-3 font-semibold text-gray-600">Nome</th>
                            <th className="px-6 py-3 font-semibold text-gray-600">Status</th>
                            <th className="px-6 py-3 font-semibold text-gray-600">Origem</th>
                            <th className="px-6 py-3 font-semibold text-gray-600">Criado em</th>
                            <th className="px-6 py-3 font-semibold text-gray-600 text-right">Ação</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y">
                        {leads.length === 0 ? (
                            <tr>
                                <td colSpan={5} className="px-6 py-12 text-center text-gray-500">Nenhum lead encontrado</td>
                            </tr>
                        ) : (
                            leads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-gray-50 transition-colors cursor-pointer">
                                    <td className="px-6 py-4">
                                        <div className="font-medium text-gray-900">{lead.name}</div>
                                        <div className="text-xs text-gray-500">{lead.email || lead.phone}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-full text-[10px] font-bold uppercase bg-gray-100 text-gray-700">
                                            {lead.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-600">{lead.origin}</td>
                                    <td className="px-6 py-4 text-gray-600">
                                        {new Date(lead.created_at).toLocaleDateString()}
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-gray-400 hover:text-gray-600">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
                <NewLeadModal
                    orgId="test-org-id"
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={fetchLeads}
                />
            )}
        </div>
    );
}
