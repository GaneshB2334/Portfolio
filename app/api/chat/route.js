import { NextResponse } from 'next/server';

export async function POST(req) {
  const apiKey = process.env.GEMINI_API_KEY;
  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  try {
    const { prompt } = await req.json();

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{ text: prompt }],
        }],
      }),
    });

    if (!response.ok) {
        const errorData = await response.json();
        return new NextResponse(JSON.stringify({ error: errorData.error?.message || response.statusText }), {
            status: response.status,
            headers: { 'Content-Type': 'application/json' }
        });
    }

    const data = await response.json();

    // Extract generated text (adjust path as needed)
    const generatedText = data.candidates && data.candidates.length > 0
        ? data.candidates[0].content.parts[0].text
        : "No response from Gemini."; // Provide a default message

    return new NextResponse(JSON.stringify({ response: generatedText }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    console.error('Error generating content:', error);
    return new NextResponse(JSON.stringify({ error: "An error occurred." }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
    });
  }
}