import { setCustomerId } from "../utils/customer";

export default function CreateCustomer() {
  async function create() {
    const res = await fetch("http://localhost:5000/seed", {
      method: "POST",
    });
    const data = await res.json();

    setCustomerId(data.customer._id);

    alert("Customer created! ID saved.");
  }

  return (
    <div className="p-8">
      <h1>Create Test Customer</h1>
      <button onClick={create} className="bg-blue-600 text-white p-3 rounded">
        Create Customer & Save ID
      </button>
    </div>
  );
}
