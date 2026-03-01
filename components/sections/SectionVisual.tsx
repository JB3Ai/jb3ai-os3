
import React, { useEffect, useRef, useState } from 'react';

type SectionVisualProps = {
  videoSrc?: string;
  imageSrc: string;
  label?: string;
  className?: string;
};

export default function SectionVisual({
  videoSrc,
  imageSrc,
  label,
  className = "",
}: SectionVisualProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video && videoSrc) {
      video.defaultMuted = true;
      video.muted = true;

      const handlePlaying = () => {
        console.log("[SectionVisual] Video started playing");
        setIsPlaying(true);
      };

      const handleError = (e: any) => {
        console.error("[SectionVisual] Video error:", e);
      };

      video.addEventListener('playing', handlePlaying);
      video.addEventListener('error', handleError);

      const attemptPlay = async () => {
        try {
          await video.play();
        } catch (err) {
          console.warn("[SectionVisual] Video autoplay prevented:", err);
          // Retry once with interaction if needed, or just leave it (fallback image will show)
        }
      };

      if (video.readyState >= 3) {
        attemptPlay();
      } else {
        video.addEventListener('canplay', attemptPlay, { once: true });
      }

      return () => {
        video.removeEventListener('playing', handlePlaying);
        video.removeEventListener('error', handleError);
      };
    }
  }, [videoSrc]);

  return (
    <section className={`relative w-full my-24 ${className}`}>
      {label ? (
        <div className="absolute top-4 left-4 text-[10px] tracking-widest uppercase opacity-40 z-20 pointer-events-none">
          {label}
        </div>
      ) : null}

      <div className="relative w-full aspect-video overflow-hidden rounded-2xl bg-black">
        {/* Fallback image - Always rendered, stays until video is playing (if opaque) or behind video (if transparent) */}
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover z-0"
          loading="lazy"
        />

        {/* Video Layer */}
        {videoSrc ? (
          <div
            className={`absolute inset-0 pointer-events-none z-10 transition-opacity duration-1000 ${isPlaying ? 'opacity-100' : 'opacity-0'}`}
          >
            <video
              key={videoSrc}
              ref={videoRef}
              className="w-full h-full object-cover"
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
            >
              <source src={videoSrc} type="video/webm" />
            </video>
          </div>
        ) : null}

        {/* Vignette Overlay - z-20 */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-black/25 z-20" />
      </div>
    </section>
  );
}
