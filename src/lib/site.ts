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
    title: "Course & University Selection",
    text: "Understand your options and shortlist courses and institutions that fit your background and goals.",
  },
  {
    icon: "GraduationCap",
    title: "Admission Guidance",
    text: "Step-by-step guidance through the university application process and its requirements.",
  },
  {
    icon: "FileEdit",
    title: "Application Assistance",
    text: "Help organising application details so your submission is complete and clear.",
  },
  {
    icon: "FolderCheck",
    title: "Documentation Guidance",
    text: "Understand which documents are typically needed for applications and visas, and how to prepare them.",
  },
  {
    icon: "Stamp",
    title: "Visa Guidance",
    text: "Guidance on the study visa process and the documentation generally involved.",
  },
  {
    icon: "MessagesSquare",
    title: "Visa Interview Preparation",
    text: "Structured preparation sessions to help you approach a potential visa interview with confidence.",
  },
  {
    icon: "Languages",
    title: "IELTS / Language Guidance",
    text: "Clarity on language requirements, which vary by institution and country.",
  },
  {
    icon: "Home",
    title: "Accommodation Guidance",
    text: "Guidance on exploring accommodation options where applicable.",
  },
  {
    icon: "Map",
    title: "Travel Guidance",
    text: "Practical pointers for planning your journey to Europe.",
  },
  {
    icon: "Luggage",
    title: "Pre-Departure Guidance",
    text: "Prepare for the transition — what to expect and what to organise before you leave.",
  },
] as const;

export const steps = [
  {
    title: "Initial Consultation",
    text: "We understand your education background, goals and preferred destination.",
  },
  {
    title: "Course & Destination Guidance",
    text: "We explore suitable study pathways based on your profile and available options.",
  },
  {
    title: "Application Preparation",
    text: "We guide you through the required application information and documentation.",
  },
  {
    title: "Visa Guidance",
    text: "We provide guidance on the study visa process and required documentation.",
  },
  {
    title: "Pre-Departure Guidance",
    text: "We help you prepare for the next stage of your journey.",
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

export const studyLevels = ["Bachelor's", "Master's", "Foundation / Pathway", "Not sure yet"];
export const interests = [
  "Business & Management",
  "Engineering & Technology",
  "Computer Science & IT",
  "Health & Life Sciences",
  "Hospitality & Tourism",
  "Arts & Humanities",
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

export const testimonials: Testimonial[] = [
  {
    name: "Arjun Sharma",
    from: "India",
    fromFlag: "🇮🇳",
    to: "Serbia",
    toFlag: "🇷🇸",
    countrySlug: "serbia",
    quote:
      "EuroBridge Education guided me throughout my admission and visa process. The team was always available when I needed help. A great experience overall!",
  },
  {
    name: "Karanveer Singh",
    from: "India",
    fromFlag: "🇮🇳",
    to: "Malta",
    toFlag: "🇲🇹",
    countrySlug: "malta",
    course: "Business",
    quote:
      "From choosing my course to completing my visa process, EuroBridge supported me at every step. I’m now studying Business in Malta and really happy with my journey.",
  },
  {
    name: "Simran Kaur",
    from: "India",
    fromFlag: "🇮🇳",
    to: "Lithuania",
    toFlag: "🇱🇹",
    countrySlug: "lithuania",
    quote:
      "The team explained everything clearly and helped me prepare my documents properly. Their guidance made my study-abroad process much easier.",
  },
  {
    name: "Rahul Kumar",
    from: "India",
    fromFlag: "🇮🇳",
    to: "Romania",
    toFlag: "🇷🇴",
    countrySlug: "romania",
    quote:
      "EuroBridge helped me understand my university options and guided me through the admission process. Their support made the whole journey much more comfortable.",
  },
  {
    name: "Jaspreet Singh",
    from: "India",
    fromFlag: "🇮🇳",
    to: "Latvia",
    toFlag: "🇱🇻",
    countrySlug: "latvia",
    quote:
      "I received helpful guidance from the initial counselling until my visa application. The team was responsive and professional throughout the process.",
  },
  {
    name: "Priya Verma",
    from: "India",
    fromFlag: "🇮🇳",
    to: "Slovakia",
    toFlag: "🇸🇰",
    countrySlug: "slovakia",
    quote:
      "Very helpful and supportive team. They explained the admission and visa steps clearly and kept me updated throughout my application.",
  },
  {
    name: "Mandeep Singh",
    from: "India",
    fromFlag: "🇮🇳",
    to: "Malta",
    toFlag: "🇲🇹",
    countrySlug: "malta",
    course: "BA Business Studies",
    quote:
      "EuroBridge Education made my journey to study in Malta simple and stress-free. From choosing the right course to admission and visa guidance, their team supported me at every step. I’m now happily pursuing my BA in Business Studies in Malta and would definitely recommend EuroBridge Education to other students!",
  },
];
