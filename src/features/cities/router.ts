import { ilike } from "drizzle-orm";
import { Elysia, Static, t } from "elysia";

import { db } from "../../../db";
import { cities } from "../../../db/schema";
import { NewCityPayload } from "./types";

const newCityBadRequest = t.Object({
  message: t.String(),
});

const newCityResponse = t.Object({
  message: t.String(),
});

const newCityBody = t.Object({
  name: t.String(),
  countryId: t.Number(),
  popularity: t.Union([t.Literal("unknown"), t.Literal("known"), t.Literal("popular")]),
});

type X = Static<typeof newCityBody>;

const citiesRoute = new Elysia().group("/cities", (app) => {
  return app
    .get("/", async () => {
      const citiesFromDB = await db.select().from(cities);
      return Response.json(citiesFromDB);
    })
    .post(
      "/new",
      async ({ body }: NewCityPayload) => {
        console.log(body);
        const findCity = await db
          .select()
          .from(cities)
          .where(ilike(cities.name, `%${body.name}%`));
        if (findCity.length > 0) {
          return Response.json(
            {
              message: "City already exists!",
            },
            { status: 400 },
          );
        }

        await db.insert(cities).values(body);
        return Response.json({ message: "Created!" }, { status: 201 });
      },
      {
        body: newCityBody,
        response: {
          201: newCityResponse,
          400: newCityBadRequest,
        },
        type: "application/json",
      },
    );
});

export { citiesRoute };
