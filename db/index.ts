import { drizzle } from 'drizzle-orm/node-postgres';
import { Client } from 'pg';
import * as schema from "./schema"; 

const DB_URL = "postgres://postgres:elysia@0.0.0.0:5432/elysia";

export const client = new Client({
  connectionString: DB_URL,
});

/**
 * Drizzle manager.
 */
await client.connect();
export const db = drizzle(client, { schema });