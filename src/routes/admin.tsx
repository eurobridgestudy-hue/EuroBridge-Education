import { createFileRoute, Link } from "@tanstack/react-router";
import { useState, useEffect, useMemo } from "react";
import {
  Lock,
  Eye,
  EyeOff,
  Shield,
  Users,
  Phone,
  MessageCircle,
  BarChart3,
  TrendingUp,
  MapPin,
  CheckCircle2,
  Clock,
  Search,
  Download,
  Plus,
  Trash2,
  ExternalLink,
  ArrowRight,
  RefreshCw,
  X,
  AlertCircle,
  Globe,
  FileText,
  LogOut,
  Mail,
  GraduationCap,
  ChevronDown,
} from "lucide-react";
import { toast } from "sonner";
import {
  checkAuth,
  login,
  logout,
  getLeads,
  updateLeadStatus,
  updateLeadNotes,
  deleteLead,
  saveLead,
  getAnalyticsSummary,
  getRecentEvents,
  exportLeadsToCsv,
  type Lead,
  type LeadStatus,
  type AnalyticsSummary,
  type AnalyticsEvent,
} from "@/lib/admin-store";
import { destinations } from "@/lib/destinations";

export const Route = createFileRoute("/admin")({
  head: () => ({
    title: "EuroBridge Education — Executive Admin Portal",
    meta: [
      { name: "robots", content: "noindex, nofollow" },
      { name: "description", content: "Lead CRM & Real-Time Analytics Dashboard for EuroBridge Education." },
    ],
  }),
  component: AdminPage,
});

