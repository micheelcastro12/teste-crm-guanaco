"use client";

import { useState } from 'react';
import { X, UserPlus, Calendar, Info } from 'lucide-react';

interface NewLeadModalProps {
    orgId: string;
    onClose: () => void;
    onSuccess: () => void;
}

export default function NewLeadModal({ orgId, onClose, onSuccess }: NewLeadModalProps) {
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        status: 'novo',
        origin: 'Manual',
        interest: '',
        neighborhood: '',
        city: '',
        next_action_type: '',
        next_follow_up: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await fetch('/api/leads', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, org_id: orgId }),
            });

            const data = await res.json();

            if (!res.ok) {
                alert(data.error || 'Erro ao criar lead');
                return;
            }

            onSuccess();
            onClose();
        } catch (err) {
            alert('Erro de conexão');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
                <div className="p-6 border-b flex justify-between items-center bg-gray-50">
                    <h2 className="text-xl font-bold flex items-center gap-2">
                        <UserPlus className="w-5 h-5 text-primary" />
                        Cadastrar Novo Lead
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6 overflow-y-auto">
                    {/* Basic Info */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Nome Completo *</label>
                            <input
                                required
                                type="text"
                                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                                value={formData.name}
                                onChange={e => setFormData({ ...formData, name: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">E-mail</label>
                            <input
                                type="email"
                                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                                value={formData.email}
                                onChange={e => setFormData({ ...formData, email: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Telefone</label>
                            <input
                                type="tel"
                                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                                value={formData.phone}
                                onChange={e => setFormData({ ...formData, phone: e.target.value })}
                            />
                        </div>
                    </div>

                    <hr />

                    {/* Context */}
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Interesse</label>
                            <input
                                placeholder="Ex: Apartamento 3 quartos"
                                type="text"
                                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                                value={formData.interest}
                                onChange={e => setFormData({ ...formData, interest: e.target.value })}
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-1">Bairro/Região</label>
                            <input
                                type="text"
                                className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-primary/20 outline-none"
                                value={formData.neighborhood}
                                onChange={e => setFormData({ ...formData, neighborhood: e.target.value })}
                            />
                        </div>
                    </div>

                    <hr />

                    {/* Next Action (Required for active leads) */}
                    <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                        <h3 className="text-sm font-bold text-blue-800 mb-3 flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            Próximo Seguimento (Obrigatório)
                        </h3>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-blue-700 mb-1 uppercase">O que fazer?</label>
                                <select
                                    required
                                    className="w-full p-2 border rounded bg-white text-sm"
                                    value={formData.next_action_type}
                                    onChange={e => setFormData({ ...formData, next_action_type: e.target.value })}
                                >
                                    <option value="">Selecione...</option>
                                    <option value="Ligar">Ligar</option>
                                    <option value="Enviar Whatsapp">Enviar Whatsapp</option>
                                    <option value="E-mail">E-mail</option>
                                    <option value="Agendar Visita">Agendar Visita</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-blue-700 mb-1 uppercase">Quando?</label>
                                <input
                                    required
                                    type="datetime-local"
                                    className="w-full p-2 border rounded bg-white text-sm"
                                    value={formData.next_follow_up}
                                    onChange={e => setFormData({ ...formData, next_follow_up: e.target.value })}
                                />
                            </div>
                        </div>
                        <p className="mt-2 text-[10px] text-blue-600 flex items-center gap-1">
                            <Info className="w-3 h-3" />
                            Importante: Leads ativos exigem uma próxima ação agendada.
                        </p>
                    </div>

                    <div className="pt-4 flex justify-end gap-3 border-t">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            disabled={loading}
                            className="px-6 py-2 bg-primary text-white rounded-lg font-bold hover:bg-primary/90 transition-colors disabled:opacity-50"
                        >
                            {loading ? 'Salvando...' : 'Criar Lead'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
