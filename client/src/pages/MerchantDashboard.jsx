// client/src/pages/MerchantDashboard.jsx
import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function MerchantDashboard() {
  const { token, user } = useAuth();
  const [summary, setSummary] = useState(null);
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(0);
  const pageSize = 20;

  useEffect(() => {
    if (!token) return;
    fetchSummary();
    fetchCustomers();
    // eslint-disable-next-line
  }, [token, page]);

  async function fetchSummary() {
    setLoading(true);
    try {
      const res = await fetch(
        "http://localhost:5000/api/merchants/demo-store/dashboard",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const json = await res.json();
      setSummary(json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function fetchCustomers() {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/merchants/demo-store/customers?skip=${
          page * pageSize
        }&limit=${pageSize}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const json = await res.json();
      setCustomers(json.customers || json);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function doAction(customerId, action) {
    if (!confirm(`Perform "${action}" on this customer?`)) return;
    try {
      const body = { action, reason: "merchant_decision" };
      const res = await fetch(
        `http://localhost:5000/api/merchants/demo-store/customers/${customerId}/action`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );
      if (!res.ok) throw new Error("Action failed");
      alert("Action recorded");
      fetchCustomers();
    } catch (err) {
      alert(err.message || "Failed");
    }
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Merchant Dashboard</h1>
      {loading && <div className="mb-4">Loading…</div>}

      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Total Customers</div>
          <div className="text-2xl font-bold">
            {summary?.totalCustomers ?? "—"}
          </div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Average Score</div>
          <div className="text-2xl font-bold">
            {summary?.avgScore?.toFixed?.(1) ?? "—"}
          </div>
        </div>
        <div className="p-4 bg-white rounded shadow">
          <div className="text-sm text-gray-500">Risk Distribution</div>
          <div className="text-sm">
            Low: {summary?.buckets?.lowRisk ?? 0} • Medium:{" "}
            {summary?.buckets?.mediumRisk ?? 0} • High:{" "}
            {summary?.buckets?.highRisk ?? 0}
          </div>
        </div>
      </div>

      <div className="bg-white rounded shadow">
        <table className="w-full text-left">
          <thead className="border-b">
            <tr>
              <th className="p-3">Name</th>
              <th>Score</th>
              <th>Risk</th>
              <th>Last Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {customers.map((c) => (
              <tr key={c._id} className="border-b hover:bg-gray-50">
                <td className="p-3">{c.name || c.email}</td>
                <td className="p-3 font-bold">
                  {Math.round(c.lastScore ?? c.score ?? 0)}
                </td>
                <td className="p-3">
                  {(c.lastScore ?? c.score) >= 75 ? (
                    <span className="text-green-600">Low</span>
                  ) : (c.lastScore ?? c.score) >= 50 ? (
                    <span className="text-yellow-600">Medium</span>
                  ) : (
                    <span className="text-red-600">High</span>
                  )}
                </td>
                <td className="p-3">
                  {new Date(c.lastActive || c.createdAt).toLocaleString()}
                </td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button
                      onClick={() => doAction(c._id, "approve")}
                      className="px-2 py-1 bg-green-600 text-white rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => doAction(c._id, "require_deposit")}
                      className="px-2 py-1 bg-amber-400 rounded"
                    >
                      Require Deposit
                    </button>
                    <button
                      onClick={() => doAction(c._id, "hold")}
                      className="px-2 py-1 bg-red-600 text-white rounded"
                    >
                      Hold
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setPage((p) => Math.max(0, p - 1))}
          className="px-3 py-1 border rounded"
        >
          Prev
        </button>
        <div>Page {page + 1}</div>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 border rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}
