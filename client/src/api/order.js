// client/src/api/orders.js
export async function placeOrder({
  token,
  customerId,
  items,
  amount,
  merchantId = "demo-store",
}) {
  const res = await fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ items, amount, merchantId }),
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message || "Order failed");
  return json;
}
