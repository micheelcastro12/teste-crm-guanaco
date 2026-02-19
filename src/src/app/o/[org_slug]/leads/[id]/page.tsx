"use client";

import { useEffect, useState } from 'react';
import { Phone, Mail, MapPin, Calendar, CheckSquare, Clock, Plus, Tag, ChevronLeft, Send, User } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { mockDb } from '@/lib/mockDb';
import Link from 'next/link';

export default function LeadDetails({ params }: { params: { org_slug: string, id: string } }) {
    const [lead, setLead] = useState<any>(null);
    const [activities, setActivities] = useState<any[]>([]);
    const [tasks, setTasks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [newActivity, setNewActivity] = useState('');

    useEffect(() => {
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

    if (loading) return <div className="p-12 text-center text-slate-400 font-medium">Carregando Lead...</div>;
    if (!lead) return (
        <div className="p-12 text-center">
            <p className="text-red-500 font-bold text-xl mb-4">Lead não encontrado</p>
            <Link href={`/o/${params.org_slug}/leads`} className="text-primary font-bold hover:underline">Voltar para lista</Link>
        </div>
    );

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Top Breadcrumb & Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-4">
                    <Link
                        href={`/o/${params.org_slug}/leads`}
                        className="p-2.5 bg-white border border-slate-200 rounded-xl text-slate-400 hover:text-slate-800 hover:border-slate-300 transition-all"
                    >
                        <ChevronLeft className="w-5 h-5" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-800">{lead.name}</h1>
                        <p className="text-slate-500 text-sm font-medium">Visualizando perfil detalhado</p>
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <button className="px-5 py-2.5 bg-white border border-slate-200 rounded-full text-sm font-bold text-slate-600 hover:bg-slate-50">Editar</button>
                    <button className="px-5 py-2.5 bg-slate-800 text-white rounded-full text-sm font-bold hover:bg-slate-700 shadow-lg shadow-slate-200 uppercase tracking-wide">Converter</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* Left Column: Profile Card */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex flex-col items-center mb-8">
                            <div className="w-24 h-24 bg-primary/10 rounded-2xl flex items-center justify-center text-primary text-3xl font-bold mb-4">
                                {lead.name[0]}
                            </div>
                            <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold uppercase tracking-widest border border-emerald-100">
                                {lead.status}
                            </span>
                        </div>

                        <div className="space-y-6">
                            <div>
                                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-3">Informação de Contato</p>
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-9 h-9 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                                            <Phone className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-bold text-slate-700">{lead.phone || '---'}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-9 h-9 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                                            <Mail className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-bold text-slate-700">{lead.email || '---'}</span>
                                    </div>
                                    <div className="flex items-center gap-4">
                                        <div className="w-9 h-9 bg-slate-50 rounded-lg flex items-center justify-center text-slate-400">
                                            <MapPin className="w-4 h-4" />
                                        </div>
                                        <span className="text-sm font-bold text-slate-700">{lead.neighborhood || '---'}, {lead.city || '---'}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="pt-6 border-t border-slate-50">
                                <p className="text-[10px] font-bold text-slate-300 uppercase tracking-widest mb-3">Interesse & Contexto</p>
                                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                                    <p className="text-sm font-bold text-slate-800">{lead.interest || 'Interesse não especificado'}</p>
                                    <p className="text-xs text-slate-500 mt-1">Origem: <span className="font-bold text-primary">{lead.origin}</span></p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Next Follow Up Box */}
                    <div className="bg-primary p-8 rounded-2xl shadow-xl shadow-primary/20 text-white overflow-hidden relative group">
                        <Clock className="absolute -bottom-6 -right-6 w-32 h-32 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                        <h3 className="font-bold text-sm mb-4 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Próximo Seguimento
                        </h3>
                        {lead.next_follow_up ? (
                            <div className="space-y-3 relative z-10">
                                <p className="text-lg font-bold leading-tight">
                                    {format(new Date(lead.next_follow_up), "dd 'de' MMMM", { locale: ptBR })}
                                </p>
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium opacity-90">{lead.next_action_type}</p>
                                    <p className="text-sm font-bold">{format(new Date(lead.next_follow_up), "HH:mm")}</p>
                                </div>
                            </div>
                        ) : (
                            <p className="text-sm font-medium opacity-80 italic">Sem ação pendente definida</p>
                        )}
                    </div>
                </div>

                {/* Right Column: Timeline & Tasks */}
                <div className="lg:col-span-8 space-y-8">
                    {/* History/Timeline Section */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                        <h2 className="text-lg font-bold mb-8 flex items-center gap-2">
                            <Clock className="w-5 h-5 text-primary" />
                            Histórico de Atividades
                        </h2>

                        {/* Note Input */}
                        <div className="mb-10 bg-slate-50 p-6 rounded-2xl border border-slate-100 focus-within:bg-white focus-within:ring-4 focus-within:ring-primary/5 transition-all">
                            <textarea
                                value={newActivity}
                                onChange={e => setNewActivity(e.target.value)}
                                placeholder="No que você está trabalhando com este lead? Digite uma nota..."
                                className="w-full bg-transparent border-none text-sm font-medium text-slate-700 outline-none resize-none placeholder:text-slate-400"
                                rows={3}
                            />
                            <div className="flex justify-between items-center mt-4 pt-4 border-t border-slate-200/50">
                                <div className="flex gap-2">
                                    <button className="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-white rounded-lg"><Tag className="w-4 h-4" /></button>
                                    <button className="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-white rounded-lg"><Calendar className="w-4 h-4" /></button>
                                </div>
                                <button
                                    onClick={addActivity}
                                    disabled={!newActivity.trim()}
                                    className="bg-primary text-white pl-5 pr-4 py-2 rounded-full text-sm font-bold hover:bg-primary/90 flex items-center gap-2 transition-all disabled:opacity-50"
                                >
                                    Salvar Nota
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* Timeline */}
                        <div className="space-y-10 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100">
                            {activities.length === 0 ? (
                                <div className="pl-12 text-center py-10">
                                    <p className="text-slate-400 text-sm font-medium">Inicie o histórico de atividades deste lead...</p>
                                </div>
                            ) : (
                                activities.map((activity, idx) => (
                                    <div key={activity.id} className="relative pl-12">
                                        <div className="absolute left-0 top-1 w-7 h-7 bg-white border-2 border-primary rounded-full ring-4 ring-white flex items-center justify-center">
                                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                                        </div>
                                        <div className="bg-white group">
                                            <div className="flex justify-between items-center mb-3">
                                                <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">{activity.type}</span>
                                                <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase">
                                                    <Clock className="w-3 h-3" />
                                                    {format(new Date(activity.created_at), 'dd MMM, HH:mm', { locale: ptBR })}
                                                </div>
                                            </div>
                                            <div className="p-4 rounded-2xl bg-slate-50/50 border border-slate-100 group-hover:border-primary/20 transition-colors">
                                                <p className="text-sm font-medium text-slate-700 leading-relaxed">{activity.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>

                    {/* Tasks Section Placeholder */}
                    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm">
                        <div className="flex justify-between items-center mb-8">
                            <h2 className="text-lg font-bold flex items-center gap-2">
                                <CheckSquare className="w-5 h-5 text-emerald-500" />
                                Próximas Tarefas
                            </h2>
                            <button className="p-2 bg-slate-50 text-slate-400 rounded-xl hover:text-primary transition-colors">
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                        <div className="bg-slate-50/50 p-6 rounded-2xl border border-slate-100 border-dashed text-center">
                            <p className="text-sm font-bold text-slate-400">Nenhuma tarefa agendada</p>
                            <button className="text-primary text-xs font-bold mt-1 hover:underline">Agendar primeira tarefa</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
