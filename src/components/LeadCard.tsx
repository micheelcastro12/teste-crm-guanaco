"use client";

import { MapPin, Phone, ArrowUpRight, Clock } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface LeadCardProps {
    lead: {
        id: string;
        name: string;
        phone?: string;
        origin?: string;
        status: string;
        interest?: string;
        city?: string;
        next_follow_up?: string;
    };
    onDragStart?: (leadId: string) => void;
}

export default function LeadCard({ lead, onDragStart }: LeadCardProps) {
    const params = useParams();

    return (
        <div
            draggable
            onDragStart={(e) => {
                e.dataTransfer.setData('leadId', lead.id);
                onDragStart?.(lead.id);
            }}
            className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md hover:border-primary/20 transition-all cursor-grab active:cursor-grabbing group"
        >
            <div className="flex justify-between items-start mb-4">
                <Link
                    href={`/o/${params.org_slug}/leads/${lead.id}`}
                    className="p-1.5 -m-1.5 text-slate-300 hover:text-primary transition-colors"
                >
                    <ArrowUpRight className="w-4 h-4" />
                </Link>
                <div className="flex flex-col items-end gap-1">
                    <span className="px-2 py-0.5 bg-slate-50 text-slate-400 rounded text-[9px] font-bold uppercase tracking-wider">
                        {lead.origin || 'Lead Ads'}
                    </span>
                </div>
            </div>

            <Link href={`/o/${params.org_slug}/leads/${lead.id}`} className="block">
                <h4 className="font-bold text-slate-800 text-[15px] group-hover:text-primary transition-colors mb-2">
                    {lead.name}
                </h4>

                <div className="space-y-2 mt-3">
                    {lead.interest && (
                        <p className="text-xs text-slate-500 font-medium line-clamp-1 bg-slate-50 px-2 py-1 rounded inline-block">
                            {lead.interest}
                        </p>
                    )}

                    <div className="flex items-center gap-4 pt-1">
                        <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-600 transition-colors">
                            <Phone className="w-3.5 h-3.5" />
                            <span className="text-[11px] font-medium">{lead.phone || '---'}</span>
                        </div>
                        {lead.city && (
                            <div className="flex items-center gap-1.5 text-slate-400 group-hover:text-slate-600 transition-colors">
                                <MapPin className="w-3.5 h-3.5" />
                                <span className="text-[11px] font-medium">{lead.city}</span>
                            </div>
                        )}
                    </div>
                </div>
            </Link>

            {lead.next_follow_up && (
                <div className="mt-5 pt-4 border-t border-slate-50 flex items-center justify-between">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold text-primary uppercase tracking-wider">
                        <Clock className="w-3 h-3" />
                        <span>Ação Pendente</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">
                        {new Date(lead.next_follow_up).toLocaleDateString()}
                    </span>
                </div>
            )}
        </div>
    );
}
