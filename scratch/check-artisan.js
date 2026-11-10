const mysql = require('mysql2/promise');
const fs = require('fs');

// Read .env.local manually
const envContent = fs.readFileSync('.env.local', 'utf8');
const env = {};
envContent.split('\n').forEach(line => {
  const [k, v] = line.split('=');
  if (k && v) env[k.trim()] = v.trim();
});

async function checkDb() {
  const pool = mysql.createPool({
    host: env.DB_HOST || 'localhost',
    user: env.DB_USER || 'root',
    password: env.DB_PASSWORD || '',
    database: env.DB_NAME || 'artisan',
  });
  
  const [settings] = await pool.query("SELECT * FROM site_settings WHERE setting_value LIKE '%Artisan%'");
  console.log('Matching settings count:', settings.length);
  if (settings.length > 0) console.log(settings);

  const [testimonials] = await pool.query("SELECT * FROM testimonials WHERE feedback LIKE '%Artisan%'");
  console.log('Matching testimonials count:', testimonials.length);
  if (testimonials.length > 0) {
    console.log(testimonials);
    // Replace Artisan with Fine Stitch Uniforms
    for (const t of testimonials) {
      const updated = t.feedback.replace(/Artisan Wear/g, 'Fine Stitch Uniforms').replace(/Artisan/g, 'Fine Stitch Uniforms');
      await pool.query("UPDATE testimonials SET feedback = ? WHERE id = ?", [updated, t.id]);
      console.log(`Updated testimonial ${t.id}`);
    }
  }

  const [products] = await pool.query("SELECT id, name FROM products WHERE name LIKE '%Artisan%' OR description LIKE '%Artisan%'");
  console.log('Matching products count:', products.length);

  await pool.end();
}
checkDb().catch(console.error);
