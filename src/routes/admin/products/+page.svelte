<script>
  import AddProductForm from "$lib/components/products/addProductForm.svelte";
  import ProductList from "../../../lib/components/products/productList.svelte";

  export let form;
  export let data;
</script>

<h1>Create new products</h1>
<AddProductForm {form} token={data.token} />

<ProductList token={data.token} canDelete />
