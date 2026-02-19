import { NextResponse } from 'next/server';
import { mockDb } from '@/lib/mockDb';

export async function PATCH(
    request: Request,
    { params }: { params: { id: string } }
) {
    try {
        const body = await request.json();
        const leadId = params.id;

        const oldLead = mockDb.getLeadById(leadId);
        if (!oldLead) return NextResponse.json({ error: 'Lead não encontrado' }, { status: 404 });

        const updatedLead = mockDb.updateLead(leadId, body);

        // Activity logging on status change
        if (body.status && body.status !== oldLead.status) {
            mockDb.addActivity({
                lead_id: leadId,
                type: 'status_change',
                description: `Status alterado de "${oldLead.status}" para "${body.status}"`
            });
        }

        return NextResponse.json(updatedLead);
    } catch (err) {
        return NextResponse.json({ error: 'Erro ao atualizar lead' }, { status: 500 });
    }
}
