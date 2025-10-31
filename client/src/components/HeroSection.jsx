import { Link } from "react-router-dom";

export default function HeroSection() {
  return (
    <section className="flex flex-col items-center text-center py-24 bg-gradient-to-b from-blue-50 to-white">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
        Smarter Credit Decisions for E-Commerce
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mb-8">
        Instantly evaluate how trustworthy each customer is using behavioral,
        transactional, and identity signals.
      </p>
      <div className="space-x-4">
        <Link
          to="/merchant/login"
          className="px-6 py-3 bg-blue-600 text-white rounded-xl shadow hover:bg-blue-700 transition"
        >
          Login as Merchant
        </Link>
        <Link
          to="/demo/shop"
          className="px-6 py-3 bg-gray-200 text-gray-800 rounded-xl shadow hover:bg-gray-300 transition"
        >
          Test as Customer
        </Link>
      </div>
    </section>
  );
}
