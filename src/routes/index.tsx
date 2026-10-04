import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check, Quote, Star, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";
import hero from "@/assets/hero.jpg";
import { destinations } from "@/lib/destinations";
import { services, steps, audiences, whyEurope, faqs } from "@/lib/site";
import {
  ConsultButton,
  WhatsAppButton,
  SectionHeading,
  FaqList,
  ConsultCTA,
  EnquiryForm,
} from "@/components/site";
import { DestinationCard } from "@/components/DestinationCard";
import { ServiceIcon } from "@/components/ServiceIcon";
import { Explorer } from "@/components/Explorer";
import { TestimonialsSection } from "@/components/TestimonialsSection";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Study in Europe from India | EuroBridge Education" },
      {
        name: "description",
        content:
          "EuroBridge Education guides Indian students exploring study in Malta, Romania, Bulgaria, Slovenia, Serbia, Slovakia, Latvia and Lithuania — from course selection to visa guidance.",
      },
      { property: "og:title", content: "Study in Europe from India | EuroBridge Education" },
      {
        property: "og:description",
        content: "Guidance on European courses, admissions and study visas for Indian students.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink text-ink-foreground">
        <img
          src={hero}
          alt="Indian student walking through a historic European university courtyard"
          width={1600}
          height={1104}
          className="absolute inset-0 h-full w-full object-cover object-[70%_center]"
        />
        <div className="absolute inset-0 bg-hero-overlay" />
        {/* Soft radial ambient glow */}
        <div className="pointer-events-none absolute -left-20 top-1/4 h-96 w-96 rounded-full bg-gold/10 blur-3xl" />
        <div className="pointer-events-none absolute right-10 bottom-10 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />

        <div className="container-x relative flex min-h-[82vh] flex-col justify-center py-24">
          <div className="animate-rise">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-4 py-1.5 text-xs font-semibold tracking-wider text-gold backdrop-blur-md shadow-xs">
              <span className="h-1.5 w-1.5 rounded-full bg-gold animate-ping" />
              ADMISSIONS OPEN FOR 2026 & 2027 INTAKES · INDIA TO EUROPE
            </span>
          </div>
          <h1
            className="mt-6 max-w-2xl text-5xl font-extrabold leading-[1.04] md:text-7xl animate-rise tracking-tight"
            style={{ animationDelay: "80ms" }}
          >
            Your Journey to{" "}
            <span className="bg-gradient-to-r from-white via-amber-200 to-amber-400 bg-clip-text text-transparent">
              Europe
            </span>{" "}
            Starts Here
          </h1>
          <p
            className="mt-6 max-w-xl text-lg text-ink-foreground/85 leading-relaxed animate-rise"
            style={{ animationDelay: "160ms" }}
          >
            EuroBridge Education guides Indian students exploring higher education across eight
            European destinations — with transparent course selection, university admissions, and
            step-by-step study visa guidance.
          </p>
          <div
            className="mt-9 flex flex-wrap gap-4 animate-rise items-center"
            style={{ animationDelay: "240ms" }}
          >
            <ConsultButton location="hero" className="px-7 py-3.5 text-base" />
            <WhatsAppButton location="hero" variant="ghostLight" className="px-7 py-3.5 text-base" />
          </div>

          <div
            className="mt-6 flex flex-wrap items-center gap-5 text-xs text-ink-foreground/75 animate-rise"
            style={{ animationDelay: "300ms" }}
          >
            <span className="flex items-center gap-1.5">
              <span className="text-gold font-bold">✓</span> Free Profile Assessment
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-gold font-bold">✓</span> Transparent University Guidance
            </span>
            <span className="flex items-center gap-1.5">
              <span className="text-gold font-bold">✓</span> Direct Punjab & India Support
            </span>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-2 pt-4 border-t border-white/10">
            <span className="text-xs font-semibold uppercase tracking-wider text-gold/90 mr-1.5">
              Destinations:
            </span>
            {destinations.map((d) => (
              <Link
                key={d.slug}
                to="/destinations/$slug"
                params={{ slug: d.slug }}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3.5 py-1.5 text-xs font-medium text-white backdrop-blur-md transition-all hover:scale-105 hover:bg-white/20 hover:border-gold/50 shadow-xs"
              >
                <span>{d.flag}</span>
                <span>{d.name}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* INTRO */}
      <section className="container-x grid gap-12 py-24 md:grid-cols-2 md:items-center">
        <SectionHeading
          eyebrow="About EuroBridge"
          title="Guidance for Your European Education Journey"
        />
        <div className="space-y-5 text-lg text-muted-foreground">
          <p>
            From exploring courses and destinations to preparing applications and understanding the
            visa process, we help you approach each step with clarity.
          </p>
          <ul className="space-y-3 text-base">
            {[
              "Honest, transparent guidance — no guarantees we can't keep",
              "Focused on eight European destinations",
              "Support for Class 12, Bachelor's and Master's applicants",
            ].map((t) => (
              <li key={t} className="flex gap-3 text-foreground">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                {t}
              </li>
            ))}
          </ul>
          <Link
            to="/about"
            className="inline-flex items-center gap-1 text-base font-semibold text-accent"
          >
            More about us <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="bg-muted py-24">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading
              eyebrow="Study destinations"
              title="Eight countries. One clear path."
              intro="Explore the European destinations we currently guide students for."
            />
            <Link to="/destinations" className="text-sm font-semibold text-accent">
              View all destinations →
            </Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {destinations.map((d, i) => (
              <DestinationCard
                key={d.slug}
                d={d}
                className="animate-rise"
                style={{ animationDelay: `${i * 60}ms` }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* WHY EUROPE */}
      <section className="bg-ink py-24 text-ink-foreground">
        <div className="container-x">
          <SectionHeading
            light
            eyebrow="Why Europe?"
            title="Why students consider Europe"
            intro="Every student's reasons are different. Here are some themes many find appealing."
          />
          <div className="mt-14 grid gap-px overflow-hidden rounded-2xl bg-ink-foreground/10 sm:grid-cols-2 lg:grid-cols-3">
            {whyEurope.map((w, i) => (
              <div key={w.title} className="bg-ink p-8">
                <span className="font-display text-sm text-gold">0{i + 1}</span>
                <h3 className="mt-3 text-xl font-semibold">{w.title}</h3>
                <p className="mt-2 text-ink-foreground/70">{w.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SERVICES */}
      <section className="container-x py-24">
        <SectionHeading
          eyebrow="Our services"
          title="Guidance at every stage"
          intro="Choose the support you need — or let us guide you end to end."
        />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((s) => (
            <div
              key={s.title}
              className="rounded-2xl border border-border bg-card p-6 transition-shadow hover:shadow-card"
            >
              <ServiceIcon name={s.icon} className="h-7 w-7 text-accent" />
              <h3 className="mt-5 font-semibold text-primary">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
            </div>
          ))}
        </div>
        <Link
          to="/services"
          className="mt-8 inline-flex items-center gap-1 text-sm font-semibold text-accent"
        >
          Learn more about our services <ArrowRight className="h-4 w-4" />
        </Link>
      </section>

      {/* HOW IT WORKS */}
      <section className="bg-sky py-24">
        <div className="container-x">
          <SectionHeading eyebrow="How it works" title="A simple, five-step journey" />
          <ol className="mt-14 grid gap-8 md:grid-cols-5">
            {steps.map((s, i) => (
              <li key={s.title} className="relative">
                <div className="flex items-center gap-3">
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-primary font-display font-semibold text-primary-foreground">
                    {i + 1}
                  </span>
                  {i < steps.length - 1 && (
                    <span className="hidden h-px flex-1 bg-primary/20 md:block" />
                  )}
                </div>
                <h3 className="mt-5 text-lg font-semibold text-primary">{s.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* WHO WE HELP */}
      <section className="container-x py-24">
        <SectionHeading eyebrow="Who we help" title="Support for every stage of study" />
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {audiences.map((a) => (
            <div
              key={a.title}
              className="rounded-2xl border-l-4 border-gold bg-card p-7 shadow-card"
            >
              <h3 className="text-lg font-semibold text-primary">{a.title}</h3>
              <p className="mt-2 text-muted-foreground">{a.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* EXPLORER */}
      <section className="bg-muted py-24">
        <div className="container-x">
          <SectionHeading
            eyebrow="Country explorer"
            title="Find a destination that fits"
            intro="Filter by country, study level and area of interest."
          />
          <div className="mt-10">
            <Explorer />
          </div>
        </div>
      </section>

      {/* TRUST METRICS BANNER */}
      <section className="container-x py-16">
        <div className="relative grid grid-cols-2 gap-4 lg:grid-cols-4 overflow-hidden rounded-3xl border border-border/80 bg-gradient-to-br from-primary via-slate-900 to-primary p-7 md:p-8 text-primary-foreground shadow-card">
          <div className="pointer-events-none absolute -right-20 -bottom-20 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
          <div className="pointer-events-none absolute -left-20 -top-20 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
          {[
            {
              stat: "8",
              label: "European Destinations",
              desc: "Malta, Romania, Bulgaria, Slovenia, Slovakia, Lithuania, Serbia & Latvia",
            },
            {
              stat: "50+",
              label: "Partner Institutions",
              desc: "Recognized state universities and accredited higher education colleges",
            },
            {
              stat: "100%",
              label: "Transparent Process",
              desc: "Clear fee structure, official admission criteria, zero false promises",
            },
            {
              stat: "A–Z",
              label: "Visa & SOP Guidance",
              desc: "Step-by-step document preparation, interview prep, and pre-departure checklist",
            },
          ].map((m, i) => (
            <div
              key={i}
              className="group flex flex-col justify-between rounded-2xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all hover:border-gold/40 hover:bg-white/10"
            >
              <div>
                <p className="font-display text-3xl font-extrabold text-gold md:text-4xl tracking-tight">
                  {m.stat}
                </p>
                <p className="mt-1.5 font-semibold text-sm text-white md:text-base leading-snug">
                  {m.label}
                </p>
              </div>
              <p className="mt-3 text-xs text-primary-foreground/75 leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* STUDENT TESTIMONIALS */}
      <TestimonialsSection />

      <ConsultCTA />

      {/* ENQUIRY */}
      <section id="enquiry" className="container-x grid gap-12 pb-24 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading
          eyebrow="Free consultation"
          title="Tell us about your plans"
          intro="Only a few fields are required. We'll reach out to discuss your options."
        />
        <EnquiryForm />
      </section>

      {/* FAQ */}
      <section className="bg-muted py-24">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <SectionHeading
            eyebrow="FAQs"
            title="Common questions"
            intro="Requirements vary by country and institution — always confirm the latest details."
          />
          <FaqList items={faqs.slice(0, 6)} />
        </div>
      </section>
    </>
  );
}
