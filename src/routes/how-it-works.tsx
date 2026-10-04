import { createFileRoute } from "@tanstack/react-router";
import { steps } from "@/lib/site";
import { PageHero, ConsultCTA } from "@/components/site";
import hero from "@/assets/slovakia.jpg";

export const Route = createFileRoute("/how-it-works")({
  head: () => ({
    meta: [
      { title: "How It Works — Study in Europe Process | EuroBridge Education" },
      {
        name: "description",
        content:
          "Our five-step guidance process: consultation, course and destination guidance, application preparation, visa guidance and pre-departure.",
      },
      { property: "og:title", content: "How It Works | EuroBridge Education" },
      { property: "og:description", content: "A clear five-step journey to studying in Europe." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="How it works"
        title="A clear, five-step journey"
        intro="Structured guidance so you always know what comes next."
        image={hero}
        imageAlt="Bratislava, Slovakia"
      />
      <section className="container-x py-20">
        <ol className="relative mx-auto max-w-3xl border-l-2 border-primary/15 pl-10">
          {steps.map((s, i) => (
            <li key={s.title} className="relative pb-14 last:pb-0">
              <span className="absolute -left-[3.15rem] grid h-10 w-10 place-items-center rounded-full bg-primary font-display font-semibold text-primary-foreground">
                {i + 1}
              </span>
              <h2 className="text-2xl font-semibold text-primary">{s.title}</h2>
              <p className="mt-2 text-lg text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
        <p className="mx-auto mt-12 max-w-3xl text-sm text-muted-foreground">
          No step guarantees an outcome. Admission and visa decisions are made by the relevant
          institutions and authorities.
        </p>
      </section>
      <ConsultCTA />
    </>
  ),
});
