import { createFileRoute } from "@tanstack/react-router";
import { PageHero, ConsultCTA } from "@/components/site";
import { Explorer } from "@/components/Explorer";
import hero from "@/assets/slovenia.jpg";

export const Route = createFileRoute("/destinations/")({
  head: () => ({
    meta: [
      { title: "Study Destinations in Europe | EuroBridge Education" },
      {
        name: "description",
        content:
          "Explore study destinations in Malta, Romania, Bulgaria, Slovenia, Serbia, Slovakia, Latvia and Lithuania with guidance from EuroBridge Education.",
      },
      { property: "og:title", content: "European Study Destinations | EuroBridge Education" },
      {
        property: "og:description",
        content: "Compare eight European study destinations for Indian students.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="Study destinations"
        title="Explore study in Europe"
        intro="Eight European countries, each with its own character. Filter to find where you might fit."
        image={hero}
        imageAlt="Ljubljana, Slovenia"
      />
      <section className="container-x py-20">
        <Explorer />
      </section>
      <ConsultCTA />
    </>
  ),
});
