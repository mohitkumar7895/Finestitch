import { NextRequest, NextResponse } from 'next/server';
import { deleteTestimonial } from '@/lib/queries';
import { getAdminSession } from '@/lib/auth';

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = getAdminSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = parseInt(params.id, 10);
    await deleteTestimonial(id);
    return NextResponse.json({ success: true, message: 'Testimonial deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

