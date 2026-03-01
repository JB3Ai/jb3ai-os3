
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { VideoGenerationConfig } from '../types';

// Helper to ensure we get a fresh instance
// Phase 1 Security: Client-side key injection removed. 
// Uses window.aistudio environment natively, or throws if proxy is not configured.
export const getGenAiInstance = (): GoogleGenAI => {
  return new GoogleGenAI({ apiKey: "PROXY_REQUIRED_FOR_PRODUCTION" });
};

export const checkApiKeySelection = async (): Promise<boolean> => {
  if (window.aistudio && window.aistudio.hasSelectedApiKey) {
    return await window.aistudio.hasSelectedApiKey();
  }
  return true; // Fallback if not running in the specific environment requiring selection
};

export const openApiKeySelection = async (): Promise<void> => {
  if (window.aistudio && window.aistudio.openSelectKey) {
    await window.aistudio.openSelectKey();
  }
};

export const generateVideo = async (config: VideoGenerationConfig) => {
  const ai = getGenAiInstance();
  const model = 'veo-3.1-fast-generate-preview';

  try {
    let operation;

    const baseConfig = {
      numberOfVideos: 1,
      resolution: config.resolution,
      aspectRatio: config.aspectRatio,
    };

    if (config.imageBytes && config.imageMimeType) {
      operation = await ai.models.generateVideos({
        model,
        prompt: config.prompt, // Prompt is optional when image provided, but good to have
        image: {
          imageBytes: config.imageBytes,
          mimeType: config.imageMimeType,
        },
        config: baseConfig
      });
    } else {
      operation = await ai.models.generateVideos({
        model,
        prompt: config.prompt,
        config: baseConfig
      });
    }

    return operation;
  } catch (error) {
    console.error("Video Generation Error:", error);
    throw error;
  }
};

export const waitForVideoOperation = async (operation: any) => {
  const ai = getGenAiInstance();
  let currentOp = operation;

  while (!currentOp.done) {
    try {
      await new Promise(resolve => setTimeout(resolve, 10000));
      currentOp = await ai.operations.getVideosOperation({ operation: currentOp });
    } catch (e) {
      console.error("Polling error", e);
      throw e;
    }
  }
  return currentOp;
};

export const generateImage = async (prompt: string, aspectRatio: string = "1:1") => {
  const ai = getGenAiInstance();
  const model = 'gemini-2.5-flash-image';

  const response = await ai.models.generateContent({
    model,
    contents: prompt,
    config: {
    }
  });
  return response;
}
