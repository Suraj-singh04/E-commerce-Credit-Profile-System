import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import "./index.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Placeholder pages for now */}
        <Route
          path="/demo/shop"
          element={<h2 className="p-10 text-center">Demo Shop coming soon</h2>}
        />
        <Route
          path="/merchant/login"
          element={
            <h2 className="p-10 text-center">Merchant Login coming soon</h2>
          }
        />
      </Routes>
    </Router>
  );
}
