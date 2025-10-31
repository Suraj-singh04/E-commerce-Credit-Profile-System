// src/components/Navbar.jsx
import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white">
      <h1 className="text-2xl font-bold text-blue-600">TrustCart AI</h1>
      <div className="space-x-4">
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>
        <Link
          to="/merchant/login"
          className="text-gray-700 hover:text-blue-600"
        >
          Merchant
        </Link>
        <Link to="/demo/shop" className="text-gray-700 hover:text-blue-600">
          Customer
        </Link>
      </div>
    </nav>
  );
}
