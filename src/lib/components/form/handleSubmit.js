import { invalidateAll } from "$app/navigation";
import { applyAction } from "$app/forms";

export async function handleSubmit() {
  const data = new FormData(this);
  const response = await fetch(this.action, {
    method: "POST",
    body: data,
  });
  const result = await response.json();
  if (result.type === "success") {
    await invalidateAll();
  }
  applyAction(result);
}
