<script>
  import { page } from "$app/stores";

  export let data;

  const user = $page.data.user;
  function test() {
    console.log(data);
  }
</script>

<h1>Welcome Admin</h1>
{#if user}
  <div>
    logged in as {user.name} and my role is {user.role}.
  </div>
{/if}
<button on:click={test}>CLICK</button>
