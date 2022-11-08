<script>
  import "../app.css";
  import { page } from "$app/stores";
</script>

{#if $page.data.user}
  <form action="/logout" method="POST">
    <button type="submit">Log out</button>
  </form>
{/if}
<slot />
