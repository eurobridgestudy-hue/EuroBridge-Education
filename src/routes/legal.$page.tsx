import { createFileRoute, notFound, Link } from "@tanstack/react-router";
import {
  Shield,
  FileText,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Lock,
} from "lucide-react";
import { contact, telUrl, whatsappUrl } from "@/lib/site";

interface PolicySection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  callout?: {
    type: "info" | "warning" | "success";
    text: string;
  };
}

interface PolicyPage {
  slug: string;
  title: string;
  subtitle: string;
  effectiveDate: string;
  sections: PolicySection[];
}

const policyNav = [
  { slug: "privacy", label: "Privacy Policy", icon: Lock },
  { slug: "terms", label: "Terms & Conditions", icon: FileText },
  { slug: "cookies", label: "Cookie Policy", icon: Shield },
  { slug: "disclaimer", label: "Disclaimer", icon: AlertTriangle },
  { slug: "refund", label: "Refund Policy", icon: CheckCircle2 },
  { slug: "anti-fraud", label: "Anti-Fraud Policy", icon: Shield },
];

const pages: Record<string, PolicyPage> = {
  privacy: {
    slug: "privacy",
    title: "Privacy & Data Protection Policy",
    subtitle:
      "How EuroBridge Education collects, safeguards, uses and protects student information in compliance with data privacy standards.",
    effectiveDate: "October 2026",
    sections: [
      {
        heading: "1. Data Controller & Scope",
        paragraphs: [
          "EuroBridge Education ('we', 'us', 'our') is a premier overseas education consultancy situated at Plot 15, Industrial Area A, Suffian Bagh Chowk, Ludhiana, Punjab, India. This Privacy Policy governs all personal data collected through our official website (eurobridge.in), consultation forms, WhatsApp correspondence, telephone calls, and in-person consultations at our Ludhiana advisory office.",
          "We are dedicated to safeguarding the privacy and personal data of Indian students and their families who entrust us with their academic background and European education ambitions.",
        ],
      },
      {
        heading: "2. Information We Collect",
        paragraphs: [
          "To provide bespoke university counseling and admission guidance, we collect specific personal and educational information that you voluntarily submit:",
        ],
        bullets: [
          "Contact Data: Full name, mobile phone number, WhatsApp number, email address, residential city, and state of residence.",
          "Academic Credentials: Highest qualification (Class 12 / Higher Secondary, Polytechnic Diploma, Bachelor's degree, Master's degree), year of graduation, percentage or GPA, mark sheets, transcripts, and institution attended.",
          "Language & Standardized Test Scores: Scores or test status for IELTS, TOEFL, PTE Academic, Duolingo English Test, or Medium of Instruction (MOI) certificates.",
          "Study Preferences: Target European destinations (including Malta, Romania, Bulgaria, Slovenia, Slovakia, Lithuania, Serbia, Latvia), chosen field of study (e.g. Business, Computer Science & IT, Engineering, Health Sciences, Tourism & Hospitality), intended intake, and budget.",
          "Documentation for Applications (upon engagement): Scanned copies of valid passports, academic apostilles, financial sponsorship declarations, statements of purpose (SOP), and curriculum vitae (CV).",
        ],
      },
      {
        heading: "3. How We Use Your Information",
        paragraphs: [
          "We process your data strictly for legitimate educational advisory purposes:",
        ],
        bullets: [
          "Evaluating your academic background and matching your profile with recognized universities and colleges in Europe.",
          "Assisting in the preparation, compilation, and authorized submission of university admission applications.",
          "Communicating application status updates, conditional/unconditional offer letters, tuition payment instructions, and acceptance protocols.",
          "Assisting with embassy study visa appointment bookings, document verification checklists, and mock visa interview preparation.",
          "Responding promptly to enquiries submitted through our website contact forms, WhatsApp, or telephone.",
        ],
      },
      {
        heading: "4. Zero Sale of Data & Strict Confidentiality",
        paragraphs: [
          "EuroBridge Education operates with unwavering professional integrity. We NEVER sell, lease, trade, or monetize your personal information or contact details to third-party telemarketing agencies, commercial brokers, or advertising networks.",
        ],
        callout: {
          type: "success",
          text: "Your contact details are strictly kept within EuroBridge Education and used exclusively to service your higher education guidance requests.",
        },
      },
      {
        heading: "5. Authorised Data Sharing",
        paragraphs: [
          "We share personal information strictly on a need-to-know basis and only with your explicit authorization:",
        ],
        bullets: [
          "Admissions Departments of European Universities & Colleges where you have explicitly authorized an application.",
          "Official Consular, Embassy & Visa Application Centres (e.g. VFS Global, national embassies) for the purpose of verifying student visa documentation.",
          "Authorized Translation, Apostille & Attestation Services when requested by you to authenticate academic certificates.",
          "Law enforcement or judicial authorities when required by Indian law or destination country immigration regulations.",
        ],
      },
      {
        heading: "6. Data Security & Retention",
        paragraphs: [
          "We implement technical and organizational security controls to protect your data from unauthorized access, accidental loss, disclosure, or alteration. All electronic communication and forms are transmitted over encrypted SSL/TLS channels.",
          "Physical documents brought to our Ludhiana office are reviewed in your presence and promptly returned. We retain your records only for the duration necessary to fulfill the counseling and visa application cycle, after which records are securely archived or purged upon request.",
        ],
      },
      {
        heading: "7. Your Rights & Contact Details",
        paragraphs: [
          "You have the right to inspect any personal data we hold about you, request corrections to inaccuracies, or ask for the deletion of your consultation record at any time.",
          "For privacy inquiries, data access requests, or grievance redressal, please contact our Compliance Officer at eurobridge.study@gmail.com or call +91 89688 67562.",
        ],
      },
    ],
  },
  terms: {
    slug: "terms",
    title: "Terms & Conditions of Guidance Services",
    subtitle:
      "Terms governing the use of EuroBridge Education's website, educational counseling, and advisory services.",
    effectiveDate: "October 2026",
    sections: [
      {
        heading: "1. Agreement to Terms",
        paragraphs: [
          "These Terms and Conditions constitute a legally binding agreement between you ('the Student', 'Applicant', or 'User') and EuroBridge Education ('EuroBridge', 'we', or 'us'). By accessing eurobridge.in or engaging our counseling services, you acknowledge that you have read, understood, and agreed to be bound by these Terms.",
        ],
      },
      {
        heading: "2. Nature of Advisory Services",
        paragraphs: [
          "EuroBridge Education provides educational counseling, university matching, admission filing assistance, and visa documentation guidance for Indian students seeking higher education in Europe (specializing in Malta, Romania, Bulgaria, Slovenia, Slovakia, Lithuania, Serbia, and Latvia).",
          "Our role is strictly consultative. We assist students in understanding eligibility requirements, compiling necessary paperwork, communicating with educational institutions, and navigating official consular guidelines.",
        ],
      },
      {
        heading: "3. No Guarantee of University Admission or Visa Issuance",
        paragraphs: [
          "Prospective students and their parents must understand and acknowledge the following critical terms:",
        ],
        bullets: [
          "Admission Authority: Admissions decisions, course availability, prerequisite evaluations, and scholarship awards are made solely and independently by individual universities and colleges based on their own academic criteria and institutional quotas.",
          "Visa Authority: The grant, refusal, delay, or duration of study visas and residence permits is at the sole and sovereign discretion of the relevant national government immigration authorities and their designated embassies/consulates.",
          "Non-Guarantee: EuroBridge Education expressly disclaims any guarantee, promise, or warranty of admission, visa issuance, processing speed, or migration outcome. No employee or representative of EuroBridge Education is authorized to make contrary promises.",
        ],
        callout: {
          type: "warning",
          text: "EuroBridge Education provides professional guidance based on verified university criteria, but we can never guarantee an admission or visa outcome, as these rest exclusively with sovereign authorities and institutions.",
        },
      },
      {
        heading: "4. Student Responsibilities & Document Authenticity",
        paragraphs: [
          "The Student covenants and warrants that all educational mark sheets, degree certificates, identity proofs, financial records, language test results, and references submitted to EuroBridge Education are authentic, original, unmodified, and accurate.",
          "Any submission of fraudulent, altered, or fabricated documents will result in immediate termination of all advisory services without notice or liability.",
        ],
      },
      {
        heading: "5. Financial Payments & Tuition Fees",
        paragraphs: [
          "All official institutional tuition fees, university application charges, dormitory deposits, and embassy visa application fees must be paid directly by the student or their family to the official bank accounts of the relevant university, college, or embassy.",
          "EuroBridge Education does not collect tuition fees into private accounts. Students receive official university fee invoices and wire instructions directly from the admitting institutions.",
        ],
      },
      {
        heading: "6. Limitation of Liability",
        paragraphs: [
          "EuroBridge Education shall not be liable for any direct, indirect, incidental, or consequential damages resulting from university rejections, visa refusals, changes in immigration policies, embassy delays, airline cancellations, or force majeure events beyond our reasonable control.",
        ],
      },
      {
        heading: "7. Governing Law & Jurisdiction",
        paragraphs: [
          "These Terms and Conditions shall be governed by and interpreted in accordance with the laws of India. Any disputes arising out of or related to our services shall be subject to the exclusive jurisdiction of the competent courts in Ludhiana, Punjab, India.",
        ],
      },
    ],
  },
  cookies: {
    slug: "cookies",
    title: "Cookie Policy & Web Technologies",
    subtitle:
      "Explanation of how cookies and tracking technologies are utilized to provide a seamless browsing experience on our website.",
    effectiveDate: "October 2026",
    sections: [
      {
        heading: "1. What Are Cookies?",
        paragraphs: [
          "Cookies are small text files placed on your computer, tablet, or smartphone when you visit a website. They allow the website to recognize your browser, maintain session state, and deliver a smooth user experience.",
        ],
      },
      {
        heading: "2. Types of Cookies We Use",
        paragraphs: [
          "We use only essential and lightweight functional cookies on eurobridge.in:",
        ],
        bullets: [
          "Essential & Functional Cookies: Necessary for site security, navigation, page routing (TanStack Router), and preventing form spam.",
          "Preference Cookies: Remember your search selections on our Country Explorer (e.g. selected study level or destination country) so you do not have to re-enter them on page reloads.",
          "Anonymous Performance Analytics: Aggregated anonymous data regarding site traffic to help us optimize page load speeds and ensure all course info remains easily accessible.",
        ],
      },
      {
        heading: "3. Third-Party Integrations",
        paragraphs: [
          "Our website incorporates third-party embeds that may set standard technical cookies:",
          "• Google Maps Embed: Powers the interactive office location map on our Contact page (Plot 15, Industrial Area A, Suffian Bagh Chowk, Ludhiana).",
          "• Google Fonts: Ensures our clean, accessible typography renders consistently across different operating systems and web browsers.",
        ],
      },
      {
        heading: "4. Managing and Disabling Cookies",
        paragraphs: [
          "You have the right to decide whether to accept or reject cookies. You can set or amend your web browser controls to accept or refuse cookies. If you choose to reject cookies, you may still use our website, though some interactive features (such as dynamic filters) may experience reduced functionality.",
          "For further information on how to manage cookies, visit allaboutcookies.org or check your browser's settings menu.",
        ],
      },
    ],
  },
  disclaimer: {
    slug: "disclaimer",
    title: "Educational & Visa Guidance Disclaimer",
    subtitle:
      "Important notice outlining our advisory status, institutional independence, and regulatory boundaries.",
    effectiveDate: "October 2026",
    sections: [
      {
        heading: "1. Advisory Role & Regulatory Status",
        paragraphs: [
          "EuroBridge Education is an independent private overseas education advisory consultancy based in Ludhiana, Punjab, India. EuroBridge Education is NOT an embassy, consulate, high commission, visa processing center, or government immigration department.",
          "We do not possess or claim sovereign authority to issue visas, permits, or entry clearances. Our services are strictly educational counseling, profile matching, admission guidance, and documentation support.",
        ],
        callout: {
          type: "info",
          text: "EuroBridge Education is an overseas education consultancy providing guidance to students. We are not a government agency and do not make admission or visa decisions.",
        },
      },
      {
        heading: "2. University Admissions & Course Information",
        paragraphs: [
          "All course details, tuition fees, entry criteria, and intake deadlines displayed on this website are compiled from publicly available university prospectuses and official institutional notices. While we strive to ensure all information is accurate and current, universities in Europe may update their curriculum, fee structure, or admission deadlines without prior notice.",
          "Final admission decisions rest entirely with the respective educational institutions. No admission can be guaranteed by any third party.",
        ],
      },
      {
        heading: "3. Tuition Fees & Living Expense Estimates",
        paragraphs: [
          "Tuition figures (e.g. €1,500 – €14,000+ per year) and living expense benchmarks published on our country profiles are indicative estimates. Exact tuition fees depend upon the specific institution, degree program, course credits, and non-EU fee brackets. Always refer to official institutional offer letters and fee schedules for exact payable amounts.",
        ],
      },
      {
        heading: "4. Sovereign Visa Decisions",
        paragraphs: [
          "The decision to approve or refuse a student visa application rests entirely and exclusively with the visa officers and immigration authorities of the destination country. EuroBridge Education has no influence over visa outcomes, processing timelines, or interview schedules. Past successful outcomes do not guarantee future visa approvals for any applicant.",
        ],
      },
    ],
  },
  refund: {
    slug: "refund",
    title: "Refund & Cancellation Policy",
    subtitle:
      "Transparent fee policies, cancellation conditions, and non-refundable third-party fee specifications.",
    effectiveDate: "October 2026",
    sections: [
      {
        heading: "1. 100% Free Initial Counseling",
        paragraphs: [
          "EuroBridge Education provides comprehensive initial profile assessments, course exploration, and university counseling completely free of charge. You are under no obligation to make any payment to consult with our counselors.",
        ],
        callout: {
          type: "success",
          text: "Our initial profile evaluations and destination discussions are 100% free of charge with zero upfront commitment.",
        },
      },
      {
        heading: "2. Third-Party & Official University Fees",
        paragraphs: [
          "Certain costs incurred during the application process are payable directly to external official bodies and are non-refundable by those entities:",
        ],
        bullets: [
          "University Application & Evaluation Fees: Charged directly by European universities to review international qualifications. These are subject exclusively to the respective university's published policy.",
          "Embassy & Consular Visa Fees: Application fees paid to embassies or official visa application centres (such as VFS Global) are non-refundable regardless of the visa decision.",
          "Apostille, Notarization & Translation Costs: Fees paid to translation or document authentication authorities are non-refundable once work has commenced.",
        ],
      },
      {
        heading: "3. Consultancy Service Fees & Cancellation",
        paragraphs: [
          "Where a formal retainer agreement is executed with EuroBridge Education for comprehensive processing and documentation assistance:",
          "• Before Application Filing: If an applicant decides to discontinue services prior to the preparation and submission of any university applications, a partial refund or fee credit may be issued on a pro-rata basis minus administrative preparation costs.",
          "• After Application Filing: Once university applications have been prepared and submitted to institutions on the student's behalf, consultancy processing retainers are deemed fully earned and non-refundable.",
        ],
      },
      {
        heading: "4. Non-Refundability for Misrepresentation or Forgery",
        paragraphs: [
          "If an admission application or visa application is rejected due to fraudulent, forged, or altered documentation supplied by the applicant, or due to willful concealment of prior visa rejections or criminal records, no refund of any fees will be granted.",
        ],
      },
      {
        heading: "5. How to Request a Refund",
        paragraphs: [
          "Eligible refund requests must be submitted in writing to eurobridge.study@gmail.com along with original payment receipts, student details, and the specific grounds for the request. Approved refunds are processed via bank wire transfer within 14 to 21 working days.",
        ],
      },
    ],
  },
  "anti-fraud": {
    slug: "anti-fraud",
    title: "Anti-Fraud & Document Integrity Policy",
    subtitle:
      "Our firm commitment to genuine student recruitment, ethical practices, and zero tolerance for forged documentation.",
    effectiveDate: "October 2026",
    sections: [
      {
        heading: "1. Ethical Commitment to Genuine Education",
        paragraphs: [
          "EuroBridge Education is strictly dedicated to assisting genuine students who possess the academic foundation, financial capability, and intent to pursue legitimate higher education in Europe. We maintain an uncompromising stance against fraudulent practices, unauthorized immigration schemes, and academic dishonesty.",
        ],
        callout: {
          type: "warning",
          text: "EuroBridge Education maintains a strict zero-tolerance policy against forged documents, fake academic records, and misrepresented financial certificates.",
        },
      },
      {
        heading: "2. Document Authenticity Standards",
        paragraphs: [
          "All applicants must submit original, verifiable academic records, financial statements, and language certificates. We actively verify credentials:",
        ],
        bullets: [
          "Academic Credentials: High school mark sheets and university degrees are verified against recognized examination boards (CBSE, ICSE, PSEB, State Boards, and UGC/AICTE-recognized universities).",
          "Language Test Certificates: IELTS, TOEFL, PTE, and Duolingo scorecards are verified directly through official online institutional portals.",
          "Financial Documents: Proof of funds, sponsorship affidavits, and bank statements must reflect genuine, legitimate financial capability.",
        ],
      },
      {
        heading: "3. Consequences of Document Falsification",
        paragraphs: [
          "In the event that an applicant provides fraudulent, altered, or counterfeit documents:",
          "• Immediate termination of all advisory and representation services by EuroBridge Education.",
          "• Immediate cancellation and withdrawal of all pending university applications.",
          "• Formal notification to the relevant educational institutions and, where required, reporting to relevant law enforcement and immigration authorities.",
          "• Forfeiture of all fees paid.",
        ],
      },
      {
        heading: "4. Genuine Student Assessment",
        paragraphs: [
          "Our counseling team conducts structured interviews with every applicant to evaluate academic intent, language proficiency, course relevance, and career aspirations. We guide only those students whose educational goals align genuinely with their chosen European program.",
        ],
      },
      {
        heading: "5. Confidential Reporting",
        paragraphs: [
          "If you suspect fraudulent activity, unauthorized agents operating in our name, or any violation of this policy, please report it confidentially to our Compliance Office at eurobridge.study@gmail.com.",
        ],
      },
    ],
  },
};

