import { Link } from "@tanstack/react-router";
import { useState, useId, type ReactNode } from "react";
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  CalendarCheck,
  ArrowRight,
  Plus,
  User,
  Mail,
  MapPin,
  GraduationCap,
  Calendar,
  Compass,
  BookOpen,
  Globe,
  Award,
  FileText,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  ShieldCheck,
  Check,
  Send,
  Loader2,
  RotateCcw,
} from "lucide-react";
import { toast } from "sonner";
import {
  contact,
  faqs as defaultFaqs,
  track,
  whatsappUrl,
  telUrl,
  studyLevels,
  interests,
} from "@/lib/site";
import { destinations } from "@/lib/destinations";
import { cn } from "@/lib/utils";
import { saveLead } from "@/lib/admin-store";
import {
  validateForm,
  calculateReadinessScore,
  type FormValues,
  type FormErrors,
} from "@/lib/form-validation";

const nav = [
  { to: "/", label: "Home" },
  { to: "/destinations", label: "Study Destinations" },
  { to: "/services", label: "Services" },
  { to: "/how-it-works", label: "How It Works" },
  { to: "/about", label: "About Us" },
  { to: "/faqs", label: "FAQs" },
  { to: "/contact", label: "Contact" },
] as const;

const btn =
  "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 active:scale-[0.98]";
export const btnVariants = {
  primary: cn(
    btn,
    "bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-slate-950 font-bold shadow-[0_4px_16px_-4px_rgba(212,175,55,0.45)] hover:shadow-[0_8px_24px_-4px_rgba(212,175,55,0.6)] hover:-translate-y-0.5 hover:brightness-105 border border-amber-300/40",
  ),
  navy: cn(
    btn,
    "bg-gradient-to-r from-primary via-slate-900 to-primary text-primary-foreground shadow-md hover:shadow-lg hover:-translate-y-0.5 border border-primary/20",
  ),
  whatsapp: cn(
    btn,
    "bg-gradient-to-r from-[#25D366] to-[#128C7E] text-white shadow-[0_4px_16px_-4px_rgba(37,211,102,0.4)] hover:shadow-[0_8px_20px_-4px_rgba(37,211,102,0.55)] hover:brightness-105 hover:-translate-y-0.5",
  ),
  outline: cn(
    btn,
    "border border-primary/25 bg-background text-primary hover:bg-primary hover:text-primary-foreground hover:-translate-y-0.5 shadow-sm",
  ),
  ghostLight: cn(
    btn,
    "border border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:border-white/40 hover:-translate-y-0.5 shadow-sm",
  ),
};

export function ConsultButton({
  className,
  children = "Book a Free Consultation",
  location = "unknown",
}: {
  className?: string;
  children?: ReactNode;
  location?: string;
}) {
  return (
    <Link
      to="/contact"
      hash="enquiry"
      onClick={() => track("cta_click", { cta: "consultation", location })}
      className={cn(btnVariants.primary, className)}
    >
      <CalendarCheck className="h-4 w-4" /> {children}
    </Link>
  );
}
export function WhatsAppButton({
  className,
  location = "unknown",
  variant = "whatsapp",
}: {
  className?: string;
  location?: string;
  variant?: keyof typeof btnVariants;
}) {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { location })}
      className={cn(btnVariants[variant], className)}
    >
      <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
    </a>
  );
}
export function CallButton({
  className,
  location = "unknown",
  variant = "outline",
}: {
  className?: string;
  location?: string;
  variant?: keyof typeof btnVariants;
}) {
  return (
    <a
      href={telUrl()}
      onClick={() => track("phone_click", { location })}
      className={cn(btnVariants[variant], className)}
    >
      <Phone className="h-4 w-4" /> Call Us
    </a>
  );
}

export function Logo({ light }: { light?: boolean }) {
  return (
    <Link to="/" className="group flex items-center gap-3" aria-label="EuroBridge Education home">
      <span
        className={cn(
          "grid h-10 w-10 place-items-center rounded-xl font-display text-base font-bold shadow-md transition-transform group-hover:scale-105",
          light
            ? "bg-gradient-to-br from-amber-400 to-amber-600 text-ink shadow-amber-500/20"
            : "bg-gradient-to-br from-primary via-slate-900 to-primary text-primary-foreground border border-gold/30 shadow-primary/20",
        )}
      >
        EB
      </span>
      <span className="flex flex-col">
        <span
          className={cn(
            "font-display text-[17px] font-bold tracking-tight leading-tight",
            light ? "text-ink-foreground" : "text-primary",
          )}
        >
          EuroBridge
        </span>
        <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-gold">
          Education
        </span>
      </span>
    </Link>
  );
}

