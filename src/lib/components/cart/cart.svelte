<script>
  export let cart;
  const products = cart.products;
</script>

<h2>my cart</h2>
<ul>
  {#each products as product (product.id)}
    <li>
      <p>{product.name}</p>
      <p>quantity: {product.quantity}</p>
      <p>
        price: ${product.quantity * product.price} ({product.quantity} x ${product.price})
      </p>
    </li>
  {/each}
</ul>
