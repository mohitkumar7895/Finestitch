import { NextRequest, NextResponse } from 'next/server';
import { getCategories, createCategory } from '@/lib/queries';
import { getAdminSession } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET() {
  try {
    const categories = await getCategories();
    return NextResponse.json(categories);
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
    if (!body.name) {
      return NextResponse.json({ error: 'Category name is required' }, { status: 400 });
    }

    const slug = body.slug ? slugify(body.slug) : slugify(body.name);
    const category = await createCategory({
      name: body.name,
      slug,
      description: body.description || '',
      image_url: body.image_url || '',
      sort_order: body.sort_order ? parseInt(body.sort_order, 10) : 0,
    });

    return NextResponse.json(category, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

