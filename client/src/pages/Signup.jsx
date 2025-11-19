import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const { setUser, setToken, setCustomerId } = useAuth();

  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });

  const [loading, setLoading] = useState(false);

  async function handleSignup(e) {
    e.preventDefault();
    setLoading(true);

    const res = await fetch("http://localhost:5000/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    const data = await res.json();
    setLoading(false);

    if (!res.ok) {
      alert(data.message || "Signup failed");
      return;
    }

    setToken(data.token);
    setUser(data.user);
    if (data.customerId) setCustomerId(data.customerId);

    alert("Signup successful!");

    // Redirect based on role
    if (form.role === "merchant") navigate("/merchant/login");
    else navigate("/demo/shop");
  }

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
          Create Account
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full border p-3 rounded-lg mb-4"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full border p-3 rounded-lg mb-4"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full border p-3 rounded-lg mb-4"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <select
          className="w-full border p-3 rounded-lg mb-4"
          value={form.role}
          onChange={(e) => setForm({ ...form, role: e.target.value })}
        >
          <option value="customer">I am a Customer</option>
          <option value="merchant">I am a Merchant</option>
        </select>

        <button
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
        >
          {loading ? "Creating account..." : "Signup"}
        </button>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600">
            Login
          </a>
        </p>
      </form>
    </div>
  );
}
