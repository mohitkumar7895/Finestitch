export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image_url?: string;
  sort_order: number;
  product_count?: number;
  created_at?: string;
  updated_at?: string;
}

export type CategoryInput = Omit<Category, 'id' | 'created_at' | 'updated_at' | 'product_count'>;

