import { executeQuery, fallbackStore } from './db';
import { Product, ProductInput } from '@/models/Product';
import { Category, CategoryInput } from '@/models/Category';
import { GalleryItem, GalleryInput } from '@/models/Gallery';
import { ContactMessage, ContactInput } from '@/models/Contact';
import { Testimonial, TestimonialInput } from '@/models/Testimonial';
import { AdminUser } from '@/models/Admin';

// ==========================================
// PRODUCTS QUERIES
// ==========================================

export async function getProducts(options?: {
  categoryId?: number;
  featuredOnly?: boolean;
  search?: string;
  limit?: number;
}): Promise<Product[]> {
  try {
    let sql = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.is_active = 1
    `;
    const params: any[] = [];

    if (options?.categoryId) {
      sql += ' AND p.category_id = ?';
      params.push(options.categoryId);
    }
    if (options?.featuredOnly) {
      sql += ' AND p.is_featured = 1';
    }
    if (options?.search) {
      sql += ' AND (p.name LIKE ? OR p.description LIKE ?)';
      params.push(`%${options.search}%`, `%${options.search}%`);
    }

    sql += ' ORDER BY p.id DESC';

    if (options?.limit) {
      sql += ` LIMIT ${Number(options.limit)}`;
    }

    const rows = await executeQuery<any[]>(sql, params);
    return rows.map(mapProductRow);
  } catch (err) {
    let list = fallbackStore.products.filter(p => p.is_active);
    if (options?.categoryId) {
      list = list.filter(p => p.category_id === options.categoryId);
    }
    if (options?.featuredOnly) {
      list = list.filter(p => p.is_featured);
    }
    if (options?.search) {
      const q = options.search.toLowerCase();
      list = list.filter(p => p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q));
    }
    return list;
  }
}

export async function getAllProductsAdmin(): Promise<Product[]> {
  try {
    const sql = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      ORDER BY p.id DESC
    `;
    const rows = await executeQuery<any[]>(sql);
    return rows.map(mapProductRow);
  } catch {
    return fallbackStore.products;
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const sql = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.slug = ?
      LIMIT 1
    `;
    const rows = await executeQuery<any[]>(sql, [slug]);
    if (rows && rows.length > 0) {
      return mapProductRow(rows[0]);
    }
  } catch (err) {
    // fallback
  }
  const fallback = fallbackStore.products.find(p => p.slug === slug);
  return fallback || null;
}

export async function getProductById(id: number): Promise<Product | null> {
  try {
    const sql = `
      SELECT p.*, c.name as category_name, c.slug as category_slug
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ?
      LIMIT 1
    `;
    const rows = await executeQuery<any[]>(sql, [id]);
    if (rows && rows.length > 0) {
      return mapProductRow(rows[0]);
    }
  } catch (err) {
    // fallback
  }
  const fallback = fallbackStore.products.find(p => p.id === id);
  return fallback || null;
}

export async function createProduct(input: ProductInput): Promise<Product> {
  try {
    const sql = `
      INSERT INTO products (
        category_id, name, slug, short_description, description,
        price, available_sizes, available_colors, customization_details,
        image_url, is_featured, is_active
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const res = await executeQuery<any>(sql, [
      input.category_id,
      input.name,
      input.slug,
      input.short_description || null,
      input.description,
      input.price || null,
      input.available_sizes || 'S, M, L, XL, XXL',
      input.available_colors || 'Navy Blue, White, Black',
      input.customization_details || null,
      input.image_url,
      input.is_featured ? 1 : 0,
      input.is_active ? 1 : 0,
    ]);

    const newId = res.insertId || Date.now();
    return { id: newId, ...input };
  } catch (err) {
    const newId = fallbackStore.products.length ? Math.max(...fallbackStore.products.map(p => p.id)) + 1 : 1;
    const cat = fallbackStore.categories.find(c => c.id === input.category_id);
    const newProd: Product = {
      id: newId,
      ...input,
      category_name: cat?.name || 'General Uniforms',
      category_slug: cat?.slug || 'general-uniforms',
      images: [input.image_url],
      created_at: new Date().toISOString(),
    };
    fallbackStore.products.unshift(newProd);
    return newProd;
  }
}

export async function updateProduct(id: number, input: Partial<ProductInput>): Promise<boolean> {
  try {
    const fields: string[] = [];
    const params: any[] = [];

    if (input.category_id !== undefined) { fields.push('category_id = ?'); params.push(input.category_id); }
    if (input.name !== undefined) { fields.push('name = ?'); params.push(input.name); }
    if (input.slug !== undefined) { fields.push('slug = ?'); params.push(input.slug); }
    if (input.short_description !== undefined) { fields.push('short_description = ?'); params.push(input.short_description); }
    if (input.description !== undefined) { fields.push('description = ?'); params.push(input.description); }
    if (input.price !== undefined) { fields.push('price = ?'); params.push(input.price); }
    if (input.available_sizes !== undefined) { fields.push('available_sizes = ?'); params.push(input.available_sizes); }
    if (input.available_colors !== undefined) { fields.push('available_colors = ?'); params.push(input.available_colors); }
    if (input.customization_details !== undefined) { fields.push('customization_details = ?'); params.push(input.customization_details); }
    if (input.image_url !== undefined) { fields.push('image_url = ?'); params.push(input.image_url); }
    if (input.is_featured !== undefined) { fields.push('is_featured = ?'); params.push(input.is_featured ? 1 : 0); }
    if (input.is_active !== undefined) { fields.push('is_active = ?'); params.push(input.is_active ? 1 : 0); }

    if (fields.length === 0) return true;

    params.push(id);
    const sql = `UPDATE products SET ${fields.join(', ')} WHERE id = ?`;
    await executeQuery(sql, params);
  } catch (err) {
    // fallback store update
    const idx = fallbackStore.products.findIndex(p => p.id === id);
    if (idx !== -1) {
      fallbackStore.products[idx] = { ...fallbackStore.products[idx], ...input };
    }
  }
  return true;
}

export async function deleteProduct(id: number): Promise<boolean> {
  try {
    const sql = `DELETE FROM products WHERE id = ?`;
    await executeQuery(sql, [id]);
  } catch (err) {
    // fallback
    const idx = fallbackStore.products.findIndex(p => p.id === id);
    if (idx !== -1) {
      fallbackStore.products.splice(idx, 1);
    }
  }
  return true;
}

function mapProductRow(row: any): Product {
  return {
    id: row.id,
    category_id: row.category_id,
    category_name: row.category_name,
    category_slug: row.category_slug,
    name: row.name,
    slug: row.slug,
    short_description: row.short_description,
    description: row.description,
    price: row.price ? Number(row.price) : null,
    available_sizes: row.available_sizes || 'S, M, L, XL, XXL',
    available_colors: row.available_colors || 'Navy Blue, White, Black',
    customization_details: row.customization_details,
    image_url: row.image_url,
    is_featured: Boolean(row.is_featured),
    is_active: Boolean(row.is_active),
    created_at: row.created_at,
    updated_at: row.updated_at,
    images: [row.image_url],
  };
}

// ==========================================
// CATEGORIES QUERIES
// ==========================================

export async function getCategories(): Promise<Category[]> {
  try {
    const sql = `
      SELECT c.*, COUNT(p.id) as product_count
      FROM categories c
      LEFT JOIN products p ON c.id = p.category_id AND p.is_active = 1
      GROUP BY c.id
      ORDER BY c.sort_order ASC, c.id ASC
    `;
    const rows = await executeQuery<any[]>(sql);
    return rows.map(r => ({
      id: r.id,
      name: r.name,
      slug: r.slug,
      description: r.description,
      image_url: r.image_url,
      sort_order: r.sort_order,
      product_count: Number(r.product_count || 0),
    }));
  } catch (err) {
    return fallbackStore.categories;
  }
}

export async function getCategoryBySlug(slug: string): Promise<Category | null> {
  const cats = await getCategories();
  return cats.find(c => c.slug === slug) || null;
}

export async function createCategory(input: CategoryInput): Promise<Category> {
  try {
    const sql = `
      INSERT INTO categories (name, slug, description, image_url, sort_order)
      VALUES (?, ?, ?, ?, ?)
    `;
    const res = await executeQuery<any>(sql, [
      input.name,
      input.slug,
      input.description || null,
      input.image_url || null,
      input.sort_order || 0,
    ]);
    return { id: res.insertId || Date.now(), ...input, product_count: 0 };
  } catch (err) {
    const newId = fallbackStore.categories.length ? Math.max(...fallbackStore.categories.map(c => c.id)) + 1 : 1;
    const newCat: Category = { id: newId, ...input, product_count: 0 };
    fallbackStore.categories.push(newCat);
    return newCat;
  }
}

export async function updateCategory(id: number, input: Partial<CategoryInput>): Promise<boolean> {
  try {
    const fields: string[] = [];
    const params: any[] = [];
    if (input.name) { fields.push('name = ?'); params.push(input.name); }
    if (input.slug) { fields.push('slug = ?'); params.push(input.slug); }
    if (input.description !== undefined) { fields.push('description = ?'); params.push(input.description); }
    if (input.image_url !== undefined) { fields.push('image_url = ?'); params.push(input.image_url); }
    if (input.sort_order !== undefined) { fields.push('sort_order = ?'); params.push(input.sort_order); }

    if (fields.length === 0) return true;
    params.push(id);
    await executeQuery(`UPDATE categories SET ${fields.join(', ')} WHERE id = ?`, params);
  } catch (err) {
    const idx = fallbackStore.categories.findIndex(c => c.id === id);
    if (idx !== -1) {
      fallbackStore.categories[idx] = { ...fallbackStore.categories[idx], ...input };
    }
  }
  return true;
}

export async function deleteCategory(id: number): Promise<boolean> {
  try {
    await executeQuery(`DELETE FROM categories WHERE id = ?`, [id]);
  } catch {
    const idx = fallbackStore.categories.findIndex(c => c.id === id);
    if (idx !== -1) fallbackStore.categories.splice(idx, 1);
  }
  return true;
}

// ==========================================
// GALLERY QUERIES
// ==========================================

export async function getGalleryItems(category?: string): Promise<GalleryItem[]> {
  try {
    let sql = `SELECT * FROM gallery`;
    const params: any[] = [];
    if (category && category !== 'All') {
      sql += ` WHERE category = ?`;
      params.push(category);
    }
    sql += ` ORDER BY sort_order ASC, id DESC`;
    const rows = await executeQuery<any[]>(sql, params);
    return rows;
  } catch {
    if (category && category !== 'All') {
      return fallbackStore.gallery.filter(g => g.category.toLowerCase() === category.toLowerCase());
    }
    return fallbackStore.gallery;
  }
}

export async function createGalleryItem(input: GalleryInput): Promise<GalleryItem> {
  try {
    const sql = `INSERT INTO gallery (title, category, image_url, description, sort_order) VALUES (?, ?, ?, ?, ?)`;
    const res = await executeQuery<any>(sql, [
      input.title,
      input.category || 'General',
      input.image_url,
      input.description || null,
      input.sort_order || 0,
    ]);
    return { id: res.insertId || Date.now(), ...input };
  } catch {
    const newId = fallbackStore.gallery.length ? Math.max(...fallbackStore.gallery.map(g => g.id)) + 1 : 1;
    const newItem: GalleryItem = { id: newId, ...input };
    fallbackStore.gallery.push(newItem);
    return newItem;
  }
}

export async function deleteGalleryItem(id: number): Promise<boolean> {
  try {
    await executeQuery(`DELETE FROM gallery WHERE id = ?`, [id]);
  } catch {
    const idx = fallbackStore.gallery.findIndex(g => g.id === id);
    if (idx !== -1) fallbackStore.gallery.splice(idx, 1);
  }
  return true;
}

// ==========================================
// CONTACT / INQUIRIES QUERIES
// ==========================================

export async function createContactMessage(input: ContactInput): Promise<ContactMessage> {
  const subject = input.subject || (input.address ? `Inquiry from ${input.address}` : 'Website Inquiry');
  const fullMessage = input.address ? `Address: ${input.address}\n\n${input.message}` : input.message;

  try {
    const sql = `
      INSERT INTO contact_messages (name, email, mobile, subject, message, product_name, status)
      VALUES (?, ?, ?, ?, ?, ?, 'new')
    `;
    const res = await executeQuery<any>(sql, [
      input.name,
      input.email,
      input.mobile,
      subject,
      fullMessage,
      input.product_name || null,
    ]);
    return {
      id: res.insertId || Date.now(),
      ...input,
      subject,
      message: fullMessage,
      status: 'new',
      created_at: new Date().toISOString(),
    };
  } catch {
    const newMsg: ContactMessage = {
      id: fallbackStore.messages.length + 1,
      ...input,
      subject,
      message: fullMessage,
      status: 'new',
      created_at: new Date().toISOString(),
    };
    fallbackStore.messages.unshift(newMsg);
    return newMsg;
  }
}

export async function getContactMessages(): Promise<ContactMessage[]> {
  try {
    const sql = `SELECT * FROM contact_messages ORDER BY id DESC`;
    const rows = await executeQuery<any[]>(sql);
    return rows;
  } catch {
    return fallbackStore.messages;
  }
}

export async function updateMessageStatus(id: number, status: 'new' | 'read' | 'replied' | 'archived'): Promise<boolean> {
  try {
    await executeQuery(`UPDATE contact_messages SET status = ? WHERE id = ?`, [status, id]);
  } catch {
    const msg = fallbackStore.messages.find(m => m.id === id);
    if (msg) msg.status = status;
  }
  return true;
}

// ==========================================
// TESTIMONIALS QUERIES
// ==========================================

export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const sql = `SELECT * FROM testimonials WHERE is_active = 1 ORDER BY sort_order ASC, id DESC`;
    const rows = await executeQuery<any[]>(sql);
    return rows;
  } catch {
    return fallbackStore.testimonials;
  }
}

