import { get, writable } from "svelte/store";
import { env } from "$env/dynamic/public";

export const productStore = writable([]);

const url = env.PUBLIC_STRAPI_URL + "/api/products/";
let data;

async function loadProducts() {
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
  const products = data.data.map((product) => ({
    name: product.attributes.name,
    price: product.attributes.price,
    id: product.id,
  }));
  productStore.set(products);
}
loadProducts();

export async function addProduct(product, token) {
  try {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ data: product }),
    };

    const response = await fetch(url, options);

    const data = await response.json();
    const newProduct = {
      name: data.data.attributes.name,
      price: data.data.attributes.price,
      id: data.data.id,
    };

    if (data?.error) {
      console.log(data.error, "there was some error validating");
      return invalid(400, { type: "input" });
    } else {
      productStore.update((current) => [...current, newProduct]);
      console.log(
        `Added new product: ${newProduct.name} valued at $${newProduct.price}.`
      );
      return { success: true, product: newProduct };
    }
  } catch (error) {
    console.log(error.message, "there was some error with the request");
    return invalid(400, { type: "request" });
  }
}

export async function removeProduct(id, token) {
  const product = get(productStore).find((product) => product.id === id);

  try {
    const options = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    };

    const response = await fetch(url + id, options);

    const data = await response.json();

    if (data?.error) {
      console.log(data.error, "there was some error validating");
      return invalid(400, { type: "input" });
    } else {
      productStore.update((products) =>
        products.filter((product) => product.id !== id)
      );
      console.log(`Removed product: ${product.name} ($${product.price}).`);
      return { success: true, product };
    }
  } catch (error) {
    console.log(error.message, "there was some error with the request");
    return invalid(400, { type: "request" });
  }
}
