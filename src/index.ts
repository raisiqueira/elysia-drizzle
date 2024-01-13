import { logger } from "@bogeychan/elysia-logger";
import { swagger } from "@elysiajs/swagger";
import { Elysia } from "elysia";

import { citiesRoute } from "./features/cities/router";
import { countriesRoute } from "./features/countries/router";

const app = new Elysia()
  .use(swagger())
  .use(logger())
  .get("/", () => "Hello Elysia")
  .use(citiesRoute)
  .use(countriesRoute)
  .listen(3000);

console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
