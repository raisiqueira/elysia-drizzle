import { integer, pgEnum, pgTable, serial, uniqueIndex, varchar } from 'drizzle-orm/pg-core';

export const popularityEnum = pgEnum('popularity', ['unknown', 'known', 'popular']);

export const countries = pgTable('countries', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
}, (countries) => {
  return {
    nameIndex: uniqueIndex('name_idx').on(countries.name),
  }
});

type Countries = typeof countries.$inferSelect;
export type NewCountry = typeof countries.$inferInsert;

export const cities = pgTable('cities', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }).unique(),
  countryId: integer('country_id').references(() => countries.id),
  popularity: popularityEnum('popularity'),
  mayorId: integer('mayor_id').references(() => person.id),
});

export const person = pgTable('person', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 256 }),
  age: integer('age'),
});

type Cities = typeof cities.$inferSelect;
export type NewCity = typeof cities.$inferInsert;