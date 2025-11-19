import { useState } from "react";
 import { useAuth } from "../contexts/AuthContext";
 import { useNavigate } from "react-router-dom";

 export default function Login() {
   const { setUser, setToken, setCustomerId } = useAuth();

   const navigate = useNavigate();
   const [form, setForm] = useState({
     email: "",
     password: "",
   });
   const [loading, setLoading] = useState(false);

   async function handleLogin(e) {
     e.preventDefault();
     setLoading(true);

     const res = await fetch("http://localhost:5000/api/auth/login", {
       method: "POST",
       headers: { "Content-Type": "application/json" },
       body: JSON.stringify(form),
     });

     const data = await res.json();
     setLoading(false);

     if (!res.ok) {
       alert(data.message || "Invalid login");
       return;
     }

     setToken(data.token);
     setUser(data.user);
     if (data.customerId) setCustomerId(data.customerId);

     // Redirect based on role
     if (data.user.role === "merchant") {
       navigate("/merchant/dashboard");
     } else {
       navigate("/demo/shop");
     }
   }

   return (
     <div className="min-h-screen flex justify-center items-center bg-gray-50">
       <form
         onSubmit={handleLogin}
         className="bg-white p-8 rounded-xl shadow-md w-full max-w-md"
       >
         <h2 className="text-3xl font-bold text-center mb-6 text-blue-600">
           Login
         </h2>

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

         <button
           disabled={loading}
           className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg transition"
         >
           {loading ? "Logging in..." : "Login"}
         </button>

         <p className="mt-4 text-center">
           Don’t have an account?{" "}
           <a href="/signup" className="text-blue-600">
             Signup
           </a>
         </p>
       </form>
     </div>
   );
 }
