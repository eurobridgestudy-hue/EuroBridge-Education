import { createFileRoute } from "@tanstack/react-router";
import { Phone, MessageCircle, Mail, MapPin } from "lucide-react";
import { contact, telUrl, whatsappUrl } from "@/lib/site";
import { PageHero, EnquiryForm, WhatsAppButton, CallButton } from "@/components/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact EuroBridge Education | Book a Free Consultation" },
      {
        name: "description",
        content:
          "Book a free consultation, chat on WhatsApp or call EuroBridge Education about studying in Europe.",
      },
      { property: "og:title", content: "Contact EuroBridge Education" },
      { property: "og:description", content: "Book a free study-in-Europe consultation." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let's talk about your plans"
        intro="Book a free consultation, message us on WhatsApp or give us a call."
      />
      <section
        id="enquiry"
        className="container-x grid scroll-mt-20 gap-12 py-20 lg:grid-cols-[1fr_1.7fr]"
      >
        <div>
          <ul className="space-y-5">
            {[
              [Phone, "Phone", contact.phone, telUrl()],
              [MessageCircle, "WhatsApp", contact.whatsapp, whatsappUrl(), true],
              [Mail, "Email", contact.email, `mailto:${contact.email}`],
              [
                MapPin,
                "Address",
                contact.office,
                `https://maps.google.com/?q=${encodeURIComponent(contact.office)}`,
                true,
              ],
            ].map(([I, l, v, href, external]) => {
              const Icon = I as typeof Phone;
              return (
                <li key={l as string} className="flex gap-4">
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-sky">
                    <Icon className="h-5 w-5 text-accent" />
                  </span>
                  <div>
                    <p className="text-sm text-muted-foreground">{l as string}</p>
                    {href ? (
                      <a
                        href={href as string}
                        target={external ? "_blank" : undefined}
                        rel={external ? "noopener noreferrer" : undefined}
                        className="font-medium text-primary transition-colors hover:text-accent hover:underline"
                      >
                        {v as string}
                      </a>
                    ) : (
                      <p className="font-medium text-primary">{v as string}</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
          <div className="mt-8 flex flex-wrap gap-3">
            <WhatsAppButton location="contact" />
            <CallButton location="contact" />
          </div>
          <div className="mt-8 overflow-hidden rounded-2xl border border-border shadow-sm">
            <iframe
              title="Office Location - EuroBridge Education"
              src="https://maps.google.com/maps?q=Plot+15,+Industrial+Area+A,+Suffian+Bagh+Chowk,+Ludhiana,+Punjab,+India&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="h-64 w-full border-0"
              loading="lazy"
            />
          </div>
        </div>
        <EnquiryForm />
      </section>
    </>
  ),
});
