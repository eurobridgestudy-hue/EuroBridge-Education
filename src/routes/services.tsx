import { createFileRoute } from "@tanstack/react-router";
import { services } from "@/lib/site";
import { PageHero, ConsultCTA } from "@/components/site";
import { ServiceIcon } from "@/components/ServiceIcon";
import hero from "@/assets/bulgaria.jpg";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Study Abroad Services for Europe | EuroBridge Education" },
      {
        name: "description",
        content:
          "Course selection, admission guidance, documentation, study visa guidance, interview preparation and pre-departure support for Europe.",
      },
      { property: "og:title", content: "Our Services | EuroBridge Education" },
      { property: "og:description", content: "Guidance across every step of studying in Europe." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="Services"
        title="Guidance at every stage"
        intro="From your first questions to your departure — choose the support you need."
        image={hero}
        imageAlt="Sofia, Bulgaria"
      />
      <section className="container-x grid gap-6 py-20 md:grid-cols-2">
        {services.map((s, i) => (
          <div key={s.title} className="flex gap-6 rounded-2xl border border-border bg-card p-8">
            <div className="grid h-14 w-14 shrink-0 place-items-center rounded-xl bg-sky">
              <ServiceIcon name={s.icon} className="h-7 w-7 text-accent" />
            </div>
            <div>
              <span className="font-display text-xs text-gold">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h2 className="text-xl font-semibold text-primary">{s.title}</h2>
              <p className="mt-2 text-muted-foreground">{s.text}</p>
            </div>
          </div>
        ))}
      </section>
      <p className="container-x text-sm text-muted-foreground">
        We do not guarantee admission, visas or scholarships. Decisions rest with institutions and
        authorities.
      </p>
      <ConsultCTA />
    </>
  ),
});
