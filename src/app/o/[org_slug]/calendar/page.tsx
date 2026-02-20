"use client";

import { Calendar as CalendarIcon, Clock, ChevronLeft, ChevronRight, Plus, MapPin } from 'lucide-react';

const EVENTS = [
    { id: 1, time: '09:00', title: 'Visita: Residencial Guanaco', client: 'Ricardo Santos', type: 'visit' },
    { id: 2, time: '11:00', title: 'Reunião de Fechamento', client: 'Juliana Lima', type: 'meeting' },
    { id: 3, time: '14:30', title: 'Apresentação de Projeto', client: 'Marcos Oliveira', type: 'presentation' },
    { id: 4, time: '16:00', title: 'Call de Prospecção', client: 'Fernanda Rocha', type: 'call' },
];

export default function CalendarPage() {
    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-[#1B2559]">Calendário de Atividades</h1>
                    <p className="text-sm text-[#A3AED0]">Gerencie seus compromissos e visitas</p>
                </div>
                <button className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-xl font-bold text-sm shadow-lg shadow-primary/30 hover:scale-105 transition-all">
                    <Plus className="w-4 h-4" />
                    Novo Evento
                </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                {/* 1. Date Selector Sidebar */}
                <div className="lg:col-span-4 space-y-6">
                    <div className="bg-white p-6 rounded-[20px] premium-shadow border border-slate-50">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="font-bold text-[#1B2559]">Fevereiro 2026</h3>
                            <div className="flex items-center gap-2">
                                <button className="p-1.5 hover:bg-slate-50 rounded-lg text-[#A3AED0] transition-colors"><ChevronLeft className="w-4 h-4" /></button>
                                <button className="p-1.5 hover:bg-slate-50 rounded-lg text-[#A3AED0] transition-colors"><ChevronRight className="w-4 h-4" /></button>
                            </div>
                        </div>
                        <div className="grid grid-cols-7 gap-2 text-center mb-2">
                            {['D', 'S', 'T', 'Q', 'Q', 'S', 'S'].map(d => (
                                <span key={d} className="text-[11px] font-bold text-[#A3AED0] uppercase">{d}</span>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-2">
                            {Array.from({ length: 28 }).map((_, i) => (
                                <button
                                    key={i}
                                    className={`aspect-square flex items-center justify-center text-sm font-bold rounded-xl transition-all ${i + 1 === 20 ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'text-[#2B3674] hover:bg-slate-50'
                                        }`}
                                >
                                    {i + 1}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="bg-primary p-6 rounded-[20px] premium-shadow text-white">
                        <CalendarIcon className="w-8 h-8 mb-4 opacity-50" />
                        <h3 className="text-lg font-bold mb-2">Resumo do Dia</h3>
                        <p className="text-sm opacity-80 leading-relaxed">Você tem 4 compromissos agendados para hoje. Sua primeira visita é às 09:00.</p>
                    </div>
                </div>

                {/* 2. Timeline View */}
                <div className="lg:col-span-8 bg-white p-8 rounded-[20px] premium-shadow border border-slate-50">
                    <h2 className="text-xl font-bold text-[#1B2559] mb-8">Agenda de Hoje (20 de Fev)</h2>

                    <div className="space-y-8 relative before:absolute before:left-[11px] before:top-2 before:bottom-2 before:w-[2px] before:bg-slate-50">
                        {EVENTS.map((event) => (
                            <div key={event.id} className="relative pl-12 group">
                                <div className="absolute left-0 top-1.5 w-6 h-6 rounded-full bg-white border-2 border-primary flex items-center justify-center z-10 shadow-sm">
                                    <div className="w-2 h-2 rounded-full bg-primary"></div>
                                </div>

                                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-5 rounded-2xl hover:bg-slate-50/80 border border-transparent hover:border-slate-100 transition-all cursor-pointer">
                                    <div className="space-y-1">
                                        <div className="flex items-center gap-2 text-primary font-bold">
                                            <Clock className="w-4 h-4" />
                                            <span className="text-sm">{event.time}</span>
                                        </div>
                                        <h4 className="font-bold text-[#1B2559]">{event.title}</h4>
                                        <p className="text-sm text-[#A3AED0] flex items-center gap-1">
                                            <MapPin className="w-3.5 h-3.5" />
                                            Cliente: {event.client}
                                        </p>
                                    </div>
                                    <button className="px-4 py-2 bg-white text-[#1B2559] text-xs font-bold rounded-xl border border-slate-100 shadow-sm group-hover:bg-primary group-hover:text-white group-hover:border-primary transition-all self-start md:self-center">
                                        Check-in
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
