// client/src/pages/Products.jsx
import { useState } from "react";
import { PRODUCTS } from "../data/products";
import { useNavigate } from "react-router-dom";

function ProductCard({ p, onAdd }) {
  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <img
        src={p.image}
        alt={p.name}
        className="h-40 w-full object-cover rounded"
      />
      <h3 className="font-semibold mt-3">{p.name}</h3>
      <p className="text-gray-500 text-sm">{p.description}</p>
      <div className="flex items-center justify-between mt-3">
        <div className="text-lg font-bold">${p.price.toFixed(2)}</div>
        <button
          onClick={() => onAdd(p)}
          className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Add to cart
        </button>
      </div>
    </div>
  );
}

export default function Products() {
  const [cart, setCart] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart") || "[]");
    } catch {
      return [];
    }
  });
  const navigate = useNavigate();

  function addToCart(product) {
    const next = [...cart];
    const idx = next.findIndex((c) => c.id === product.id);
    if (idx === -1) next.push({ ...product, qty: 1 });
    else next[idx].qty++;
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Products</h1>
        <button
          onClick={() => navigate("/cart")}
          className="px-4 py-2 border rounded hover:bg-gray-50"
        >
          View Cart ({cart.reduce((s, c) => s + c.qty, 0)})
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {PRODUCTS.map((p) => (
          <ProductCard key={p.id} p={p} onAdd={addToCart} />
        ))}
      </div>
    </div>
  );
}
