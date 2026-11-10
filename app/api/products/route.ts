import { NextRequest, NextResponse } from 'next/server';
import { getProducts, getAllProductsAdmin, createProduct } from '@/lib/queries';
import { getAdminSession } from '@/lib/auth';
import { slugify } from '@/lib/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const categoryId = searchParams.get('categoryId');
    const featured = searchParams.get('featured') === 'true';
    const search = searchParams.get('search') || undefined;
    const adminMode = searchParams.get('admin') === 'true';

    if (adminMode) {
      const session = getAdminSession(request);
      if (!session) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
      const products = await getAllProductsAdmin();
      return NextResponse.json(products);
    }

    const products = await getProducts({
      categoryId: categoryId ? parseInt(categoryId, 10) : undefined,
      featuredOnly: featured,
      search,
    });

    return NextResponse.json(products);
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
    if (!body.name || !body.category_id || !body.image_url) {
      return NextResponse.json(
        { error: 'Name, Category, and Image are required' },
        { status: 400 }
      );
    }

    const slug = body.slug ? slugify(body.slug) : slugify(body.name);

    const product = await createProduct({
      category_id: parseInt(body.category_id, 10),
      name: body.name,
      slug,
      short_description: body.short_description || '',
      description: body.description || body.short_description || '',
      price: body.price ? parseFloat(body.price) : null,
      available_sizes: body.available_sizes || 'S, M, L, XL, XXL',
      available_colors: body.available_colors || 'Navy Blue, White, Black',
      customization_details: body.customization_details || '',
      image_url: body.image_url,
      is_featured: Boolean(body.is_featured),
      is_active: body.is_active !== undefined ? Boolean(body.is_active) : true,
    });

    return NextResponse.json(product, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

