
import pg from 'pg';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Load environment variables
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
dotenv.config({ path: join(__dirname, '../.env') });

const { Client } = pg;

// Strip query parameters
const connectionString = process.env.DATABASE_URL
    ? process.env.DATABASE_URL.split('?')[0]
    : '';

console.log('Using connection string:', connectionString.replace(/:[^:@]*@/, ':****@')); // Mask password

const client = new Client({
    connectionString,
    ssl: {
        rejectUnauthorized: false,
    },
});

const run = async () => {
    try {
        console.log('Connecting...');
        await client.connect();
        console.log('CONNECTED.');

        console.log('Running CREATE TABLE for blogs_ks...');
        // Lowercase table name explicitly to match Postgres behavior
        const res1 = await client.query(`
            CREATE TABLE IF NOT EXISTS public.blogs_ks (
                id uuid NOT NULL,
                blog_title character varying NOT NULL,
                blog_body text NOT NULL,
                blog_img character varying,
                created_at timestamp with time zone DEFAULT now(),
                CONSTRAINT blogs_ks_pkey PRIMARY KEY (id)
            );
        `);
        console.log('CREATE blogs_ks RESULT:', res1);

        console.log('Running CREATE TABLE for products_ks...');
        const res2 = await client.query(`
            CREATE TABLE IF NOT EXISTS public.products_ks (
                id uuid NOT NULL,
                product_name character varying NOT NULL,
                ordering_link character varying,
                image_path character varying,
                about_product text,
                created_at timestamp with time zone DEFAULT now(),
                CONSTRAINT products_ks_pkey PRIMARY KEY (id)
            );
        `);
        console.log('CREATE products_ks RESULT:', res2);

    } catch (err) {
        console.error('FATAL ERROR:', err);
    } finally {
        await client.end();
        console.log('DISCONNECTED.');
    }
};

run();
