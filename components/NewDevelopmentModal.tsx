"use client";

import { useState } from 'react';
import { X, Building2, MapPin, Hash, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';

interface NewDevelopmentModalProps {
    orgSlug: string;
    onClose: () => void;
    onSuccess?: () => void;
}

export default function NewDevelopmentModal({ orgSlug, onClose, onSuccess }: NewDevelopmentModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        neighborhood: '',
        city: '',
        units: 0,
        status: 'Lançamento'
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const { error } = await supabase
                .from('developments')
                .insert([
                    {
                        ...formData,
                        org_slug: orgSlug
                    }
                ]);

            if (error) throw error;

            onSuccess?.();
            onClose();
        } catch (error) {
            console.error('Error creating development:', error);
            alert('Erro ao criar empreendimento');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300" onClick={onClose} />

            <div className="relative bg-white w-full max-w-lg rounded-[40px] shadow-2xl overflow-hidden animate-in zoom-in-95 duration-300">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center bg-[#F4F7FE]/50">
                    <div>
                        <h2 className="text-xl font-black text-[#1B2559]">Novo Empreendimento</h2>
                        <p className="text-sm text-[#A3AED0] font-medium">Cadastre um novo projeto imobiliário</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-[#A3AED0] hover:text-[#1B2559] transition-colors">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    <div className="space-y-2">
                        <label className="text-xs font-black text-[#A3AED0] uppercase tracking-widest ml-1">Nome do Projeto</label>
                        <div className="relative">
                            <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0]" />
                            <input
                                required
                                type="text"
                                placeholder="Ex: Residencial Guanaco"
                                className="w-full pl-12 pr-4 py-3.5 bg-[#F4F7FE] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#4318FF]/20 outline-none transition-all"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-[#A3AED0] uppercase tracking-widest ml-1">Bairro</label>
                            <input
                                required
                                type="text"
                                placeholder="Ex: Itaim"
                                className="w-full px-4 py-3.5 bg-[#F4F7FE] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#4318FF]/20 outline-none transition-all"
                                value={formData.neighborhood}
                                onChange={e => setFormData({ ...formData, neighborhood: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-[#A3AED0] uppercase tracking-widest ml-1">Cidade</label>
                            <input
                                required
                                type="text"
                                placeholder="Ex: São Paulo"
                                className="w-full px-4 py-3.5 bg-[#F4F7FE] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#4318FF]/20 outline-none transition-all"
                                value={formData.city}
                                onChange={e => setFormData({ ...formData, city: e.target.value })}
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <label className="text-xs font-black text-[#A3AED0] uppercase tracking-widest ml-1">Nº de Unidades</label>
                            <div className="relative">
                                <Hash className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-[#A3AED0]" />
                                <input
                                    required
                                    type="number"
                                    className="w-full pl-12 pr-4 py-3.5 bg-[#F4F7FE] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#4318FF]/20 outline-none transition-all"
                                    value={formData.units}
                                    onChange={e => setFormData({ ...formData, units: parseInt(e.target.value) })}
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-black text-[#A3AED0] uppercase tracking-widest ml-1">Status</label>
                            <select
                                className="w-full px-4 py-3.5 bg-[#F4F7FE] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#4318FF]/20 outline-none transition-all"
                                value={formData.status}
                                onChange={e => setFormData({ ...formData, status: e.target.value })}
                            >
                                <option>Lançamento</option>
                                <option>Em Obras</option>
                                <option>Pronto</option>
                            </select>
                        </div>
                    </div>

                    <div className="flex justify-end gap-4 mt-8">
                        <button type="button" onClick={onClose} className="px-6 py-3 font-bold text-[#A3AED0] hover:text-[#1B2559] transition-colors">
                            Cancelar
                        </button>
                        <button
                            disabled={loading}
                            type="submit"
                            className="bg-[#4318FF] text-white px-8 py-3 rounded-2xl font-bold shadow-xl shadow-[#4318FF]/20 hover:bg-[#3311CC] transition-all disabled:opacity-50 flex items-center gap-2"
                        >
                            {loading ? 'Salvando...' : 'Criar Empreendimento'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
