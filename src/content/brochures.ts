export const BROCHURES = {
    os3dash: "/documents/pdfs/jb3ai-dash-the-operating-system.pdf",
    mindcare: "/documents/pdfs/jb3ai-mindcareai-personal-support-and-growth.pdf",
    shield: "/documents/pdfs/jb3ai-shieldai-silent-protection.pdf",
    investigator: "/documents/pdfs/jb3ai-investigatorai-app-dash-v1.pdf",
    consulting: "/documents/pdfs/jb3ai-consulting-and-accelerator.pdf",
    investment: "/documents/pdfs/jb3ai-investment-deck-intelligence-in-motion.pdf",
    voicegrid: "/documents/pdfs/jb3ai-os3-voice-grid.pdf",
} as const;

export type BrochureKey = keyof typeof BROCHURES;
