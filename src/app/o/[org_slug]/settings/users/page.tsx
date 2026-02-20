"use client";

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import NewUserModal from '@/components/NewUserModal';
import { UserPlus, Shield, Mail, MoreHorizontal, User, CheckCircle2, XCircle, RefreshCw } from 'lucide-react';

interface TeamMember {
    id: string;
    name: string;
    email: string;
    role: string;
    status: string;
    org_slug: string;
}

export default function UserManagementScreen() {
    const params = useParams();
    const [users, setUsers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        // Mock fetch users
        setTimeout(() => {
            setUsers([
                { id: 'u1', name: 'Administrador Guanaco', email: 'admin@guanaco.com', role: 'Administrador', status: 'Ativo', org_slug: params.org_slug as string },
                { id: 'u2', name: 'Consultor Teste', email: 'consultor@teste.com', role: 'Consultor', status: 'Ativo', org_slug: params.org_slug as string },
                { id: 'u3', name: 'Gestor Vendas', email: 'gestor@vendas.com', role: 'Gestor', status: 'Pendente', org_slug: params.org_slug as string }
            ]);
            setLoading(false);
        }, 500);
    };

    useEffect(() => {
        if (params.org_slug) {
            fetchUsers();
        }
    }, [params.org_slug]);

    return (
        <div className="space-y-8 animate-in fade-in duration-700">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-black text-[#1B2559]">Gestão de Usuários</h1>
                    <p className="text-[#A3AED0] font-medium">Controle de acesso e permissões da sua equipe</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 bg-[#4318FF] text-white px-6 py-3 rounded-full font-bold shadow-xl shadow-[#4318FF]/20 hover:bg-[#3311CC] transition-all"
                >
                    <UserPlus className="w-5 h-5" />
                    Adicionar Novo Usuário
                </button>
            </div>

            {/* Permissions Summary Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-[25px] premium-shadow border border-slate-50 flex items-center gap-4">
                    <div className="w-12 h-12 bg-blue-50 text-[#4318FF] rounded-xl flex items-center justify-center">
                        <Shield className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[#A3AED0] text-xs font-bold uppercase tracking-wider">Perfis de Acesso</p>
                        <p className="text-xl font-black text-[#1B2559]">
                            {Array.from(new Set(users.map(u => u.role))).length} Ativos
                        </p>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[25px] premium-shadow border border-slate-50 flex items-center gap-4">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-500 rounded-xl flex items-center justify-center">
                        <User className="w-6 h-6" />
                    </div>
                    <div>
                        <p className="text-[#A3AED0] text-xs font-bold uppercase tracking-wider">Total de Membros</p>
                        <p className="text-xl font-black text-[#1B2559]">{users.length} Pessoas</p>
                    </div>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white rounded-[30px] premium-shadow border border-slate-50 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex justify-between items-center">
                    <h2 className="text-lg font-bold text-[#1B2559]">Membros do Time</h2>
                    <div className="flex gap-2">
                        <button className="text-sm font-bold text-[#4318FF] px-4 py-2 hover:bg-[#4318FF]/5 rounded-xl transition-all">Ver Logs</button>
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-[#F4F7FE]/50 text-[#A3AED0] text-[10px] font-black uppercase tracking-widest border-b border-slate-50">
                                <th className="px-8 py-5">Usuário</th>
                                <th className="px-8 py-5">Função</th>
                                <th className="px-8 py-5">Status</th>
                                <th className="px-8 py-5 text-right">Ação</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {users.map((user) => (
                                <tr key={user.id} className="hover:bg-[#F4F7FE]/30 transition-colors group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-full bg-[#E9EDF7] flex items-center justify-center text-[#1B2559] font-black text-xs uppercase">
                                                {user.name ? user.name[0] : <User className="w-4 h-4" />}
                                            </div>
                                            <div>
                                                <p className="text-sm font-black text-[#1B2559] group-hover:text-[#4318FF] transition-colors">{user.name}</p>
                                                <div className="flex items-center gap-2 text-[11px] text-[#A3AED0] font-medium">
                                                    <Mail className="w-3 h-3" />
                                                    {user.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            <Shield className={`w-3.5 h-3.5 ${user.role === 'Administrador' ? 'text-[#4318FF]' : 'text-slate-400'}`} />
                                            <span className="text-sm font-bold text-[#1B2559]">{user.role}</span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-2">
                                            {user.status === 'Ativo' ? (
                                                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                            ) : (
                                                <XCircle className="w-4 h-4 text-rose-500" />
                                            )}
                                            <span className={`text-xs font-black uppercase tracking-wider ${user.status === 'Ativo' ? 'text-emerald-500' : 'text-rose-500'}`}>
                                                {user.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5 text-right">
                                        <button className="p-2 text-[#A3AED0] hover:text-[#1B2559] transition-colors rounded-xl hover:bg-white border border-transparent hover:border-slate-200">
                                            <MoreHorizontal className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-6 bg-[#F4F7FE]/20 text-center">
                    <button className="text-[11px] font-black text-[#A3AED0] uppercase tracking-widest hover:text-[#4318FF] transition-colors">
                        Ver todos os {users.length} membros
                    </button>
                </div>
            </div>

            {isModalOpen && (
                <NewUserModal
                    orgSlug={params.org_slug as string}
                    onClose={() => setIsModalOpen(false)}
                    onSuccess={fetchUsers}
                />
            )}
        </div>
    );
}
