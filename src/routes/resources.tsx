import { createFileRoute } from "@tanstack/react-router";
import { PageHero, ConsultCTA, Placeholder } from "@/components/site";

const cats = [
  "Study in Europe",
  "Country Guides",
  "Admission Guidance",
  "Visa Guidance",
  "Student Documentation",
  "IELTS / Language Guidance",
  "Pre-Departure Guidance",
  "Student Life",
];

export const Route = createFileRoute("/resources")({
  head: () => ({
    meta: [
      { title: "Resources & Guides for Studying in Europe | EuroBridge Education" },
      {
        name: "description",
        content:
          "Guides on studying in Europe, country guides, admissions, visas, documentation and student life.",
      },
      { property: "og:title", content: "Resources | EuroBridge Education" },
      { property: "og:description", content: "Study-in-Europe guides for Indian students." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="Resources"
        title="Guides & articles"
        intro="Practical reading for students planning to study in Europe."
      />
      <section className="container-x py-20">
        <div className="flex flex-wrap gap-2">
          {cats.map((c) => (
            <span
              key={c}
              className="rounded-full border border-border bg-card px-4 py-1.5 text-sm text-primary"
            >
              {c}
            </span>
          ))}
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {cats.slice(0, 6).map((c) => (
            <article key={c} className="rounded-2xl border border-border bg-card p-6">
              <div className="aspect-[16/9] rounded-xl bg-muted" />
              <p className="eyebrow mt-5">{c}</p>
              <h2 className="mt-2 text-lg font-semibold text-primary">
                <Placeholder>[BLOG CONTENT]</Placeholder>
              </h2>
            </article>
          ))}
        </div>
      </section>
      <ConsultCTA />
    </>
  ),
});
