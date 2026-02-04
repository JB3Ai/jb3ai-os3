
export enum AppModule {
  // Informational Pages
  HOME = 'HOME',
  OS3_INFO = 'OS3_INFO',
  APPS_LIST = 'APPS_LIST',
  SERVICES_HUB = 'SERVICES_HUB',
  INVESTIGATOR_AI = 'INVESTIGATOR_AI',
  SHIELD_AI = 'SHIELD_AI',
  MINDCARE_AI = 'MINDCARE_AI',
  CONSULTING = 'CONSULTING',
  ACCELERATOR = 'ACCELERATOR',
  CONTACT = 'CONTACT',
  
  // Functional Workspace (OS³ Dash)
  WORKSPACE = 'WORKSPACE',
  NEURAL_CORE = 'NEURAL_CORE',
  MEDIA_LAB = 'MEDIA_LAB',
  MOTION_LAB = 'MOTION_LAB',
  CLIENT_ZONE = 'CLIENT_ZONE'
}

export interface VideoGenerationConfig {
  prompt: string;
  imageBytes?: string;
  imageMimeType?: string;
  aspectRatio: '16:9' | '9:16';
  resolution: '720p' | '1080p';
}

export interface GeneratedVideo {
  uri: string;
  mimeType: string;
}

declare global {
  interface AIStudio {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  }

  interface Window {
    aistudio?: AIStudio;
    webkitAudioContext: typeof AudioContext;
  }
}