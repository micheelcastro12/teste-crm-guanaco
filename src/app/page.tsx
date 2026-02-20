"use client";

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginScreen from '@/components/LoginScreen';
import { Loader2 } from 'lucide-react';

export default function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Mock session check
        setTimeout(() => {
            setLoading(false);
        }, 500);
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-[#F4F7FE]">
                <Loader2 className="w-10 h-10 text-[#4318FF] animate-spin" />
            </div>
        );
    }

    return <LoginScreen />;
}
