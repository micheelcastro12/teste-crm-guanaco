import { NextResponse } from 'next/server';
import { mockDb } from '@/lib/mockDb';

export async function GET(request: Request) {
    const leads = mockDb.getLeads();
    return NextResponse.json(leads);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Validate required fields for active leads
        if (!body.next_action_type || !body.next_follow_up) {
            return NextResponse.json(
                { error: 'Próxima ação e data de seguimento são obrigatórios.' },
                { status: 400 }
            );
        }

        const newLead = mockDb.addLead({
            org_id: body.org_id || 'test-org-id',
            name: body.name,
            email: body.email,
            phone: body.phone,
            status: body.status || 'novo',
            origin: body.origin || 'Manual',
            interest: body.interest,
            neighborhood: body.neighborhood,
            city: body.city,
            next_action_type: body.next_action_type,
            next_follow_up: body.next_follow_up
        });

        // Automatically record initialization activity
        mockDb.addActivity({
            lead_id: newLead.id,
            type: 'system',
            description: `Lead criado manualmente (${newLead.status})`
        });

        return NextResponse.json(newLead);
    } catch (err) {
        return NextResponse.json({ error: 'Erro ao processar requisição' }, { status: 500 });
    }
}
