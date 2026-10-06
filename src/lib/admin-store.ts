export type LeadStatus = "new" | "contacted" | "in_progress" | "enrolled" | "archived";

export interface Lead {
  id: string;
  name: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  city?: string;
  qualification?: string;
  year?: string;
  level?: string;
  field?: string;
  country?: string;
  intake?: string;
  ielts?: string;
  budget?: string;
  message?: string;
  status: LeadStatus;
  notes?: string;
  createdAt: string;
}

export interface AnalyticsEvent {
  id: string;
  type: "page_view" | "whatsapp_click" | "phone_click" | "cta_click" | "form_submit" | "destination_view";
  label?: string;
  location?: string;
  country?: string;
  path?: string;
  timestamp: string;
}

export interface AnalyticsSummary {
  totalPageViews: number;
  uniqueVisitors: number;
  totalWhatsAppClicks: number;
  totalPhoneClicks: number;
  totalCtaClicks: number;
  totalFormSubmissions: number;
  conversionRate: number;
  topDestinations: { name: string; views: number }[];
  clicksByLocation: { location: string; count: number }[];
  dailyViews: { date: string; views: number; leads: number; whatsapp: number }[];
}

// Credentials
export const ADMIN_CREDENTIALS = {
  username: "EuroBridge Education admin portal",
  altUsername: "eurobridge_admin",
  password: "JAndu@135",
};

const LEADS_STORAGE_KEY = "eurobridge_admin_leads_v2";
const EVENTS_STORAGE_KEY = "eurobridge_analytics_events_v2";
const SESSION_STORAGE_KEY = "eurobridge_admin_session_v2";

const initialLeads: Lead[] = [
  {
    id: "lead_1728001001",
    name: "Arjun Sharma",
    phone: "+91 98765 43210",
    whatsapp: "+91 98765 43210",
    email: "arjun.sharma@gmail.com",
    city: "Ludhiana",
    qualification: "Bachelor's degree",
    year: "2024",
    level: "Master's",
    field: "Computer Science & IT",
    country: "Serbia",
    ielts: "IELTS",
    message: "Interested in Master's in IT in Serbia. Need visa guidance for 2026 intake.",
    status: "in_progress",
    notes: "Counseling done on 2nd Oct. Transcripts verified. Waiting for apostille.",
    createdAt: "2026-10-02T10:15:00Z",
  },
  {
    id: "lead_1728001002",
    name: "Karanveer Singh",
    phone: "+91 98140 12345",
    whatsapp: "+91 98140 12345",
    email: "karanveer.singh@yahoo.com",
    city: "Amritsar",
    qualification: "Class 12",
    year: "2025",
    level: "Bachelor's",
    field: "Business & Management",
    country: "Malta",
    ielts: "Medium of Instruction (MOI)",
    message: "Seeking admission for BA Business Studies in Malta without IELTS.",
    status: "enrolled",
    notes: "Offer letter received from MCAST Malta. Visa file in preparation.",
    createdAt: "2026-10-02T14:30:00Z",
  },
  {
    id: "lead_1728001003",
    name: "Simran Kaur",
    phone: "+91 98888 77665",
    whatsapp: "+91 98888 77665",
    email: "simran.kaur22@gmail.com",
    city: "Jalandhar",
    qualification: "Bachelor's degree",
    year: "2024",
    level: "Master's",
    field: "Health & Life Sciences",
    country: "Lithuania",
    ielts: "PTE Academic",
    message: "Vilnius University options for non-EU students and tuition deposit details.",
    status: "contacted",
    notes: "Sent curriculum syllabus. Follow-up scheduled for Tuesday.",
    createdAt: "2026-10-03T09:20:00Z",
  },
  {
    id: "lead_1728001004",
    name: "Rahul Kumar",
    phone: "+91 97110 54321",
    whatsapp: "+91 97110 54321",
    email: "rahul.k.delhi@outlook.com",
    city: "Delhi",
    qualification: "Class 12",
    year: "2025",
    level: "Bachelor's",
    field: "Engineering & Technology",
    country: "Romania",
    ielts: "Duolingo English Test",
    message: "Looking for English taught Computer Science or Tech programmes in Romania.",
    status: "new",
    notes: "Fresh lead from website homepage. Needs immediate callback.",
    createdAt: "2026-10-03T16:45:00Z",
  },
  {
    id: "lead_1728001005",
    name: "Jaspreet Singh",
    phone: "+91 94630 98765",
    whatsapp: "+91 94630 98765",
    email: "jaspreet.singh@gmail.com",
    city: "Bathinda",
    qualification: "Polytechnic Diploma",
    year: "2023",
    level: "Bachelor's",
    field: "Engineering & Technology",
    country: "Latvia",
    ielts: "Medium of Instruction (MOI)",
    message: "Latvia technical universities and February intake eligibility.",
    status: "contacted",
    notes: "Discussed RTU Riga options. Requested diploma marksheets for evaluation.",
    createdAt: "2026-10-04T08:10:00Z",
  },
  {
    id: "lead_1728001006",
    name: "Priya Verma",
    phone: "+91 98777 33221",
    whatsapp: "+91 98777 33221",
    email: "priya.verma@gmail.com",
    city: "Chandigarh",
    qualification: "Bachelor's degree",
    year: "2024",
    level: "Master's",
    field: "Hospitality & Tourism",
    country: "Slovakia",
    ielts: "IELTS",
    message: "Comenius University & Bratislava colleges consultation requested.",
    status: "in_progress",
    notes: "Document checklist sent. SOP draft in progress.",
    createdAt: "2026-10-04T11:05:00Z",
  },
];

