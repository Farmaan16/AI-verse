// app/flirt/page.tsx

"use client";

import { TriangleAlert, Clipboard } from "lucide-react";
import { useState } from "react";

export default function FlirtPage() {
  const [input, setInput] = useState("");
  const [flirt, setFlirt] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
  };

  const handleFlirtRequest = async () => {
    if (!input.trim()) {
      setError("Please enter something to flirt with!");
      return;
    }

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

      if (data.flirt) {
        setFlirt(data.flirt);
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
    if (flirt) {
      navigator.clipboard
        .writeText(flirt)
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
        <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-pink-400 to-blue-500  fr mb-6">
          Need Some Rizz?
        </h1>
        <p className="text-center text-indigo-400 mb-4">
          Give us something to flirt with, and we&apos;ll reply with some smooth
          lines!
        </p>

        <textarea
          placeholder="Enter something to get a flirtatious response..."
          value={input}
          onChange={handleInputChange}
          className="w-full p-3 mb-4 border bg-zinc-700 text-stone-100 border-stone-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-200"
          disabled={loading}
        />

        <button
          onClick={handleFlirtRequest}
          disabled={loading}
          className="w-full p-3 text-stone-100 rounded-xl bg-gradient-to-r from-indigo-300 to-blue-700 hover:bg-gradient-to-r hover:from-indigo-400 hover:to-blue-900 disabled:bg-gray-400"
        >
          {loading ? "Generating..." : "Flirt Me"}
        </button>

        {error && (
          <p className="mt-4 text-white text-center font-semibold items-center flex justify-center">
            <TriangleAlert className="text-red-400 mx-2 mb-1" />
            {error}
          </p>
        )}

        {flirt && (
          <div className="mt-4 p-4 bg-transparent border-2 border-stone-200 rounded-2xl relative">
            <h2 className="text-lg font-semibold text-stone-200">
              Your Flirt:
            </h2>
            <button
              onClick={handleCopy}
              className="text-stone-300 hover:text-stone-100 absolute top-3 right-4"
              title="Copy to clipboard"
            >
              <Clipboard className="w-6 h-6" />
            </button>
            <div className="flex items-center justify-between mt-2">
              <p className="text-stone-100">{flirt}</p>
            </div>
            {copySuccess && (
              <p className="text-green-400 text-sm font-semibold mt-2">
                Copied to clipboard!
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
