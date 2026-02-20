import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { google } from 'googleapis';

export async function POST(request: Request) {
    try {
        const { org_slug } = await request.json();

        if (!org_slug) {
            return NextResponse.json({ error: 'Org slug required' }, { status: 400 });
        }

        // 1. Get Integration settings from Supabase
        const { data: config, error: configError } = await supabase
            .from('integrations')
            .select('*')
            .eq('org_slug', org_slug)
            .single();

        if (configError || !config?.sheet_id) {
            return NextResponse.json({ error: 'Integration not configured for this organization' }, { status: 404 });
        }

        // 2. Auth with Google
        const auth = new google.auth.JWT(
            process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
            undefined,
            process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
            ['https://www.googleapis.com/auth/spreadsheets.readonly']
        );

        const sheets = google.sheets({ version: 'v4', auth });

        // 3. Read spreadsheet data
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: config.sheet_id,
            range: 'Página1!A2:H100', // Assuming standard lead sheet structure
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) {
            return NextResponse.json({ message: 'No new data found in sheet' });
        }

        // 4. Transform and Insert into Supabase
        const newLeads = rows.map(row => ({
            name: row[0],
            email: row[1],
            phone: row[2],
            interest: row[3],
            neighborhood: row[4],
            city: row[5],
            origin: 'Google Sheets',
            org_slug: org_slug,
            status: 'Novo'
        }));

        const { error: insertError } = await supabase
            .from('leads')
            .upsert(newLeads, { onConflict: 'email' }); // Prevent duplicates by email

        if (insertError) throw insertError;

        // 5. Update last sync time
        await supabase
            .from('integrations')
            .update({ last_sync: new Date().toISOString() })
            .eq('org_slug', org_slug);

        return NextResponse.json({
            message: 'Sync successful',
            leadsImported: newLeads.length
        });

    } catch (error: any) {
        console.error('Sync Error:', error);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