export function TopBar() {
  return (
    <div className="hidden border-b border-border/40 bg-ink px-4 py-2 text-xs font-medium text-ink-foreground/85 md:block">
      <div className="container-x flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-gold opacity-75"></span>
            <span className="relative inline-flex h-2 w-2 rounded-full bg-gold"></span>
          </span>
          <span className="text-ink-foreground/90 font-medium">
            Admissions Open: Autumn 2026 & Spring 2027 Intakes across Europe
          </span>
        </div>
        <div className="flex items-center gap-5">
          <a
            href={telUrl()}
            className="flex items-center gap-1.5 transition-colors hover:text-gold"
          >
            <Phone className="h-3.5 w-3.5 text-gold" />
            <span>{contact.phone}</span>
          </a>
          <a
            href={whatsappUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 transition-colors hover:text-emerald-400"
          >
            <MessageCircle className="h-3.5 w-3.5 text-whatsapp" />
            <span>{contact.whatsapp}</span>
          </a>
          <span className="text-ink-foreground/40">|</span>
          <span className="text-ink-foreground/75">Suffian Bagh Chowk, Ludhiana</span>
        </div>
      </div>
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/90 backdrop-blur-md">
      <TopBar />
      <div className="container-x flex h-16 items-center justify-between gap-6">
        <Logo />
        <nav className="hidden items-center gap-1 lg:flex">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="rounded-full px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-all hover:bg-muted hover:text-primary data-[status=active]:bg-primary/5 data-[status=active]:font-semibold data-[status=active]:text-primary"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="hidden lg:block">
          <ConsultButton location="header" className="px-5 py-2.5 text-xs">
            Book Free Consultation
          </ConsultButton>
        </div>
        <button
          className="lg:hidden rounded-xl border border-border/80 p-2 text-primary hover:bg-muted transition-colors"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <div className="border-t border-border bg-background/98 backdrop-blur-xl lg:hidden animate-in slide-in-from-top-2 duration-200">
          <nav className="container-x flex flex-col py-4">
            {nav.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="flex items-center justify-between border-b border-border/50 py-3 text-sm font-semibold text-primary transition-colors hover:text-accent"
              >
                <span>{n.label}</span>
                <span className="text-xs text-muted-foreground">›</span>
              </Link>
            ))}

            <div className="mt-5 grid grid-cols-2 gap-2.5">
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  track("whatsapp_click", { location: "mobile_menu" });
                  setOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/10 py-2.5 text-xs font-bold text-emerald-600"
              >
                <MessageCircle className="h-4 w-4 text-emerald-500" />
                <span>WhatsApp</span>
              </a>
              <a
                href={telUrl()}
                onClick={() => {
                  track("phone_click", { location: "mobile_menu" });
                  setOpen(false);
                }}
                className="flex items-center justify-center gap-1.5 rounded-xl border border-border bg-muted/60 py-2.5 text-xs font-bold text-primary"
              >
                <Phone className="h-4 w-4 text-gold" />
                <span>Call Us</span>
              </a>
            </div>

            <ConsultButton
              location="mobile_menu"
              className="mt-3 w-full justify-center text-sm py-3"
            >
              Book Free Consultation
            </ConsultButton>
          </nav>
        </div>
      )}
    </header>
  );
}

export function MobileBar() {
  return (
    <aside
      aria-label="Quick mobile actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-slate-950/95 px-3 py-2 pb-[max(0.6rem,env(safe-area-inset-bottom))] shadow-[0_-8px_32px_rgba(0,0,0,0.45)] backdrop-blur-xl lg:hidden"
    >
      <div className="mx-auto flex max-w-md items-center justify-between gap-2">
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => track("whatsapp_click", { location: "mobile_bar" })}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-emerald-500/30 bg-emerald-500/15 py-2.5 text-xs font-bold text-emerald-400 shadow-xs transition-all active:scale-95"
        >
          <MessageCircle className="h-4 w-4 shrink-0 text-emerald-400" />
          <span>WhatsApp</span>
        </a>

        <a
          href={telUrl()}
          onClick={() => track("phone_click", { location: "mobile_bar" })}
          className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-white/15 bg-white/10 py-2.5 text-xs font-bold text-white shadow-xs transition-all active:scale-95"
        >
          <Phone className="h-4 w-4 shrink-0 text-amber-400" />
          <span>Call Us</span>
        </a>

        <Link
          to="/contact"
          hash="enquiry"
          onClick={() => track("cta_click", { cta: "consultation", location: "mobile_bar" })}
          className="flex flex-[1.35] items-center justify-center gap-1.5 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 py-2.5 px-2 text-xs font-extrabold text-slate-950 shadow-[0_4px_16px_rgba(212,175,55,0.4)] transition-all active:scale-95"
        >
          <CalendarCheck className="h-4 w-4 shrink-0" />
          <span className="whitespace-nowrap">Free Consult</span>
        </Link>
      </div>
    </aside>
  );
}

