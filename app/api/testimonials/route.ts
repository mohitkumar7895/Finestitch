import { NextRequest, NextResponse } from 'next/server';
import { getTestimonials, getAllTestimonialsAdmin, createTestimonial } from '@/lib/queries';
import { getAdminSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const admin = searchParams.get('admin') === 'true';

    if (admin) {
      const session = getAdminSession(request);
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const all = await getAllTestimonialsAdmin();
      return NextResponse.json(all);
    }

    const testimonials = await getTestimonials();
    return NextResponse.json(testimonials);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const session = getAdminSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    if (!body.client_name || !body.feedback) {
      return NextResponse.json({ error: 'Client name and feedback are required' }, { status: 400 });
    }

    const item = await createTestimonial({
      client_name: body.client_name,
      company_name: body.company_name || '',
      role: body.role || '',
      rating: body.rating ? parseInt(body.rating, 10) : 5,
      feedback: body.feedback,
      image_url: body.image_url || '',
      sort_order: body.sort_order ? parseInt(body.sort_order, 10) : 0,
      is_active: body.is_active !== undefined ? Boolean(body.is_active) : true,
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

