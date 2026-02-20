"use client";

import { useEffect, useState } from 'react';
import { Plus, Home, MapPin, Building2, MoreHorizontal, Search, Filter } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useParams } from 'next/navigation';
import NewDevelopmentModal from '@/components/NewDevelopmentModal';

interface Development {
    id: string;
    name: string;
    neighborhood: string;
    city: string;
    units: number;
    status: string;
    org_slug: string;
}

export default function DevelopmentsScreen() {
    const params = useParams();
    const [developments, setDevelopments] = useState<Development[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchDevelopments = async () => {
        try {
            const { data, error } = await supabase
                .from('developments')
                .select('*')
                .eq('org_slug', params.org_slug);

            if (error) throw error;
            setDevelopments(data || []);
        } catch (error) {
            console.error('Error fetching developments:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (params.org_slug) {
            fetchDevelopments();
        }
    }, [params.org_slug]);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-[#1B2559]">Empreendimentos</h1>
                    <p className="text-[#A3AED0] font-medium">Gerencie seu portfólio de projetos imobiliários</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-[#4318FF] text-white px-6 py-3 rounded-full font-bold shadow-xl shadow-[#4318FF]/20 hover:bg-[#3311CC] transition-all"
                >
                    <Plus className="w-5 h-5" />
                    Novo Empreendimento
                </button>
            </div>

            {/* Filter Bar */}
            <div className="bg-white p-4 rounded-[25px] premium-shadow flex flex-col md:flex-row gap-4 items-center border border-slate-50">
                <div className="relative flex-1 w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0]" />
                    <input
                        type="text"
                        placeholder="Buscar por nome ou localização..."
                        className="w-full pl-11 pr-4 py-3 bg-[#F4F7FE] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#4318FF]/20 outline-none transition-all placeholder:text-[#A3AED0]"
                    />
                </div>
                <div className="flex items-center gap-3 w-full md:w-auto">
                    <button className="flex items-center justify-center gap-2 px-5 py-3 bg-white border border-slate-100 rounded-2xl text-sm font-bold text-[#1B2559] hover:bg-slate-50 transition-colors flex-1 md:flex-none">
                        <Filter className="w-4 h-4 text-[#4318FF]" />
                        <span>Filtros</span>
                    </button>
                </div>
            </div>

            {/* Developments Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {developments.map((dev) => (
                    <div key={dev.id} className="bg-white rounded-[35px] premium-shadow border border-slate-50 overflow-hidden group hover:translate-y-[-8px] transition-all duration-300">
                        <div className="h-48 bg-[#E9EDF7] flex items-center justify-center text-6xl group-hover:scale-110 transition-transform duration-500">
                            {dev.name[0]}
                        </div>
                        <div className="p-8">
                            <div className="flex justify-between items-start mb-4">
                                <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest border ${dev.status === 'Lançamento' ? 'bg-emerald-50 text-emerald-500 border-emerald-100' :
                                    dev.status === 'Em Obras' ? 'bg-amber-50 text-amber-500 border-amber-100' : 'bg-blue-50 text-blue-500 border-blue-100'
                                    }`}>
                                    {dev.status}
                                </span>
                                <button className="p-2 text-[#A3AED0] hover:text-[#1B2559] transition-colors">
                                    <MoreHorizontal className="w-5 h-5" />
                                </button>
                            </div>
                            <h3 className="text-xl font-black text-[#1B2559] mb-3 group-hover:text-[#4318FF] transition-colors">{dev.name}</h3>
                            <div className="space-y-3">
                                <div className="flex items-center gap-3 text-sm text-[#A3AED0] font-medium">
                                    <MapPin className="w-4 h-4" />
                                    {dev.neighborhood}, {dev.city}
                                </div>
                                <div className="flex items-center gap-3 text-sm text-[#A3AED0] font-medium">
                                    <Building2 className="w-4 h-4" />
                                    {dev.units} Unidades Totais
                                </div>
                            </div>
                            <div className="mt-8 pt-6 border-t border-slate-50 flex justify-between items-center">
                                <button className="text-[#4318FF] text-sm font-bold hover:underline">Ver Detalhes</button>
                            </div>
                        </div>
                    </div>
                ))}

                {/* New Project Placeholder */}
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="bg-transparent border-4 border-dashed border-[#E9EDF7] rounded-[35px] flex flex-col items-center justify-center p-12 group hover:border-[#4318FF]/30 transition-all min-h-[400px]"
                >
                    <div className="w-16 h-16 bg-[#E9EDF7] text-[#A3AED0] rounded-full flex items-center justify-center mb-6 group-hover:bg-[#4318FF] group-hover:text-white transition-all duration-300">
                        <Plus className="w-8 h-8" />
                    </div>
                    <span className="text-lg font-bold text-[#A3AED0] group-hover:text-[#4318FF] transition-colors">Adicionar Novo Projeto</span>
                </button>
            </div>

            {isModalOpen && (
                <NewDevelopmentModal
                    orgSlug={params.org_slug as string}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={fetchDevelopments}
                />
            )}
        </div>
    );
}
