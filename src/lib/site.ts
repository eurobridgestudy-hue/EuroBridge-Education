// Central, editable site content. Replace [PLACEHOLDER] values with verified details.
export const contact = {
  phone: "+91 89688 67562",
  phoneHref: "+918968867562",
  whatsapp: "+91 9688 67562",
  whatsappNumber: "91968867562",
  email: "eurobridge.study@gmail.com",
  office: "Plot 15, Industrial Area A, Suffian Bagh Chowk, Ludhiana, Punjab, India",
  hours: "",
  whatsappMessage: "Hello EuroBridge Education, I would like to discuss studying in Europe.",
};

export const whatsappUrl = (msg = contact.whatsappMessage) =>
  contact.whatsappNumber
    ? `https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(msg)}`
    : `https://wa.me/?text=${encodeURIComponent(msg)}`;
export const telUrl = () => (contact.phoneHref ? `tel:${contact.phoneHref}` : "/contact");

import { recordAnalyticsEvent } from "./admin-store";

export function track(event: string, data: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  const w = window as unknown as { dataLayer?: unknown[] };
  w.dataLayer = w.dataLayer || [];
  w.dataLayer.push({ event, ...data });
  try {
    recordAnalyticsEvent(event, data);
  } catch {
    // Ignore any tracking errors
  }
}

export const services = [
  {
    icon: "Compass",
    title: "University Selection",
    text: "Personalized shortlisting of accredited European universities and English-taught programmes aligned with your academic background and budget.",
  },
  {
    icon: "GraduationCap",
    title: "Application Support",
    text: "End-to-end guidance through university application portals, eligibility verification, entry criteria, and official admissions correspondence.",
  },
  {
    icon: "FolderCheck",
    title: "Document Guidance",
    text: "Complete transcript evaluations, apostille authentication advisory, and certified translation requirements specific to each European country.",
  },
  {
    icon: "FileText",
    title: "SOP & CV Support",
    text: "Professional structuring and review of your Statement of Purpose (SOP), academic CV, and recommendation letters to meet European university standards.",
  },
  {
    icon: "ShieldCheck",
    title: "Visa Guidance",
    text: "Comprehensive study visa checklist, financial documentation verification, bank statement guidelines, health insurance, and embassy filing.",
  },
  {
    icon: "MessagesSquare",
    title: "Interview Preparation",
    text: "Structured mock interview sessions and confidence coaching for both university admissions panels and embassy visa interview appointments.",
  },
  {
    icon: "Home",
    title: "Accommodation Support",
    text: "Practical guidance on securing university dormitories, accredited student residences, and private shared student rentals near campus.",
  },
  {
    icon: "Luggage",
    title: "Pre-Departure Support",
    text: "Pre-departure checklist, flight guidance, foreign exchange, packing essentials, and orientation on cultural transition and student life in Europe.",
  },
] as const;

export const steps = [
  {
    title: "Consultation",
    text: "Free 1-on-1 profile evaluation to assess your academic history, career objectives, preferred destinations, and financial budget.",
  },
  {
    title: "University Selection",
    text: "Shortlisting accredited European universities and English-taught degree programmes with realistic admission feasibility.",
  },
  {
    title: "Application",
    text: "Full application preparation, including document packaging, SOP & CV structuring, and submission before official deadlines.",
  },
  {
    title: "Visa Guidance",
    text: "Step-by-step visa dossier preparation, financial proof compliance, embassy documentation, and mock interview practice.",
  },
  {
    title: "Pre-Departure",
    text: "Briefing on student accommodation, travel arrangements, health insurance, forex cards, and arrival orientation in Europe.",
  },
];

export const audiences = [
  {
    title: "Class 12 Students",
    text: "Explore Bachelor's pathways in Europe and understand what applying involves after school.",
  },
  {
    title: "Bachelor's Applicants",
    text: "Shortlist undergraduate programmes and prepare a clear, complete application.",
  },
  {
    title: "Master's Applicants",
    text: "Find postgraduate options aligned with your degree, experience and career direction.",
  },
  {
    title: "Students Exploring Europe",
    text: "Not sure where to start? Compare destinations and options with a guided conversation.",
  },
  {
    title: "Admission Guidance Seekers",
    text: "Get structured help understanding application steps, timelines and documents.",
  },
  {
    title: "Visa Guidance Seekers",
    text: "Understand the study visa process, documentation and interview preparation.",
  },
];

