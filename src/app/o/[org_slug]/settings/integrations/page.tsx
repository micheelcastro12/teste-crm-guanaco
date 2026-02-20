import { useState, useEffect } from 'react';
import { Database, Save, Globe, Info, Table as TableIcon, Key, RefreshCw } from 'lucide-react';
import { useParams } from 'next/navigation';

export default function IntegrationSettings() {
    const params = useParams();
    const org_slug = params.org_slug as string;

    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [syncing, setSyncing] = useState(false);
    const [sheetId, setSheetId] = useState('');
    const [apiKey, setApiKey] = useState('');
    const [lastSync, setLastSync] = useState<string | null>(null);
    const [statusMapping, setStatusMapping] = useState({
        'Novo': 'Aguardando Atendimento',
        'Visita': 'Agendado',
        'Proposta': 'Negociação'
    });

    useEffect(() => {
        // Mock fetch config
        setTimeout(() => {
            setSheetId('1a2b3c4d5e6f7g8h9i0j-mock-id');
            setApiKey('mock-api-key');
            setLastSync(new Date().toISOString());
            setLoading(false);
        }, 500);
    }, [org_slug]);

    const handleSave = async () => {
        setSaving(true);
        // Mock save
        setTimeout(() => {
            setSaving(false);
            alert('Configurações salvas com sucesso!');
        }, 1000);
    };

    const handleSync = async () => {
        setSyncing(true);
        try {
            const res = await fetch('/api/sync/sheets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ org_slug })
            });
            const data = await res.json();
            if (data.error) throw new Error(data.error);
            setLastSync(new Date().toISOString());
            alert(`Sincronização concluída! ${data.leadsImported || 0} leads importados.`);
        } catch (error: any) {
            alert('Erro na sincronização: ' + error.message);
        } finally {
            setSyncing(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-black text-[#1B2559]">Integração Google Sheets</h1>
                    <p className="text-[#A3AED0] font-medium">Configure o fluxo automático de leads (Meta Ads → Sheets → CRM)</p>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="flex items-center gap-2 bg-[#4318FF] text-white px-6 py-3 rounded-2xl font-bold shadow-xl shadow-[#4318FF]/20 hover:bg-[#3311CC] transition-all disabled:opacity-50"
                >
                    {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                    {saving ? 'Salvando...' : 'Salvar Configurações'}
                </button>
            </div>

            {loading ? (
                <div className="p-12 text-center text-slate-400 font-medium">Carregando configurações...</div>
            ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    {/* Main Config Card */}
                    <div className="lg:col-span-8 space-y-6">
                        <div className="bg-white p-8 rounded-[30px] premium-shadow border border-slate-50">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-[#E9EDF7] rounded-xl flex items-center justify-center text-[#4318FF]">
                                    <Globe className="w-5 h-5" />
                                </div>
                                <h2 className="text-lg font-bold text-[#1B2559]">Parâmetros da Planilha</h2>
                            </div>

                            <div className="space-y-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#1B2559] ml-1">ID da Planilha do Google*</label>
                                    <div className="relative">
                                        <TableIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A3AED0]" />
                                        <input
                                            type="text"
                                            value={sheetId}
                                            onChange={(e) => setSheetId(e.target.value)}
                                            placeholder="Ex: 1a2b3c4d5e6f7g8h9i0j..."
                                            className="w-full pl-12 pr-4 py-4 bg-[#F4F7FE] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#4318FF]/20 outline-none transition-all placeholder:text-[#A3AED0]"
                                        />
                                    </div>
                                    <p className="text-[11px] text-[#A3AED0] ml-1">O ID é encontrado na URL da sua planilha entre 'd/' e '/edit'.</p>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-bold text-[#1B2559] ml-1">Chave da API (Service Account)*</label>
                                    <div className="relative">
                                        <Key className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A3AED0]" />
                                        <textarea
                                            value={apiKey}
                                            onChange={(e) => setApiKey(e.target.value)}
                                            placeholder="Cole aqui o JSON da sua chave de serviço do Google Cloud..."
                                            className="w-full pl-12 pr-4 py-4 bg-[#F4F7FE] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#4318FF]/20 outline-none transition-all placeholder:text-[#A3AED0] min-h-[120px] resize-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-[30px] premium-shadow border border-slate-50">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="w-10 h-10 bg-[#E9EDF7] rounded-xl flex items-center justify-center text-[#4318FF]">
                                    <Database className="w-5 h-5" />
                                </div>
                                <h2 className="text-lg font-bold text-[#1B2559]">Mapeamento de Status</h2>
                            </div>

                            <div className="grid grid-cols-2 gap-6">
                                {Object.keys(statusMapping).map((key) => (
                                    <div key={key} className="space-y-2">
                                        <label className="text-xs font-bold text-[#A3AED0] uppercase tracking-wider ml-1">Na Planilha ({key})</label>
                                        <select className="w-full px-4 py-3 bg-[#F4F7FE] border-none rounded-2xl text-sm font-bold text-[#1B2559] focus:ring-2 focus:ring-[#4318FF]/20 outline-none transition-all cursor-pointer">
                                            <option>{statusMapping[key as keyof typeof statusMapping]}</option>
                                            <option>Aguardando</option>
                                            <option>Visita Agendada</option>
                                            <option>Perdido</option>
                                        </select>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Info Sidebar */}
                    <div className="lg:col-span-4 space-y-6">
                        <div className="bg-[#4318FF] p-8 rounded-[30px] premium-shadow text-white relative overflow-hidden group">
                            <div className="relative z-10">
                                <Info className="w-10 h-10 mb-6 opacity-80" />
                                <h3 className="text-lg font-bold mb-4">Como Funciona?</h3>
                                <ul className="space-y-4 text-sm opacity-90 font-medium">
                                    <li className="flex gap-3">
                                        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs shrink-0">1</span>
                                        Link sua conta Meta Ads ao Google Sheets via Zapier/Make.
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs shrink-0">2</span>
                                        Compartilhe a planilha com o e-mail da Conta de Serviço.
                                    </li>
                                    <li className="flex gap-3">
                                        <span className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-xs shrink-0">3</span>
                                        O CRM sincronizará os leads a cada 10 minutos.
                                    </li>
                                </ul>
                            </div>
                            <Database className="absolute -bottom-10 -right-10 w-48 h-48 opacity-10 group-hover:scale-110 transition-transform duration-700" />
                        </div>

                        <div className="bg-white p-8 rounded-[30px] premium-shadow border border-slate-50 text-center">
                            <div className="w-16 h-16 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                <Save className="w-8 h-8" />
                            </div>
                            <h3 className="text-lg font-bold text-[#1B2559] mb-2">Sincronização Ativa</h3>
                            <p className="text-sm text-[#A3AED0] mb-6">
                                Última leitura realizada: {lastSync ? new Date(lastSync).toLocaleString('pt-BR') : 'Nunca'}
                            </p>
                            <button
                                onClick={handleSync}
                                disabled={syncing}
                                className="text-[#4318FF] text-sm font-bold hover:underline disabled:opacity-50 flex items-center justify-center gap-2 w-full"
                            >
                                {syncing && <RefreshCw className="w-4 h-4 animate-spin" />}
                                {syncing ? 'Sincronizando...' : 'Forçar Sincronização Agora'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
