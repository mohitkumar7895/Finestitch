export * from '@/models/Product';
export * from '@/models/Category';
export * from '@/models/Gallery';
export * from '@/models/Contact';
export * from '@/models/Admin';
export * from '@/models/Setting';
export * from '@/models/Testimonial';

export interface ApiResponse<T = any> {
  success?: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface NavItem {
  name: string;
  href: string;
  hasDropdown?: boolean;
}

