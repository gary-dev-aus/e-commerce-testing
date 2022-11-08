<script>
  import { productStore, removeProduct } from "$lib/stores/productStore";

  export let token;
  export let canDelete = false;
</script>

<h2>Products List</h2>
<ul>
  {#if $productStore.length < 1}
    <p>Empty or loading.</p>
  {:else}
    {#each $productStore as product (product.id)}
      <li class="flex flex-row">
        {product.name} ${product.price}
        {#if canDelete}
          <button on:click={removeProduct(product.id, token)} class="ml-8"
            >X</button
          >
        {/if}
      </li>
    {/each}
  {/if}
</ul>
