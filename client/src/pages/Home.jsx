// src/pages/Home.jsx
import Navbar from "../components/Navbar";
import HeroSection from "../components/HeroSection";

export default function Home() {
  return (
    <div>
      <Navbar />
      <HeroSection />

      <section className="py-16 bg-white text-center">
        <h2 className="text-3xl font-semibold mb-6 text-gray-800">
          Why TrustCart?
        </h2>
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto px-4">
          <div className="p-6 shadow rounded-xl bg-blue-50">
            <h3 className="text-xl font-semibold mb-2">
              Instant Micro-Credit Scoring
            </h3>
            <p className="text-gray-600">
              Give every customer a real-time trust score during checkout.
            </p>
          </div>
          <div className="p-6 shadow rounded-xl bg-blue-50">
            <h3 className="text-xl font-semibold mb-2">
              Behavioral + Transactional Insights
            </h3>
            <p className="text-gray-600">
              Use data like purchase history, browsing behavior, and payment
              success to assess reliability.
            </p>
          </div>
          <div className="p-6 shadow rounded-xl bg-blue-50">
            <h3 className="text-xl font-semibold mb-2">
              Explainable & Privacy-First
            </h3>
            <p className="text-gray-600">
              Show customers how their score is calculated, with full consent
              and transparency.
            </p>
          </div>
        </div>
      </section>

      <footer className="text-center py-6 bg-gray-100 text-gray-500">
        © 2025 TrustCart AI — Smarter Credit for E-Commerce
      </footer>
    </div>
  );
}
