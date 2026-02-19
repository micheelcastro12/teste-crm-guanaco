import { NextResponse } from 'next/server';
import { mockDb } from '@/lib/mockDb';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const mode = searchParams.get('hub.mode');
    const token = searchParams.get('hub.verify_token');
    const challenge = searchParams.get('hub.challenge');

    if (mode === 'subscribe' && token === process.env.META_VERIFY_TOKEN) {
        return new NextResponse(challenge);
    }
    return new NextResponse('Forbidden', { status: 403 });
}

export async function POST(request: Request) {
    try {
        const body = await request.json();

        // Standalone Mock Logic: 
        // In a real Meta Webhook, you'd get a leadgen_id and fetch data.
        // For this version, we'll simulate ingestion if a specific field is present 
        // or just acknowledge the event.

        const entry = body.entry?.[0];
        const change = entry?.changes?.[0]?.value;

        if (change) {
            // Logic for demo: if we send additional data in the mock payload, use it.
            // In a real Vercel standalone demo, we just want to show it's reachable.
            console.log('Meta Webhook received:', change);

            // Simulate adding a lead if mock data is provided in the POST (useful for testing)
            if (change.mock_lead) {
                mockDb.addLead({
                    org_id: 'test-org-id',
                    name: change.mock_lead.name || 'Meta Lead',
                    email: change.mock_lead.email || 'meta@example.com',
                    phone: change.mock_lead.phone || '',
                    status: 'novo',
                    origin: 'Meta Ads',
                    next_action_type: 'Ligar',
                    next_follow_up: new Date(Date.now() + 86400000).toISOString()
                });
            }
        }

        return NextResponse.json({ success: true });
    } catch (err) {
        return NextResponse.json({ error: 'Webhook Error' }, { status: 500 });
    }
}
