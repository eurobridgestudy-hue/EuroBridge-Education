import { describe, expect, it } from "vitest";
import {
  validateFullName,
  validatePhoneNumber,
  validateEmailAddress,
  validateCityName,
  validatePassingYear,
  validateForm,
  calculateReadinessScore,
  type FormValues,
} from "@/lib/form-validation";

describe("form-validation anti-random and real data verification", () => {
  describe("validateFullName", () => {
    it("accepts legitimate student names", () => {
      expect(validateFullName("Arjun Sharma")).toBeNull();
      expect(validateFullName("Karanveer Singh")).toBeNull();
      expect(validateFullName("Simran Kaur")).toBeNull();
      expect(validateFullName("Dr. Rahul Kumar")).toBeNull();
      expect(validateFullName("Jaspreet Singh Sandhu")).toBeNull();
    });

    it("rejects single names or letters", () => {
      expect(validateFullName("Arjun")).toContain("both your first and last name");
      expect(validateFullName("A")).toBeDefined();
      expect(validateFullName("")).toBe("Full name is required.");
    });

    it("rejects keyboard mash and dummy names", () => {
      expect(validateFullName("asdf asdf")).toBeDefined();
      expect(validateFullName("test test")).toBeDefined();
      expect(validateFullName("dummy user")).toBeDefined();
      expect(validateFullName("qwerty uiop")).toBeDefined();
      expect(validateFullName("aaaa bbbb")).toBeDefined();
      expect(validateFullName("1234 5678")).toBeDefined();
    });
  });

  describe("validatePhoneNumber", () => {
    it("accepts valid Indian and international mobile numbers", () => {
      expect(validatePhoneNumber("+91 98765 89210")).toBeNull();
      expect(validatePhoneNumber("9814012345")).toBeNull();
      expect(validatePhoneNumber("8968867562")).toBeNull();
      expect(validatePhoneNumber("+44 7911 123456")).toBeNull();
    });

    it("rejects sequential and repetitive fake numbers", () => {
      expect(validatePhoneNumber("0000000000")).toBeDefined();
      expect(validatePhoneNumber("1111111111")).toBeDefined();
      expect(validatePhoneNumber("1234567890")).toBeDefined();
      expect(validatePhoneNumber("9876543210")).toBeDefined();
      expect(validatePhoneNumber("12345")).toBeDefined();
    });

    it("rejects Indian numbers starting with invalid digits like 1, 2, 3", () => {
      expect(validatePhoneNumber("1234567890")).toBeDefined();
      expect(validatePhoneNumber("2345678901")).toBeDefined();
    });
  });

  describe("validateEmailAddress", () => {
    it("accepts valid real emails", () => {
      expect(validateEmailAddress("arjun.sharma@gmail.com")).toBeNull();
      expect(validateEmailAddress("simran.k@yahoo.in")).toBeNull();
      expect(validateEmailAddress("student@thapar.edu")).toBeNull();
    });

    it("rejects dummy, incomplete, and disposable emails", () => {
      expect(validateEmailAddress("test@test.com")).toBeDefined();
      expect(validateEmailAddress("fake@fake.com")).toBeDefined();
      expect(validateEmailAddress("asdf@asdf.com")).toBeDefined();
      expect(validateEmailAddress("notanemail")).toBeDefined();
      expect(validateEmailAddress("student@mailinator.com")).toBeDefined();
      expect(validateEmailAddress("user@tempmail.com")).toBeDefined();
    });
  });

  describe("validateCityName", () => {
    it("accepts genuine cities", () => {
      expect(validateCityName("Ludhiana")).toBeNull();
      expect(validateCityName("Chandigarh")).toBeNull();
      expect(validateCityName("New Delhi")).toBeNull();
      expect(validateCityName("Amritsar")).toBeNull();
    });

    it("rejects random keyboard mashing and numbers", () => {
      expect(validateCityName("asdf")).toBeDefined();
      expect(validateCityName("1234")).toBeDefined();
      expect(validateCityName("xyz")).toBeDefined();
      expect(validateCityName("")).toBe("Current city is required.");
    });
  });

  describe("validatePassingYear", () => {
    it("accepts realistic graduation years", () => {
      expect(validatePassingYear("2024")).toBeNull();
      expect(validatePassingYear("2025")).toBeNull();
      expect(validatePassingYear("2020")).toBeNull();
    });

    it("rejects fake years and random inputs", () => {
      expect(validatePassingYear("1990")).toBeDefined();
      expect(validatePassingYear("9999")).toBeDefined();
      expect(validatePassingYear("24")).toBeDefined();
      expect(validatePassingYear("abcd")).toBeDefined();
    });
  });

  describe("calculateReadinessScore and validateForm", () => {
    const validData: FormValues = {
      name: "Gurpreet Singh",
      phone: "+91 98888 12345",
      sameAsPhone: true,
      whatsapp: "+91 98888 12345",
      email: "gurpreet.singh@gmail.com",
      city: "Ludhiana",
      qualification: "Class 12",
      year: "2024",
      level: "Bachelor's",
      field: "Business & Management",
      country: "Malta",
      intake: "Autumn / Winter 2026 (Aug–Nov 2026)",
      ielts: "Medium of Instruction (MOI)",
      budget: "€3,000 – €5,000 / ₹2.7L – ₹4.5L per year",
      message: "Looking for autumn 2026 intake.",
      consent: true,
    };

    it("validates complete legitimate form with 0 errors and 100% readiness", () => {
      const errors = validateForm(validData);
      expect(Object.keys(errors).length).toBe(0);

      const readiness = calculateReadinessScore(validData);
      expect(readiness.score).toBe(100);
      expect(readiness.completedFields).toBe(readiness.totalFields);
    });

    it("catches random / fake data across fields", () => {
      const badData: FormValues = {
        name: "asdf",
        phone: "1111111111",
        sameAsPhone: false,
        whatsapp: "0000000000",
        email: "fake@fake.com",
        city: "asdf",
        qualification: "",
        year: "9999",
        level: "",
        field: "",
        country: "",
        intake: "",
        ielts: "",
        budget: "",
        message: "aaaaaa",
        consent: false,
      };

      const errors = validateForm(badData);
      expect(errors.name).toBeDefined();
      expect(errors.phone).toBeDefined();
      expect(errors.email).toBeDefined();
      expect(errors.city).toBeDefined();
      expect(errors.qualification).toBeDefined();
      expect(errors.year).toBeDefined();
      expect(errors.level).toBeDefined();
      expect(errors.intake).toBeDefined();
      expect(errors.budget).toBeDefined();
      expect(errors.consent).toBeDefined();
    });
  });
});
