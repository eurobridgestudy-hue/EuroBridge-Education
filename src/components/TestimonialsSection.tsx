import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Star, CheckCircle2, ArrowRight, Quote } from "lucide-react";
import { testimonials } from "@/lib/site";
import { SectionHeading } from "@/components/site";

export function TestimonialsSection() {
  const [selectedCountry, setSelectedCountry] = useState<string>("all");

  const countryFilterOptions = [
    { slug: "all", label: `All Stories (${testimonials.length})` },
    { slug: "malta", label: "Malta 🇲🇹" },
    { slug: "serbia", label: "Serbia 🇷🇸" },
    { slug: "lithuania", label: "Lithuania 🇱🇹" },
    { slug: "romania", label: "Romania 🇷🇴" },
    { slug: "latvia", label: "Latvia 🇱🇻" },
    { slug: "slovakia", label: "Slovakia 🇸🇰" },
  ];

  const filteredTestimonials =
    selectedCountry === "all"
      ? testimonials
      : testimonials.filter((t) => t.countrySlug === selectedCountry);

  return (
    <section className="bg-muted/40 py-14 sm:py-20 md:py-24 border-y border-border/60">
      <div className="container-x">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <SectionHeading
            eyebrow="Student Stories"
            title="Real Journeys. Trusted Results."
            intro="Read how Indian students successfully navigated their admissions and study visa processes with EuroBridge Education."
          />
          <div className="flex items-center gap-2 self-start md:self-auto">
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3.5 py-1.5 text-xs font-semibold text-emerald-600 shadow-xs">
              <CheckCircle2 className="h-4 w-4" /> 100% Verified Student Feedback
            </span>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="mt-6 sm:mt-8 flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:flex-wrap">
          {countryFilterOptions.map((opt) => (
            <button
              key={opt.slug}
              onClick={() => setSelectedCountry(opt.slug)}
              className={`shrink-0 whitespace-nowrap rounded-full px-3.5 sm:px-4 py-1.5 text-xs font-semibold transition-all ${
                selectedCountry === opt.slug
                  ? "bg-primary text-primary-foreground shadow-xs"
                  : "border border-border/80 bg-card text-muted-foreground hover:bg-muted hover:text-primary"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Testimonials Cards Grid */}
        <div className="mt-8 sm:mt-10 grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredTestimonials.map((t) => (
            <div
              key={t.name + t.countrySlug}
              className="group relative flex flex-col justify-between overflow-hidden rounded-3xl border border-border/80 bg-card p-5 sm:p-7 shadow-xs transition-all duration-200 hover:border-gold/50 hover:shadow-card hover:-translate-y-1"
            >
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accent/0 via-gold to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity" />
              <div>
                <div className="flex items-center justify-between">
                  <div className="flex text-amber-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium text-primary shadow-xs">
                    <span>{t.fromFlag}</span>
                    <span>→</span>
                    <span>{t.toFlag}</span>
                    <span className="font-semibold">{t.to}</span>
                  </span>
                </div>
                <blockquote className="mt-4 text-sm leading-relaxed text-foreground italic">
                  “{t.quote}”
                </blockquote>
              </div>
              <div className="mt-6 flex items-center justify-between border-t border-border/60 pt-4">
                <div>
                  <p className="font-display font-bold text-primary">{t.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.course ? t.course : `Student in ${t.to}`}
                  </p>
                </div>
                <Link
                  to="/destinations/$slug"
                  params={{ slug: t.countrySlug }}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
                >
                  <span>Explore {t.to}</span>
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
