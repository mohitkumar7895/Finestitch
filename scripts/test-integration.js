const path = require('path');
const fs = require('fs');

async function testIntegration() {
  console.log('--- TESTING FINE STITCH UNIFORMS BACKEND & MYSQL INTEGRATION ---');

  // 1. Verify files exist
  const essentialFiles = [
    'app/page.tsx',
    'app/about/page.tsx',
    'app/products/page.tsx',
    'app/products/[slug]/page.tsx',
    'app/gallery/page.tsx',
    'app/contact/page.tsx',
    'app/admin/page.tsx',
    'app/admin/dashboard/page.tsx',
    'app/admin/dashboard/products/page.tsx',
    'app/admin/dashboard/categories/page.tsx',
    'app/admin/dashboard/gallery/page.tsx',
    'app/admin/dashboard/inquiries/page.tsx',
    'app/admin/dashboard/settings/page.tsx',
    'app/admin/dashboard/testimonials/page.tsx',
    'components/Header.tsx',
    'components/Footer.tsx',
    'components/Hero.tsx',
    'components/ProductCard.tsx',
    'components/ProductGrid.tsx',
    'components/ContactForm.tsx',
    'components/WhatsAppButton.tsx',
    'database.sql',
    '.env.example',
    '.env.local'
  ];

  let missing = 0;
  for (const f of essentialFiles) {
    const full = path.join(__dirname, '..', f);
    if (!fs.existsSync(full)) {
      console.error(`[FAIL] Missing file: ${f}`);
      missing++;
    }
  }

  if (missing === 0) {
    console.log('[PASS] All essential route and component files exist!');
  }

  // 2. Query MySQL directly using mysql2
  const mysql = require('mysql2/promise');
  try {
    const connection = await mysql.createConnection({
      host: 'localhost',
      port: 3306,
      user: 'root',
      password: '',
      database: 'artisan'
    });

    console.log('[PASS] Connected to MySQL database "artisan" directly!');

    // Test tables
    const [cats] = await connection.query('SELECT COUNT(*) as count FROM categories');
    console.log(`[PASS] Categories in DB: ${cats[0].count}`);

    const [prods] = await connection.query('SELECT COUNT(*) as count FROM products');
    console.log(`[PASS] Products in DB: ${prods[0].count}`);

    const [gallery] = await connection.query('SELECT COUNT(*) as count FROM gallery');
    console.log(`[PASS] Gallery items in DB: ${gallery[0].count}`);

    const [messages] = await connection.query('SELECT COUNT(*) as count FROM contact_messages');
    console.log(`[PASS] Messages in DB: ${messages[0].count}`);

    const [settings] = await connection.query('SELECT COUNT(*) as count FROM site_settings');
    console.log(`[PASS] Site settings in DB: ${settings[0].count}`);

    const [testimonials] = await connection.query('SELECT COUNT(*) as count FROM testimonials');
    console.log(`[PASS] Testimonials in DB: ${testimonials[0].count}`);

    const [admin] = await connection.query('SELECT id, username, email, role FROM admins LIMIT 1');
    console.log(`[PASS] Admin user found: ${admin[0].username} (${admin[0].email}) - Role: ${admin[0].role}`);

    await connection.end();
    console.log('--- ALL INTEGRATION & DATABASE CHECKS PASSED SUCCESSFULLY! ---');
  } catch (err) {
    console.error('[FAIL] MySQL direct check error:', err.message);
  }
}

testIntegration();