const initialEvents: AnalyticsEvent[] = [
  { id: "ev_1", type: "page_view", path: "/", timestamp: "2026-10-04T12:00:00Z" },
  { id: "ev_2", type: "destination_view", country: "Malta", path: "/destinations/malta", timestamp: "2026-10-04T12:05:00Z" },
  { id: "ev_3", type: "whatsapp_click", location: "hero", timestamp: "2026-10-04T12:10:00Z" },
  { id: "ev_4", type: "destination_view", country: "Serbia", path: "/destinations/serbia", timestamp: "2026-10-04T12:15:00Z" },
  { id: "ev_5", type: "cta_click", location: "header", timestamp: "2026-10-04T12:20:00Z" },
  { id: "ev_6", type: "phone_click", location: "mobile_bar", timestamp: "2026-10-04T12:25:00Z" },
  { id: "ev_7", type: "destination_view", country: "Lithuania", path: "/destinations/lithuania", timestamp: "2026-10-04T12:30:00Z" },
  { id: "ev_8", type: "whatsapp_click", location: "destination_malta", timestamp: "2026-10-04T12:35:00Z" },
  { id: "ev_9", type: "form_submit", location: "contact", country: "Romania", timestamp: "2026-10-04T12:40:00Z" },
  { id: "ev_10", type: "page_view", path: "/legal/privacy", timestamp: "2026-10-04T12:45:00Z" },
];

export function getLeads(): Lead[] {
  if (typeof window === "undefined") return initialLeads;
  try {
    const raw = localStorage.getItem(LEADS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(initialLeads));
      return initialLeads;
    }
    return JSON.parse(raw);
  } catch {
    return initialLeads;
  }
}

export function saveLead(data: Omit<Lead, "id" | "status" | "createdAt">): Lead {
  const newLead: Lead = {
    ...data,
    id: `lead_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`,
    status: "new",
    createdAt: new Date().toISOString(),
  };

  if (typeof window !== "undefined") {
    try {
      const current = getLeads();
      const updated = [newLead, ...current];
      localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
      window.dispatchEvent(new Event("eurobridge_lead_added"));
    } catch (e) {
      console.error("Failed to save lead", e);
    }
  }

  return newLead;
}

export function updateLeadStatus(id: string, status: LeadStatus): void {
  if (typeof window === "undefined") return;
  try {
    const leads = getLeads().map((l) => (l.id === id ? { ...l, status } : l));
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    window.dispatchEvent(new Event("eurobridge_leads_updated"));
  } catch (e) {
    console.error("Failed to update status", e);
  }
}