export const Route = createFileRoute("/legal/$page")({
  loader: ({ params }) => {
    const p = pages[params.page];
    if (!p) throw notFound();
    return p;
  },
  head: ({ loaderData }) =>
    loaderData
      ? {
          meta: [
            { title: `${loaderData.title} | EuroBridge Education` },
            {
              name: "description",
              content: `${loaderData.title} — Official policy document for EuroBridge Education, Ludhiana, India.`,
            },
            { property: "og:title", content: `${loaderData.title} | EuroBridge Education` },
            {
              property: "og:description",
              content: `${loaderData.title} for EuroBridge Education.`,
            },
            { property: "og:type", content: "article" },
            { name: "twitter:card", content: "summary" },
          ],
        }
      : {},
  component: PolicyPageView,
});

function PolicyPageView() {
  const p = Route.useLoaderData();

  return (
    <div className="bg-background py-16 md:py-24">
      {/* Top Header */}
      <div className="container-x">
        <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground mb-6">
          <Link to="/" className="hover:text-primary transition-colors">
            Home
          </Link>
          <span>/</span>
          <span className="text-primary font-semibold">Policies & Legal</span>
          <span>/</span>
          <span className="text-accent">{p.title}</span>
        </div>

        <div className="rounded-3xl bg-gradient-to-br from-primary via-slate-900 to-primary p-8 md:p-14 text-primary-foreground shadow-card border border-gold/20 relative overflow-hidden">
          <div className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-gold/15 blur-3xl" />
          <div className="relative max-w-3xl">
            <span className="inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-wider text-gold">
              Official Policy Document · EuroBridge Education
            </span>
            <h1 className="mt-4 text-3xl font-extrabold md:text-5xl leading-tight">
              {p.title}
            </h1>
            <p className="mt-4 text-base md:text-lg text-primary-foreground/80 leading-relaxed">
              {p.subtitle}
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-primary-foreground/70 border-t border-white/10 pt-4">
              <span>Effective Date: <strong>{p.effectiveDate}</strong></span>
              <span>•</span>
              <span>Jurisdiction: <strong>Ludhiana, Punjab, India</strong></span>
              <span>•</span>
              <span className="text-emerald-400 flex items-center gap-1 font-medium">
                <CheckCircle2 className="h-3.5 w-3.5" /> Legally Active & Valid
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content & Sidebar */}
      <div className="container-x mt-12 grid gap-10 lg:grid-cols-[1fr_2.5fr] items-start">
        {/* Sidebar Nav */}
        <aside className="sticky top-28 space-y-6">
          <div className="rounded-2xl border border-border/80 bg-card p-5 shadow-xs">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-primary border-b border-border/70 pb-3">
              All Policies & Agreements
            </h3>
            <nav className="mt-3 space-y-1">
              {policyNav.map((item) => {
                const Icon = item.icon;
                const isActive = item.slug === p.slug;
                return (
                  <Link
                    key={item.slug}
                    to="/legal/$page"
                    params={{ page: item.slug }}
                    className={`flex items-center justify-between gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all ${
                      isActive
                        ? "bg-primary text-primary-foreground font-semibold shadow-xs"
                        : "text-muted-foreground hover:bg-muted hover:text-primary"
                    }`}
                  >
                    <span className="flex items-center gap-2.5">
                      <Icon className={`h-4 w-4 ${isActive ? "text-gold" : "text-accent"}`} />
                      {item.label}
                    </span>
                    {isActive && <ArrowRight className="h-3.5 w-3.5 text-gold" />}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Quick Contact & Office Box */}
          <div className="rounded-2xl border border-border/80 bg-muted/40 p-5 text-xs text-muted-foreground space-y-3">
            <p className="font-bold uppercase tracking-wider text-primary text-[11px]">
              Compliance & Grievance Office
            </p>
            <p className="flex items-start gap-2">
              <MapPin className="h-4 w-4 text-accent shrink-0 mt-0.5" />
              <span>{contact.office}</span>
            </p>
            <p className="flex items-center gap-2">
              <Phone className="h-4 w-4 text-accent shrink-0" />
              <a href={telUrl()} className="text-primary hover:underline font-medium">
                {contact.phone}
              </a>
            </p>
            <p className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-accent shrink-0" />
              <a href={`mailto:${contact.email}`} className="text-primary hover:underline font-medium">
                {contact.email}
              </a>
            </p>
          </div>
        </aside>

        {/* Policy Document Body */}
        <article className="space-y-8 rounded-3xl border border-border/80 bg-card p-8 md:p-12 shadow-card">
          {p.sections.map((section, idx) => (
            <section key={idx} className="border-b border-border/60 pb-8 last:border-b-0 last:pb-0">
              <h2 className="font-display text-xl font-bold text-primary md:text-2xl">
                {section.heading}
              </h2>
              <div className="mt-4 space-y-3 text-sm md:text-base leading-relaxed text-foreground/85">
                {section.paragraphs.map((para, pIdx) => (
                  <p key={pIdx}>{para}</p>
                ))}
              </div>

              {section.bullets && (
                <ul className="mt-4 space-y-2.5 pl-2 text-sm md:text-base text-foreground/85">
                  {section.bullets.map((bullet, bIdx) => (
                    <li key={bIdx} className="flex items-start gap-3">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.callout && (
                <div
                  className={`mt-5 rounded-2xl p-5 text-sm leading-relaxed border ${
                    section.callout.type === "warning"
                      ? "border-amber-300 bg-amber-500/10 text-amber-900"
                      : section.callout.type === "success"
                        ? "border-emerald-300 bg-emerald-500/10 text-emerald-900"
                        : "border-sky-300 bg-sky/50 text-primary"
                  }`}
                >
                  <p className="font-medium">{section.callout.text}</p>
                </div>
              )}
            </section>
          ))}

          {/* Document Footer Verification */}
          <div className="rounded-2xl border border-dashed border-border bg-muted/30 p-6 text-xs text-muted-foreground space-y-2">
            <p className="font-semibold text-primary">
              Official Notice from EuroBridge Education:
            </p>
            <p>
              This document is formally enacted and maintained under Indian law by EuroBridge Education. By utilizing our counseling services or visiting our website, you agree to these provisions. Any amendments will be published directly to this URL with a revised effective date.
            </p>
            <p className="pt-2 text-[11px] text-muted-foreground/75">
              EuroBridge Education · Plot 15, Industrial Area A, Suffian Bagh Chowk, Ludhiana, Punjab, India.
            </p>
          </div>
        </article>
      </div>
    </div>
  );
}
