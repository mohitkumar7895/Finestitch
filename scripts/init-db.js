const fs = require('fs');
const path = require('path');
const mysql = require('mysql2/promise');

// Load environment variables from .env.local or .env
function loadEnv() {
  const envFiles = ['.env.local', '.env'];
  for (const file of envFiles) {
    const fullPath = path.join(__dirname, '..', file);
    if (fs.existsSync(fullPath)) {
      const content = fs.readFileSync(fullPath, 'utf8');
      content.split('\n').forEach(line => {
        const trimmed = line.trim();
        if (trimmed && !trimmed.startsWith('#') && trimmed.includes('=')) {
          const [key, ...vals] = trimmed.split('=');
          const k = key.trim();
          const v = vals.join('=').trim().replace(/^['"](.*)['"]$/, '$1');
          if (!process.env[k]) {
            process.env[k] = v;
          }
        }
      });
    }
  }
}

loadEnv();

async function initDB() {
  const host = process.env.DB_HOST || 'localhost';
  const port = parseInt(process.env.DB_PORT || '3306', 10);
  const user = process.env.DB_USER || 'root';
  const password = process.env.DB_PASSWORD || '';
  const database = process.env.DB_NAME || 'artisan';

  console.log(`[DB Init] Connecting to MySQL at ${host}:${port} as ${user}...`);

  try {
    // 1. Connect without database to create it if needed
    const connection = await mysql.createConnection({
      host,
      port,
      user,
      password,
      multipleStatements: true,
    });

    console.log(`[DB Init] Connected successfully. Creating database '${database}' if not exists...`);
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;`);
    await connection.query(`USE \`${database}\`;`);

    // 2. Read database.sql
    const sqlFilePath = path.join(__dirname, '..', 'database.sql');
    if (!fs.existsSync(sqlFilePath)) {
      throw new Error(`database.sql not found at ${sqlFilePath}`);
    }

    const sqlContent = fs.readFileSync(sqlFilePath, 'utf8');
    console.log(`[DB Init] Executing schema & seed SQL...`);
    await connection.query(sqlContent);

    console.log(`[DB Init] Successfully initialized MySQL database '${database}'!`);
    await connection.end();
  } catch (error) {
    console.error(`[DB Init] Error initializing database:`, error);
    console.log(`[DB Init] Note: If MySQL is not running yet, the application's built-in intelligent fallback in lib/db.ts will serve seeded data until MySQL is accessible.`);
  }
}

initDB();