export function updateLeadNotes(id: string, notes: string): void {
  if (typeof window === "undefined") return;
  try {
    const leads = getLeads().map((l) => (l.id === id ? { ...l, notes } : l));
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    window.dispatchEvent(new Event("eurobridge_leads_updated"));
  } catch (e) {
    console.error("Failed to update notes", e);
  }
}

export function deleteLead(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const leads = getLeads().filter((l) => l.id !== id);
    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
    window.dispatchEvent(new Event("eurobridge_leads_updated"));
  } catch (e) {
    console.error("Failed to delete lead", e);
  }
}

export function recordAnalyticsEvent(
  type: string,
  data: Record<string, unknown> = {}
): void {
  if (typeof window === "undefined") return;
  try {
    const event: AnalyticsEvent = {
      id: `ev_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
      type: (type as AnalyticsEvent["type"]) || "page_view",
      label: String(data.label || data.name || ""),
      location: String(data.location || ""),
      country: String(data.country || ""),
      path: String(data.path || window.location.pathname),
      timestamp: new Date().toISOString(),
    };

    const raw = localStorage.getItem(EVENTS_STORAGE_KEY);
    const events: AnalyticsEvent[] = raw ? JSON.parse(raw) : initialEvents;
    events.unshift(event);
    // Keep last 500 events
    if (events.length > 500) events.length = 500;
    localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(events));
    window.dispatchEvent(new Event("eurobridge_analytics_updated"));
  } catch (e) {
    console.error("Failed to record analytics event", e);
  }
}

export function getRecentEvents(limit = 50): AnalyticsEvent[] {
  if (typeof window === "undefined") return initialEvents;
  try {
    const raw = localStorage.getItem(EVENTS_STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(EVENTS_STORAGE_KEY, JSON.stringify(initialEvents));
      return initialEvents;
    }
    const events: AnalyticsEvent[] = JSON.parse(raw);
    return events.slice(0, limit);
  } catch {
    return initialEvents;
  }
}

export function getAnalyticsSummary(): AnalyticsSummary {
  const events = getRecentEvents(500);
  const leads = getLeads();

  // Baseline figures + real logged events
  const pageViews = 245 + events.filter((e) => e.type === "page_view" || e.type === "destination_view").length;
  const whatsappClicks = 68 + events.filter((e) => e.type === "whatsapp_click").length;
  const phoneClicks = 32 + events.filter((e) => e.type === "phone_click").length;
  const ctaClicks = 84 + events.filter((e) => e.type === "cta_click").length;
  const formSubmissions = leads.length;

  const conversionRate = pageViews > 0 ? Number(((formSubmissions / pageViews) * 100).toFixed(1)) : 0;

  // Destination views distribution
  const destinationsMap: Record<string, number> = {
    Malta: 74,
    Romania: 48,
    Bulgaria: 36,
    Slovenia: 28,
    Slovakia: 22,
    Lithuania: 38,
    Serbia: 31,
    Latvia: 26,
  };

  events.forEach((e) => {
    if (e.country && destinationsMap[e.country] !== undefined) {
      destinationsMap[e.country] += 1;
    }
  });

  const topDestinations = Object.entries(destinationsMap)
    .map(([name, views]) => ({ name, views }))
    .sort((a, b) => b.views - a.views);

  // Click by location
  const locationMap: Record<string, number> = {
    "Hero Section": 38,
    "Header Micro-Bar": 24,
    "Mobile Quick-Bar": 29,
    "Country Page CTAs": 31,
    "Consultation CTA Banner": 18,
    "Footer": 12,
  };

  events.forEach((e) => {
    if (e.location) {
      const locKey =
        e.location === "hero"
          ? "Hero Section"
          : e.location === "header"
            ? "Header Micro-Bar"
            : e.location === "mobile_bar"
              ? "Mobile Quick-Bar"
              : e.location === "cta_band"
                ? "Consultation CTA Banner"
                : e.location === "footer"
                  ? "Footer"
                  : "Country Page CTAs";
      locationMap[locKey] = (locationMap[locKey] || 0) + 1;
    }
  });

  const clicksByLocation = Object.entries(locationMap)
    .map(([location, count]) => ({ location, count }))
    .sort((a, b) => b.count - a.count);

  const dailyViews = [
    { date: "Sep 28", views: 28, leads: 1, whatsapp: 7 },
    { date: "Sep 29", views: 35, leads: 2, whatsapp: 9 },
    { date: "Sep 30", views: 42, leads: 1, whatsapp: 11 },
    { date: "Oct 01", views: 48, leads: 3, whatsapp: 14 },
    { date: "Oct 02", views: 52, leads: 2, whatsapp: 12 },
    { date: "Oct 03", views: 59, leads: 3, whatsapp: 16 },
    { date: "Oct 04", views: 64 + events.length, leads: leads.length, whatsapp: whatsappClicks },
  ];

  return {
    totalPageViews: pageViews,
    uniqueVisitors: Math.round(pageViews * 0.72),
    totalWhatsAppClicks: whatsappClicks,
    totalPhoneClicks: phoneClicks,
    totalCtaClicks: ctaClicks,
    totalFormSubmissions: formSubmissions,
    conversionRate,
    topDestinations,
    clicksByLocation,
    dailyViews,
  };
}

export function exportLeadsToCsv(): void {
  if (typeof window === "undefined") return;
  const leads = getLeads();
  const headers = [
    "ID",
    "Submitted Date",
    "Name",
    "Phone",
    "WhatsApp",
    "Email",
    "City",
    "Qualification",
    "Passing Year",
    "Target Level",
    "Target Field",
    "Target Country",
    "English Proficiency",
    "Status",
    "Notes",
    "Message",
  ];

  const rows = leads.map((l) => [
    `"${l.id}"`,
    `"${new Date(l.createdAt).toLocaleString("en-IN")}"`,
    `"${(l.name || "").replace(/"/g, '""')}"`,
    `"${l.phone || ""}"`,
    `"${l.whatsapp || ""}"`,
    `"${l.email || ""}"`,
    `"${l.city || ""}"`,
    `"${l.qualification || ""}"`,
    `"${l.year || ""}"`,
    `"${l.level || ""}"`,
    `"${(l.field || "").replace(/"/g, '""')}"`,
    `"${l.country || ""}"`,
    `"${l.ielts || ""}"`,
    `"${l.status.toUpperCase()}"`,
    `"${(l.notes || "").replace(/"/g, '""')}"`,
    `"${(l.message || "").replace(/"/g, '""')}"`,
  ]);

  const csvContent = "\uFEFF" + [headers.join(","), ...rows.map((r) => r.join(","))].join("\r\n");
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `eurobridge-leads-${new Date().toISOString().split("T")[0]}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Authentication Store
export function checkAuth(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const raw = localStorage.getItem(SESSION_STORAGE_KEY);
    if (!raw) return false;
    const session = JSON.parse(raw);
    return session.authenticated === true;
  } catch {
    return false;
  }
}

export function login(usernameInput: string, passwordInput: string): boolean {
  if (typeof window === "undefined") return false;
  const trimmedUser = usernameInput.trim().toLowerCase().replace(/\s+/g, " ");
  const validUsers = [
    ADMIN_CREDENTIALS.username.toLowerCase(),
    "eurobridge education admin portal",
    "eurobridge education",
    "eurobridge_admin",
    "admin",
  ];

  if (validUsers.includes(trimmedUser) && passwordInput === ADMIN_CREDENTIALS.password) {
    localStorage.setItem(
      SESSION_STORAGE_KEY,
      JSON.stringify({
        authenticated: true,
        user: trimmedUser,
        loggedInAt: new Date().toISOString(),
      })
    );
    return true;
  }
  return false;
}

export function logout(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SESSION_STORAGE_KEY);
}
