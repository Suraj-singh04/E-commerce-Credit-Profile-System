import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center p-4 shadow-md bg-white">
      <h1 className="text-2xl font-bold text-blue-600">
        <Link to="/">TrustCart AI</Link>
      </h1>

      <div className="flex items-center space-x-6">
        {/* Main Navigation */}
        <Link to="/" className="text-gray-700 hover:text-blue-600">
          Home
        </Link>

        <Link to="/demo/shop" className="text-gray-700 hover:text-blue-600">
          Customer Demo
        </Link>

        <Link
          to="/merchant/login"
          className="text-gray-700 hover:text-blue-600"
        >
          Merchant Dashboard
        </Link>

        {/* Auth Buttons */}
        <Link
          to="/signup"
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition"
        >
          Signup
        </Link>

        <Link
          to="/login"
          className="px-4 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
        >
          Login
        </Link>
      </div>
    </nav>
  );
}
