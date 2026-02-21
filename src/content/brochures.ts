export const BROCHURES = {
    os3dash: "/brochures/jb3os3-dash-operating-system.pdf",
    mindcare: "/brochures/jb3mindcareai.pdf",
    shield: "/brochures/jb3shieldai.pdf",
    investigator: "/brochures/jb3investigatorai-dash.pdf",
    consulting: "/brochures/jb3consulting-accelerator.pdf",
    investment: "/brochures/jb3ai-investment-deck.pdf",
} as const;

export type BrochureKey = keyof typeof BROCHURES;
