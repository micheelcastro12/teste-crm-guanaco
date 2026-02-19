"use client";

import { useState } from 'react';
import { Save, Settings, Info } from 'lucide-react';

export default function OrganizationSettings({ params }: { params: { org_slug: string } }) {
    const [name, setName] = useState('Corretora Exemplo');
    const [loading, setLoading] = useState(false);

    return (
        <div className="max-w-4xl space-y-8">
            <div>
                <h1 className="text-2xl font-bold flex items-center gap-2 tracking-tight">
                    <Settings className="w-6 h-6 text-gray-700" />
                    Configurações da Organização
                </h1>
                <p className="text-gray-500">Gerencie sua conta e integrações (Standalone Mode)</p>
            </div>

            <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <div className="p-6 border-b bg-gray-50">
                    <h2 className="font-bold text-gray-800">Dados Gerais</h2>
                </div>
                <div className="p-6 space-y-4">
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Nome da Imobiliária/Equipe</label>
                        <input
                            type="text"
                            className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                            value={name}
                            onChange={e => setName(e.target.value)}
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-1">Slug (URL)</label>
                        <input
                            readOnly
                            type="text"
                            className="w-full p-2.5 border rounded-lg bg-gray-50 text-gray-500"
                            value={params.org_slug}
                        />
                    </div>
                </div>
            </div>

            <div className="bg-indigo-50 rounded-xl border border-indigo-100 overflow-hidden">
                <div className="p-6 border-b bg-indigo-100/30">
                    <h2 className="font-bold text-indigo-900 flex items-center gap-2">
                        <Info className="w-5 h-5" />
                        Modo Standalone
                    </h2>
                </div>
                <div className="p-6">
                    <p className="text-sm text-indigo-800 leading-relaxed">
                        Esta versão do CRM foi otimizada para deploy imediato sem dependências externas (Supabase/Meta).
                        Os dados são persistidos na sessão atual e a ingestão do Meta Webhook agora aceita payloads genéricos via API.
                    </p>
                </div>
            </div>

            <div className="flex justify-end">
                <button
                    onClick={() => {
                        setLoading(true);
                        setTimeout(() => {
                            setLoading(false);
                            alert('Configurações salvas (Localmente)');
                        }, 500);
                    }}
                    disabled={loading}
                    className="flex items-center gap-2 bg-primary text-white px-6 py-2.5 rounded-lg font-bold hover:bg-primary/90 transition-all disabled:opacity-50"
                >
                    <Save className="w-5 h-5" />
                    {loading ? 'Salvando...' : 'Salvar Alterações'}
                </button>
            </div>
        </div>
    );
}
