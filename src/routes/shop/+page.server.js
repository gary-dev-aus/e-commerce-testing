import { env } from "$env/dynamic/private";

export async function load({ cookies }) {
  const url = env.STRAPI_URL + "/api";

  // get token
  const token = cookies.get("token");
  // get user id using token
  async function getUserId(token) {
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
  const userId = await getUserId(token);

  // get cart id and items using api token and /users/me/populate=cart
  async function getCartId(userId) {
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
  return { cart: getCartId(userId) };
  // fetch cart items by cart id using api token
  // return cart object

  //   try {
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         Authorization: `Bearer ${privateKey}`,
  //       },
  //     };

  //   } catch (error) {
  //     console.log(error.message, "there was some error with the request");
  //     return invalid(400, { type: "request" });
  //   }
}
