# Fine Stitch Uniforms – Complete Business Website & Management System

> **Official Domain:** [finestitchuniforms.com](https://finestitchuniforms.com)  
> **Proprietor:** Aadil Moinuddin Sayyed  
> **Contact:** +91 9619585005 | sayyedaadil35@yahoo.com  
> **Location:** Malwani, Malad West, Mumbai, Maharashtra 400095, India  

---

## 1. Project Overview

**Fine Stitch Uniforms** is a full-featured, responsive, dynamic business website and administrative management portal engineered for Mumbai's leading customized uniforms and workwear manufacturer. The web experience is inspired by the structured elegance of [Artisan Wear](https://artisanwearcustom.com/), while presenting a distinctive brand identity tailored to Fine Stitch Uniforms.

### Key Highlights
- **Full Dynamic MySQL Integration:** Built with MySQL database `artisan` powered by `mysql2/promise` with robust connection pooling.
- **Resilient Architectural Fallback:** Built-in automatic fallback ensures the application runs seamlessly even if MySQL is in standby.
- **Complete Administrative Dashboard:** Secure session/cookie authentication with bcrypt password hashing and full CRUD capabilities for products, categories, portfolio images, customer inquiries, reviews, and site configuration.
- **Lead Generation & WhatsApp Integration:** Floating WhatsApp widget (+91 9619585005), interactive quote modal, click-to-call, click-to-email, and MySQL-stored contact inquiries.
- **Enterprise Mumbai SEO:** Schema.org `LocalBusiness` JSON-LD structured data, dynamic XML sitemaps, robots.txt, canonical links, and location-targeted keywords for Mumbai and Maharashtra.

---

## 2. Technology Stack

- **Framework:** Next.js 14 (App Router, Server Components & Route Handlers)
- **Frontend:** React 18, TypeScript, Tailwind CSS, Lucide React Icons
- **Database:** MySQL (Database Name: `artisan`) using `mysql2` connection pooling
- **Authentication:** JWT with secure HTTP-only cookies and `bcryptjs` password hashing
- **Global State:** React Context API (`SiteContext`)
- **SEO & Performance:** JSON-LD LocalBusiness Schema, XML Sitemap, OpenGraph metadata, Incremental Static Regeneration (ISR)

---

## 3. Directory Architecture

```
artisan/
├── app/
│   ├── about/
│   │   └── page.tsx                # About Us page with business history & workflow
│   ├── admin/
│   │   ├── dashboard/
│   │   │   ├── categories/page.tsx # Manage uniform categories
│   │   │   ├── gallery/page.tsx    # Manage portfolio gallery
│   │   │   ├── inquiries/page.tsx  # Manage leads & customer inquiries
│   │   │   ├── products/page.tsx   # Manage uniform products & images
│   │   │   ├── settings/page.tsx   # Site configuration & SEO settings
│   │   │   ├── testimonials/page.tsx # Manage client reviews
│   │   │   ├── layout.tsx          # Admin layout with sidebar navigation
│   │   │   └── page.tsx            # Admin dashboard overview & analytics
│   │   └── page.tsx                # Admin authentication login
│   ├── api/
│   │   ├── auth/                   # Login, logout, session verification
│   │   ├── categories/             # Category CRUD endpoints
│   │   ├── contact/                # Contact form submission & lead management
│   │   ├── gallery/                # Portfolio gallery CRUD endpoints
│   │   ├── products/               # Product CRUD endpoints
│   │   ├── settings/               # Site settings API
│   │   └── testimonials/           # Testimonial reviews API
│   ├── contact/
│   │   └── page.tsx                # Contact Us with Google Maps & direct actions
│   ├── gallery/
│   │   └── page.tsx                # Portfolio with category filter tabs & lightbox
│   ├── products/
│   │   ├── [slug]/page.tsx         # Detailed product view with WhatsApp order CTA
│   │   └── page.tsx                # Product catalog with search and filters
│   ├── globals.css                 # Global CSS & Tailwind styling
│   ├── layout.tsx                  # Root layout with Schema.org JSON-LD
│   ├── page.tsx                    # Professional homepage
│   ├── robots.ts                   # Search engine crawler instructions
│   └── sitemap.ts                  # Dynamic XML sitemap
├── components/
│   ├── ContactForm.tsx             # Validated contact form with MySQL persistence
│   ├── Footer.tsx                  # Brand footer with location & contact info
│   ├── GalleryGrid.tsx             # Interactive gallery with modal viewer
│   ├── Header.tsx                  # Responsive header with category mega-menu
│   ├── Hero.tsx                    # High-impact hero section with direct CTAs
│   ├── InquiryModal.tsx            # Global quote inquiry modal
│   ├── ProductCard.tsx             # Uniform card with price, tags, and quick inquire
│   ├── ProductGrid.tsx             # Searchable, filterable product grid
│   └── WhatsAppButton.tsx          # Floating WhatsApp widget (+91 9619585005)
├── context/
│   └── SiteContext.tsx             # Global business profile and quote modal state
├── lib/
│   ├── auth.ts                     # Password hashing, JWT signing & verification
│   ├── db.ts                       # MySQL connection pool & intelligent fallback
│   ├── queries.ts                  # Parameterized database queries & CRUD handlers
│   └── utils.ts                    # Formatting, class merging, and WhatsApp URLs
├── models/                         # TypeScript models for database entities
│   ├── Admin.ts
│   ├── Category.ts
│   ├── Contact.ts
│   ├── Gallery.ts
│   ├── Product.ts
│   ├── Setting.ts
│   └── Testimonial.ts
├── public/
│   └── logo/
│       ├── logo.svg                # Brand emblem logo for light backgrounds
│       └── logo-white.svg          # Brand emblem logo for dark backgrounds
├── scripts/
│   └── init-db.js                  # Automated MySQL database setup script
├── database.sql                    # Complete SQL schema & initial seed data
├── .env.example                    # Sample environment variables
└── README.md                       # Documentation & deployment guide
```

---

## 4. MySQL Database (`artisan`)

The database name is strictly configured as `artisan`.

### Tables Created
1. `admins` — Admin user credentials with bcrypt password hash and role management.
2. `categories` — Uniform classifications (Corporate, School, Industrial, Healthcare, Hospitality, Security, T-Shirts, Promotional).
3. `products` — Uniform products with slug, descriptions, sizes, colors, pricing, customization notes, and active flags.
4. `product_images` — Additional image gallery for multi-photo uniforms.
5. `gallery` — Visual portfolio of delivered uniform batches with categories.
6. `contact_messages` — Inquiries and quotes submitted via the website with status (`new`, `read`, `replied`, `archived`).
7. `site_settings` — Dynamic key-value store for business details, homepage copy, and SEO.
8. `testimonials` — Verified client reviews and ratings.

---

## 5. Quick Installation & Setup

### Prerequisites
- Node.js 18.x or 20.x or 24.x
- MySQL Server (running on port 3306)

### Step 1: Clone or Open Project
```bash
cd "d:\Projects Provisioningtech\Artisan"
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment Variables
Copy `.env.example` to `.env.local` (or configure as needed):
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=artisan

JWT_SECRET=fine_stitch_uniforms_jwt_secret_key_387192837192837

NEXT_PUBLIC_SITE_NAME="Fine Stitch Uniforms"
NEXT_PUBLIC_SITE_URL=http://localhost:3000
NEXT_PUBLIC_PHONE=+919619585005
NEXT_PUBLIC_WHATSAPP_NUMBER=+919619585005
NEXT_PUBLIC_EMAIL=sayyedaadil35@yahoo.com
NEXT_PUBLIC_ADDRESS="Malwani, Malad West, Mumbai, Maharashtra 400095, India"
```

### Step 4: Initialize MySQL Database
Run the automated initialization script to create the database `artisan` and populate all tables with realistic seed data:
```bash
npm run init-db
```
*(Alternatively, import `database.sql` directly into MySQL / phpMyAdmin).*

### Step 5: Start Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 6. Admin Dashboard Access

- **URL:** [http://localhost:3000/admin](http://localhost:3000/admin)
- **Username:** `admin` (or `sayyedaadil35@yahoo.com`)
- **Password:** `Admin@123`

### Admin Capabilities
- **Overview:** Instant metric count for products, categories, leads, and gallery.
- **Product Management:** Full CRUD (add new uniform, set price, update sizes, colors, images, and feature flags).
- **Categories:** Add, edit, or reorder uniform categories.
- **Portfolio Gallery:** Upload client photos, assign categories, and preview.
- **Inquiries / Leads:** Review messages, filter by status, initiate direct WhatsApp chat, or call client.
- **Website & SEO Settings:** Edit business details, modify homepage stats, update About Us mission, and manage target Mumbai SEO keywords.
- **Testimonials:** Add or update client reviews.

---

## 7. Production Build & Deployment

To generate an optimized production build:
```bash
npm run build
npm run start
```
The application will start on port 3000 ready for production traffic.

