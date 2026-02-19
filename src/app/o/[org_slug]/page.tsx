"use client";

import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import LeadCard from '@/components/LeadCard';
import NewLeadModal from '@/components/NewLeadModal';

const STATUSES = [
    { id: 'novo', label: 'Novo', color: 'bg-blue-100 text-blue-800' },
    { id: 'contato', label: 'Contato', color: 'bg-indigo-100 text-indigo-800' },
    { id: 'visita', label: 'Visita', color: 'bg-yellow-100 text-yellow-800' },
    { id: 'proposta', label: 'Proposta', color: 'bg-purple-100 text-purple-800' },
    { id: 'fechado', label: 'Fechado', color: 'bg-green-100 text-green-800' },
    { id: 'perdido', label: 'Perdido', color: 'bg-red-100 text-red-800' },
];

export default function Dashboard({ params }: { params: { org_slug: string } }) {
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

    const updateLeadStatus = async (leadId: string, newStatus: string) => {
        // Optimistic update
        const previousLeads = [...leads];
        setLeads(leads.map(l => l.id === leadId ? { ...l, status: newStatus } : l));

        try {
            const res = await fetch(`/api/leads/${leadId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ status: newStatus }),
            });
            if (!res.ok) throw new Error();
        } catch (err) {
            setLeads(previousLeads);
            alert('Erro ao atualizar status do lead');
        }
    };

    if (loading) return <div className="flex items-center justify-center p-12 text-gray-500">Carregando Dashboard...</div>;

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <div>
                    <h1 className="text-2xl font-bold">Resumo do Funil</h1>
                    <p className="text-gray-500">Acompanhe seus leads e oportunidades (Mock Mode)</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Novo Lead
                </button>
            </div>

            <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-hide">
                {STATUSES.map((status) => {
                    const columnLeads = leads.filter(l => l.status === status.id);
                    return (
                        <div key={status.id} className="flex-shrink-0 w-80">
                            <div className="flex justify-between items-center mb-4 px-2">
                                <div className="flex items-center gap-2">
                                    <span className={`px-2 py-0.5 rounded text-xs font-semibold ${status.color}`}>
                                        {status.label}
                                    </span>
                                    <span className="text-gray-400 text-sm">{columnLeads.length}</span>
                                </div>
                            </div>

                            <div
                                className="bg-gray-100 rounded-xl p-3 min-h-[500px] flex flex-col gap-3"
                                onDragOver={(e) => e.preventDefault()}
                                onDrop={(e) => {
                                    const leadId = e.dataTransfer.getData('leadId');
                                    if (leadId) updateLeadStatus(leadId, status.id);
                                }}
                            >
                                {columnLeads.map(lead => (
                                    <LeadCard key={lead.id} lead={lead} onDragStart={(id) => { }} />
                                ))}
                            </div>
                        </div>
                    );
                })}
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
