import { NextRequest, NextResponse } from 'next/server';
import { createContactMessage, getContactMessages, updateMessageStatus } from '@/lib/queries';
import { getAdminSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const session = getAdminSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const messages = await getContactMessages();
    return NextResponse.json(messages);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, mobile, subject, message, address, product_name } = body;

    if (!name || (!mobile && !body.contact_number) || !message) {
      return NextResponse.json(
        { error: 'Name, Contact Number, and Message are required' },
        { status: 400 }
      );
    }

    const contactPhone = (mobile || body.contact_number || '').trim();

    const newMessage = await createContactMessage({
      name: name.trim(),
      email: email ? email.trim() : (body.email_id || '').trim(),
      mobile: contactPhone,
      subject: subject ? subject.trim() : (address ? `Inquiry from ${address}` : 'Website Inquiry'),
      address: address ? address.trim() : undefined,
      message: message.trim(),
      product_name: product_name || undefined,
    });

    return NextResponse.json({
      success: true,
      message: 'Inquiry submitted successfully! Our team will contact you shortly.',
      data: newMessage,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = getAdminSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Message ID and status are required' }, { status: 400 });
    }

    await updateMessageStatus(parseInt(id, 10), status);
    return NextResponse.json({ success: true, message: 'Message status updated' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

