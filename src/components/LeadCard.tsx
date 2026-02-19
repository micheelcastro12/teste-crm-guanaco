"use client";

import { MapPin, Phone, Calendar } from 'lucide-react';
import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';

interface LeadCardProps {
    lead: any;
    onDragStart: (id: string) => void;
}

export default function LeadCard({ lead, onDragStart }: LeadCardProps) {
    const handleDragStart = (e: React.DragEvent) => {
        e.dataTransfer.setData('leadId', lead.id);
        onDragStart(lead.id);
    };

    return (
        <div
            draggable
            onDragStart={handleDragStart}
            className="bg-white p-4 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow cursor-pointer"
        >
            <div className="flex justify-between items-start mb-2">
                <h3 className="font-semibold text-gray-900 line-clamp-1">{lead.name}</h3>
                {lead.origin === 'Meta Ads' && (
                    <span className="bg-blue-50 text-blue-600 text-[10px] px-1.5 py-0.5 rounded border border-blue-100">Meta</span>
                )}
            </div>

            <div className="space-y-2 text-sm text-gray-600">
                {lead.neighborhood && (
                    <div className="flex items-center gap-1.5 text-xs">
                        <MapPin className="w-3 h-3 text-gray-400" />
                        <span>{lead.neighborhood}</span>
                    </div>
                )}

                {lead.phone && (
                    <div className="flex items-center gap-1.5 text-xs">
                        <Phone className="w-3 h-3 text-gray-400" />
                        <span>{lead.phone}</span>
                    </div>
                )}

                {lead.next_follow_up && (
                    <div className="mt-3 pt-3 border-t flex items-center gap-1.5 text-xs text-indigo-600 font-medium tracking-tight">
                        <Calendar className="w-3 h-3" />
                        <span>Próxima ação: {format(new Date(lead.next_follow_up), 'dd/MM HH:mm', { locale: ptBR })}</span>
                    </div>
                )}
            </div>

            {lead.tags && lead.tags.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-1">
                    {lead.tags.slice(0, 2).map((tag: string) => (
                        <span key={tag} className="text-[10px] bg-gray-50 text-gray-500 px-1.5 py-0.5 rounded decoration-gray-400">
                            #{tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    );
}
