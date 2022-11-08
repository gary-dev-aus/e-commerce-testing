import { env } from "$env/dynamic/public";

export async function checkRole(token) {
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
  const role = user.role ? user.role.type : "authenticated";
  console.log(role);
  return role;
}
