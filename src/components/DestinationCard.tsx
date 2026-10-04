import { Link } from "@tanstack/react-router";
import { ArrowUpRight, GraduationCap } from "lucide-react";
import type { Destination } from "@/lib/destinations";
import { track } from "@/lib/site";

export function DestinationCard({
  d,
  className = "",
  style,
}: {
  d: Destination;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <Link
      to="/destinations/$slug"
      params={{ slug: d.slug }}
      onClick={() => track("destination_click", { country: d.name })}
      style={style}
      className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card shadow-card transition-all duration-500 ease-out hover:-translate-y-2 hover:border-accent/40 hover:shadow-[0_22px_45px_-12px_rgba(25,35,80,0.18)] ${className}`}
    >
      {/* Top golden-accent line on hover */}
      <div className="absolute inset-x-0 top-0 z-20 h-1 bg-gradient-to-r from-gold via-accent to-gold opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      {/* Image Container with Shimmer & Zoom */}
      <div>
        <div className="relative aspect-[4/3] overflow-hidden bg-muted">
          <img
            src={d.image}
            alt={d.imageAlt}
            loading="lazy"
            width={1024}
            height={768}
            className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
          />

          {/* Vignette Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-40" />

          {/* Floating Glassmorphic Capital Badge */}
          <div className="absolute top-3 right-3 z-10 flex items-center gap-1 rounded-full border border-white/20 bg-background/85 px-2.5 py-1 text-[11px] font-semibold text-primary shadow-sm backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
            <span>📍</span> {d.capital}
          </div>

          {/* Floating Flag & Country tag on image bottom */}
          <div className="absolute bottom-3 left-3 z-10 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/40 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md">
            <span className="text-base leading-none">{d.flag}</span>
            <span>{d.name}</span>
          </div>

          {/* Interactive Light Beam Shine Sweep */}
          <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-1000 ease-in-out group-hover:translate-x-full" />
        </div>

        {/* Card Body */}
        <div className="p-5">
          <div className="flex items-center justify-between">
            <h3 className="font-display text-xl font-bold tracking-tight text-primary transition-colors duration-300 group-hover:text-accent">
              {d.name}
            </h3>
            <span className="text-2xl transition-transform duration-300 group-hover:scale-125">
              {d.flag}
            </span>
          </div>

          <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-muted-foreground">
            {d.tagline}
          </p>

          {/* Study Badges */}
          <div className="mt-4 flex flex-wrap gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-md bg-sky px-2 py-0.5 text-[11px] font-medium text-accent">
              <GraduationCap className="h-3 w-3" />
              Bachelor's • Master's
            </span>
            {d.tuition && (
              <span className="inline-block rounded-md bg-gold/15 px-2 py-0.5 text-[11px] font-medium text-primary">
                From {d.tuition.split(" ")[0]}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Interactive Bottom Action Bar */}
      <div className="px-5 pb-5 pt-0">
        <div className="flex items-center justify-between rounded-xl border border-border/60 bg-muted/50 px-3.5 py-2.5 text-xs font-semibold text-primary transition-all duration-300 group-hover:border-accent group-hover:bg-primary group-hover:text-primary-foreground group-hover:shadow-sm">
          <span>Explore Study in {d.name}</span>
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
        </div>
      </div>
    </Link>
  );
}
