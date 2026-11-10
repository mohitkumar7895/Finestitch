import { NextRequest, NextResponse } from 'next/server';
import { getGalleryItems, createGalleryItem } from '@/lib/queries';
import { getAdminSession } from '@/lib/auth';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category') || undefined;
    const items = await getGalleryItems(category);
    return NextResponse.json(items);
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
    if (!body.title || !body.image_url) {
      return NextResponse.json({ error: 'Title and image URL are required' }, { status: 400 });
    }

    const item = await createGalleryItem({
      title: body.title,
      category: body.category || 'General',
      image_url: body.image_url,
      description: body.description || '',
      sort_order: body.sort_order ? parseInt(body.sort_order, 10) : 0,
    });

    return NextResponse.json(item, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

