import { NextRequest, NextResponse } from 'next/server';
import { updateCategory, deleteCategory } from '@/lib/queries';
import { getAdminSession } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = getAdminSession(request);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const id = parseInt(params.id, 10);
    const body = await request.json();

    const updatePayload: any = {};
    if (body.name !== undefined) {
      updatePayload.name = body.name;
      if (!body.slug) updatePayload.slug = slugify(body.name);
    }
    if (body.slug !== undefined) updatePayload.slug = slugify(body.slug);
    if (body.description !== undefined) updatePayload.description = body.description;
    if (body.image_url !== undefined) updatePayload.image_url = body.image_url;
    if (body.sort_order !== undefined) updatePayload.sort_order = parseInt(body.sort_order, 10);

    await updateCategory(id, updatePayload);
    return NextResponse.json({ success: true, message: 'Category updated' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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
    await deleteCategory(id);
    return NextResponse.json({ success: true, message: 'Category deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

