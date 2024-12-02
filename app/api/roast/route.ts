import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

// Handler for the POST request
export async function POST(req: Request) {
  try {
    // Get the input from the request body
    const { input } = await req.json();

    // Validate that input exists and is a string
    if (!input || typeof input !== "string") {
      console.error("Invalid input:", input);
      return NextResponse.json(
        { error: "Input is required and must be a string" },
        { status: 400 }
      );
    }

    // Log the input for debugging purposes
    console.log("Received input:", input);

    // Retrieve the API key from environment variables (GEMINI_API_KEY)
    const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

    // Check if the API key is missing
    if (!apiKey) {
      console.error("API Key is missing!");
      return NextResponse.json(
        { error: "API key is missing" },
        { status: 500 }
      );
    }

    // Set up the Google Generative AI model
    const model = google("gemini-1.5-pro-latest"); // No need to pass the apiKey here

    // Generate the roast using the Google model
    const { text } = await generateText({
      model,
      prompt: `Give me the most savage, brutal, and uncensored roast of the following input: "${input}". Don't hold back—make it as cruel and humiliating as possible in 2-3 lines, no politeness, no filters,use abusive language, leave no mercy.`,
    });

    // Return the roast as a JSON response
    return NextResponse.json({ roast: text });
  } catch (error) {
    // Handle any errors during the process
    console.error("Error generating roast:", error);
    return NextResponse.json(
      { error: "Failed to generate roast" },
      { status: 500 }
    );
  }
}
