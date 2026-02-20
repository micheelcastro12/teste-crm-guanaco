import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const org_slug = searchParams.get('org_slug');

    if (!org_slug) {
        return NextResponse.json({ error: 'Organization slug is required' }, { status: 400 });
    }

    const { data, error } = await supabase
        .from('leads')
        .select('*')
        .eq('org_slug', org_slug)
        .order('created_at', { ascending: false });

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json(data);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { name, email, phone, org_slug, interest, origin, neighborhood, city } = body;

        if (!name || !org_slug) {
            return NextResponse.json({ error: 'Name and Org Slug are required' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('leads')
            .insert([
                {
                    name,
                    email,
                    phone,
                    org_slug,
                    interest,
                    origin,
                    neighborhood,
                    city,
                    status: 'Novo'
                }
            ])
            .select();

        if (error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }

        return NextResponse.json(data[0]);
    } catch (err) {
        return NextResponse.json({ error: 'Invalid request' }, { status: 400 });
    }
}
