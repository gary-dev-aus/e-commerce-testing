import { writable } from "svelte/store";
import { env } from "$env/dynamic/public";

const url = env.PUBLIC_STRAPI_URL + "/api/carts/";

export const cartStore = writable([]);

function getId(token) {}

export async function loadCart(token) {
  try {
    const response = await fetch(url, {
      method: "GET",
    });

    data = await response.json();

    if (data.error) {
      console.log(data.error, "Store | Strapi responded with error.");
    }
  } catch (error) {
    console.log(error, "Store | Product get request failed.");
  }
}
