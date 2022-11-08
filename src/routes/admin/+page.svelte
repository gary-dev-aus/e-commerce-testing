<script>
  import { page } from "$app/stores";

  const user = $page.data.user;
</script>

<h1>Welcome Admin</h1>
{#if user}
  <div>
    logged in as {user.name} and my role is {user.role}.
  </div>
{/if}
