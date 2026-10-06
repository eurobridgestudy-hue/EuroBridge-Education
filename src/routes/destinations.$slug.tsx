import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import { useEffect } from "react";
import { Check, CheckCircle2 } from "lucide-react";
import { getDestination, destinations } from "@/lib/destinations";
import { steps, track } from "@/lib/site";
import {
  PageHero,
  SectionHeading,
  FaqList,
  ConsultCTA,
  EnquiryForm,
  Placeholder,
  ConsultButton,
  WhatsAppButton,
} from "@/components/site";

export const Route = createFileRoute("/destinations/$slug")({
  loader: ({ params }) => {
    const d = getDestination(params.slug);
    if (!d) throw notFound();
    return d;
  },
  head: ({ loaderData: d }) => {
    if (!d) return {};
    const title = `Study in ${d.name} from India | EuroBridge Education`;
    const desc = `Explore studying in ${d.name}. EuroBridge Education guides Indian students on courses, admissions and study visa preparation for ${d.name}.`;
    return {
      meta: [
        { title },
        { name: "description", content: desc },
        { property: "og:title", content: title },
        { property: "og:description", content: desc },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: DestinationPage,
});

function Info({ label, value, icon }: { label: string; value: string | null; icon?: string }) {
  return (
    <div className="group relative overflow-hidden rounded-2xl border border-border/80 bg-gradient-to-br from-card to-muted/30 p-5 shadow-xs transition-all hover:border-gold/40 hover:shadow-card">
      <div className="flex items-center gap-2">
        {icon && <span className="text-base">{icon}</span>}
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{label}</p>
      </div>
      <div className="mt-2.5 text-sm font-semibold text-primary whitespace-pre-line leading-relaxed">
        {value ?? <Placeholder>[VERIFIED INFORMATION]</Placeholder>}
      </div>
    </div>
  );
}

function DestinationPage() {
  const d = Route.useLoaderData();
  useEffect(() => {
    track("destination_view", { country: d.name });
  }, [d.name]);
  const faqs = [
    {
      q: `Can Indian students study in ${d.name}?`,
      a: `Yes, many institutions in ${d.name} accept international applicants. Eligibility depends on each institution and programme.`,
    },
    {
      q: `Do I need IELTS to study in ${d.name}?`,
      a: "Language requirements vary by institution and programme. Please confirm with the institution or speak with us.",
    },
    {
      q: `How does the ${d.name} study visa process work?`,
      a: "The process and documentation are set by the relevant authorities and can change. We provide guidance; decisions rest solely with the authorities.",
    },
    {
      q: `What are tuition fees in ${d.name}?`,
      a: d.tuition
        ? `Tuition fees in ${d.name} typically range around ${d.tuition}, varying by institution, course and study level. Contact EuroBridge Education for specific course fees.`
        : "Fees vary by institution and programme. Contact us for current, verified information.",
    },
  ];
  return (
    <>
      <PageHero
        eyebrow={`${d.flag} Study in ${d.name}`}
        title={`Study in ${d.name}`}
        intro={d.tagline}
        image={d.image}
        imageAlt={d.imageAlt}
      />

      <section className="container-x grid gap-12 py-20 lg:grid-cols-[1.5fr_1fr]">
        <div>
          <SectionHeading eyebrow="Introduction" title={`About ${d.name}`} />
          <p className="mt-5 text-lg text-muted-foreground">{d.intro}</p>
          <h3 className="mt-12 text-2xl font-semibold text-primary">
            Why students may consider {d.name}
          </h3>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {d.why.map((w) => (
              <li key={w} className="flex gap-3">
                <Check className="mt-0.5 h-5 w-5 shrink-0 text-gold" />
                {w}
              </li>
            ))}
          </ul>
          <h3 className="mt-12 text-2xl font-semibold text-primary">Study options</h3>
          <p className="mt-3 text-muted-foreground">
            Study levels: {d.levels.join(", ")}. Indicative areas: {d.interests.join(", ")}.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            <Info icon="🏛️" label="Universities & Colleges" value={d.universities?.join(", ") ?? null} />
            <Info icon="💶" label="Tuition Fees" value={d.tuition} />
            <Info icon="📅" label="Intakes & Deadlines" value={d.deadlines} />
          </div>

          {d.institutions && d.institutions.length > 0 && (
            <div className="mt-12">
              <div className="flex items-center justify-between border-b border-border/70 pb-3">
                <h4 className="text-xl font-bold text-primary">Universities & Colleges</h4>
                <span className="rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-accent">
                  Featured Institutions
                </span>
              </div>
              <div className="mt-6 grid gap-5 sm:grid-cols-1 md:grid-cols-3">
                {d.institutions.map((inst) => (
                  <div
                    key={inst.name}
                    className="group relative flex flex-col justify-between overflow-hidden rounded-2xl border border-border/80 bg-card p-6 shadow-xs transition-all duration-200 hover:border-gold/50 hover:shadow-card hover:-translate-y-1"
                  >
                    <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-accent/0 via-gold to-accent/0 opacity-0 group-hover:opacity-100 transition-opacity" />
                    <div>
                      <h5 className="font-display text-lg font-bold text-primary">{inst.name}</h5>
                      {inst.fullName && inst.fullName !== inst.name && (
                        <p className="mt-0.5 text-xs text-muted-foreground">{inst.fullName}</p>
                      )}
                      <p className="mt-3 flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                        <span>📍</span> {inst.locations}
                      </p>
                      <div className="mt-3 inline-block rounded-full bg-sky/70 px-3 py-1 text-xs font-semibold text-accent">
                        🎓 {inst.levels}
                      </div>
                      <p className="mt-3.5 text-xs font-semibold text-foreground/90">{inst.areas}</p>
                      {inst.description && (
                        <p className="mt-2.5 text-xs leading-relaxed text-muted-foreground">
                          {inst.description}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs italic text-muted-foreground">
                Programme availability and admission requirements vary by institution and course.
              </p>
            </div>
          )}

          {/* Advisory Notice */}
          <div className="mt-10 rounded-2xl border border-border/80 bg-muted/30 p-5 text-xs text-muted-foreground leading-relaxed">
            <p>
              <strong className="font-semibold text-primary">Academic & Visa Advisory:</strong> EuroBridge Education provides educational counseling, university application assistance, and document guidance for recognized universities across {d.name}. Admission decisions are made solely by the respective academic institutions, and study visa decisions are made solely by sovereign immigration authorities. Tuition fees and admission criteria are set directly by universities.
            </p>
          </div>

          <h3 className="mt-12 text-2xl font-semibold text-primary">Admission guidance</h3>
          <p className="mt-3 text-muted-foreground">
            We help you understand each institution's application steps, prepare required
            information and track your submissions. Admission decisions are made by the
            institutions.
          </p>
          <h3 className="mt-12 text-2xl font-semibold text-primary">Visa guidance</h3>
          <p className="mt-3 text-muted-foreground">
            {d.visaNotes ??
              "We guide you through the study visa process and documentation for this destination. Visa decisions are made solely by the relevant authorities and requirements may change."}
          </p>
          <h3 className="mt-12 text-2xl font-semibold text-primary">
            General document considerations
          </h3>
          <p className="mt-3 text-muted-foreground">
            Commonly requested documents may include a valid passport, academic transcripts and
            certificates, proof of language ability, a statement of purpose and financial documents.
            Exact requirements vary — always confirm with the institution or authority.
          </p>
        </div>
        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-2xl bg-primary p-8 text-primary-foreground">
            <h3 className="text-2xl font-semibold">Considering {d.name}?</h3>
            <p className="mt-3 text-primary-foreground/75">
              Talk to us about your profile and options.
            </p>
            <div className="mt-6 flex flex-col gap-3">
              <ConsultButton location={`destination_${d.slug}`} />
              <WhatsAppButton location={`destination_${d.slug}`} variant="ghostLight" />
            </div>
          </div>
          <div className="mt-6 rounded-2xl border border-border bg-card p-6">
            <p className="text-sm font-semibold text-primary">Other destinations</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {destinations
                .filter((x) => x.slug !== d.slug)
                .map((x) => (
                  <Link
                    key={x.slug}
                    to="/destinations/$slug"
                    params={{ slug: x.slug }}
                    className="rounded-full border border-border px-3 py-1 text-sm hover:border-accent hover:text-accent"
                  >
                    {x.flag} {x.name}
                  </Link>
                ))}
            </div>
          </div>
        </aside>
      </section>

      <section className="bg-sky py-20">
        <div className="container-x">
          <SectionHeading eyebrow="Student journey" title={`Your path to ${d.name}`} />
          <ol className="mt-10 grid gap-6 md:grid-cols-5">
            {steps.map((s, i) => (
              <li key={s.title} className="rounded-xl bg-card p-5">
                <span className="font-display text-gold">0{i + 1}</span>
                <h4 className="mt-2 font-semibold text-primary">{s.title}</h4>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-x grid gap-12 py-20 lg:grid-cols-[1fr_1.6fr]">
        <SectionHeading eyebrow="FAQ" title={`${d.name} questions`} />
        <FaqList items={faqs} />
      </section>

      <ConsultCTA />
      <section className="container-x pb-24">
        <EnquiryForm defaultCountry={d.name} />
      </section>
    </>
  );
}
