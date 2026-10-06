import { createFileRoute } from "@tanstack/react-router";
import { PageHero, SectionHeading, ConsultCTA } from "@/components/site";
import hero from "@/assets/hero.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About EuroBridge Education | Europe Study Consultancy in India" },
      {
        name: "description",
        content:
          "Our mission is to help students from India understand European study opportunities and navigate admission and visa guidance with clarity.",
      },
      { property: "og:title", content: "About EuroBridge Education" },
      {
        property: "og:description",
        content: "A student-first, Europe-focused education consultancy.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="About us"
        title="About EuroBridge Education"
        intro="A Europe-focused consultancy built around clarity, honesty and students."
        image={hero}
        imageAlt="Student at a European university"
      />
      <section className="container-x grid gap-12 py-20 md:grid-cols-2">
        <SectionHeading eyebrow="Our mission" title="Clarity for every step" />
        <p className="text-xl text-muted-foreground leading-relaxed">
          To help students from India understand European study opportunities and navigate admission
          and visa guidance with greater clarity, transparency and personal support.
        </p>
      </section>
      <section className="bg-muted py-20">
        <div className="container-x grid gap-6 md:grid-cols-3">
          {[
            [
              "Student-first approach",
              "We start with your background, goals and concerns — not a fixed list of products.",
            ],
            [
              "Europe-focused expertise",
              "We concentrate on eight European destinations so our guidance stays focused.",
            ],
            [
              "Transparent guidance process",
              "We explain what we can help with, and what depends on institutions and authorities.",
            ],
          ].map(([t, d]) => (
            <div key={t} className="rounded-2xl bg-card p-8 shadow-card">
              <h3 className="text-xl font-semibold text-primary">{t}</h3>
              <p className="mt-3 text-muted-foreground">{d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="container-x py-20">
        <SectionHeading eyebrow="Our team & advisory" title="The people behind EuroBridge" />
        <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-3xl">
          Headquartered at Suffian Bagh Chowk in Ludhiana, Punjab, our advisory team brings dedicated expertise in European higher education admissions, credential evaluations, apostille processing, and study visa documentation. We focus on ethical, transparent representation for Indian students across eight European destinations.
        </p>
      </section>
      <ConsultCTA />
    </>
  ),
});
