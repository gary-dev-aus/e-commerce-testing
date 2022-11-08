<script>
  import Form from "$lib/components/form/form.svelte";
  export let form;
</script>

<h1 class="text-xl">Login</h1>
<Form>
  <label
    >Email:<input name="email" type="email" value={form?.name ?? ""} /></label
  >
  <label
    >Password:<input
      name="password"
      type="password"
      value={form?.name ?? ""}
    /></label
  >
  {#if form?.type}
    <div>
      {form?.type === "identity"
        ? "Incorrect email or password"
        : "Bad request"}
    </div>
  {/if}
  <button type="submit">Log in</button>
</Form>
