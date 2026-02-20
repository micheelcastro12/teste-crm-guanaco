import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const { org_slug } = await request.json();

        // Mock delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        return NextResponse.json({
            message: 'Sync successful (MOCK)',
            leadsImported: 5
        });

    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
