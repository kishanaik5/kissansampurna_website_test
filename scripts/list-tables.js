
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

const listTables = async () => {
    try {
        await client.connect();
        console.log('CONNECTED TO DB');

        const res = await client.query(`
            SELECT table_name 
            FROM information_schema.tables 
            WHERE table_schema = 'public' 
            ORDER BY table_name;
        `);

        console.log('--- TABLES START ---');
        if (res.rows.length === 0) {
            console.log('No tables found.');
        } else {
            res.rows.forEach(row => {
                console.log(`- ${row.table_name}`);
            });
        }
        console.log('--- TABLES END ---');

    } catch (err) {
        console.error('ERROR:', err.message);
    } finally {
        await client.end();
        console.log('DISCONNECTED');
    }
};

listTables();
