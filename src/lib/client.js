import PocketBase from "pocketbase";
import { env } from "$env/static/public";

export const client = new PocketBase(env.PUBLIC_POCKETBASE_URL);