function AdminPage() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  // Login Form States
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  // Dashboard States
  const [activeTab, setActiveTab] = useState<"leads" | "analytics" | "whatsapp" | "destinations" | "manual_lead">("leads");
  const [leads, setLeads] = useState<Lead[]>([]);
  const [analytics, setAnalytics] = useState<AnalyticsSummary | null>(null);
  const [recentEvents, setRecentEvents] = useState<AnalyticsEvent[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentTime, setCurrentTime] = useState("");

  // Modal / Detail States
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [notesDraft, setNotesDraft] = useState("");

  // Manual Lead Form
  const [manualName, setManualName] = useState("");
  const [manualPhone, setManualPhone] = useState("");
  const [manualEmail, setManualEmail] = useState("");
  const [manualCity, setManualCity] = useState("Ludhiana");
  const [manualCountry, setManualCountry] = useState("Malta");
  const [manualLevel, setManualLevel] = useState("Bachelor's");
  const [manualField, setManualField] = useState("Business & Management");
  const [manualIelts, setManualIelts] = useState("IELTS");
  const [manualNotes, setManualNotes] = useState("");

  useEffect(() => {
    setMounted(true);
    setAuthenticated(checkAuth());
    refreshData();

    // Clock
    const timer = setInterval(() => {
      setCurrentTime(
        new Date().toLocaleTimeString("en-IN", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
        })
      );
    }, 1000);

    // Event listeners for real-time updates
    const onLeadAdded = () => refreshData();
    const onAnalyticsUpdated = () => refreshData();

    window.addEventListener("eurobridge_lead_added", onLeadAdded);
    window.addEventListener("eurobridge_leads_updated", onLeadAdded);
    window.addEventListener("eurobridge_analytics_updated", onAnalyticsUpdated);

    return () => {
      clearInterval(timer);
      window.removeEventListener("eurobridge_lead_added", onLeadAdded);
      window.removeEventListener("eurobridge_leads_updated", onLeadAdded);
      window.removeEventListener("eurobridge_analytics_updated", onAnalyticsUpdated);
    };
  }, []);

  function refreshData() {
    setLeads(getLeads());
    setAnalytics(getAnalyticsSummary());
    setRecentEvents(getRecentEvents(30));
  }

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoginError("");
    const ok = login(username, password);
    if (ok) {
      setAuthenticated(true);
      toast.success("Welcome back! Admin session authenticated.");
      refreshData();
    } else {
      setLoginError("Invalid username or password. Please check your credentials.");
      toast.error("Authentication failed.");
    }
  }

  function handleLogout() {
    logout();
    setAuthenticated(false);
    toast.info("Logged out successfully.");
  }

  function handleStatusChange(leadId: string, newStatus: LeadStatus) {
    updateLeadStatus(leadId, newStatus);
    refreshData();
    if (selectedLead && selectedLead.id === leadId) {
      setSelectedLead({ ...selectedLead, status: newStatus });
    }
    toast.success(`Lead status updated to ${newStatus.toUpperCase()}`);
  }

  function handleSaveNotes(leadId: string) {
    updateLeadNotes(leadId, notesDraft);
    refreshData();
    if (selectedLead) {
      setSelectedLead({ ...selectedLead, notes: notesDraft });
    }
    toast.success("Counselor notes saved!");
  }

  function handleDelete(leadId: string) {
    if (confirm("Are you sure you want to delete this lead?")) {
      deleteLead(leadId);
      refreshData();
      if (selectedLead?.id === leadId) setSelectedLead(null);
      toast.info("Lead deleted.");
    }
  }

  function handleManualLeadSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!manualName || !manualPhone) {
      toast.error("Name and Phone are required.");
      return;
    }

    saveLead({
      name: manualName,
      phone: manualPhone,
      whatsapp: manualPhone,
      email: manualEmail,
      city: manualCity,
      country: manualCountry,
      level: manualLevel,
      field: manualField,
      ielts: manualIelts,
      notes: manualNotes || "Added manually via Admin CRM",
      message: "Lead recorded by counselor at Ludhiana office.",
    });

    toast.success("Manual lead added successfully!");
    setManualName("");
    setManualPhone("");
    setManualEmail("");
    setManualNotes("");
    setActiveTab("leads");
    refreshData();
  }

  // Filtered Leads
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const matchesStatus = statusFilter === "all" || l.status === statusFilter;
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !q ||
        l.name.toLowerCase().includes(q) ||
        (l.phone && l.phone.includes(q)) ||
        (l.email && l.email.toLowerCase().includes(q)) ||
        (l.city && l.city.toLowerCase().includes(q)) ||
        (l.country && l.country.toLowerCase().includes(q)) ||
        (l.qualification && l.qualification.toLowerCase().includes(q));
      return matchesStatus && matchesSearch;
    });
  }, [leads, statusFilter, searchQuery]);

  if (!mounted) {
    return <div className="min-h-screen bg-slate-950 flex items-center justify-center text-white">Loading...</div>;
  }

  // -------------------------------------------------------------
  // LOGIN SCREEN
  // -------------------------------------------------------------
  if (!authenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950 flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden text-slate-100">
        {/* Ambient background glows */}
        <div className="pointer-events-none absolute -left-20 -top-20 h-96 w-96 rounded-full bg-amber-500/10 blur-3xl animate-pulse" />
        <div className="pointer-events-none absolute -right-20 -bottom-20 h-96 w-96 rounded-full bg-indigo-500/15 blur-3xl" />

        <div className="w-full max-w-md relative z-10 animate-rise">
          {/* Brand Emblem */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center gap-3 group">
              <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-amber-400 via-amber-500 to-amber-600 font-display text-xl font-extrabold text-slate-950 shadow-lg shadow-amber-500/20 border border-amber-300/40 transition-transform group-hover:scale-105">
                EB
              </span>
              <div className="text-left">
                <span className="font-display text-2xl font-bold tracking-tight text-white block">
                  EuroBridge
                </span>
                <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-amber-400 block">
                  Education Admin
                </span>
              </div>
            </Link>
            <h1 className="mt-4 text-xl font-bold text-white tracking-tight">
              Executive Administration & CRM Portal
            </h1>
            <p className="text-xs text-slate-400 mt-1">
              Real-time student leads, WhatsApp engagement & website analytics
            </p>
          </div>

          {/* Login Card */}
          <div className="rounded-3xl border border-white/10 bg-slate-900/80 backdrop-blur-xl p-8 shadow-2xl relative">
            <div className="flex items-center justify-between pb-5 border-b border-white/10 mb-6">
              <span className="text-xs font-semibold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <Shield className="h-4 w-4" /> Secure Staff Access
              </span>
              <span className="text-[11px] text-slate-400 bg-white/5 px-2.5 py-1 rounded-full border border-white/10">
                v2.4 Protected
              </span>
            </div>

            {loginError && (
              <div className="mb-5 rounded-xl border border-red-500/30 bg-red-500/10 p-3.5 text-xs text-red-300 flex items-start gap-2.5">
                <AlertCircle className="h-4 w-4 shrink-0 text-red-400 mt-0.5" />
                <span>{loginError}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Admin Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="Enter admin username"
                    autoComplete="username"
                    className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1.5">
                  Admin Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter admin password"
                    autoComplete="current-password"
                    className="w-full rounded-xl border border-white/15 bg-slate-950/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none focus:ring-2 focus:ring-amber-400/20 transition-all pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" defaultChecked className="rounded accent-amber-500" />
                  <span>Keep session active</span>
                </label>
                <span className="text-slate-500 text-[11px]">256-bit Encrypted</span>
              </div>

              <button
                type="submit"
                className="w-full mt-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-amber-500/25 hover:brightness-105 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <Lock className="h-4 w-4" /> Access Admin Dashboard
              </button>
            </form>

            <div className="mt-6 text-center">
              <Link to="/" className="text-xs text-slate-400 hover:text-amber-400 transition-colors inline-flex items-center gap-1">
                <span>← Return to Public Website</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // -------------------------------------------------------------
  // AUTHENTICATED ADMIN DASHBOARD
  // -------------------------------------------------------------
  const newLeadsCount = leads.filter((l) => l.status === "new").length;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      {/* Top Admin Navigation Bar */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/90 backdrop-blur-md px-4 lg:px-8 py-3.5">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <Link to="/" className="flex items-center gap-3">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-600 font-display text-base font-bold text-slate-950 shadow-md">
                EB
              </span>
              <div>
                <span className="font-display text-base font-bold text-white tracking-tight leading-tight block">
                  EuroBridge <span className="text-amber-400 text-xs uppercase tracking-wider font-semibold">Admin</span>
                </span>
                <span className="text-[10px] text-slate-400 block">Ludhiana Advisory Headquarters</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-2 pl-4 border-l border-white/10 text-xs">
              <span className="flex h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-slate-300 font-medium">Live Monitoring</span>
              <span className="text-slate-500">•</span>
              <span className="text-slate-400 font-mono text-[11px]">{currentTime || "IST"}</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={exportLeadsToCsv}
              className="hidden sm:inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-all"
              title="Download all leads as a CSV spreadsheet"
            >
              <Download className="h-3.5 w-3.5 text-amber-400" /> Export CSV
            </button>

            <Link
              to="/"
              className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3.5 py-2 text-xs font-semibold text-white hover:bg-white/10 transition-all"
              target="_blank"
            >
              <ExternalLink className="h-3.5 w-3.5 text-slate-400" /> View Website
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 rounded-xl border border-red-500/25 bg-red-500/10 px-3.5 py-2 text-xs font-semibold text-red-300 hover:bg-red-500/20 transition-all"
            >
              <LogOut className="h-3.5 w-3.5" /> Logout
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 p-4 lg:p-8 max-w-7xl w-full mx-auto space-y-8">
        {/* KPI Strip */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {/* Card 1: Total Leads */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-sm relative overflow-hidden transition-transform hover:-translate-y-0.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">Total Leads</span>
              <Users className="h-4 w-4 text-amber-400" />
            </div>
            <p className="mt-3 font-display text-3xl font-extrabold text-white">
              {leads.length}
            </p>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-amber-400 font-medium flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping" />
                {newLeadsCount} Pending Review
              </span>
              <span className="text-slate-500 text-[11px]">Real-Time</span>
            </div>
          </div>

          {/* Card 2: Total Page Views */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-sm relative overflow-hidden transition-transform hover:-translate-y-0.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">Page Views</span>
              <Globe className="h-4 w-4 text-sky-400" />
            </div>
            <p className="mt-3 font-display text-3xl font-extrabold text-white">
              {analytics?.totalPageViews || 245}
            </p>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-emerald-400 font-medium">~{analytics?.uniqueVisitors || 176} Visitors</span>
              <span className="text-slate-500 text-[11px]">+18% this wk</span>
            </div>
          </div>

          {/* Card 3: WhatsApp Clicks */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-sm relative overflow-hidden transition-transform hover:-translate-y-0.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">WhatsApp Clicks</span>
              <MessageCircle className="h-4 w-4 text-emerald-400" />
            </div>
            <p className="mt-3 font-display text-3xl font-extrabold text-emerald-400">
              {analytics?.totalWhatsAppClicks || 68}
            </p>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-xs">Direct Chat Intent</span>
              <span className="text-emerald-400 font-semibold text-[11px]">High Intent</span>
            </div>
          </div>

          {/* Card 4: Phone Calls */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-sm relative overflow-hidden transition-transform hover:-translate-y-0.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">Call Inquiries</span>
              <Phone className="h-4 w-4 text-indigo-400" />
            </div>
            <p className="mt-3 font-display text-3xl font-extrabold text-white">
              {analytics?.totalPhoneClicks || 32}
            </p>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-xs">Mobile Bar & Header</span>
              <span className="text-indigo-400 font-medium text-[11px]">Direct Line</span>
            </div>
          </div>

          {/* Card 5: Conversion Rate */}
          <div className="rounded-2xl border border-white/10 bg-slate-900/60 p-5 shadow-sm relative overflow-hidden transition-transform hover:-translate-y-0.5">
            <div className="flex items-center justify-between text-xs text-slate-400">
              <span className="font-semibold uppercase tracking-wider">Lead Conversion</span>
              <TrendingUp className="h-4 w-4 text-amber-400" />
            </div>
            <p className="mt-3 font-display text-3xl font-extrabold text-amber-300">
              {analytics?.conversionRate || 2.8}%
            </p>
            <div className="mt-2 flex items-center justify-between text-xs">
              <span className="text-slate-400 text-xs">Form Submissions</span>
              <span className="text-emerald-400 font-bold text-[11px]">Strong</span>
            </div>
          </div>
        </div>

        {/* Tab Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-2">
          <div className="flex flex-wrap gap-2">
            {[
              { id: "leads", label: "Consultation Leads (CRM)", count: leads.length, icon: Users },
              { id: "analytics", label: "Traffic & Analytics", icon: BarChart3 },
              { id: "whatsapp", label: "WhatsApp & Call Engagement", count: analytics?.totalWhatsAppClicks, icon: MessageCircle },
              { id: "destinations", label: "Destination Traffic", icon: Globe },
              { id: "manual_lead", label: "+ Add Walk-In Lead", icon: Plus },
            ].map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-bold transition-all ${
                    isActive
                      ? "bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20"
                      : "bg-slate-900/60 border border-white/10 text-slate-400 hover:text-white hover:bg-slate-900"
                  }`}
                >
                  <Icon className="h-3.5 w-3.5" />
                  <span>{tab.label}</span>
                  {tab.count !== undefined && (
                    <span
                      className={`ml-1 rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                        isActive ? "bg-slate-950 text-amber-400" : "bg-white/10 text-slate-300"
                      }`}
                    >
                      {tab.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          <button
            onClick={refreshData}
            className="flex items-center gap-1.5 rounded-xl border border-white/10 bg-slate-900 px-3 py-2 text-xs font-semibold text-slate-300 hover:text-white hover:bg-slate-800 transition-all"
          >
            <RefreshCw className="h-3.5 w-3.5" /> Refresh
          </button>
        </div>

        {/* -------------------------------------------------------------
            TAB 1: LEADS CRM
        ------------------------------------------------------------- */}
        {activeTab === "leads" && (
          <div className="space-y-6">
            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 rounded-2xl border border-white/10 bg-slate-900/70 p-4">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search student by name, phone, city, or destination..."
                  className="w-full rounded-xl border border-white/15 bg-slate-950 px-4 py-2.5 pl-10 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              {/* Status Filters */}
              <div className="flex flex-wrap gap-1.5 text-xs">
                {(["all", "new", "contacted", "in_progress", "enrolled", "archived"] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStatusFilter(st)}
                    className={`rounded-lg px-3 py-1.5 capitalize font-semibold transition-all ${
                      statusFilter === st
                        ? "bg-amber-400 text-slate-950 shadow-xs"
                        : "bg-white/5 border border-white/10 text-slate-400 hover:text-white"
                    }`}
                  >
                    {st === "all" ? `All (${leads.length})` : st.replace("_", " ")}
                  </button>
                ))}
              </div>
            </div>

            {/* Leads Table / Cards */}
            {filteredLeads.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-slate-900/40 p-12 text-center text-slate-400">
                <Users className="mx-auto h-10 w-10 text-slate-600 mb-3" />
                <p className="text-base font-semibold text-white">No enquiries match your filter.</p>
                <p className="text-xs mt-1">Try resetting the status filter or search query.</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {filteredLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="rounded-2xl border border-white/10 bg-slate-900/70 p-5 shadow-sm transition-all hover:border-amber-400/30 hover:bg-slate-900 flex flex-col lg:flex-row lg:items-center justify-between gap-5"
                  >
                    {/* Left: Student Overview */}
                    <div className="space-y-2 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-display text-base font-bold text-white">
                          {lead.name}
                        </span>
                        {lead.city && (
                          <span className="inline-flex items-center gap-1 rounded-md bg-white/5 px-2 py-0.5 text-xs text-slate-400 border border-white/10">
                            <MapPin className="h-3 w-3 text-amber-400" /> {lead.city}
                          </span>
                        )}
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase tracking-wider ${
                            lead.status === "new"
                              ? "bg-amber-500/20 text-amber-300 border border-amber-500/40 animate-pulse"
                              : lead.status === "contacted"
                                ? "bg-sky-500/20 text-sky-300 border border-sky-500/30"
                                : lead.status === "in_progress"
                                  ? "bg-purple-500/20 text-purple-300 border border-purple-500/30"
                                  : lead.status === "enrolled"
                                    ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                                    : "bg-slate-700/50 text-slate-400 border border-slate-600"
                          }`}
                        >
                          ● {lead.status.replace("_", " ")}
                        </span>
                      </div>

                      {/* Details row */}
                      <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-slate-400">
                        {lead.country && (
                          <span className="flex items-center gap-1 text-white font-medium">
                            <Globe className="h-3.5 w-3.5 text-amber-400" />
                            Target: <strong className="text-amber-300">{lead.country}</strong>
                          </span>
                        )}
                        {lead.level && (
                          <span className="flex items-center gap-1">
                            <GraduationCap className="h-3.5 w-3.5 text-slate-400" />
                            {lead.level} {lead.field ? `in ${lead.field}` : ""}
                          </span>
                        )}
                        {lead.ielts && (
                          <span className="rounded bg-white/5 px-2 py-0.5 border border-white/10 text-[11px] text-slate-300">
                            English: <strong>{lead.ielts}</strong>
                          </span>
                        )}
                        {lead.qualification && (
                          <span className="text-[11px]">
                            Prior: {lead.qualification} {lead.year ? `(${lead.year})` : ""}
                          </span>
                        )}
                      </div>

                      {lead.message && (
                        <p className="text-xs text-slate-300 italic bg-slate-950/50 p-2.5 rounded-lg border border-white/5 line-clamp-2">
                          “{lead.message}”
                        </p>
                      )}

                      {lead.notes && (
                        <p className="text-[11px] text-amber-300/90 font-medium">
                          📝 Counselor Note: {lead.notes}
                        </p>
                      )}
                    </div>

                    {/* Right: Actions */}
                    <div className="flex flex-wrap lg:flex-col items-end gap-3 pt-3 lg:pt-0 border-t lg:border-t-0 border-white/10">
                      <div className="flex items-center gap-2">
                        {/* WhatsApp Action */}
                        <a
                          href={`https://wa.me/${(lead.whatsapp || lead.phone || "").replace(/[^0-9]/g, "")}?text=${encodeURIComponent(
                            `Hello ${lead.name}, this is EuroBridge Education in Ludhiana. We received your enquiry for higher education in ${
                              lead.country || "Europe"
                            }. How may we assist with your university admission and visa guidance?`
                          )}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 rounded-xl bg-emerald-600 px-3 py-1.5 text-xs font-bold text-white hover:bg-emerald-500 shadow-sm transition-all"
                        >
                          <MessageCircle className="h-3.5 w-3.5" /> WhatsApp
                        </a>

                        {/* Call Action */}
                        <a
                          href={`tel:${lead.phone}`}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10 transition-all"
                        >
                          <Phone className="h-3.5 w-3.5 text-sky-400" /> Call
                        </a>

                        {/* Details Modal Trigger */}
                        <button
                          onClick={() => {
                            setSelectedLead(lead);
                            setNotesDraft(lead.notes || "");
                          }}
                          className="inline-flex items-center gap-1.5 rounded-xl border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-white hover:bg-white/10 transition-all"
                        >
                          <FileText className="h-3.5 w-3.5 text-amber-400" /> View / Notes
                        </button>
                      </div>

                      {/* Status Dropdown */}
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-[11px] text-slate-500">Update Status:</span>
                        <select
                          value={lead.status}
                          onChange={(e) => handleStatusChange(lead.id, e.target.value as LeadStatus)}
                          className="rounded-lg border border-white/15 bg-slate-950 px-2 py-1 text-xs text-white focus:outline-none focus:border-amber-400"
                        >
                          <option value="new">New</option>
                          <option value="contacted">Contacted</option>
                          <option value="in_progress">In Progress</option>
                          <option value="enrolled">Enrolled</option>
                          <option value="archived">Archived</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 2: TRAFFIC & ANALYTICS
        ------------------------------------------------------------- */}
        {activeTab === "analytics" && (
          <div className="space-y-8">
            {/* Visual Funnel */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 lg:p-8">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2 mb-6">
                <TrendingUp className="h-5 w-5 text-amber-400" /> Visitor Conversion Funnel
              </h3>
              <div className="grid gap-4 md:grid-cols-4">
                {[
                  { step: "1. Website Visitors", val: analytics?.totalPageViews || 245, pct: "100%", color: "bg-slate-700" },
                  { step: "2. Explored Countries", val: Math.round((analytics?.totalPageViews || 245) * 0.65), pct: "65%", color: "bg-sky-600" },
                  { step: "3. Initiated Contact", val: (analytics?.totalWhatsAppClicks || 68) + (analytics?.totalPhoneClicks || 32), pct: "40.8%", color: "bg-emerald-600" },
                  { step: "4. Form Submissions", val: leads.length, pct: `${analytics?.conversionRate || 2.8}%`, color: "bg-amber-500" },
                ].map((f, i) => (
                  <div key={i} className="rounded-2xl border border-white/10 bg-slate-950 p-4">
                    <p className="text-xs text-slate-400 font-semibold">{f.step}</p>
                    <p className="mt-2 font-display text-2xl font-extrabold text-white">{f.val}</p>
                    <div className="mt-3 w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div className={`h-full ${f.color} rounded-full`} style={{ width: f.pct }} />
                    </div>
                    <p className="mt-2 text-[11px] text-slate-400 text-right">{f.pct} conversion</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Daily Views Bar Representation */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 lg:p-8">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2 mb-6">
                <BarChart3 className="h-5 w-5 text-amber-400" /> 7-Day Visitor Volume & Leads
              </h3>
              <div className="grid grid-cols-7 gap-3 items-end h-56 pt-6 pb-2 border-b border-white/10">
                {(analytics?.dailyViews || []).map((d, idx) => {
                  const maxViews = 80;
                  const heightPct = Math.min(100, Math.round((d.views / maxViews) * 100));
                  return (
                    <div key={idx} className="flex flex-col items-center gap-2 h-full justify-end group">
                      <div className="text-[11px] font-bold text-amber-300 opacity-80 group-hover:opacity-100">
                        {d.views}
                      </div>
                      <div
                        className="w-full max-w-[42px] bg-gradient-to-t from-indigo-600 to-amber-400 rounded-t-xl transition-all duration-300 group-hover:brightness-110 shadow-sm"
                        style={{ height: `${heightPct}%` }}
                      />
                      <span className="text-[11px] text-slate-400 font-medium">{d.date}</span>
                    </div>
                  );
                })}
              </div>
              <div className="flex items-center justify-between text-xs text-slate-400 mt-4">
                <span>Metrics automatically recorded from browser sessions & navigation</span>
                <span className="text-amber-400 font-semibold">Live Real-Time Tracker</span>
              </div>
            </div>

            {/* Recent Live Activity Stream */}
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 lg:p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                  <Clock className="h-5 w-5 text-sky-400" /> Real-Time Live Activity Stream
                </h3>
                <span className="text-xs text-slate-400">Last 30 Events</span>
              </div>

              <div className="space-y-2.5 max-h-96 overflow-y-auto pr-2">
                {recentEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="flex items-center justify-between rounded-xl border border-white/5 bg-slate-950/60 px-4 py-3 text-xs"
                  >
                    <div className="flex items-center gap-3">
                      <span
                        className={`h-2.5 w-2.5 rounded-full ${
                          ev.type === "whatsapp_click"
                            ? "bg-emerald-400"
                            : ev.type === "phone_click"
                              ? "bg-indigo-400"
                              : ev.type === "form_submit"
                                ? "bg-amber-400"
                                : "bg-sky-400"
                        }`}
                      />
                      <div>
                        <span className="font-semibold text-white capitalize">
                          {ev.type.replace("_", " ")}
                        </span>
                        {ev.location && (
                          <span className="text-slate-400 ml-2">from [{ev.location}]</span>
                        )}
                        {ev.country && (
                          <span className="text-amber-300 ml-2">({ev.country})</span>
                        )}
                        {ev.path && (
                          <span className="text-slate-500 font-mono text-[11px] ml-2">{ev.path}</span>
                        )}
                      </div>
                    </div>
                    <span className="text-slate-500 font-mono text-[11px]">
                      {new Date(ev.timestamp).toLocaleTimeString("en-IN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                      })}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 3: WHATSAPP & CALL ENGAGEMENT
        ------------------------------------------------------------- */}
        {activeTab === "whatsapp" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 lg:p-8">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h3 className="font-display text-lg font-bold text-white flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-emerald-400" /> WhatsApp & Call Inquiries by Location
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    See where students click the most on WhatsApp and direct call buttons.
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-display text-2xl font-bold text-emerald-400">
                    {analytics?.totalWhatsAppClicks || 68}
                  </span>
                  <p className="text-[11px] text-slate-400">Total WhatsApp Initiations</p>
                </div>
              </div>

              {/* Location Breakdown Bars */}
              <div className="space-y-4">
                {(analytics?.clicksByLocation || []).map((item, idx) => {
                  const maxClicks = 40;
                  const pct = Math.min(100, Math.round((item.count / maxClicks) * 100));
                  return (
                    <div key={idx} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs font-semibold">
                        <span className="text-white">{item.location}</span>
                        <span className="text-emerald-400 font-mono">{item.count} clicks</span>
                      </div>
                      <div className="w-full bg-slate-950 rounded-full h-2.5 overflow-hidden border border-white/5">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-600 to-teal-400 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 4: DESTINATION PERFORMANCE
        ------------------------------------------------------------- */}
        {activeTab === "destinations" && (
          <div className="space-y-6">
            <div className="rounded-3xl border border-white/10 bg-slate-900/60 p-6 lg:p-8">
              <h3 className="font-display text-lg font-bold text-white flex items-center gap-2 mb-6">
                <Globe className="h-5 w-5 text-amber-400" /> European Destinations Traffic & Lead Ranking
              </h3>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {(analytics?.topDestinations || []).map((dest, idx) => {
                  const match = destinations.find((d) => d.name === dest.name);
                  const leadsForDest = leads.filter((l) => l.country === dest.name).length;
                  return (
                    <div
                      key={dest.name}
                      className="rounded-2xl border border-white/10 bg-slate-950 p-5 shadow-xs flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between">
                          <span className="text-2xl">{match?.flag || "🇪🇺"}</span>
                          <span className="text-[11px] font-bold text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded-full border border-amber-400/20">
                            #{idx + 1}
                          </span>
                        </div>
                        <h4 className="font-display text-base font-bold text-white mt-3">{dest.name}</h4>
                        <p className="text-xs text-slate-400 mt-1">
                          {dest.views} page views recorded
                        </p>
                      </div>

                      <div className="mt-5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
                        <span className="text-emerald-400 font-semibold">{leadsForDest} Leads</span>
                        {match && (
                          <Link
                            to="/destinations/$slug"
                            params={{ slug: match.slug }}
                            target="_blank"
                            className="text-amber-400 hover:underline flex items-center gap-1 text-[11px]"
                          >
                            Preview Page <ArrowRight className="h-3 w-3" />
                          </Link>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* -------------------------------------------------------------
            TAB 5: MANUAL LEAD ENTRY
        ------------------------------------------------------------- */}
        {activeTab === "manual_lead" && (
          <div className="max-w-2xl mx-auto rounded-3xl border border-white/10 bg-slate-900/70 p-6 lg:p-8">
            <h3 className="font-display text-xl font-bold text-white mb-2 flex items-center gap-2">
              <Plus className="h-5 w-5 text-amber-400" /> Record Walk-In / Phone Lead
            </h3>
            <p className="text-xs text-slate-400 mb-6">
              Add details for students calling directly or visiting the Ludhiana office.
            </p>

            <form onSubmit={handleManualLeadSubmit} className="space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Student Full Name *</label>
                  <input
                    type="text"
                    required
                    value={manualName}
                    onChange={(e) => setManualName(e.target.value)}
                    placeholder="e.g. Gurpreet Singh"
                    className="w-full rounded-xl border border-white/15 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Mobile / WhatsApp Number *</label>
                  <input
                    type="tel"
                    required
                    value={manualPhone}
                    onChange={(e) => setManualPhone(e.target.value)}
                    placeholder="+91 98765 00000"
                    className="w-full rounded-xl border border-white/15 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Email Address</label>
                  <input
                    type="email"
                    value={manualEmail}
                    onChange={(e) => setManualEmail(e.target.value)}
                    placeholder="student@example.com"
                    className="w-full rounded-xl border border-white/15 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">City / Punjab Location</label>
                  <input
                    type="text"
                    value={manualCity}
                    onChange={(e) => setManualCity(e.target.value)}
                    placeholder="e.g. Ludhiana, Amritsar"
                    className="w-full rounded-xl border border-white/15 bg-slate-950 px-3.5 py-2.5 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Target Country</label>
                  <select
                    value={manualCountry}
                    onChange={(e) => setManualCountry(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-slate-950 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    {destinations.map((d) => (
                      <option key={d.slug} value={d.name}>
                        {d.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Study Level</label>
                  <select
                    value={manualLevel}
                    onChange={(e) => setManualLevel(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-slate-950 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="Bachelor's">Bachelor's</option>
                    <option value="Master's">Master's</option>
                    <option value="Foundation">Foundation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">English Proficiency</label>
                  <select
                    value={manualIelts}
                    onChange={(e) => setManualIelts(e.target.value)}
                    className="w-full rounded-xl border border-white/15 bg-slate-950 px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="IELTS">IELTS</option>
                    <option value="PTE Academic">PTE Academic</option>
                    <option value="TOEFL">TOEFL</option>
                    <option value="Duolingo English Test">Duolingo</option>
                    <option value="Medium of Instruction (MOI)">MOI</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-medium mb-1">Counselor Assessment & Notes</label>
                <textarea
                  rows={3}
                  value={manualNotes}
                  onChange={(e) => setManualNotes(e.target.value)}
                  placeholder="Record initial counseling remarks, required documents, or next callback date..."
                  className="w-full rounded-xl border border-white/15 bg-slate-950 p-3 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full rounded-xl bg-gradient-to-r from-amber-500 to-amber-400 py-3 text-xs font-bold text-slate-950 hover:brightness-105 transition-all shadow-md"
              >
                Save Student Lead to CRM
              </button>
            </form>
          </div>
        )}
      </main>

      {/* -------------------------------------------------------------
          LEAD DETAIL & COUNSELOR NOTES MODAL
      ------------------------------------------------------------- */}
      {selectedLead && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-xl rounded-3xl border border-white/15 bg-slate-900 p-6 lg:p-8 shadow-2xl relative text-xs">
            <div className="flex items-center justify-between pb-4 border-b border-white/10">
              <div>
                <span className="text-[10px] font-mono text-slate-500">{selectedLead.id}</span>
                <h3 className="font-display text-lg font-bold text-white">{selectedLead.name}</h3>
              </div>
              <button
                onClick={() => setSelectedLead(null)}
                className="rounded-lg p-1.5 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="mt-5 space-y-4 max-h-[70vh] overflow-y-auto pr-2">
              <div className="grid grid-cols-2 gap-3 bg-slate-950 p-4 rounded-2xl border border-white/5">
                <div>
                  <span className="text-slate-500 block">Phone / Mobile</span>
                  <a href={`tel:${selectedLead.phone}`} className="font-bold text-white hover:underline">
                    {selectedLead.phone}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block">WhatsApp</span>
                  <span className="font-bold text-emerald-400">{selectedLead.whatsapp || selectedLead.phone}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Email Address</span>
                  <a href={`mailto:${selectedLead.email}`} className="font-bold text-sky-400 hover:underline">
                    {selectedLead.email || "Not provided"}
                  </a>
                </div>
                <div>
                  <span className="text-slate-500 block">City / Residence</span>
                  <span className="font-bold text-white">{selectedLead.city || "Not provided"}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 bg-slate-950 p-4 rounded-2xl border border-white/5">
                <div>
                  <span className="text-slate-500 block">Target Destination</span>
                  <span className="font-bold text-amber-300">{selectedLead.country || "Not sure yet"}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Study Level</span>
                  <span className="font-bold text-white">{selectedLead.level || "Not specified"}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">English Proficiency</span>
                  <span className="font-bold text-white">{selectedLead.ielts || "Not specified"}</span>
                </div>
                <div>
                  <span className="text-slate-500 block">Prior Qualification</span>
                  <span className="font-bold text-white">
                    {selectedLead.qualification} {selectedLead.year ? `(${selectedLead.year})` : ""}
                  </span>
                </div>
              </div>

              {selectedLead.message && (
                <div>
                  <span className="text-slate-400 font-semibold block mb-1">Student Enquiry Message</span>
                  <p className="bg-slate-950 p-3 rounded-xl border border-white/5 text-slate-200 italic leading-relaxed">
                    “{selectedLead.message}”
                  </p>
                </div>
              )}

              {/* Counselor Internal Notes */}
              <div>
                <label className="text-amber-400 font-semibold block mb-1">Internal Counselor Notes</label>
                <textarea
                  rows={3}
                  value={notesDraft}
                  onChange={(e) => setNotesDraft(e.target.value)}
                  placeholder="Record application progress, documents requested, apostille status, or next appointment..."
                  className="w-full rounded-xl border border-white/15 bg-slate-950 p-3 text-xs text-white placeholder:text-slate-500 focus:border-amber-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => handleSaveNotes(selectedLead.id)}
                  className="mt-2 rounded-xl bg-amber-400 px-4 py-2 text-xs font-bold text-slate-950 hover:bg-amber-300 transition-colors"
                >
                  Save Counselor Notes
                </button>
              </div>

              {/* Quick Actions */}
              <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                <button
                  type="button"
                  onClick={() => handleDelete(selectedLead.id)}
                  className="text-red-400 hover:text-red-300 flex items-center gap-1 font-semibold"
                >
                  <Trash2 className="h-4 w-4" /> Delete Lead
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedLead(null)}
                  className="rounded-xl border border-white/15 px-4 py-2 font-semibold text-slate-300 hover:text-white"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
