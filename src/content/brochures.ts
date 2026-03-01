export const BROCHURES = {
    os3dash: "/documents/pdfs/jb3os3-dash-operating-system.pdf",
    mindcare: "/documents/pdfs/jb3mindcareai.pdf",
    shield: "/documents/pdfs/jb3shieldai.pdf",
    investigator: "/documents/pdfs/jb3investigatorai-dash.pdf",
    consulting: "/documents/pdfs/jb3consulting-accelerator.pdf",
    investment: "/documents/pdfs/jb3ai-investment-deck.pdf",
    voicegrid: "/documents/pdfs/jb3ai-os3-voice-grid.pdf",
} as const;

export type BrochureKey = keyof typeof BROCHURES;
