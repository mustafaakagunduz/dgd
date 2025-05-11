// app/api/contact/route.ts
import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { fullName, email, phone, message } = body;

        if (!fullName || !email || !phone) {
            return NextResponse.json({ error: 'Eksik alanlar var' }, { status: 400 });
        }

        const result = await resend.emails.send({
            from: 'İletişim Formu <onboarding@resend.dev>',
            to: ['akagunduzmustafa00@gmail.com'],
            subject: 'Yeni İletişim Mesajı',
            replyTo: email,  // ✅ Doğru kullanım
            text: `
Ad Soyad: ${fullName}
Email: ${email}
Telefon: ${phone}

Mesaj:
${message}
  `,
        });


        return NextResponse.json({ success: true, result });
    } catch (error) {
        console.error('Mail gönderme hatası:', error);
        return NextResponse.json({ error: 'Mail gönderilemedi' }, { status: 500 });
    }
}
