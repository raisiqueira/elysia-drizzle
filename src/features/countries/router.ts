import { Elysia, type Static, t } from "elysia";

import { db } from "../../../db";
import { countries } from "../../../db/schema";

const countriesSchema = t.Array(
  t.Object({
    id: t.Number(),
    name: t.Union([t.String(), t.Null()]),
  }),
);

type X = Static<typeof countriesSchema>;

const countriesRoute = new Elysia().group("/countries", (app) => {
  return app.get("/", async () => {
    const allCountries = await db.select().from(countries);
    return Response.json(allCountries);
  });
});

export { countriesRoute };
