<script>
  import ProductList from "$lib/components/products/productList.svelte";
  import Cart from "$lib/components/cart/cart.svelte";
  export let data;
  let showCart = false;
</script>

<ProductList shopping />
<button on:click={() => (showCart = !showCart)}>show cart</button>
{#if showCart}
  <Cart cart={data.cart} />
{/if}
