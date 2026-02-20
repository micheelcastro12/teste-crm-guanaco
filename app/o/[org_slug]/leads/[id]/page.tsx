"use client";

import { useState, useEffect } from 'react';
import {
    ChevronLeft,
    Phone,
    Mail,
    MapPin,
    Calendar,
    User,
    Briefcase,
    Clock,
    CheckSquare,
    Plus,
    Send,
    Edit,
    Check
} from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';

interface Activity {
    id: string;
    lead_id: string;
    type: string;
    description: string;
    created_at: string;
}

interface Task {
    id: string;
    lead_id: string;
    description: string;
    completed: boolean;
    due_date?: string;
    created_at: string;
}

export default function LeadDetails({ params }: { params: { org_slug: string, id: string } }) {
    const [lead, setLead] = useState<any>(null);
    const [activities, setActivities] = useState<Activity[]>([]);
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [newActivity, setNewActivity] = useState('');
    const [newTask, setNewTask] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch Lead
                const { data: leadData, error: leadError } = await supabase
                    .from('leads')
                    .select('*')
                    .eq('id', params.id)
                    .single();

                if (leadError) throw leadError;
                setLead(leadData);

                // Fetch Activities
                const { data: actData, error: actError } = await supabase
                    .from('activities')
                    .select('*')
                    .eq('lead_id', params.id)
                    .order('created_at', { ascending: false });

                if (actError) throw actError;
                setActivities(actData || []);

                // Fetch Tasks
                const { data: taskData, error: taskError } = await supabase
                    .from('tasks')
                    .select('*')
                    .eq('lead_id', params.id)
                    .order('created_at', { ascending: false });

                if (taskError) throw taskError;
                setTasks(taskData || []);

            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) {
            fetchData();
        }
    }, [params.id]);

    const addActivity = async () => {
        if (!newActivity.trim()) return;

        try {
            const { data, error } = await supabase
                .from('activities')
                .insert([
                    {
                        lead_id: params.id,
                        type: 'nota',
                        description: newActivity
                    }
                ])
                .select();

            if (error) throw error;
            setActivities([data[0], ...activities]);
            setNewActivity('');
        } catch (error) {
            console.error('Error adding activity:', error);
        }
    };

    const addTask = async () => {
        if (!newTask.trim()) return;

        try {
            const { data, error } = await supabase
                .from('tasks')
                .insert([
                    {
                        lead_id: params.id,
                        description: newTask,
                        completed: false
                    }
                ])
                .select();

            if (error) throw error;
            setTasks([data[0], ...tasks]);
            setNewTask('');
        } catch (error) {
            console.error('Error adding task:', error);
        }
    };

    const toggleTask = async (id: string, currentStatus: boolean) => {
        try {
            const { error } = await supabase
                .from('tasks')
                .update({ completed: !currentStatus })
                .eq('id', id);

            if (error) throw error;
            setTasks(tasks.map(t => t.id === id ? { ...t, completed: !currentStatus } : t));
        } catch (error) {
            console.error('Error toggling task:', error);
        }
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
                <div className="lg:col-span-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Tasks Card */}
                    <div className="lg:col-span-1 bg-white p-8 rounded-[35px] premium-shadow border border-slate-50">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-xl font-black text-[#1B2559]">Tarefas</h2>
                            <span className="bg-[#4318FF]/10 text-[#4318FF] px-3 py-1 rounded-full text-[10px] font-black">{tasks.filter(t => !t.completed).length} Pendentes</span>
                        </div>

                        <div className="space-y-4 mb-6 scrollbar-hide max-h-[400px] overflow-y-auto">
                            {tasks.length === 0 ? (
                                <p className="text-center text-slate-400 text-xs py-4">Nenhuma tarefa.</p>
                            ) : (
                                tasks.map((task) => (
                                    <div key={task.id} className="flex items-center gap-4 group animate-in slide-in-from-right-2 fade-in duration-300">
                                        <button
                                            onClick={() => toggleTask(task.id, task.completed)}
                                            className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${task.completed ? 'bg-[#4318FF] border-[#4318FF]' : 'border-slate-200 hover:border-[#4318FF]'
                                                }`}
                                        >
                                            {task.completed && <Check className="w-4 h-4 text-white" />}
                                        </button>
                                        <span className={`text-sm font-bold flex-1 transition-all ${task.completed ? 'text-[#A3AED0] line-through' : 'text-[#1B2559]'
                                            }`}>
                                            {task.description}
                                        </span>
                                    </div>
                                ))
                            )}
                        </div>

                        <div className="relative group">
                            <input
                                type="text"
                                value={newTask}
                                onChange={(e) => setNewTask(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && addTask()}
                                placeholder="Nova tarefa..."
                                className="w-full pl-4 pr-12 py-4 bg-[#F4F7FE] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#4318FF]/20 outline-none transition-all placeholder:text-[#A3AED0]"
                            />
                            <button
                                onClick={addTask}
                                disabled={!newTask.trim()}
                                className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-[#4318FF] text-white rounded-xl flex items-center justify-center hover:scale-105 transition-all shadow-lg shadow-[#4318FF]/20 disabled:opacity-50"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Timeline Section */}
                    <div className="lg:col-span-2 bg-white p-8 rounded-[35px] premium-shadow border border-slate-50">
                        <h2 className="text-xl font-black text-[#1B2559] mb-8">Histórico de Atividades</h2>

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
                                    <button className="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-white rounded-lg"><Clock className="w-4 h-4" /></button>
                                    <button className="p-2 text-slate-400 hover:text-primary transition-colors hover:bg-white rounded-lg"><Calendar className="w-4 h-4" /></button>
                                </div>
                                <button
                                    onClick={addActivity}
                                    disabled={!newActivity.trim()}
                                    className="bg-primary text-white pl-5 pr-4 py-2 rounded-full text-sm font-bold hover:bg-primary/90 flex items-center gap-2 transition-all disabled:opacity-50 shadow-lg shadow-primary/20"
                                >
                                    Salvar Nota
                                    <Send className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div className="relative space-y-10 before:absolute before:left-[19px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-100 max-h-[600px] overflow-y-auto scrollbar-hide pr-2">
                            {activities.length === 0 ? (
                                <div className="pl-12 text-center py-10">
                                    <p className="text-slate-400 text-sm font-medium italic">Inicie o histórico de atividades deste lead...</p>
                                </div>
                            ) : (
                                activities.map((activity, idx) => (
                                    <div key={activity.id || idx} className="relative flex gap-6 pl-12 group animate-in slide-in-from-bottom-2 fade-in duration-300">
                                        <div className="absolute left-0 top-1 w-10 h-10 rounded-full bg-white border-2 border-slate-50 flex items-center justify-center z-10 shadow-sm group-hover:border-[#4318FF] transition-colors">
                                            <div className="w-2.5 h-2.5 rounded-full bg-[#4318FF]" />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="flex justify-between items-start">
                                                <p className="text-sm font-black text-[#1B2559] group-hover:text-[#4318FF] transition-colors">
                                                    {activity.type === 'nota' ? 'Nota adicionada' : 'Atualização de status'}
                                                </p>
                                                <span className="text-[10px] font-black text-[#A3AED0] uppercase tracking-widest whitespace-nowrap">
                                                    {formatDistanceToNow(new Date(activity.created_at), { addSuffix: true, locale: ptBR })}
                                                </span>
                                            </div>
                                            <div className="bg-[#F4F7FE]/50 p-4 rounded-2xl border border-transparent group-hover:border-slate-100 group-hover:bg-white transition-all">
                                                <p className="text-sm text-[#1B2559] font-medium leading-relaxed">{activity.description}</p>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
