import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Products from "./pages/Products";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import MerchantDashboard from "./pages/MerchantDashboard";
import { useAuth } from "./contexts/AuthContext";

function ProtectedMerchant({ children }) {
  const { user, token } = useAuth();

  if (token && !user) return <div className="p-6">Loading…</div>;

  if (!user || user.role !== "merchant") return <div>Access denied</div>;

  return children;
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/order-success" element={<OrderSuccess />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/merchant/dashboard"
          element={
            <ProtectedMerchant>
              <MerchantDashboard />
            </ProtectedMerchant>
          }
        />
      </Routes>
    </Router>
  );
}
