
import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

const { Client } = pg;

// Strip query parameters to prevent SSL conflicts
const connectionString = process.env.DATABASE_URL
    ? process.env.DATABASE_URL.split('?')[0]
    : '';

if (!connectionString) {
    console.error('DATABASE_URL is missing in .env');
    process.exit(1);
}

const client = new Client({
    connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

const createTables = async () => {
    try {
        console.log('Connecting to database...');
        await client.connect();
        console.log('Connected successfully.');

        // Create blogs_KS table
        console.log('Creating table: blogs_KS...');
        await client.query(`
            CREATE TABLE IF NOT EXISTS public.blogs_KS (
                id uuid NOT NULL,
                blog_title character varying NOT NULL,
                blog_body text NOT NULL,
                blog_img character varying,
                created_at timestamp with time zone DEFAULT now(),
                CONSTRAINT blogs_pkey PRIMARY KEY (id)
            );
        `);
        console.log('SUCCESS: Table blogs_KS created/verified.');

        // Create products_KS table
        console.log('Creating table: products_KS...');
        await client.query(`
            CREATE TABLE IF NOT EXISTS public.products_KS (
                id uuid NOT NULL,
                product_name character varying NOT NULL,
                ordering_link character varying,
                image_path character varying,
                about_product text,
                created_at timestamp with time zone DEFAULT now(),
                CONSTRAINT products_pkey PRIMARY KEY (id)
            );
        `);
        console.log('SUCCESS: Table products_KS created/verified.');

        // Verify existence
        console.log('Verifying tables in database...');
        const res = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            ORDER BY table_name;
        `);

        console.log('--- CURRENT TABLES ---');
        res.rows.forEach(row => console.log(`- ${row.table_name}`));
        console.log('----------------------');

    } catch (err) {
        console.error('FATAL ERROR:', err.message);
        console.error(err.stack);
    } finally {
        await client.end();
        console.log('Connection closed.');
    }
};

createTables();
