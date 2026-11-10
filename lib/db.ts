import mysql from 'mysql2/promise';
import { Product } from '@/models/Product';
import { Category } from '@/models/Category';
import { GalleryItem } from '@/models/Gallery';
import { ContactMessage } from '@/models/Contact';
import { Testimonial } from '@/models/Testimonial';
import { AdminUser } from '@/models/Admin';

let pool: mysql.Pool | null = null;
let isConnectedToMySQL = false;
let hasCheckedConnection = false;

interface FallbackStore {
  categories: Category[];
  products: Product[];
  gallery: GalleryItem[];
  testimonials: Testimonial[];
  messages: ContactMessage[];
  settings: Record<string, string>;
  admins: AdminUser[];
}

// Fallback in-memory/static store if MySQL is not currently running
const fallbackStore: FallbackStore = {
  categories: [
    {
      id: 1,
      name: 'Corporate Uniforms',
      slug: 'corporate-uniforms',
      description: 'Premium formal shirts, blazers, trousers, and custom executive attire designed for business elegance and brand prestige.',
      image_url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      sort_order: 1,
      product_count: 2,
    },
    {
      id: 2,
      name: 'School Uniforms',
      slug: 'school-uniforms',
      description: 'Durable, skin-friendly, high-grade school shirts, skirts, pinafores, trousers, blazers, and ties tailored for daily comfort.',
      image_url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      sort_order: 2,
      product_count: 1,
    },
    {
      id: 3,
      name: 'Industrial Uniforms',
      slug: 'industrial-uniforms',
      description: 'Heavy-duty coveralls, boiler suits, reflective safety jackets, and rugged workwear built for factory and construction safety.',
      image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      sort_order: 3,
      product_count: 1,
    },
    {
      id: 4,
      name: 'Hospital & Healthcare Uniforms',
      slug: 'hospital-uniforms',
      description: 'Anti-microbial doctor coats, patient gowns, nurse tunics, and comfortable ergonomic surgical scrubs.',
      image_url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
      sort_order: 4,
      product_count: 1,
    },
    {
      id: 5,
      name: 'Hotel & Hospitality Uniforms',
      slug: 'hotel-uniforms',
      description: 'Sophisticated front-desk suits, chef jackets, housekeeping attire, and steward uniforms elevating guest experience.',
      image_url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
      sort_order: 5,
      product_count: 1,
    },
    {
      id: 6,
      name: 'Restaurant & Cafe Uniforms',
      slug: 'restaurant-uniforms',
      description: 'Modern waiter shirts, custom bistro aprons, chef coats, and barista t-shirts offering stylish utility.',
      image_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      sort_order: 6,
      product_count: 1,
    },
    {
      id: 7,
      name: 'Security Uniforms',
      slug: 'security-uniforms',
      description: 'Authoritative guard shirts, tactical trousers, lanyards, caps, and weather-resistant heavy duty security jackets.',
      image_url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
      sort_order: 7,
      product_count: 1,
    },
    {
      id: 8,
      name: 'Customized T-Shirts & Polos',
      slug: 'customized-t-shirts',
      description: 'Premium 100% cotton and dry-fit collar t-shirts with computerized embroidery and screen/vinyl printing.',
      image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      sort_order: 8,
      product_count: 1,
    },
    {
      id: 9,
      name: 'Promotional Apparel',
      slug: 'promotional-apparel',
      description: 'Branded caps, hoodies, event jackets, and promotional merchandise tailored for brand campaigns and exhibitions.',
      image_url: 'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80',
      sort_order: 9,
      product_count: 0,
    }
  ],
  products: [
    {
      id: 1,
      category_id: 1,
      category_name: 'Corporate Uniforms',
      category_slug: 'corporate-uniforms',
      name: 'Executive Corporate Formal Shirt',
      slug: 'executive-corporate-formal-shirt',
      short_description: 'Wrinkle-resistant luxury cotton-blend formal shirts tailored for business professionals.',
      description: 'Crafted with fine Egyptian cotton and poly-blend fabric, our Executive Corporate Shirts offer unmatched comfort and sharp creases throughout the workday. Engineered for corporate teams, banks, consulting firms, and modern offices.',
      price: 850.00,
      available_sizes: 'S, M, L, XL, XXL, 3XL',
      available_colors: 'Crisp White, Sky Blue, Navy Blue, Steel Grey, Light Pink',
      customization_details: 'Custom chest pocket embroidery with company logo, engraved brand buttons, contrast inner collar bands.',
      image_url: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
      is_featured: true,
      is_active: true,
      images: [
        'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 2,
      category_id: 1,
      category_name: 'Corporate Uniforms',
      category_slug: 'corporate-uniforms',
      name: 'Premium Corporate Blazer Suit',
      slug: 'premium-corporate-blazer-suit',
      short_description: 'Tailored two-piece executive blazers built with premium lining and enduring silhouette.',
      description: 'Designed for boardrooms and client interactions, this structured corporate blazer offers breathable fabrics, padded shoulders, and premium satin lining for ultimate executive presence.',
      price: 2650.00,
      available_sizes: '36, 38, 40, 42, 44, 46',
      available_colors: 'Midnight Navy, Charcoal Grey, Jet Black, Royal Blue',
      customization_details: 'Inner lapel custom crest, branded metal/horn buttons, custom monogrammed pocket squares.',
      image_url: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80',
      is_featured: true,
      is_active: true,
      images: [
        'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 3,
      category_id: 2,
      category_name: 'School Uniforms',
      category_slug: 'school-uniforms',
      name: 'Classic School Uniform Set (Shirt & Shorts/Trouser)',
      slug: 'classic-school-uniform-set',
      short_description: 'Tear-resistant, colorfast uniform set designed to withstand everyday school activity.',
      description: 'Crafted from high-tensile breathable poly-cotton fabric with anti-pilling properties. Includes reinforced seam stitching at stress points and stain-resistant fabric treatment for longevity.',
      price: 720.00,
      available_sizes: '22, 24, 26, 28, 30, 32, 34, 36',
      available_colors: 'White & Navy, Light Blue & Grey, Check Pattern, Beige',
      customization_details: 'School crest embroidery on chest pocket, custom school ties, belts, and house color shoulder epaulets.',
      image_url: 'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80',
      is_featured: true,
      is_active: true,
      images: [
        'https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 4,
      category_id: 3,
      category_name: 'Industrial Uniforms',
      category_slug: 'industrial-uniforms',
      name: 'Heavy Duty Industrial Boiler Suit / Coverall',
      slug: 'heavy-duty-industrial-boiler-suit',
      short_description: '100% cotton drill industrial coverall with 3M reflective safety tape and tool pockets.',
      description: 'Engineered for factories, offshore platforms, warehouses, and automotive plants. Built with heavy-duty two-way brass zippers, elasticated waistband, and double-needle reinforced stitching.',
      price: 1250.00,
      available_sizes: 'M, L, XL, XXL, 3XL',
      available_colors: 'Safety Orange, Industrial Navy, Petrol Blue, High-Vis Yellow',
      customization_details: 'Company name screen printed on back, embroidered safety badge on chest, customized pen & radio loops.',
      image_url: 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80',
      is_featured: true,
      is_active: true,
      images: [
        'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 5,
      category_id: 4,
      category_name: 'Hospital & Healthcare Uniforms',
      category_slug: 'hospital-uniforms',
      name: 'Ergonomic Medical Scrub Suit Set',
      slug: 'ergonomic-medical-scrub-suit-set',
      short_description: 'Ultra-soft, 4-way stretch scrub top and cargo jogger pants for doctors and nursing staff.',
      description: 'Treated with antimicrobial and fluid-barrier finish. Featuring 6 functional pockets including zippered utility compartments, breathable mesh panels, and wrinkle-resistant fabric for 14-hour hospital shifts.',
      price: 1100.00,
      available_sizes: 'XS, S, M, L, XL, XXL',
      available_colors: 'Ceil Blue, Hunter Green, Burgundy, Royal Blue, Teal',
      customization_details: 'Doctor name and hospital department embroidery, custom caduceus badge.',
      image_url: 'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80',
      is_featured: true,
      is_active: true,
      images: [
        'https://images.unsplash.com/photo-1584515979956-d9f6e5d09982?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 6,
      category_id: 5,
      category_name: 'Hotel & Hospitality Uniforms',
      category_slug: 'hotel-uniforms',
      name: 'Master Chef Coat with Mesh Ventilation',
      slug: 'master-chef-coat-mesh-ventilation',
      short_description: 'Double-breasted executive chef jacket with Cool-Vent back panel and thermometer pocket.',
      description: 'Fabricated with premium stain-release poly-cotton twill. Features reversible double-breast front, hand-rolled fabric buttons, and moisture-wicking back mesh to keep chefs cool in hot kitchen environments.',
      price: 980.00,
      available_sizes: 'S, M, L, XL, XXL',
      available_colors: 'Classic White with Black Piping, Solid Black, Charcoal Grey',
      customization_details: 'Chef name embroidery, hotel logo, country flag embroidery on collar.',
      image_url: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80',
      is_featured: true,
      is_active: true,
      images: [
        'https://images.unsplash.com/photo-1556910103-1c02745aae4d?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 7,
      category_id: 7,
      category_name: 'Security Uniforms',
      category_slug: 'security-uniforms',
      name: 'Tactical Security Officer Uniform Set',
      slug: 'tactical-security-officer-uniform-set',
      short_description: 'Heavyweight command shirts and 6-pocket cargo tactical trousers for security agencies.',
      description: 'Designed to deliver an authoritative and disciplined look. Built with permanent crease stitching, epaulets for badges, reinforced badge tabs, and heavy-duty belt loops.',
      price: 1150.00,
      available_sizes: '30, 32, 34, 36, 38, 40, 42',
      available_colors: 'Khaki, Navy Blue, Raven Black, Military Green',
      customization_details: 'Security agency embroidered shoulder patches, embroidered security text on back, brass button options.',
      image_url: 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
      is_featured: true,
      is_active: true,
      images: [
        'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 8,
      category_id: 8,
      category_name: 'Customized T-Shirts & Polos',
      category_slug: 'customized-t-shirts',
      name: 'Custom Corporate Polo T-Shirt (Matty / Honeycomb)',
      slug: 'custom-corporate-polo-t-shirt',
      short_description: '240 GSM combed cotton-rich honeycomb polo t-shirt with bio-wash finish.',
      description: 'Our best-selling corporate polo combines refined casual elegance with long-lasting shape retention. Features ribbed collar, 3-button placket, and side vents for all-day comfort.',
      price: 480.00,
      available_sizes: 'S, M, L, XL, XXL, 3XL',
      available_colors: 'Navy Blue, Royal Blue, Jet Black, Maroon, White, Heather Grey',
      customization_details: 'High-density 3D embroidery, chest logo, sleeve printing, collar tipping customization.',
      image_url: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80',
      is_featured: true,
      is_active: true,
      images: [
        'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=800&q=80'
      ]
    },
    {
      id: 9,
      category_id: 6,
      category_name: 'Restaurant & Cafe Uniforms',
      category_slug: 'restaurant-uniforms',
      name: 'Custom Bistro Canvas Apron with Leather Accents',
      slug: 'custom-bistro-canvas-apron',
      short_description: 'Heavy-duty 12oz washed canvas apron with cross-back adjustable straps and brass rivets.',
      description: 'Ideal for baristas, restaurant servers, bartenders, and gourmet chefs. Includes reinforced kangaroo pockets, towel loop, and split front hem for easy walking mobility.',
      price: 550.00,
      available_sizes: 'Universal Adjustable',
      available_colors: 'Coffee Brown, Charcoal Grey, Olive Green, Black Canvas',
      customization_details: 'Laser engraved leather logo patch or direct embroidery, custom metal hardware.',
      image_url: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
      is_featured: true,
      is_active: true,
      images: [
        'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80'
      ]
    }
  ],
  gallery: [
    {
      id: 1,
      title: 'Custom T-Shirts',
      category: 'Custom T-Shirts',
      image_url: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=800&q=80',
      description: 'Corporate events and brand merchandising solutions.',
      sort_order: 1,
    },
    {
      id: 2,
      title: 'Staff Uniforms',
      category: 'Staff Uniforms',
      image_url: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=800&q=80',
      description: 'Professional institutional and office wear.',
      sort_order: 2,
    },
    {
      id: 3,
      title: 'Premium Hoodies',
      category: 'Custom Hoodies',
      image_url: 'https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=800&q=80',
      description: 'Team wear with high-quality embroidery.',
      sort_order: 3,
    },
    {
      id: 4,
      title: 'Corporate Gifting',
      category: 'Corporate Gifts',
      image_url: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&w=800&q=80',
      description: 'Impactful gifts for employees and clients.',
      sort_order: 4,
    },
    {
      id: 5,
      title: 'Branded Caps',
      category: 'Branded Caps',
      image_url: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=800&q=80',
      description: 'Promotional headwear for campaigns.',
      sort_order: 5,
    },
    {
      id: 6,
      title: 'Corporate Jackets',
      category: 'Custom Jackets',
      image_url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=800&q=80',
      description: 'Weatherproof jackets and corporate outer layers.',
      sort_order: 6,
    }
  ],
  testimonials: [
    {
      id: 1,
      client_name: 'Marketing Director',
      company_name: 'Tech Solutions Corp',
      role: 'Marketing Director',
      rating: 5,
      feedback: 'Fine Stitch Uniforms has been our go-to partner for corporate hoodies and T-shirts. Their attention to brand consistency and fabric quality is exceptional. Highly recommended for any professional organization.',
      image_url: 'building',
      sort_order: 1,
      is_active: true,
    },
    {
      id: 2,
      client_name: 'Founder & CEO',
      company_name: 'Eco-Drive Startups',
      role: 'Founder & CEO',
      rating: 5,
      feedback: 'As a startup, we needed a partner who understood scalability. Fine Stitch Uniforms provided us with premium customized merchandise that truly helped our brand identity stand out in the market.',
      image_url: 'rocket',
      sort_order: 2,
      is_active: true,
    },
    {
      id: 3,
      client_name: 'Admin Head',
      company_name: 'Mumbai Global Institute',
      role: 'Admin Head',
      rating: 5,
      feedback: 'The team uniforms provided by Fine Stitch Uniforms were durable and perfectly stitched. Their end-to-end service from design concept to final delivery was stress-free and very reliable.',
      image_url: 'graduation-cap',
      sort_order: 3,
      is_active: true,
    },
  ],
  messages: [
    {
      id: 1,
      name: 'Kavita Sharma',
      email: 'kavita@nexuscorp.in',
      mobile: '+91 9820011223',
      subject: 'Inquiry for 150 Corporate Suits',
      message: 'Hello, we require 150 corporate suits for our front office and managerial staff in Mumbai. Please share catalog and best wholesale rates.',
      product_name: 'Premium Corporate Blazer Suit',
      status: 'new' as const,
      created_at: new Date(Date.now() - 3600000 * 2).toISOString(),
    }
  ],
  settings: {
    business_name: 'Fine Stitch Uniforms',
    owner_name: 'Aadil Moinuddin Sayyed',
    phone: '+91 9619585005',
    email: 'sayyedaadil35@yahoo.com',
    address: 'Malwani, Malad West',
    city: 'Mumbai',
    state: 'Maharashtra',
    pincode: '400095',
    country: 'India',
    domain: 'finestitchuniforms.com',
    about_hero_title: 'Crafting Excellence in Every Stitch',
    about_description: 'Fine Stitch Uniforms is dedicated to providing high-quality customized uniforms and apparel solutions for businesses, institutions, organizations, and individuals. We focus on delivering comfortable, durable, and professionally designed uniforms that represent your brand identity. Our commitment is to quality craftsmanship, reliable service, and customer satisfaction.',
    about_goal: 'Our goal is to provide customized apparel solutions that combine style, comfort, quality, and affordability.',
    experience_years: '15+',
    happy_clients: '1,200+',
    uniforms_delivered: '500,000+',
    homepage_headline: 'Premium Uniforms & Custom Apparel Tailored For Perfection',
    homepage_subheadline: 'Mumbai’s leading manufacturer and wholesale supplier of corporate, school, industrial, hospitality, and healthcare uniforms. Precision stitching, durable fabrics, and bespoke branding.',
  },
  admins: [
    {
      id: 1,
      username: 'admin',
      email: 'sayyedaadil35@yahoo.com',
      // bcrypt hash for 'Admin@123'
      password_hash: '$2a$10$wE3/nB2iZz85xVp1Xn0BLeV7kPqvQeMsn82QnK/8h5z1U.Y8KGy/W',
      role: 'superadmin',
    }
  ]
};

export function getDbPool(): mysql.Pool {
  if (!pool) {
    const host = process.env.DB_HOST || 'localhost';
    const port = parseInt(process.env.DB_PORT || '3306', 10);
    const user = process.env.DB_USER || 'root';
    const password = process.env.DB_PASSWORD || '';
    const database = process.env.DB_NAME || 'artisan';

    pool = mysql.createPool({
      host,
      port,
      user,
      password,
      database,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      enableKeepAlive: true,
      keepAliveInitialDelay: 0,
    });
  }
  return pool;
}

export async function checkConnection(): Promise<boolean> {
  if (hasCheckedConnection && isConnectedToMySQL) {
    return true;
  }
  try {
    const p = getDbPool();
    const conn = await p.getConnection();
    await conn.ping();
    conn.release();
    isConnectedToMySQL = true;
    hasCheckedConnection = true;
    return true;
  } catch (err: any) {
    isConnectedToMySQL = false;
    hasCheckedConnection = true;
    // Silently fall back to robust in-memory dataset
    return false;
  }
}

/**
 * Execute a parameterized query with graceful automatic fallback
 */
export async function executeQuery<T = any>(sql: string, params: any[] = []): Promise<T> {
  try {
    const isOnline = await checkConnection();
    if (isOnline && pool) {
      const [rows] = await pool.execute(sql, params);
      return rows as T;
    }
  } catch (dbError) {
    // If query fails on MySQL, fall back seamlessly
    console.warn('[DB] MySQL query execution error, falling back to local store:', (dbError as any)?.message);
  }

  // Fallback handler
  return fallbackStoreQuery<T>(sql, params);
}

/**
 * Fallback query interpreter for key entities
 */
function fallbackStoreQuery<T>(sql: string, params: any[]): T {
  const cleanSql = sql.trim().toLowerCase();

  // Products
  if (cleanSql.startsWith('select') && cleanSql.includes('from products')) {
    let result = [...fallbackStore.products];
    if (cleanSql.includes('where slug = ?')) {
      const found = result.find(p => p.slug === params[0]);
      return (found ? [found] : []) as unknown as T;
    }
    if (cleanSql.includes('where id = ?')) {
      const found = result.find(p => p.id === Number(params[0]));
      return (found ? [found] : []) as unknown as T;
    }
    if (cleanSql.includes('category_id = ?')) {
      result = result.filter(p => p.category_id === Number(params[0]));
    }
    if (cleanSql.includes('is_featured = 1') || cleanSql.includes('is_featured = true')) {
      result = result.filter(p => p.is_featured);
    }
    return result as unknown as T;
  }

  // Categories
  if (cleanSql.startsWith('select') && cleanSql.includes('from categories')) {
    let result = [...fallbackStore.categories];
    if (cleanSql.includes('where slug = ?')) {
      const found = result.find(c => c.slug === params[0]);
      return (found ? [found] : []) as unknown as T;
    }
    if (cleanSql.includes('where id = ?')) {
      const found = result.find(c => c.id === Number(params[0]));
      return (found ? [found] : []) as unknown as T;
    }
    return result as unknown as T;
  }

  // Gallery
  if (cleanSql.startsWith('select') && cleanSql.includes('from gallery')) {
    let result = [...fallbackStore.gallery];
    if (cleanSql.includes('where category = ?')) {
      result = result.filter(g => g.category.toLowerCase() === String(params[0]).toLowerCase());
    }
    return result as unknown as T;
  }

  // Testimonials
  if (cleanSql.startsWith('select') && cleanSql.includes('from testimonials')) {
    return fallbackStore.testimonials.filter(t => t.is_active) as unknown as T;
  }

  // Contact Messages
  if (cleanSql.startsWith('select') && cleanSql.includes('from contact_messages')) {
    return [...fallbackStore.messages].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()) as unknown as T;
  }

  // Admins
  if (cleanSql.startsWith('select') && cleanSql.includes('from admins')) {
    if (cleanSql.includes('where username = ?') || cleanSql.includes('where email = ?')) {
      const found = fallbackStore.admins.find(a => a.username === params[0] || a.email === params[0]);
      return (found ? [found] : []) as unknown as T;
    }
    return fallbackStore.admins as unknown as T;
  }

  // Site Settings
  if (cleanSql.startsWith('select') && cleanSql.includes('from site_settings')) {
    const list = Object.entries(fallbackStore.settings).map(([key, val], idx) => ({
      id: idx + 1,
      setting_key: key,
      setting_value: val,
    }));
    return list as unknown as T;
  }

  return [] as unknown as T;
}

export { fallbackStore };
