import { redirect } from "@sveltejs/kit";

export async function load({ cookies }) {
  const token = await cookies.get("token");

  if (!token) {
    throw redirect(303, "/");
  }
}
