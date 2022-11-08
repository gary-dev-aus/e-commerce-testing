<script>
  import { handleSubmit } from "$lib/components/form/handleSubmit";
</script>

<form on:submit|preventDefault={handleSubmit}>
  <slot />
</form>
