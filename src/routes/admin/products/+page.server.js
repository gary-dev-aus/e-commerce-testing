import { env } from "$env/dynamic/public";
import { invalid, redirect } from "@sveltejs/kit";

export async function load({ cookies }) {
  const token = await cookies.get("token");

  if (!token) {
    throw redirect(303, "/");
  } else {
    return { token };
  }
}
