export interface ContactMessage {
  id: number;
  name: string;
  email: string;
  mobile: string;
  subject: string;
  message: string;
  address?: string;
  product_name?: string;
  status: 'new' | 'read' | 'replied' | 'archived';
  created_at: string;
}

export interface ContactInput {
  name: string;
  email: string;
  mobile: string;
  subject?: string;
  message: string;
  address?: string;
  product_name?: string;
}

