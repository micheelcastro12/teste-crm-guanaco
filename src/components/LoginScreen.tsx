"use client";

import { useState } from 'react';
import { Mail, Lock, Grid, ArrowRight, Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        // Dummy login for mock version
        setTimeout(() => {
            router.push('/o/test-org');
            setLoading(false);
        }, 1000);
    };

    return (
        <div className="min-h-screen bg-[#F4F7FE] flex flex-col items-center justify-center p-6 font-sans">
            <div className="w-full max-w-md">
                {/* Logo Section */}
                <div className="flex flex-col items-center mb-10">
                    <div className="w-16 h-16 bg-[#4318FF] rounded-[22px] flex items-center justify-center shadow-2xl shadow-[#4318FF]/30 mb-6">
                        <Grid className="w-8 h-8 text-white" />
                    </div>
                    <h1 className="text-3xl font-black text-[#1B2559] tracking-tight">
                        Guanaco <span className="text-[#4318FF] font-medium">Lab</span>
                    </h1>
                    <p className="text-[#A3AED0] mt-2 font-medium">Bem-vindo de volta! Faça login para continuar.</p>
                </div>

                {/* Login Card */}
                <div className="bg-white p-10 rounded-[30px] premium-shadow border border-white">
                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-sm font-bold text-[#1B2559] ml-1">E-mail*</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A3AED0]" />
                                <input
                                    type="email"
                                    required
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="mail@exemplo.com"
                                    className="w-full pl-12 pr-4 py-4 bg-[#F4F7FE] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#4318FF]/20 outline-none transition-all placeholder:text-[#A3AED0]"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-sm font-bold text-[#1B2559]">Senha*</label>
                                <button type="button" className="text-xs font-bold text-[#4318FF] hover:underline">Esqueceu a senha?</button>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#A3AED0]" />
                                <input
                                    type="password"
                                    required
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Min. 8 caracteres"
                                    className="w-full pl-12 pr-4 py-4 bg-[#F4F7FE] border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#4318FF]/20 outline-none transition-all placeholder:text-[#A3AED0]"
                                />
                            </div>
                        </div>

                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-[#4318FF] text-white py-4 rounded-2xl font-bold text-sm shadow-xl shadow-[#4318FF]/20 hover:bg-[#3311CC] transition-all flex items-center justify-center gap-2 group disabled:opacity-70"
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Entrar no Sistema
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-[#F4F7FE] text-center">
                        <p className="text-sm text-[#A3AED0]">Ainda não tem acesso?</p>
                        <button className="text-sm font-bold text-[#1B2559] mt-1 hover:text-[#4318FF] transition-colors">Solicitar conta à administração</button>
                    </div>
                </div>

                <div className="mt-8 text-center">
                    <p className="text-[11px] text-[#A3AED0] font-bold uppercase tracking-widest leading-relaxed">
                        © 2026 Guanaco Lab CRM.<br />Sua inteligência imobiliária premium.
                    </p>
                </div>
            </div>
        </div>
    );
}
