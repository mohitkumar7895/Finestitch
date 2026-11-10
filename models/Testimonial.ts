export interface Testimonial {
  id: number;
  client_name: string;
  company_name?: string;
  role?: string;
  rating: number;
  feedback: string;
  image_url?: string;
  sort_order: number;
  is_active: boolean;
  created_at?: string;
}

export type TestimonialInput = Omit<Testimonial, 'id' | 'created_at'>;

