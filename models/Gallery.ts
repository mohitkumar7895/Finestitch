export interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image_url: string;
  description?: string;
  sort_order: number;
  created_at?: string;
}

export type GalleryInput = Omit<GalleryItem, 'id' | 'created_at'>;

