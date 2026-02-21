import React from "react";
import { BROCHURES, BrochureKey } from "../content/brochures";

export default function BrochureButton({
    k,
    label = "Download brochure (PDF)",
    className = "",
}: {
    k?: BrochureKey;          // omit if no PDF yet
    label?: string;
    className?: string;
}) {
    if (!k) {
        return (
            <button
                disabled
                className={
                    "inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-[10px] tracking-[0.18em] uppercase opacity-40 cursor-not-allowed " +
                    className
                }
            >
                Brochure coming soon
            </button>
        );
    }

    return (
        <a
            href={BROCHURES[k]}
            target="_blank"
            rel="noopener noreferrer"
            className={
                "inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-5 py-3 text-[12px] tracking-[0.18em] uppercase hover:bg-white/10 transition-all " +
                className
            }
        >
            {label}
        </a>
    );
}
