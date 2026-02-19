"use client";

import { useState } from 'react';
import { Save, Settings, Info, Building2, Globe, Shield } from 'lucide-react';

export default function OrganizationSettings({ params }: { params: { org_slug: string } }) {
    const [name, setName] = useState('Guanaco Lab Demo');
    const [loading, setLoading] = useState(false);

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-3 text-slate-800">
                    <Settings className="w-7 h-7 text-slate-400" />
                    Configurações
                </h1>
                <p className="text-slate-500 text-sm mt-1">Gerencie a identidade e preferências do Guanaco Lab</p>
            </div>

            <div className="grid grid-cols-1 gap-8">
                {/* General Info */}
                <div className="bg-white rounded-2xl border border-slate-100 shadow-sm overflow-hidden">
                    <div className="p-6 border-b border-slate-50 flex items-center gap-3">
                        <Building2 className="w-5 h-5 text-primary" />
                        <h2 className="font-bold text-slate-800">Dados da Organização</h2>
                    </div>
                    <div className="p-8 space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Nome da Empresa</label>
                                <input
                                    type="text"
                                    className="w-full px-4 py-2.5 bg-slate-50 border border-slate-100 rounded-xl text-sm focus:bg-white focus:ring-4 focus:ring-primary/5 focus:border-primary/20 outline-none transition-all"
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-slate-400 uppercase tracking-widest ml-1">Slug da URL</label>
                                <div className="relative">
                                    <Globe className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300" />
                                    <input
                                        readOnly
                                        type="text"
                                        className="w-full pl-11 pr-4 py-2.5 bg-slate-50/50 border border-slate-100 rounded-xl text-sm text-slate-400 cursor-not-allowed"
                                        value={params.org_slug}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* System Info */}
                <div className="bg-primary/5 rounded-2xl border border-primary/10 p-8 flex items-start gap-6 relative overflow-hidden group">
                    <Shield className="absolute -bottom-4 -right-4 w-24 h-24 text-primary opacity-5 group-hover:scale-110 transition-transform duration-700" />
                    <div className="p-3 bg-white rounded-2xl shadow-sm">
                        <Info className="w-6 h-6 text-primary" />
                    </div>
                    <div>
                        <h2 className="font-bold text-slate-800 mb-2">Modo Premium Standalone</h2>
                        <p className="text-sm text-slate-600 leading-relaxed max-w-2xl">
                            Esta versão do **Guanaco Lab** está operando em modo demonstrativo com armazenamento em memória.
                            Todas as funcionalidades de UI/UX estão ativas, simulando a experiência completa de um CRM corporativo.
                        </p>
                        <div className="flex gap-4 mt-6">
                            <div className="text-center">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Status</p>
                                <span className="px-3 py-1 bg-emerald-50 text-emerald-600 rounded-full text-[10px] font-bold border border-emerald-100">ONLINE</span>
                            </div>
                            <div className="text-center">
                                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Versão</p>
                                <span className="px-3 py-1 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold border border-blue-100">v1.2.0 (Guanaco)</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex justify-end pt-4">
                <button
                    onClick={() => {
                        setLoading(true);
                        setTimeout(() => {
                            setLoading(false);
                            alert('Configurações salvas localmente!');
                        }, 500);
                    }}
                    disabled={loading}
                    className="flex items-center gap-2 bg-primary text-white px-8 py-3 rounded-full font-bold hover:bg-primary/90 transition-all shadow-lg shadow-primary/20 disabled:opacity-50"
                >
                    <Save className="w-5 h-5" />
                    {loading ? 'Salvando...' : 'Salvar Alterações'}
                </button>
            </div>
        </div>
    );
}
