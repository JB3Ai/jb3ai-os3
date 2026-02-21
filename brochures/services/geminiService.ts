
import { GoogleGenAI } from "@google/genai";

export const analyzeBrochureContent = async (text: string): Promise<string> => {
  try {
    // Fix: Create a new GoogleGenAI instance right before making an API call to ensure it uses the most up-to-date API key.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Analyze the following brochure content and provide a concise summary, key highlights, and target audience insights. Format the response with clear headings in Markdown: \n\n${text}`,
    });
    return response.text || 'No analysis could be generated.';
  } catch (error) {
    console.error('Gemini API Error:', error);
    return 'Error analyzing content. Please check your API configuration.';
  }
};

export const generateBrochureCopy = async (prompt: string): Promise<string> => {
  try {
    // Fix: Create a new GoogleGenAI instance right before making an API call to ensure it uses the most up-to-date API key.
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: `Generate professional, high-converting copy for a PDF brochure based on this request: ${prompt}. Include a catchy title, compelling headlines, and clear sections.`,
    });
    return response.text || 'Failed to generate copy.';
  } catch (error) {
    console.error('Gemini API Error:', error);
    return 'Error generating copy.';
  }
};
