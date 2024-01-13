import { migrate } from 'drizzle-orm/node-postgres/migrator';
import { db, client } from '.';

await migrate(db, { migrationsFolder: "./drizzle"}) // TODO: use import.meta.dir
await client.end();
