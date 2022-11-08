import { writable } from "svelte/store";
import { env } from "$env/dynamic/public";

const url = env.PUBLIC_STRAPI_URL + "/api/products";

export const cartStore = writable([]);

export async function loadCart(token) {}