export function Footer() {
  const legalLinks = [
    { slug: "privacy", label: "Privacy Policy" },
    { slug: "terms", label: "Terms & Conditions" },
    { slug: "cookies", label: "Cookie Policy" },
    { slug: "disclaimer", label: "Advisory & Disclaimer" },
    { slug: "refund", label: "Refund & Cancellation" },
    { slug: "anti-fraud", label: "Anti-Fraud Policy" },
  ] as const;

  return (
    <footer className="bg-ink pb-24 pt-16 text-ink-foreground lg:pb-12 border-t border-border/20">
      <div className="container-x grid gap-10 md:grid-cols-2 lg:grid-cols-5">
        {/* Col 1: Brand & Identity */}
        <div className="lg:col-span-1">
          <Logo light />
          <p className="mt-4 text-sm text-ink-foreground/75 leading-relaxed">
            Ethical, transparent higher education guidance for Indian students aspiring to study in Europe.
          </p>
          <div className="mt-5 space-y-2 text-xs text-ink-foreground/70">
            <p className="flex items-center gap-1.5 text-gold font-medium">
              <span>📍</span> Ludhiana, Punjab, India
            </p>
            <p className="flex items-center gap-1.5 text-emerald-400 font-medium">
              <span>✓</span> Genuine Student Advisory
            </p>
          </div>
        </div>

        {/* Col 2: Destinations */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-gold">Destinations</h4>
          <ul className="mt-4 grid grid-cols-2 gap-2 text-sm text-ink-foreground/80">
            {destinations.map((d) => (
              <li key={d.slug}>
                <Link
                  to="/destinations/$slug"
                  params={{ slug: d.slug }}
                  className="transition-colors hover:text-gold flex items-center gap-1.5"
                >
                  <span>{d.flag}</span>
                  <span>{d.name}</span>
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3: Explore */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-gold">Explore</h4>
          <ul className="mt-4 space-y-2 text-sm text-ink-foreground/80">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="transition-colors hover:text-gold">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/resources" className="transition-colors hover:text-gold">
                Resources & Guides
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 4: Policies & Legal */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-gold">Policies & Legal</h4>
          <ul className="mt-4 space-y-2 text-sm text-ink-foreground/80">
            {legalLinks.map((p) => (
              <li key={p.slug}>
                <Link
                  to="/legal/$page"
                  params={{ page: p.slug }}
                  className="transition-colors hover:text-gold flex items-center gap-1.5"
                >
                  <span className="text-gold/60 text-xs">›</span>
                  <span>{p.label}</span>
                </Link>
              </li>
            ))}
            <li className="pt-1">
              <Link
                to="/admin"
                className="transition-colors hover:text-gold flex items-center gap-1.5 text-xs text-gold/90 font-medium"
              >
                <span>🔐</span>
                <span>Admin Management Portal</span>
              </Link>
            </li>
          </ul>
        </div>

        {/* Col 5: Contact */}
        <div>
          <h4 className="text-sm font-bold uppercase tracking-wider text-gold">Contact Office</h4>
          <ul className="mt-4 space-y-2.5 text-sm text-ink-foreground/80">
            <li>
              <a
                href={telUrl()}
                className="flex items-center gap-2 transition-colors hover:text-gold font-medium"
              >
                <Phone className="h-4 w-4 text-gold shrink-0" />
                <span>{contact.phone}</span>
              </a>
            </li>
            <li>
              <a
                href={whatsappUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 transition-colors hover:text-emerald-400 font-medium"
              >
                <MessageCircle className="h-4 w-4 text-whatsapp shrink-0" />
                <span>{contact.whatsapp}</span>
              </a>
            </li>
            <li>
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 transition-colors hover:text-gold"
              >
                <span className="text-gold font-bold">@</span>
                <span className="break-all">{contact.email}</span>
              </a>
            </li>
            <li className="pt-1 text-xs text-ink-foreground/70 leading-relaxed">
              {contact.office}
            </li>
          </ul>
          <div className="mt-4">
            <WhatsAppButton location="footer" variant="whatsapp" className="w-full text-xs py-2 px-3 justify-center" />
          </div>
        </div>
      </div>

      {/* Regulatory Disclaimer & Legal Bottom Bar */}
      <div className="container-x mt-12 border-t border-ink-foreground/15 pt-8 text-xs text-ink-foreground/65">
        <p className="max-w-5xl leading-relaxed">
          <strong className="text-ink-foreground/90 font-semibold">Regulatory Disclaimer:</strong> EuroBridge Education provides educational counseling, profile assessment, and documentation assistance for Indian students. EuroBridge Education is not an embassy, consulate, or government visa processing center. University admission decisions are made solely by the respective academic institutions, and study visa decisions are made solely by sovereign national immigration authorities; outcomes cannot be guaranteed. Tuition fees, deadlines, and admission requirements are subject to institutional updates.
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-ink-foreground/10 pt-6 text-xs text-ink-foreground/60">
          <span>© {new Date().getFullYear()} EuroBridge Education. All rights reserved.</span>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {legalLinks.map((p) => (
              <Link
                key={p.slug}
                to="/legal/$page"
                params={{ page: p.slug }}
                className="transition-colors hover:text-gold"
              >
                {p.label}
              </Link>
            ))}
            <Link
              to="/admin"
              className="transition-colors hover:text-gold flex items-center gap-1 text-gold/90 font-medium"
            >
              <span>🔐</span>
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  intro,
  center,
  light,
}: {
  eyebrow?: string;
  title: string;
  intro?: string;
  center?: boolean;
  light?: boolean;
}) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      {eyebrow && <p className={cn("eyebrow", light && "text-gold")}>{eyebrow}</p>}
      <h2
        className={cn(
          "mt-2.5 sm:mt-3 text-2xl sm:text-3xl md:text-[2.6rem] font-bold leading-tight md:leading-[1.1] tracking-tight",
          light ? "text-ink-foreground" : "text-primary",
        )}
      >
        {title}
      </h2>
      {intro && (
        <p
          className={cn(
            "mt-2.5 sm:mt-4 text-sm sm:text-base md:text-lg leading-relaxed",
            light ? "text-ink-foreground/80" : "text-muted-foreground",
          )}
        >
          {intro}
        </p>
      )}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  imageAlt,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  image?: string;
  imageAlt?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-ink text-ink-foreground">
      {image && (
        <img
          src={image}
          alt={imageAlt ?? ""}
          className="absolute inset-0 h-full w-full object-cover"
        />
      )}
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="container-x relative py-12 sm:py-16 md:py-24">
        <p className="eyebrow text-gold">{eyebrow}</p>
        <h1 className="mt-3 sm:mt-4 max-w-3xl text-3xl sm:text-4xl md:text-6xl font-bold leading-tight animate-rise tracking-tight">
          {title}
        </h1>
        <p className="mt-3 sm:mt-5 max-w-xl text-sm sm:text-base md:text-lg text-ink-foreground/85 leading-relaxed">
          {intro}
        </p>
      </div>
    </section>
  );
}

export function FaqList({ items = defaultFaqs }: { items?: { q: string; a: string }[] }) {
  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-card">
      {items.map((f) => (
        <details key={f.q} className="group px-6 py-5">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-display font-medium text-primary">
            {f.q}
            <Plus className="h-5 w-5 shrink-0 text-accent transition-transform group-open:rotate-45" />
          </summary>
          <p className="mt-3 text-muted-foreground">{f.a}</p>
        </details>
      ))}
    </div>
  );
}

export function ConsultCTA() {
  return (
    <section className="container-x py-14 sm:py-20">
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-slate-900 to-primary px-5 py-8 sm:px-10 sm:py-14 md:px-16 md:py-20 text-primary-foreground shadow-2xl border border-gold/20">
        <div className="pointer-events-none absolute -right-24 -top-24 h-80 w-80 rounded-full bg-gold/15 blur-3xl" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-80 w-80 rounded-full bg-accent/20 blur-3xl" />
        <div className="relative max-w-2xl">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-gold/40 bg-gold/10 px-3 py-1 text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-gold">
            ✨ Free Profile Assessment
          </div>
          <h2 className="mt-3 sm:mt-4 text-2xl sm:text-3xl md:text-5xl font-bold leading-tight md:leading-[1.12] tracking-tight">
            Ready to Explore Your European Study Options?
          </h2>
          <p className="mt-3 sm:mt-5 text-sm sm:text-base md:text-lg text-primary-foreground/85 leading-relaxed">
            Every student's profile and budget are unique. Speak with EuroBridge Education about
            course options, tuition fees, scholarship chances, and study visa requirements.
          </p>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4 items-stretch sm:items-center">
            <ConsultButton location="cta_band" className="w-full sm:w-auto px-6 py-3 sm:px-7 sm:py-3.5 text-sm sm:text-base justify-center" />
            <WhatsAppButton location="cta_band" variant="ghostLight" className="w-full sm:w-auto px-6 py-3 sm:px-7 sm:py-3.5 text-sm sm:text-base justify-center" />
          </div>
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-[11px] sm:text-xs text-primary-foreground/75 border-t border-white/10 pt-5 sm:pt-6">
            <span className="flex items-center gap-1.5"><span className="text-gold font-bold">✓</span> 100% Transparent Consultation</span>
            <span className="flex items-center gap-1.5"><span className="text-gold font-bold">✓</span> 8 European Destinations</span>
            <span className="flex items-center gap-1.5"><span className="text-gold font-bold">✓</span> Complete Visa & SOP Guidance</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function FormField({
  label,
  icon: Icon,
  req,
  error,
  isValid,
  hint,
  children,
  className,
}: {
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  req?: boolean;
  error?: string;
  isValid?: boolean;
  hint?: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col group transition-all duration-200", className)}>
      <div className="flex items-center justify-between mb-1.5">
        <label className="flex items-center gap-1.5 text-xs font-semibold text-primary">
          <Icon
            className={cn(
              "h-3.5 w-3.5 transition-colors duration-200",
              isValid
                ? "text-emerald-600"
                : error
                  ? "text-rose-500"
                  : "text-amber-500 group-focus-within:text-amber-600"
            )}
          />
          <span>{label}</span>
          {req && <span className="text-amber-500 font-bold">*</span>}
        </label>
        {isValid && (
          <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-600 animate-in fade-in duration-200">
            <CheckCircle2 className="h-3 w-3" /> Valid
          </span>
        )}
      </div>

      <div
        className={cn(
          "relative rounded-xl border bg-background/95 backdrop-blur-sm transition-all duration-200",
          error
            ? "border-rose-400 bg-rose-50/20 ring-2 ring-rose-400/20 shadow-xs"
            : isValid
              ? "border-emerald-500/60 focus-within:border-emerald-600 focus-within:ring-2 focus-within:ring-emerald-500/20 shadow-xs"
              : "border-input focus-within:border-amber-500 focus-within:ring-2 focus-within:ring-amber-500/25 shadow-xs"
        )}
      >
        {children}
      </div>

      {error ? (
        <p className="mt-1 text-[11px] font-medium text-rose-500 flex items-center gap-1 animate-in fade-in slide-in-from-top-1 duration-150">
          <AlertCircle className="h-3.5 w-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      ) : hint ? (
        <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p>
      ) : null}
    </div>
  );
}

const inputBase =
  "w-full rounded-xl bg-transparent px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground/70 focus:outline-none transition-colors";
const selectBase =
  "w-full rounded-xl bg-transparent px-4 py-3 text-sm text-foreground focus:outline-none transition-colors cursor-pointer";

export function EnquiryForm({ defaultCountry = "" }: { defaultCountry?: string }) {
  const [values, setValues] = useState<FormValues>({
    name: "",
    phone: "",
    sameAsPhone: true,
    whatsapp: "",
    email: "",
    city: "",
    qualification: "",
    year: "",
    level: "",
    field: "",
    country: defaultCountry || "",
    ielts: "",
    message: "",
    consent: false,
  });

  const [touched, setTouched] = useState<Partial<Record<keyof FormValues, boolean>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [sentLead, setSentLead] = useState<{
    id: string;
    refNo: string;
    name: string;
    phone: string;
    country: string;
    level: string;
    field: string;
  } | null>(null);

  // Real-time validation & readiness calculations
  const errors = validateForm(values);
  const readiness = calculateReadinessScore(values);

  function handleChange(field: keyof FormValues, val: unknown) {
    setValues((prev) => {
      const updated = { ...prev, [field]: val };
      if (field === "phone" && prev.sameAsPhone) {
        updated.whatsapp = String(val);
      }
      return updated;
    });
  }

  function handleBlur(field: keyof FormValues) {
    setTouched((prev) => ({ ...prev, [field]: true }));
  }

  function isFieldValid(field: keyof FormValues): boolean {
    const isTouched = touched[field] || submitted;
    if (!isTouched) return false;
    return !errors[field] && Boolean(values[field]);
  }

  function getFieldError(field: keyof FormValues): string | undefined {
    const isTouched = touched[field] || submitted;
    return isTouched ? errors[field] : undefined;
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitted(true);

    // Mark all required fields as touched
    const allTouched: Partial<Record<keyof FormValues, boolean>> = {};
    (Object.keys(values) as (keyof FormValues)[]).forEach((k) => {
      allTouched[k] = true;
    });
    setTouched(allTouched);

    const activeErrors = validateForm(values);
    if (Object.keys(activeErrors).length > 0) {
      toast.error("Please complete all highlighted fields with accurate details.");
      return;
    }

    setIsSubmitting(true);

    try {
      const refNo = `EB-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;
      const effectiveWhatsApp = values.sameAsPhone ? values.phone : (values.whatsapp || values.phone);

      const saved = saveLead({
        name: values.name.trim(),
        phone: values.phone.trim(),
        whatsapp: effectiveWhatsApp.trim(),
        email: values.email.trim(),
        city: values.city.trim(),
        qualification: values.qualification,
        year: values.year.trim(),
        level: values.level,
        field: values.field,
        country: values.country || "Not sure yet",
        ielts: values.ielts,
        message: values.message.trim(),
      });

      track("consultation_form_submit", {
        country: values.country,
        level: values.level,
        name: values.name,
      });

      setSentLead({
        id: saved.id,
        refNo,
        name: values.name,
        phone: values.phone,
        country: values.country || "European Universities",
        level: values.level || "Degree Programme",
        field: values.field || "General Studies",
      });

      toast.success("Profile verified! Your consultation request has been submitted.");
    } catch (err) {
      console.error("Failed to save lead", err);
      toast.error("There was an issue submitting your enquiry. Please try again or WhatsApp us directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  function handleReset() {
    setValues({
      name: "",
      phone: "",
      sameAsPhone: true,
      whatsapp: "",
      email: "",
      city: "",
      qualification: "",
      year: "",
      level: "",
      field: "",
      country: defaultCountry || "",
      ielts: "",
      message: "",
      consent: false,
    });
    setTouched({});
    setSubmitted(false);
    setSentLead(null);
  }

  // -----------------------------------------------------------------
  // SUCCESS SCREEN
  // -----------------------------------------------------------------
  if (sentLead) {
    const waText = encodeURIComponent(
      `Hello EuroBridge Team! I just submitted my study abroad consultation form.\n\n*Reference ID:* ${sentLead.refNo}\n*Student Name:* ${sentLead.name}\n*Target Destination:* ${sentLead.country}\n*Study Level & Field:* ${sentLead.level} - ${sentLead.field}\n*Phone:* ${sentLead.phone}\n\nPlease let me know the upcoming intakes and eligibility criteria.`
    );
    const directWaUrl = `https://wa.me/918968867562?text=${waText}`;

    return (
      <div className="relative overflow-hidden rounded-3xl border border-amber-500/30 bg-card/95 p-8 text-center shadow-2xl backdrop-blur-md md:p-12 animate-in fade-in zoom-in-95 duration-300">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full bg-amber-500/10 blur-3xl animate-pulse" />
        <div className="pointer-events-none absolute -left-20 -bottom-20 h-72 w-72 rounded-full bg-emerald-500/10 blur-3xl" />

        {/* Animated Celebration Badge */}
        <div className="relative mx-auto mb-6 grid h-20 w-20 place-items-center rounded-3xl bg-gradient-to-br from-emerald-500 via-emerald-600 to-teal-700 text-white shadow-xl shadow-emerald-600/30 ring-8 ring-emerald-500/15">
          <CheckCircle2 className="h-10 w-10 animate-bounce" />
        </div>

        <div className="inline-flex items-center gap-2 rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-700 dark:text-amber-300 mb-3">
          <Sparkles className="h-3.5 w-3.5" /> Reference ID: {sentLead.refNo}
        </div>

        <h3 className="font-display text-2xl font-bold tracking-tight text-primary md:text-3xl">
          Consultation Request Confirmed!
        </h3>
        <p className="mx-auto mt-2 max-w-lg text-sm text-muted-foreground">
          Thank you, <strong className="text-foreground">{sentLead.name}</strong>. Your academic profile has been logged in our counselor queue. Our certified European education advisor will evaluate your university eligibility within 24 hours.
        </p>

        {/* Profile Card Summary */}
        <div className="mx-auto mt-6 max-w-md rounded-2xl border border-border bg-background/80 p-4 text-left text-xs space-y-2 shadow-xs">
          <div className="flex justify-between border-b border-border/60 pb-2">
            <span className="text-muted-foreground">Destination Choice:</span>
            <span className="font-bold text-foreground">{sentLead.country}</span>
          </div>
          <div className="flex justify-between border-b border-border/60 pb-2">
            <span className="text-muted-foreground">Programme Level:</span>
            <span className="font-bold text-foreground">{sentLead.level}</span>
          </div>
          <div className="flex justify-between border-b border-border/60 pb-2">
            <span className="text-muted-foreground">Field of Study:</span>
            <span className="font-bold text-foreground">{sentLead.field}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Counselor Contact Line:</span>
            <span className="font-bold text-primary">+91 89688 67562</span>
          </div>
        </div>

        {/* Priority Actions */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <a
            href={directWaUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("whatsapp_click", { location: "form_success" })}
            className={cn(btnVariants.whatsapp, "w-full sm:w-auto px-6 py-3.5 text-sm font-bold shadow-lg")}
          >
            <MessageCircle className="h-4 w-4" /> Connect with Counselor on WhatsApp
          </a>

          <a
            href={telUrl(contact.phone)}
            className={cn(btnVariants.outline, "w-full sm:w-auto px-6 py-3.5 text-sm font-semibold")}
          >
            <Phone className="h-4 w-4 text-primary" /> Call Suffian Bagh Office
          </a>
        </div>

        <div className="mt-6">
          <button
            type="button"
            onClick={handleReset}
            className="text-xs text-muted-foreground hover:text-primary transition-colors inline-flex items-center gap-1.5 underline"
          >
            <RotateCcw className="h-3 w-3" /> Submit another student enquiry
          </button>
        </div>
      </div>
    );
  }

  // -----------------------------------------------------------------
  // ACTIVE FORM
  // -----------------------------------------------------------------
  return (
    <div className="relative overflow-hidden rounded-3xl border border-border/90 bg-card/95 backdrop-blur-md p-4 sm:p-6 md:p-10 shadow-xl transition-all">
      {/* Decorative ambient background */}
      <div className="pointer-events-none absolute right-0 top-0 -mr-24 -mt-24 h-80 w-80 rounded-full bg-amber-500/5 blur-3xl" />
      <div className="pointer-events-none absolute left-0 bottom-0 -ml-24 -mb-24 h-80 w-80 rounded-full bg-primary/5 blur-3xl" />

      {/* Header & Readiness Banner */}
      <div className="relative mb-8 pb-6 border-b border-border/80">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/15 border border-amber-500/30 px-3 py-1 text-xs font-bold text-amber-700 dark:text-amber-300">
              <Sparkles className="h-3.5 w-3.5" /> Free European University Assessment
            </span>
            <h3 className="font-display text-xl font-bold tracking-tight text-primary mt-2 md:text-2xl">
              Profile Evaluation & Consultation
            </h3>
            <p className="text-xs text-muted-foreground mt-0.5">
              Fill in your genuine academic details to receive university options and fee guidelines.
            </p>
          </div>

          {/* Interactive Readiness Progress Meter */}
          <div className="rounded-2xl border border-border/80 bg-background/80 p-3.5 min-w-[210px] shadow-2xs">
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-semibold text-primary">Form Readiness:</span>
              <span className={cn("font-bold", readiness.score === 100 ? "text-emerald-600" : "text-amber-500")}>
                {readiness.score}%
              </span>
            </div>
            <div className="h-2 w-full rounded-full bg-muted overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-amber-500 via-amber-400 to-emerald-500 transition-all duration-500"
                style={{ width: `${readiness.score}%` }}
              />
            </div>
            <p className="text-[10px] text-muted-foreground mt-1.5 flex items-center justify-between">
              <span>{readiness.completedFields} of {readiness.totalFields} verified</span>
              {readiness.score === 100 && (
                <span className="text-emerald-600 font-semibold flex items-center gap-0.5">
                  <Check className="h-3 w-3" /> Ready
                </span>
              )}
            </p>
          </div>
        </div>
      </div>

      <form onSubmit={onSubmit} noValidate className="relative grid gap-5 md:grid-cols-2">
        {/* Full Name */}
        <FormField
          label="Full Name"
          icon={User}
          req
          isValid={isFieldValid("name")}
          error={getFieldError("name")}
          hint="First and last name as per passport or matriculation certificate."
        >
          <input
            name="name"
            type="text"
            required
            maxLength={70}
            value={values.name}
            onChange={(e) => handleChange("name", e.target.value)}
            onBlur={() => handleBlur("name")}
            placeholder="Your full name, e.g. Arjun Sharma"
            className={inputBase}
          />
        </FormField>

        {/* Phone Number */}
        <FormField
          label="Calling Mobile Number"
          icon={Phone}
          req
          isValid={isFieldValid("phone")}
          error={getFieldError("phone")}
          hint="10-digit mobile number for immediate phone consultation."
        >
          <input
            name="phone"
            type="tel"
            required
            maxLength={18}
            value={values.phone}
            onChange={(e) => handleChange("phone", e.target.value)}
            onBlur={() => handleBlur("phone")}
            placeholder="+91 98765 00000"
            className={inputBase}
          />
        </FormField>

        {/* WhatsApp Sync Checkbox & Number Field */}
        <div className="md:col-span-2 rounded-2xl border border-border/80 bg-background/50 p-4 transition-all">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <label className="flex items-center gap-2.5 cursor-pointer text-xs font-semibold text-primary select-none">
              <input
                type="checkbox"
                checked={values.sameAsPhone}
                onChange={(e) => {
                  const checked = e.target.checked;
                  handleChange("sameAsPhone", checked);
                  if (checked) {
                    handleChange("whatsapp", values.phone);
                  }
                }}
                className="h-4 w-4 rounded accent-amber-500 cursor-pointer"
              />
              <span>WhatsApp number is the same as calling mobile (+91)</span>
            </label>

            {values.sameAsPhone && (
              <span className="inline-flex items-center gap-1.5 text-xs font-medium text-emerald-600 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
                <CheckCircle2 className="h-3 w-3" /> Auto-synced with calling phone
              </span>
            )}
          </div>

          {/* Conditional separate WhatsApp field */}
          {!values.sameAsPhone && (
            <div className="mt-4 pt-4 border-t border-border/80 animate-in fade-in slide-in-from-top-2 duration-200">
              <FormField
                label="WhatsApp Number"
                icon={MessageCircle}
                req
                isValid={isFieldValid("whatsapp")}
                error={getFieldError("whatsapp")}
                hint="Provide country code if non-Indian (e.g. +91, +44, +971)."
              >
                <input
                  name="whatsapp"
                  type="tel"
                  maxLength={18}
                  value={values.whatsapp}
                  onChange={(e) => handleChange("whatsapp", e.target.value)}
                  onBlur={() => handleBlur("whatsapp")}
                  placeholder="+91 98140 00000"
                  className={inputBase}
                />
              </FormField>
            </div>
          )}
        </div>

        {/* Email Address */}
        <FormField
          label="Email Address"
          icon={Mail}
          req
          isValid={isFieldValid("email")}
          error={getFieldError("email")}
          hint="University brochures, fee structures and checklists are sent here."
        >
          <input
            name="email"
            type="email"
            required
            maxLength={100}
            value={values.email}
            onChange={(e) => handleChange("email", e.target.value)}
            onBlur={() => handleBlur("email")}
            placeholder="you@example.com"
            className={inputBase}
          />
        </FormField>

        {/* Current City */}
        <FormField
          label="Current City"
          icon={MapPin}
          req
          isValid={isFieldValid("city")}
          error={getFieldError("city")}
          hint="Nearest city (e.g. Ludhiana, Jalandhar, Chandigarh, Delhi)."
        >
          <input
            name="city"
            type="text"
            required
            maxLength={60}
            value={values.city}
            onChange={(e) => handleChange("city", e.target.value)}
            onBlur={() => handleBlur("city")}
            placeholder="e.g. Ludhiana, Delhi, Chandigarh"
            className={inputBase}
          />
        </FormField>

        {/* Highest Qualification */}
        <FormField
          label="Highest Qualification"
          icon={GraduationCap}
          req
          isValid={isFieldValid("qualification")}
          error={getFieldError("qualification")}
        >
          <select
            name="qualification"
            required
            value={values.qualification}
            onChange={(e) => handleChange("qualification", e.target.value)}
            onBlur={() => handleBlur("qualification")}
            className={selectBase}
          >
            <option value="">Select qualification</option>
            <option value="Class 12">Class 12</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor's degree">Bachelor's degree</option>
            <option value="Master's degree">Master's degree</option>
            <option value="Other">Other</option>
          </select>
        </FormField>

        {/* Passing Year */}
        <FormField
          label="Passing Year"
          icon={Calendar}
          req
          isValid={isFieldValid("year")}
          error={getFieldError("year")}
          hint="Year of graduation or expected completion (2012–2030)."
        >
          <input
            name="year"
            type="text"
            inputMode="numeric"
            maxLength={4}
            required
            value={values.year}
            onChange={(e) => handleChange("year", e.target.value.replace(/\D/g, ""))}
            onBlur={() => handleBlur("year")}
            placeholder="e.g. 2024 or 2025"
            className={inputBase}
          />
        </FormField>

        {/* Preferred Study Level */}
        <FormField
          label="Preferred Study Level"
          icon={Compass}
          req
          isValid={isFieldValid("level")}
          error={getFieldError("level")}
        >
          <select
            name="level"
            required
            value={values.level}
            onChange={(e) => handleChange("level", e.target.value)}
            onBlur={() => handleBlur("level")}
            className={selectBase}
          >
            <option value="">Select study level</option>
            {studyLevels.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </FormField>

        {/* Preferred Course / Field */}
        <FormField
          label="Preferred Course / Field"
          icon={BookOpen}
          req
          isValid={isFieldValid("field")}
          error={getFieldError("field")}
        >
          <select
            name="field"
            required
            value={values.field}
            onChange={(e) => handleChange("field", e.target.value)}
            onBlur={() => handleBlur("field")}
            className={selectBase}
          >
            <option value="">Select field of study</option>
            {interests.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </FormField>

        {/* Preferred Country */}
        <FormField
          label="Preferred Country"
          icon={Globe}
          req
          isValid={isFieldValid("country")}
          error={getFieldError("country")}
        >
          <select
            name="country"
            required
            value={values.country}
            onChange={(e) => handleChange("country", e.target.value)}
            onBlur={() => handleBlur("country")}
            className={selectBase}
          >
            <option value="">Not sure yet</option>
            {destinations.map((d) => (
              <option key={d.slug} value={d.name}>
                {d.name}
              </option>
            ))}
          </select>
        </FormField>

        {/* English Proficiency */}
        <FormField
          label="English Proficiency"
          icon={Award}
          req
          isValid={isFieldValid("ielts")}
          error={getFieldError("ielts")}
        >
          <select
            name="ielts"
            required
            value={values.ielts}
            onChange={(e) => handleChange("ielts", e.target.value)}
            onBlur={() => handleBlur("ielts")}
            className={selectBase}
          >
            <option value="">Select English proficiency</option>
            <option value="IELTS">IELTS</option>
            <option value="TOEFL">TOEFL</option>
            <option value="PTE Academic">PTE Academic</option>
            <option value="Duolingo English Test">Duolingo English Test</option>
            <option value="Medium of Instruction (MOI)">Medium of Instruction (MOI)</option>
            <option value="Currently Preparing / Not Yet Taken">Currently Preparing / Not Yet Taken</option>
          </select>
        </FormField>

        {/* Message / Query */}
        <div className="md:col-span-2">
          <FormField
            label="Message / Profile Notes (Optional)"
            icon={FileText}
            isValid={Boolean(values.message && !errors.message)}
            error={getFieldError("message")}
            hint="Share any specific university preferences, budget constraints, or questions."
          >
            <textarea
              name="message"
              rows={3}
              maxLength={800}
              value={values.message}
              onChange={(e) => handleChange("message", e.target.value)}
              onBlur={() => handleBlur("message")}
              placeholder="Tell us about your educational background and destination preferences"
              className={cn(inputBase, "resize-none")}
            />
          </FormField>
        </div>

        {/* Consent Checkbox */}
        <div className="md:col-span-2">
          <label className="flex items-start gap-3 text-xs text-muted-foreground cursor-pointer group">
            <input
              type="checkbox"
              required
              checked={values.consent}
              onChange={(e) => handleChange("consent", e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded accent-amber-500 cursor-pointer"
            />
            <span className="group-hover:text-foreground transition-colors">
              I agree to be contacted by EuroBridge Education regarding my university enquiry via phone, WhatsApp or email. See our{" "}
              <Link to="/legal/$page" params={{ page: "privacy" }} className="underline hover:text-primary font-medium">
                Privacy Policy
              </Link>
              .
            </span>
          </label>
          {submitted && errors.consent && (
            <p className="mt-1 text-[11px] font-medium text-rose-500 flex items-center gap-1">
              <AlertCircle className="h-3.5 w-3.5 shrink-0" />
              <span>{errors.consent}</span>
            </p>
          )}
        </div>

        {/* Submission Strip */}
        <div className="md:col-span-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-border/80">
          <button
            type="submit"
            disabled={isSubmitting}
            className={cn(
              btnVariants.primary,
              "w-full sm:w-auto px-8 py-4 text-base font-bold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 transition-all flex items-center justify-center gap-2",
              isSubmitting && "opacity-80 cursor-wait"
            )}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" /> Verifying & Submitting...
              </>
            ) : (
              <>
                Request Free Consultation <ArrowRight className="h-4 w-4" />
              </>
            )}
          </button>

          <div className="flex flex-wrap items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="h-4 w-4 text-emerald-600" />
              <span>100% Confidential</span>
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="h-4 w-4 text-amber-500" />
              <span>Zero Application Fees</span>
            </span>
          </div>
        </div>
      </form>
    </div>
  );
}

export function Placeholder({ children }: { children: ReactNode }) {
  return <span className="placeholder-chip">{children}</span>;
}
