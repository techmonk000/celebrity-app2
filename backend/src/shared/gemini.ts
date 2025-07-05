import axios from 'axios';

type GeminiResponse = {
  candidates?: { content?: { parts?: { text?: string }[] } }[];
};

export async function askGemini(prompt: string): Promise<string> {
  try {
    const res = await axios.post<GeminiResponse>(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`,
      {
        contents: [{ parts: [{ text: prompt }] }],
      },
    );

    return (
      res.data.candidates?.[0]?.content?.parts?.[0]?.text ||
      'No response from Gemini'
    );
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    console.error('Gemini API error:', errorMessage);
    return 'Error from Gemini';
  }
}
