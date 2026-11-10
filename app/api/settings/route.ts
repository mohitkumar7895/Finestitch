import { NextRequest, NextResponse } from 'next/server';
import { getSiteSettings, updateSiteSetting } from '@/lib/queries';
import { getAdminSession } from '@/lib/auth';

export async function GET() {
  try {
    const settings = await getSiteSettings();
    return NextResponse.json(settings);
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
    for (const [key, val] of Object.entries(body)) {
      if (typeof val === 'string') {
        await updateSiteSetting(key, val);
      }
    }

    const updated = await getSiteSettings();
    return NextResponse.json({ success: true, settings: updated });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

