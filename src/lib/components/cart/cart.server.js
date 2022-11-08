import { env } from "$env/dynamic/private";

// export function addProductToCart(productId) {}

export async function getUserId(token) {
  const response = await fetch(url + "/users/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data.id;
}

// get cart id and items using api token and /users/me/populate=cart
export async function getCartId(userId) {
  console.log(userId);

  const response = await fetch(
    `${url}/users/${userId}?populate[cart][populate][cart_products][populate]=product`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.STRAPI_API_KEY}`,
      },
    }
  );
  const data = await response.json();
  const products = data.cart.cart_products.map((product) => ({
    name: product.product.name,
    price: product.product.price,
    id: product.product.id,
    quantity: product.quantity,
  }));
  const cart = {
    userId,
    cartId: data.cart.id,
    products,
  };
  return cart;
}
