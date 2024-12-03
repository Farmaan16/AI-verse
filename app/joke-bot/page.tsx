"use client";

import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleJoke = async () => {
    if (!input.trim()) {
      setError("Please enter something to get a joke!");
      return;
    }

    setLoading(true);
    setError("");
    setJoke("");

    try {
      const response = await fetch("/api/joke", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      const data = await response.json();

      if (data.joke) {
        setJoke(data.joke);
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
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Jokeify
        </h1>
        <p className="text-center text-gray-600 mb-4">
          Give us any input and get a joke!
        </p>

        <input
          type="text"
          placeholder="Enter something to get a joke"
          value={input}
          onChange={handleInputChange}
          className="w-full p-3 mb-4 border text-black border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          disabled={loading}
        />

        <button
          onClick={handleJoke}
          disabled={loading}
          className="w-full p-3 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:bg-gray-400"
        >
          {loading ? "Getting Joke..." : "Tell Me a Joke!"}
        </button>

        {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        {joke && (
          <p className="mt-4 text-center text-xl font-bold text-blue-600">
            {joke}
          </p>
        )}
      </div>
    </div>
  );
}
