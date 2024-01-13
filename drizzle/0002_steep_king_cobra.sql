CREATE TABLE IF NOT EXISTS "person" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(256),
	"age" integer
);
--> statement-breakpoint
ALTER TABLE "cities" ADD COLUMN "mayor_id" integer;--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "cities" ADD CONSTRAINT "cities_mayor_id_person_id_fk" FOREIGN KEY ("mayor_id") REFERENCES "person"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
