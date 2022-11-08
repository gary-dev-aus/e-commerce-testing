import { env } from "$env/dynamic/public";

export async function handle({ event, resolve }) {
  const token = event.cookies.get("token");
  if (!token) {
    return await resolve(event);
  }
  const response = await fetch(
    env.PUBLIC_STRAPI_URL + "/api/users/me?populate=role",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  );

  const user = await response.json();
  if (user) {
    event.locals.user = {
      name: user.username,
      role: user.role ? user.role.type : "authenticated",
    };
  }

  return await resolve(event);
}
