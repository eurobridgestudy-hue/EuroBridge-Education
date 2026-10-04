import { createFileRoute } from "@tanstack/react-router";
import { PageHero, FaqList, ConsultCTA } from "@/components/site";

export const Route = createFileRoute("/faqs")({
  head: () => ({
    meta: [
      { title: "FAQs — Studying in Europe from India | EuroBridge Education" },
      {
        name: "description",
        content:
          "Answers to common questions about studying in Europe, IELTS, admissions, documents and study visa guidance.",
      },
      { property: "og:title", content: "Frequently Asked Questions | EuroBridge Education" },
      { property: "og:description", content: "Common questions about studying in Europe." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="FAQs"
        title="Frequently asked questions"
        intro="General answers — for country or institution specifics, confirm the latest requirements with the institution, authority or our team."
      />
      <section className="container-x max-w-4xl py-20">
        <FaqList />
      </section>
      <ConsultCTA />
    </>
  ),
});
