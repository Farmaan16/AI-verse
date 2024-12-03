"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleRoast = async () => {
    if (!input.trim()) {
      setError("Please enter something to roast!");
      return;
    }

    setLoading(true);
    setError("");
    setRoast("");

    try {
      const response = await fetch("/api/roast", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      const data = await response.json();

      if (data.roast) {
        setRoast(data.roast);
      } else {
        setError(data.error || "Something went wrong!");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-stone-800 to-black text-white">
      <div className="bg-gradient-to-r from-zinc-500 to-orange-600 p-8 rounded-xl shadow-lg w-full max-w-screen-sm">
        <h1 className="text-xl font-bold text-center text-gray-800 mb-6">
          test
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Give us any input and get roasted!
        </p>

        <input
          type="text"
          placeholder="Enter something to roast"
          value={input}
          onChange={handleInputChange}
          className="w-full p-3 mb-4 border bg-zinc-700 text-stone-100 border-stone-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500"
          disabled={loading}
        />

        <button
          onClick={handleRoast}
          disabled={loading}
          className="w-full  p-3 bg-red-500 text-white rounded-xl hover:bg-red-600 disabled:bg-gray-400"
        >
          {loading ? "Roasting..." : "Roast!"}
        </button>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {roast && (
          <p className="mt-4 text-center text-xl font-bold text-zinc-200">
            {roast}
          </p>
        )}
      </div>
    </div>
  );
}
