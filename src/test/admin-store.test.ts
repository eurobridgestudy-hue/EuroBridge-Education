import { describe, expect, it, beforeEach } from "vitest";
import {
  ADMIN_CREDENTIALS,
  checkAuth,
  login,
  logout,
  getLeads,
  saveLead,
  updateLeadStatus,
  updateLeadNotes,
  deleteLead,
  recordAnalyticsEvent,
  getRecentEvents,
  getAnalyticsSummary,
} from "@/lib/admin-store";

describe("admin-store", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  describe("Authentication", () => {
    it("authenticates valid credentials", () => {
      expect(checkAuth()).toBe(false);

      const success = login("EuroBridge Education admin portal", "JAndu@135");
      expect(success).toBe(true);
      expect(checkAuth()).toBe(true);
    });

    it("authenticates case-insensitively with flexible spaces", () => {
      const success = login("eurobridge education  admin portal", "JAndu@135");
      expect(success).toBe(true);
      expect(checkAuth()).toBe(true);
    });

    it("rejects invalid credentials", () => {
      const success = login("EuroBridge Education admin portal", "wrongpassword");
      expect(success).toBe(false);
      expect(checkAuth()).toBe(false);
    });

    it("clears session on logout", () => {
      login("EuroBridge Education admin portal", "JAndu@135");
      expect(checkAuth()).toBe(true);
      logout();
      expect(checkAuth()).toBe(false);
    });
  });

  describe("Leads Management", () => {
    it("returns pre-seeded leads when storage is initially read", () => {
      const leads = getLeads();
      expect(leads.length).toBeGreaterThan(0);
      expect(leads[0]).toHaveProperty("name");
      expect(leads[0]).toHaveProperty("phone");
      expect(leads[0]).toHaveProperty("country");
    });

    it("saves a new consultation lead", () => {
      const newLead = saveLead({
        name: "Amanpreet Kaur",
        phone: "+91 98765 43210",
        whatsapp: "+91 98765 43210",
        email: "amanpreet@example.com",
        city: "Jalandhar",
        country: "Malta",
        level: "Bachelor's",
        field: "Business & Management",
        qualification: "Class 12",
        year: "2024",
        ielts: "Medium of Instruction (MOI)",
        message: "Interested in top business colleges in Malta",
      });

      expect(newLead.id).toBeDefined();
      expect(newLead.status).toBe("new");

      const leads = getLeads();
      expect(leads.some((l) => l.name === "Amanpreet Kaur")).toBe(true);
    });

    it("updates lead status and notes", () => {
      const leads = getLeads();
      const first = leads[0];

      updateLeadStatus(first.id, "contacted");
      updateLeadNotes(first.id, "Called student today, very keen on September intake.");

      const updated = getLeads().find((l) => l.id === first.id);
      expect(updated?.status).toBe("contacted");
      expect(updated?.notes).toContain("Called student today");
    });

    it("deletes a lead", () => {
      const leads = getLeads();
      const first = leads[0];

      deleteLead(first.id);
      const afterDelete = getLeads().find((l) => l.id === first.id);
      expect(afterDelete).toBeUndefined();
    });
  });

  describe("Analytics & Event Tracking", () => {
    it("records page views and updates summary", () => {
      recordAnalyticsEvent("page_view", {
        label: "Malta Destination",
        country: "Malta",
        path: "/countries/malta",
      });

      const summary = getAnalyticsSummary();
      expect(summary.totalPageViews).toBeGreaterThan(0);
      expect(summary.topDestinations.some((d) => d.name === "Malta")).toBe(true);
    });

    it("records WhatsApp clicks with location source", () => {
      recordAnalyticsEvent("whatsapp_click", {
        label: "Header WhatsApp Button",
        location: "header",
      });

      const summary = getAnalyticsSummary();
      expect(summary.totalWhatsAppClicks).toBeGreaterThan(0);
      expect(summary.clicksByLocation.some((l) => l.location === "Header Micro-Bar")).toBe(true);

      const recentEvents = getRecentEvents(10);
      expect(recentEvents.some((e) => e.type === "whatsapp_click")).toBe(true);
    });
  });
});
