"use client";

import { TriangleAlert, Clipboard } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [roast, setRoast] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  // Copy to clipboard function
  const handleCopy = () => {
    if (roast) {
      navigator.clipboard
        .writeText(roast)
        .then(() => {
          setCopySuccess(true);
          setTimeout(() => setCopySuccess(false), 2000); // Reset the copy success after 2 seconds
        })
        .catch(() => setError("Failed to copy to clipboard"));
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-stone-700 to-black text-white">
      <div className="bg-gradient-to-r from-zinc-600 to-stone-900 p-8 rounded-xl shadow-lg w-full max-w-screen-sm">
        <h1 className="text-3xl font-bold text-center text-orange-300 mb-6">
          Wanna get roasted?
        </h1>
        <p className="text-center text-orange-200 mb-4">
          Give us any input and get roasted!
        </p>

        <textarea
          placeholder="Enter something to roast"
          value={input}
          onChange={handleInputChange}
          className="w-full p-3 mb-4 border bg-zinc-700 text-stone-100 border-stone-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-200"
          disabled={loading}
        />

        <button
          onClick={handleRoast}
          disabled={loading}
          className="w-full p-3 text-stone-100 te rounded-xl bg-gradient-to-r from-orange-300 to-red-400 hover:bg-gradient-to-r hover:from-orange-400 hover:to-red-500 disabled:bg-gray-400"
        >
          {loading ? "Roasting..." : "Roast!"}
        </button>

        {error && (
          <p className="mt-4 text-white text-center font-semibold items-center flex justify-center">
            <TriangleAlert className="text-red-400 mx-2 mb-1" />
            {error}
          </p>
        )}

        {roast && (
          <div className="mt-4 p-4 bg-transparent border-2 border-stone-200 rounded-2xl relative">
            <h2 className="text-lg font-semibold text-stone-200">
              Your Roast:
            </h2>
            <button
              onClick={handleCopy}
              className="text-stone-300 hover:text-stone-100 absolute top-3 right-4"
              title="Copy to clipboard"
            >
              <Clipboard className="w-6 h-6" />
            </button>
            <div className="flex items-center justify-between mt-2">
              <p className="text-stone-100">{roast}</p>
            </div>
            {copySuccess && (
              <p className="text-green-400 text-sm mt-2">
                Copied to clipboard!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
