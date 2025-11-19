// client/src/pages/CartPage.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("cart") || "[]";
    try {
      setCart(JSON.parse(raw));
    } catch {
      setCart([]);
    }
  }, []);

  function updateQty(id, delta) {
    const next = cart.map((c) =>
      c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c
    );
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
  }

  function removeItem(id) {
    const next = cart.filter((c) => c.id !== id);
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
  }

  const total = cart.reduce((s, c) => s + c.price * c.qty, 0);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>
      {cart.length === 0 ? (
        <div>
          <p>Your cart is empty.</p>
          <button
            onClick={() => navigate("/products")}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded"
          >
            Browse products
          </button>
        </div>
      ) : (
        <>
          <div className="space-y-4">
            {cart.map((c) => (
              <div
                key={c.id}
                className="flex items-center justify-between bg-white p-4 rounded shadow"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={c.image}
                    alt={c.name}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div>
                    <div className="font-semibold">{c.name}</div>
                    <div className="text-sm text-gray-500">
                      ${c.price.toFixed(2)}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => updateQty(c.id, -1)}
                    className="px-2 py-1 border rounded"
                  >
                    -
                  </button>
                  <div>{c.qty}</div>
                  <button
                    onClick={() => updateQty(c.id, +1)}
                    className="px-2 py-1 border rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(c.id)}
                    className="px-3 py-1 text-red-600"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex justify-between items-center">
            <div className="text-xl font-bold">Total: ${total.toFixed(2)}</div>
            <button
              onClick={() => navigate("/checkout")}
              className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
}
