// client/src/pages/Checkout.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ScoreWidget from "../components/ScoreWidget";

function getToken() {
  return localStorage.getItem("token");
}
function getCustomerId() {
  return localStorage.getItem("customerId");
}

export default function Checkout() {
  const navigate = useNavigate();
  const [cart, setCart] = useState([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [placing, setPlacing] = useState(false);
  const customerId = getCustomerId();

  useEffect(() => {
    const raw = localStorage.getItem("cart") || "[]";
    try {
      setCart(JSON.parse(raw));
    } catch {
      setCart([]);
    }
    // prefill from localStorage if available
    setName(localStorage.getItem("customerName") || "");
    setEmail(localStorage.getItem("customerEmail") || "");
  }, []);

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);

  async function placeOrder() {
    if (!getToken()) {
      alert("Please login or signup before placing an order.");
      navigate("/login");
      return;
    }
    if (!customerId) {
      alert(
        "Customer profile missing. Please login through your customer account."
      );
      navigate("/login");
      return;
    }
    if (cart.length === 0) {
      alert("Cart is empty.");
      return;
    }

    setPlacing(true);
    try {
      const body = {
        merchantId: "demo-store",
        amount: total,
        items: cart.map((c) => ({ sku: c.id, qty: c.qty, price: c.price })),
      };

      const res = await fetch("http://localhost:5000/api/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${getToken()}`,
        },
        body: JSON.stringify(body),
      });

      const json = await res.json();
      if (!res.ok) {
        throw new Error(json.message || "Order failed");
      }

      // Clear cart
      localStorage.removeItem("cart");

      // Optionally store order id, show success page
      localStorage.setItem("lastOrder", JSON.stringify(json.order || {}));
      // Navigate to success page and show new score
      navigate("/order-success", {
        state: { score: json.newScore || json.score || null },
      });
    } catch (err) {
      console.error(err);
      alert(err.message || "Order failed");
    } finally {
      setPlacing(false);
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <h1 className="text-2xl font-bold mb-4">Checkout</h1>

        <div className="bg-white p-4 rounded shadow mb-4">
          <label className="block mb-2 text-sm font-medium">Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border p-2 rounded"
          />
          <label className="block mt-3 mb-2 text-sm font-medium">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border p-2 rounded"
          />
        </div>

        <div className="bg-white p-4 rounded shadow mb-4">
          <h2 className="font-semibold mb-2">Order Summary</h2>
          <div className="space-y-3">
            {cart.map((c) => (
              <div key={c.id} className="flex justify-between">
                <div>
                  {c.name} x {c.qty}
                </div>
                <div>${(c.price * c.qty).toFixed(2)}</div>
              </div>
            ))}
          </div>
          <div className="mt-4 text-right font-bold">
            Total: ${total.toFixed(2)}
          </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={placeOrder}
            disabled={placing}
            className="px-6 py-3 bg-green-600 text-white rounded hover:bg-green-700"
          >
            {placing ? "Placing order..." : "Place Order"}
          </button>
          <button
            onClick={() => navigate("/cart")}
            className="px-6 py-3 border rounded"
          >
            Edit Cart
          </button>
        </div>
      </div>

      <aside>
        <ScoreWidget customerId={customerId} />
        <div className="mt-4 p-4 bg-white rounded shadow text-sm text-gray-500">
          Your score determines available payment options:
          <ul className="list-disc ml-5 mt-2">
            <li>High: Eligible for Pay Later</li>
            <li>Medium: Deposit may be required</li>
            <li>Low: Manual review</li>
          </ul>
        </div>
      </aside>
    </div>
  );
}