export const whyEurope = [
  {
    title: "Diverse destinations",
    text: "From Mediterranean islands to Baltic capitals — each country offers a distinct setting.",
  },
  {
    title: "Wide range of programmes",
    text: "Many institutions offer programmes across disciplines, including some taught in English.",
  },
  {
    title: "International classrooms",
    text: "Study alongside students from different countries and backgrounds.",
  },
  { title: "Cultural exposure", text: "Experience new languages, histories and ways of living." },
  {
    title: "Travel & lifestyle",
    text: "Many destinations are well connected, making it easier to explore the region.",
  },
  {
    title: "Varied pathways",
    text: "Different academic and career pathways — outcomes always depend on individual circumstances.",
  },
];

export const faqs = [
  {
    q: "Which European countries do you assist with?",
    a: "We currently guide students for Malta, Romania, Bulgaria, Slovenia, Serbia, Slovakia, Latvia and Lithuania.",
  },
  {
    q: "Do you help with university applications?",
    a: "Yes. We provide guidance through the application process, including understanding requirements and preparing information and documents. Admission decisions are made by the institutions.",
  },
  {
    q: "Do you provide visa guidance?",
    a: "Yes. We provide guidance on the study visa process and documentation. Visa decisions are made solely by the relevant authorities.",
  },
  {
    q: "Can you help me choose a course?",
    a: "Yes. We discuss your academic background, interests and goals to help you explore suitable course options.",
  },
  {
    q: "Do I need IELTS?",
    a: "It depends. English-language requirements vary by institution, programme and country. Please confirm the latest requirements with the institution or speak with us.",
  },
  {
    q: "Can Class 12 students apply?",
    a: "Students who have completed Class 12 may explore Bachelor's programmes. Eligibility depends on each institution's requirements.",
  },
  {
    q: "Can Bachelor's students apply?",
    a: "Students with a Bachelor's degree may explore Master's programmes, subject to each institution's entry requirements.",
  },
  {
    q: "Can Master's students apply?",
    a: "Yes, we can discuss further study options. Eligibility depends on the programme and institution.",
  },
  {
    q: "What documents are generally required?",
    a: "Commonly requested documents may include academic transcripts, a passport, language test results and a statement of purpose — but requirements vary. Always confirm with the institution or relevant authority.",
  },
  {
    q: "Do you help with visa interview preparation?",
    a: "Yes, we offer structured preparation to help you approach a potential visa interview.",
  },
  {
    q: "Can you help with accommodation?",
    a: "We provide guidance on exploring accommodation options where applicable.",
  },
  {
    q: "How can I contact EuroBridge Education?",
    a: "Use the enquiry form, chat on WhatsApp or call us. Our contact details are on the Contact page.",
  },
];

export const studyLevels = [
  "Bachelor's Degree",
  "Master's Degree",
  "Diploma / Pathway",
  "Doctorate / PhD",
  "Not sure yet",
];

export const interests = [
  "Computer Science & IT",
  "Business & Management",
  "Engineering & Technology",
  "Health & Life Sciences",
  "Hospitality & Tourism",
  "Economics & Finance",
  "Arts & Humanities",
  "Not sure yet",
];

export const intakes = [
  "Autumn / Winter 2026 (Aug–Nov 2026)",
  "Spring 2027 (Jan–Mar 2027)",
  "Autumn 2027",
  "Flexible / Need Advice",
];

export const tuitionBudgets = [
  "Under €3,000 / ₹2.7 Lakhs per year",
  "€3,000 – €5,000 / ₹2.7L – ₹4.5L per year",
  "€5,000 – €8,000 / ₹4.5L – ₹7.2L per year",
  "€8,000+ / ₹7.2 Lakhs+ per year",
  "Flexible / Need Advice",
];

export const englishLevels = [
  "Have IELTS / PTE / TOEFL Score",
  "Studied in English (Medium of Instruction - MOI)",
  "Planning to take English Test",
  "Looking for Universities Without IELTS",
  "Not sure yet",
];

export interface Testimonial {
  name: string;
  from: string;
  fromFlag: string;
  to: string;
  toFlag: string;
  countrySlug: string;
  course?: string;
  quote: string;
}

export const testimonials: Testimonial[] = [];
