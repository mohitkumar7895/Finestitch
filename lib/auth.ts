import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { NextRequest } from 'next/server';
import { AdminSession } from '@/models/Admin';

const JWT_SECRET = process.env.JWT_SECRET || 'fine_stitch_uniforms_jwt_secret_key_387192837192837';
const COOKIE_NAME = 'admin_session_token';

export async function hashPassword(plain: string): Promise<string> {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(plain, salt);
}

export async function comparePassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

export function signAdminToken(session: AdminSession): string {
  return jwt.sign(session, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyAdminToken(token: string): AdminSession | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as AdminSession;
    return decoded;
  } catch (err) {
    return null;
  }
}

export function getAdminSession(request: NextRequest): AdminSession | null {
  const cookie = request.cookies.get(COOKIE_NAME);
  if (!cookie?.value) return null;
  return verifyAdminToken(cookie.value);
}

export { COOKIE_NAME };

