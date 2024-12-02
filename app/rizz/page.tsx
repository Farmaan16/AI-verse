// app/flirt/page.tsx

"use client";

import { useState } from "react";

export default function FlirtPage() {
  const [input, setInput] = useState("");
  const [flirt, setFlirt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleFlirtRequest = async () => {
    if (!input.trim()) return;

    setLoading(true);
    setError("");
    setFlirt("");

    try {
      const response = await fetch("/api/rizz", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      const data = await response.json();

      if (response.ok) {
        setFlirt(data.flirt);
      } else {
        setError(data.error || "Failed to fetch response.");
      }
    } catch (error) {
      setError("An error occurred while trying to generate the flirt.");
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold text-center mb-6 text-indigo-600">
        Need Some Rizz?
      </h1>

      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <textarea
          className="w-full p-3 border-2 border-gray-300 rounded-md mb-4"
          placeholder="Enter something to get a flirtatious response..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          rows={4}
        />

        <button
          className="w-full bg-indigo-600 text-white p-3 rounded-md hover:bg-indigo-700 transition"
          onClick={handleFlirtRequest}
          disabled={loading}
        >
          {loading ? "Generating..." : "Flirt Me"}
        </button>

        {error && <div className="text-red-600 mt-4">{error}</div>}

        {flirt && (
          <div className="mt-4 p-4 bg-indigo-50 border-2 border-indigo-200 rounded-md">
            <h2 className="text-lg font-semibold text-indigo-800">
              Your Flirt:
            </h2>
            <p className="mt-2 text-indigo-600">{flirt}</p>
          </div>
        )}
      </div>
    </div>
  );
}
