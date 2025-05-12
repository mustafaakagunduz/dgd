import { NextRequest, NextResponse } from 'next/server';

const BREVO_API_KEY = process.env.BREVO_API_KEY!;
const LIST_ID = parseInt(process.env.BREVO_LIST_ID!);

export async function POST(req: NextRequest) {
    try {
        const { email } = await req.json();

        if (!email || typeof email !== 'string') {
            return NextResponse.json({ error: 'Email is required' }, { status: 400 });
        }

        const response = await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: {
                'api-key': BREVO_API_KEY,
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({
                email,
                listIds: [LIST_ID],
                updateEnabled: true
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Brevo error:', errorData);
            return NextResponse.json({ error: errorData.message || 'Brevo API error' }, { status: 500 });
        }

        return NextResponse.json({ message: 'Subscribed successfully' }, { status: 200 });
    } catch (error) {
        console.error('Server error:', error);
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
    }
}
