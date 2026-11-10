export interface AdminUser {
  id: number;
  username: string;
  email: string;
  password_hash?: string;
  role: string;
  created_at?: string;
  updated_at?: string;
}

export interface AdminSession {
  id: number;
  username: string;
  email: string;
  role: string;
}

