import { NextRequest, NextResponse } from 'next/server';
import { getProductById, updateProduct, deleteProduct } from '@/lib/queries';
import { getAdminSession } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id, 10);
    const product = await getProductById(id);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

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
    if (body.category_id !== undefined) updatePayload.category_id = parseInt(body.category_id, 10);
    if (body.short_description !== undefined) updatePayload.short_description = body.short_description;
    if (body.description !== undefined) updatePayload.description = body.description;
    if (body.price !== undefined) updatePayload.price = body.price ? parseFloat(body.price) : null;
    if (body.available_sizes !== undefined) updatePayload.available_sizes = body.available_sizes;
    if (body.available_colors !== undefined) updatePayload.available_colors = body.available_colors;
    if (body.customization_details !== undefined) updatePayload.customization_details = body.customization_details;
    if (body.image_url !== undefined) updatePayload.image_url = body.image_url;
    if (body.is_featured !== undefined) updatePayload.is_featured = Boolean(body.is_featured);
    if (body.is_active !== undefined) updatePayload.is_active = Boolean(body.is_active);

    await updateProduct(id, updatePayload);
    const updated = await getProductById(id);
    return NextResponse.json(updated);
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
    await deleteProduct(id);
    return NextResponse.json({ success: true, message: 'Product deleted' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

