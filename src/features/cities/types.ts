import { type NewCity } from "../../../db/schema";
import { ApiPayloadBody } from "../../utils/httpUtils";

type NewCityPayload = ApiPayloadBody<NewCity>;

export { type NewCityPayload };
