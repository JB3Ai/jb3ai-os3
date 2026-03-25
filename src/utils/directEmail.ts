export const DIRECT_LEADS_EMAIL = 'hi@jb3ai.com';

interface DirectEmailDraft {
  to?: string;
  subject: string;
  lines: string[];
}

const buildMailtoUrl = ({ to = DIRECT_LEADS_EMAIL, subject, lines }: DirectEmailDraft) => {
  const body = lines.filter(Boolean).join('\n');
  return `mailto:${encodeURIComponent(to)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
};

export const openDirectEmailDraft = (draft: DirectEmailDraft) => {
  if (typeof window === 'undefined') {
    return;
  }

  window.location.href = buildMailtoUrl(draft);
};
