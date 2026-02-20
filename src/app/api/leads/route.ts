import { NextResponse } from 'next/server';
import { mockDb } from '@/lib/mockDb';

export async function GET(request: Request) {
    return NextResponse.json(mockDb.getLeads());
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const newLead = mockDb.addLead(body);
        return NextResponse.json(newLead);
    } catch (err) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
