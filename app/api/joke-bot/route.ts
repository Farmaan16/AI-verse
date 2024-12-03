import { NextResponse } from "next/server";
import { google } from "@ai-sdk/google";
import { generateText } from "ai";

export async function POST(req: Request) {
  try {
    const { input } = await req.json();

    if (!input || typeof input !== "string") {
      return NextResponse.json(
        { error: "Input is required and must be a string" },
        { status: 400 }
      );
    }

    const model = google("gemini-1.5-pro-latest");

    const { text } = await generateText({
      model,
      prompt: `Tell me a hilarious and witty joke about the following input: "${input}". Make it funny, clever, and guaranteed to make the person laugh.`,
    });

    return NextResponse.json({ joke: text });
  } catch (error) {
    console.error("Error generating joke:", error);
    return NextResponse.json(
      { error: "Failed to generate joke" },
      { status: 500 }
    );
  }
}
