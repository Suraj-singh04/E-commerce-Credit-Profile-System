// client/src/components/ScoreWidget.jsx
import { useEffect, useState } from "react";

export default function ScoreWidget({ customerId }) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  async function fetchScore() {
    if (!customerId) return;
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost:5000/api/customers/${customerId}/score`,
        {
          method: "POST",
        }
      );
      // endpoint returns score (modify if your endpoint differs)
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Score fetch failed", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchScore();
    // eslint-disable-next-line
  }, [customerId]);

  if (!customerId)
    return (
      <div className="p-4 bg-yellow-50 rounded">No customer signed in.</div>
    );
  if (loading)
    return <div className="p-4 bg-gray-50 rounded">Loading score…</div>;
  if (!data) return <div className="p-4 bg-gray-50 rounded">No score yet.</div>;

  const score = data.score ? data.score : 0;
  const level =
    data.level ?? (score >= 80 ? "High" : score <= 40 ? "Low" : "Medium");

  const color =
    score >= 80
      ? "text-green-600"
      : score <= 40
      ? "text-red-600"
      : "text-yellow-600";

  return (
    <div className="p-4 bg-white rounded shadow">
      <div className="flex items-center justify-between">
        <div>
          <div className={`text-2xl font-bold ${color}`}>
            Score: {Math.round(score)}
          </div>
          <div className="text-sm text-gray-500">Level: {level}</div>
        </div>
        <div>
          <div className="text-sm text-gray-600">Top reasons</div>
          <ul className="text-sm list-disc ml-5">
            {(data.reasons || []).slice(0, 3).map((r, i) => (
              <li key={i}>{r}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
