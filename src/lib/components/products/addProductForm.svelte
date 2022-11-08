<script>
  import { addProduct } from "$lib/stores/productStore";
  export let form;
  export let token;

  export async function handleSubmit() {
    const data = new FormData(this);
    // console.log(data);
    const product = Object.fromEntries([...data]);
    addProduct(product, token);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <p>Handled through Store</p>
  <label>Name:<input name="name" type="name" value={form?.name ?? ""} /></label>
  <label
    >Price: <input
      name="price"
      type="number"
      min="0"
      step="0.01"
      value={form?.name ?? ""}
    /></label
  >
  <button type="submit">Add new product</button>
</form>