export async function getAllTestimonialsAdmin(): Promise<Testimonial[]> {
  try {
    const sql = `SELECT * FROM testimonials ORDER BY sort_order ASC, id DESC`;
    const rows = await executeQuery<any[]>(sql);
    return rows;
  } catch {
    return fallbackStore.testimonials;
  }
}

export async function createTestimonial(input: TestimonialInput): Promise<Testimonial> {
  try {
    const sql = `
      INSERT INTO testimonials (client_name, company_name, role, rating, feedback, image_url, sort_order, is_active)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const res = await executeQuery<any>(sql, [
      input.client_name,
      input.company_name || null,
      input.role || null,
      input.rating || 5,
      input.feedback,
      input.image_url || null,
      input.sort_order || 0,
      input.is_active ? 1 : 0,
    ]);
    return { id: res.insertId || Date.now(), ...input };
  } catch {
    const newId = fallbackStore.testimonials.length + 1;
    const item = { id: newId, ...input };
    fallbackStore.testimonials.push(item);
    return item;
  }
}

export async function deleteTestimonial(id: number): Promise<boolean> {
  try {
    await executeQuery(`DELETE FROM testimonials WHERE id = ?`, [id]);
  } catch {
    const idx = fallbackStore.testimonials.findIndex(t => t.id === id);
    if (idx !== -1) fallbackStore.testimonials.splice(idx, 1);
  }
  return true;
}

// ==========================================
// SITE SETTINGS QUERIES
// ==========================================

export async function getSiteSettings(): Promise<Record<string, string>> {
  try {
    const sql = `SELECT setting_key, setting_value FROM site_settings`;
    const rows = await executeQuery<any[]>(sql);
    const map: Record<string, string> = {};
    if (rows && rows.length > 0) {
      for (const row of rows) {
        map[row.setting_key] = row.setting_value;
      }
      return map;
    }
  } catch {
    // fallback
  }
  return { ...fallbackStore.settings };
}

export async function updateSiteSetting(key: string, value: string): Promise<boolean> {
  try {
    const sql = `
      INSERT INTO site_settings (setting_key, setting_value)
      VALUES (?, ?)
      ON DUPLICATE KEY UPDATE setting_value = ?
    `;
    await executeQuery(sql, [key, value, value]);
  } catch {
    // fallback
    (fallbackStore.settings as any)[key] = value;
  }
  return true;
}

// ==========================================
// ADMIN USER QUERIES
// ==========================================

export async function getAdminByUsernameOrEmail(identifier: string): Promise<AdminUser | null> {
  try {
    const sql = `SELECT * FROM admins WHERE username = ? OR email = ? LIMIT 1`;
    const rows = await executeQuery<any[]>(sql, [identifier, identifier]);
    if (rows && rows.length > 0) {
      return rows[0];
    }
  } catch {
    // fallback
  }
  const found = fallbackStore.admins.find(a => a.username === identifier || a.email === identifier);
  return found || null;
}
