import { env } from "$env/dynamic/public";
import { invalid, redirect } from "@sveltejs/kit";
import { checkRole } from "$lib/checkRole";

export const actions = {
  default: async ({ cookies, request }) => {
    const form = await request.formData();
    const { email: identifier, password } = Object.fromEntries([...form]);

    const body = { identifier, password };

    let role = "";

    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      };

      const response = await fetch(
        env.PUBLIC_STRAPI_URL + "/api/auth/local",
        options
      );

      const data = await response.json();

      if (data?.error) {
        console.log(data.error, "there was some error validating");
        return invalid(400, { type: "identity" });
      } else {
        cookies.set("token", data.jwt, {
          path: "/",
          httpOnly: true,
          sameSite: "strict",
          secure: process.env.NODE_ENV === "production",
          maxAge: 60 * 60 * 24 * 30,
        });
        role = await checkRole(data.jwt);
        console.log(`${role} user logged in as ${data.user.username}`);
      }
    } catch (error) {
      console.log(error.message, "there was some error with the request");
      return invalid(400, { type: "request" });
    }
    if (role === "manager") {
      throw redirect(303, "/admin");
    } else {
      throw redirect(303, "/shop");
    }
  },
};

export async function load({ cookies }) {
  const token = await cookies.get("token");

  if (token) {
    throw redirect(303, "/admin");
  }
}
