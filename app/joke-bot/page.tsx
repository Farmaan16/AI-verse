"use client";

import { useState } from "react";
import { TriangleAlert, Clipboard } from "lucide-react";

export default function Home() {
  const [input, setInput] = useState("");
  const [joke, setJoke] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [copySuccess, setCopySuccess] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

  // Copy to clipboard function
  const handleCopy = () => {
    if (joke) {
      navigator.clipboard
        .writeText(joke)
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
        <h1 className="text-3xl font-bold text-center bg-clip-text text-transparent bg-gradient-to-r from-green-300 to-blue-600 mb-6">
          Need a Laugh ?
        </h1>
        <p className="text-center text-blue-200 mb-4">
          Give us a topic, and we&apos;ll hit you with a joke that&apos;ll crack
          you up!
        </p>

        <textarea
          placeholder="Enter something to get a joke"
          value={input}
          onChange={handleInputChange}
          className="w-full p-3 mb-4 border bg-zinc-700 text-stone-100 border-stone-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-stone-200"
          disabled={loading}
        />

        <button
          onClick={handleJoke}
          disabled={loading}
          className="w-full p-3 text-stone-100 rounded-xl bg-gradient-to-r from-green-300 to-blue-600 hover:bg-gradient-to-r hover:from-green-400 hover:to-blue-700 disabled:bg-gray-400"
        >
          {loading ? (
            <span className="animate-shake">Getting Joke...</span>
          ) : (
            "Tell Me a Joke!"
          )}
        </button>

        {error && (
          <p className="mt-4 text-white text-center font-semibold items-center flex justify-center">
            <TriangleAlert className="text-red-400 mx-2 mb-1" />
            {error}
          </p>
        )}

        {joke && (
          <div className="mt-4 p-4 bg-transparent border-2 border-stone-200 rounded-2xl relative">
            <h2 className="text-lg font-semibold text-stone-200">Your Joke:</h2>
            <button
              onClick={handleCopy}
              className="text-stone-300 hover:text-stone-100 absolute top-3 right-4"
              title="Copy to clipboard"
            >
              <Clipboard className="w-6 h-6" />
            </button>
            <div className="flex items-center justify-between mt-2">
              <p className="text-stone-100">{joke}</p>
            </div>
            {copySuccess && (
              <p className="text-green-400 font-semibold text-sm mt-2">
                Copied to clipboard!
              </p> 
            )}
          </div>
        )}
      </div>
    </div>
  );
}
