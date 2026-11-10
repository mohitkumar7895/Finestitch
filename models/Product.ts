export interface Product {
  id: number;
  category_id: number;
  category_name?: string;
  category_slug?: string;
  name: string;
  slug: string;
  short_description?: string;
  description: string;
  price?: number | null;
  available_sizes: string;
  available_colors: string;
  customization_details?: string;
  image_url: string;
  is_featured: boolean;
  is_active: boolean;
  created_at?: string;
  updated_at?: string;
  images?: string[];
}

export type ProductInput = Omit<Product, 'id' | 'created_at' | 'updated_at' | 'category_name' | 'category_slug' | 'images'>;

