// client/src/pages/OrderSuccess.jsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function OrderSuccess() {
  const loc = useLocation();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    try {
      const last = JSON.parse(localStorage.getItem("lastOrder") || "null");
      setOrder(last);
    } catch {
      setOrder(null);
    }
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="bg-white p-8 rounded shadow text-center">
        <h1 className="text-2xl font-bold mb-4">
          Order placed successfully 🎉
        </h1>
        <p className="mb-4">Thank you — your order has been received.</p>

        {order && (
          <div className="bg-gray-50 p-4 rounded mb-4">
            <div>Order ID: {order._id || order.id || "N/A"}</div>
            <div>Amount: ${order.amount?.toFixed?.(2) || "N/A"}</div>
          </div>
        )}

        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate("/products")}
            className="px-4 py-2 bg-blue-600 text-white rounded"
          >
            Continue Shopping
          </button>
          <button
            onClick={() => navigate("/products")}
            className="px-4 py-2 border rounded"
          >
            View Orders
          </button>
        </div>
      </div>
    </div>
  );
}
