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
  return (
    <section className={`relative w-full my-24 ${className}`}>
      {label ? (
        <div className="absolute top-4 left-4 text-[10px] tracking-widest uppercase opacity-40">
          {label}
        </div>
      ) : null}

      <div className="relative w-full aspect-video overflow-hidden rounded-2xl">
        {/* Fallback image loads instantly */}
        <img
          src={imageSrc}
          alt=""
          className="absolute inset-0 w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />

        {/* Video overlays when available */}
        {videoSrc ? (
          <video
            className="absolute inset-0 w-full h-full object-cover opacity-85 pointer-events-none"
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : null}

        {/* Subtle vignette, optional */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/10 via-transparent to-black/25" />
      </div>
    </section>
  );
}
