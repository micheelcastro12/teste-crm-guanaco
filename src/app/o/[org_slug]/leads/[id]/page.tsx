"use client";

import { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Calendar, CheckSquare, Clock, Plus, Tag } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { mockDb } from '@/lib/mockDb';

export default function LeadDetails({ params }: { params: { org_slug: string, id: string } }) {
    const [lead, setLead] = useState<any>(null);
    const [activities, setActivities] = useState<any[]>([]);
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newActivity, setNewActivity] = useState('');

    useEffect(() => {
        // In Standalone/Mock mode, we simulate fetching from the mockDb
        // In a real Vercel app, you might use fetch() to an API that uses the mockDb
        const leadData = mockDb.getLeadById(params.id);
        const actData = mockDb.getActivities(params.id);
        const taskData = mockDb.getTasks(params.id);

        setLead(leadData);
        setActivities(actData || []);
        setTasks(taskData || []);
        setLoading(false);
    }, [params.id]);

    const addActivity = () => {
        if (!newActivity.trim()) return;
        const data = mockDb.addActivity({
            lead_id: params.id,
            type: 'note',
            description: newActivity
        });

        setActivities([data, ...activities]);
        setNewActivity('');
    };

    if (loading) return <div className="p-12 text-center text-gray-500">Carregando Lead...</div>;
    if (!lead) return <div className="p-12 text-center text-red-500 font-bold underline">Lead não encontrado (Reset da Sessão Vercel)</div>;

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column: Profile */}
            <div className="col-span-1 space-y-6">
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <div className="flex items-center justify-between mb-4">
                        <h1 className="text-xl font-bold font-display tracking-tight">{lead.name}</h1>
                        <span className="px-2 py-1 bg-blue-50 text-blue-700 rounded text-[10px] font-bold uppercase tracking-wider">
                            {lead.status}
                        </span>
                    </div>

                    <div className="space-y-4 text-sm">
                        <div className="flex items-center gap-3 text-gray-600">
                            <Phone className="w-4 h-4" />
                            <span>{lead.phone || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <Mail className="w-4 h-4" />
                            <span>{lead.email || 'N/A'}</span>
                        </div>
                        <div className="flex items-center gap-3 text-gray-600">
                            <MapPin className="w-4 h-4" />
                            <span>{lead.neighborhood || '---'}, {lead.city || '---'}</span>
                        </div>
                    </div>

                    <div className="mt-6 pt-6 border-t">
                        <h3 className="text-sm font-semibold mb-2">Interesse</h3>
                        <p className="text-sm text-gray-600">{lead.interest || 'Não especificado'}</p>
                    </div>
                </div>

                {/* Next Follow Up Box */}
                <div className="bg-indigo-50 p-6 rounded-lg border border-indigo-100">
                    <h3 className="text-indigo-800 font-bold text-sm mb-3 flex items-center gap-2">
                        <Clock className="w-4 h-4" />
                        Próximo Seguimento
                    </h3>
                    {lead.next_follow_up ? (
                        <div className="space-y-1">
                            <p className="text-sm text-indigo-700 font-semibold">{format(new Date(lead.next_follow_up), "PPPP 'às' HH:mm", { locale: ptBR })}</p>
                            <p className="text-xs text-indigo-600">{lead.next_action_type}</p>
                        </div>
                    ) : (
                        <p className="text-xs text-indigo-500 italic">Sem ação pendente definida</p>
                    )}
                </div>
            </div>

            {/* Right Column: Timeline & Tasks */}
            <div className="col-span-2 space-y-8">
                {/* Timeline Section */}
                <div className="bg-white p-6 rounded-lg border shadow-sm">
                    <h2 className="text-lg font-bold mb-6 flex items-center gap-2 tracking-tight">
                        <Clock className="w-5 h-5 text-orange-500" />
                        Histórico e Atividades
                    </h2>

                    <div className="mb-8">
                        <textarea
                            value={newActivity}
                            onChange={e => setNewActivity(e.target.value)}
                            placeholder="Adicionar nota ou registrar atividade..."
                            className="w-full p-3 border rounded-lg text-sm mb-2 focus:ring-2 focus:ring-primary/20 outline-none"
                            rows={3}
                        />
                        <div className="flex justify-end">
                            <button
                                onClick={addActivity}
                                className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
                            >
                                Salvar Nota
                            </button>
                        </div>
                    </div>

                    <div className="space-y-6 relative before:absolute before:left-2.5 before:top-2 before:bottom-2 before:w-px before:bg-gray-200">
                        {activities.length === 0 ? (
                            <p className="text-sm text-gray-500 pl-8">Inicie o histórico deste lead...</p>
                        ) : (
                            activities.map((activity) => (
                                <div key={activity.id} className="relative pl-8">
                                    <div className="absolute left-0 top-1.5 w-5 h-5 bg-white border-2 border-primary rounded-full ring-4 ring-white" />
                                    <div className="flex justify-between items-start mb-1">
                                        <span className="text-xs font-bold uppercase tracking-widest text-primary/70">{activity.type}</span>
                                        <span className="text-[10px] text-gray-400">{format(new Date(activity.created_at), 'dd MMM, HH:mm', { locale: ptBR })}</span>
                                    </div>
                                    <p className="text-sm text-gray-700 leading-relaxed bg-gray-50/50 p-2 rounded-md border border-gray-100">{activity.description}</p>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
