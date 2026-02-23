
import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

const { Client } = pg;

// Strip query parameters to avoid SSL conflicts, relying on explicit ssl config below
const connectionString = process.env.DATABASE_URL ? process.env.DATABASE_URL.split('?')[0] : '';

const client = new Client({
    connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

const checkTables = async () => {
    try {
        await client.connect();
        console.log('Connected to DB.');

        // Check for blogs_KS
        const resBlog = await client.query("SELECT to_regclass('public.blogs_KS') as exists;");
        console.log('Check blogs_KS:', resBlog.rows[0].exists ? 'FOUND' : 'MISSING');

        // Check for products_KS
        const resProd = await client.query("SELECT to_regclass('public.products_KS') as exists;");
        console.log('Check products_KS:', resProd.rows[0].exists ? 'FOUND' : 'MISSING');

        // List all tables again just to be sure
        const resAll = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            ORDER BY table_name;
        `);
        console.log('All Public Tables:', resAll.rows.map(r => r.table_name).join(', '));

    } catch (err) {
        console.error('ERROR:', err.message);
    } finally {
        await client.end();
        console.log('Connection closed.');
    }
};

checkTables();
