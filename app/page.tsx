"use client";

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';
import LoginScreen from '@/components/LoginScreen';
import { Loader2 } from 'lucide-react';

import { Session } from '@supabase/supabase-js';

export default function Home() {
    const [loading, setLoading] = useState(true);
    const [session, setSession] = useState<Session | null>(null);
    const router = useRouter();

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session);
            if (session) {
                // In a real app, we'd fetch the user's organizations
                // For now, redirecting to the test org if logged in
                router.push('/o/test-org');
            } else {
                setLoading(false);
            }
        });

        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            if (session) {
                router.push('/o/test-org');
            } else {
                setLoading(false);
            }
        });

        return () => subscription.unsubscribe();
    }, [router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F4F7FE]">
                <Loader2 className="w-10 h-10 text-[#4318FF] animate-spin" />
            </div>
        );
    }

    if (!session) {
        return <LoginScreen />;
    }

    return null;
}
