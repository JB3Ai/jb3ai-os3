
import { GoogleGenAI } from "@google/genai";

// Azure OpenAI failsafe
const azureEndpoint = (process.env.AZURE_OPENAI_ENDPOINT || '').replace(/\/$/, '');
const azureKey = process.env.AZURE_OPENAI_KEY || '';
const azureDeployment = process.env.AZURE_OPENAI_DEPLOYMENT || 'gpt-4o';

async function azureChat(systemPrompt: string, userPrompt: string): Promise<string> {
  if (!azureEndpoint || !azureKey) throw new Error('Azure OpenAI not configured');
  const url = `${azureEndpoint}/openai/deployments/${azureDeployment}/chat/completions?api-version=${process.env.AZURE_OPENAI_API_VERSION || '2025-01-01-preview'}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'api-key': azureKey },
    body: JSON.stringify({
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.5,
      max_tokens: 2000
    }),
  });
  if (!res.ok) throw new Error(`Azure OpenAI ${res.status}: ${await res.text()}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || '';
}

export const analyzeBrochureContent = async (text: string): Promise<string> => {
  const userPrompt = `Analyze the following brochure content and provide a concise summary, key highlights, and target audience insights. Format the response with clear headings in Markdown: \n\n${text}`;

  // Primary: Gemini
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: userPrompt,
    });
    return response.text || 'No analysis could be generated.';
  } catch (geminiErr) {
    console.warn('[Brochures] Gemini failed, falling back to Azure OpenAI:', geminiErr);
  }

  // Fallback: Azure OpenAI
  try {
    return await azureChat(
      'You are a marketing analyst. Format your response with clear Markdown headings.',
      userPrompt
    );
  } catch (azureErr) {
    console.error('[Brochures] Azure also failed:', azureErr);
    return 'Error analyzing content. Both AI providers are currently unavailable.';
  }
};

export const generateBrochureCopy = async (prompt: string): Promise<string> => {
  const userPrompt = `Generate professional, high-converting copy for a PDF brochure based on this request: ${prompt}. Include a catchy title, compelling headlines, and clear sections.`;

  // Primary: Gemini
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: userPrompt,
    });
    return response.text || 'Failed to generate copy.';
  } catch (geminiErr) {
    console.warn('[Brochures] Gemini failed, falling back to Azure OpenAI:', geminiErr);
  }

  // Fallback: Azure OpenAI
  try {
    return await azureChat(
      'You are a professional copywriter specializing in high-converting PDF brochures.',
      userPrompt
    );
  } catch (azureErr) {
    console.error('[Brochures] Azure also failed:', azureErr);
    return 'Error generating copy. Both AI providers are currently unavailable.';
  }
};
