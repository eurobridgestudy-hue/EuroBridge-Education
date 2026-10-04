export interface FormValues {
  name: string;
  phone: string;
  sameAsPhone: boolean;
  whatsapp: string;
  email: string;
  city: string;
  qualification: string;
  year: string;
  level: string;
  field: string;
  country: string;
  ielts: string;
  message: string;
  consent: boolean;
}

export type FormErrors = Partial<Record<keyof FormValues, string>>;

export function validateFullName(name: string): string | null {
  const clean = (name || "").trim();
  if (!clean) return "Full name is required.";
  if (clean.length < 3) return "Name must be at least 3 characters.";
  if (clean.length > 70) return "Name cannot exceed 70 characters.";

  // Letters, spaces, apostrophes, hyphens, dots only
  if (!/^[a-zA-Z\s.'-]+$/.test(clean)) {
    return "Name can only contain alphabetic letters and spaces.";
  }

  const words = clean.split(/\s+/).filter(Boolean);
  if (words.length < 2) {
    return "Please enter both your first and last name (e.g. Arjun Sharma).";
  }

  if (words.some((w) => w.replace(/[^a-zA-Z]/g, "").length < 2 && !w.endsWith("."))) {
    return "Each name part must have at least 2 letters.";
  }

  // Detect repetitive characters like "aaaa"
  if (/([a-zA-Z])\1{2,}/i.test(clean)) {
    return "Please enter a genuine name (repeated characters detected).";
  }

  // Keyboard mashing / test dummies
  const dummyNames = [
    "test",
    "testing",
    "dummy",
    "fake",
    "random",
    "sample",
    "admin",
    "null",
    "undefined",
    "qwerty",
    "asdf",
    "asdfg",
    "zxcv",
    "nobody",
    "someone",
    "user",
    "abcd",
    "xyz",
    "none",
    "na",
  ];

  if (words.some((w) => dummyNames.includes(w.toLowerCase().replace(/[^a-z]/g, "")))) {
    return "Please enter your genuine legal name.";
  }

  if (/(asdf|qwer|zxcv|hjkl|ghjk)/i.test(clean)) {
    return "Please enter a valid legal name.";
  }

  // Clean words (strip punctuation) >= 4 chars should contain at least one vowel
  if (
    words.some((w) => {
      const alphaOnly = w.replace(/[^a-zA-Z]/g, "");
      return alphaOnly.length >= 4 && !/[aeiouy]/i.test(alphaOnly);
    })
  ) {
    return "Please enter a genuine name with valid vowels.";
  }

  return null;
}

export function validatePhoneNumber(phone: string): string | null {
  const clean = (phone || "").replace(/[\s\-\(\)\.]/g, "");
  if (!clean) return "Phone number is required.";

  // Only digits and optional leading plus
  if (!/^\+?[0-9]{8,15}$/.test(clean)) {
    return "Please enter a valid phone number with 9–15 digits.";
  }

  const digits = clean.replace(/^\+/, "");

  // Indian standard mobile verification (10 digits or 91 + 10 digits)
  let national = digits;
  if (digits.startsWith("91") && digits.length === 12) {
    national = digits.slice(2);
  }

  if (national.length === 10) {
    if (!/^[6-9]/.test(national)) {
      return "Indian mobile numbers must start with 6, 7, 8, or 9.";
    }
  } else if (digits.length < 9 || digits.length > 15) {
    return "Phone number must be between 9 and 15 digits.";
  }

  // Rejection of repetitive/fake numbers
  if (/^(.)\1+$/.test(digits)) {
    return "Please enter an active phone number (cannot be all identical digits).";
  }

  const sequences = [
    "0123456789",
    "1234567890",
    "9876543210",
    "8765432109",
    "0987654321",
    "1234512345",
    "9876598765",
  ];
  if (sequences.some((s) => digits.includes(s) || national.includes(s))) {
    return "Please enter a genuine personal mobile number.";
  }

  // At least 4 distinct digits
  if (new Set(digits).size < 4) {
    return "Please enter a genuine personal phone number.";
  }

  return null;
}

export function validateWhatsAppNumber(
  whatsapp: string,
  sameAsPhone: boolean,
  phone: string
): string | null {
  if (sameAsPhone) {
    return validatePhoneNumber(phone);
  }
  const clean = (whatsapp || "").trim();
  if (!clean) return null; // Optional if not same as phone
  return validatePhoneNumber(clean);
}

export function validateEmailAddress(email: string): string | null {
  const clean = (email || "").trim();
  if (!clean) return "Email address is required.";

  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  if (!emailRegex.test(clean)) {
    return "Please enter a valid email format (e.g. name@gmail.com).";
  }

  const [, domain] = clean.toLowerCase().split("@");
  if (!domain || domain.split(".").some((part) => part.length < 2)) {
    return "Please enter a complete email domain (e.g. @gmail.com).";
  }

  const dummyEmails = [
    "test@test.com",
    "fake@fake.com",
    "admin@admin.com",
    "a@a.com",
    "asdf@asdf.com",
    "abc@xyz.com",
    "test@gmail.com",
    "fake@gmail.com",
    "asdf@gmail.com",
    "no@no.com",
  ];
  if (dummyEmails.includes(clean.toLowerCase())) {
    return "Please enter your genuine personal email address.";
  }

  const disposable = [
    "mailinator.com",
    "tempmail.com",
    "10minutemail.com",
    "throwaway.com",
    "trashmail.com",
    "yopmail.com",
    "guerrillamail.com",
    "sharklasers.com",
  ];
  if (disposable.some((d) => domain.includes(d))) {
    return "Temporary/disposable email addresses are not accepted.";
  }

  return null;
}

export function validateCityName(city: string): string | null {
  const clean = (city || "").trim();
  if (!clean) return "Current city is required.";
  if (clean.length < 2) return "City name must be at least 2 letters.";
  if (!/^[a-zA-Z\s.'-]+$/.test(clean)) {
    return "City name can only contain alphabetic letters and spaces.";
  }

  const dummyCities = [
    "asdf",
    "qwer",
    "xyz",
    "test",
    "none",
    "na",
    "null",
    "city",
    "abc",
    "here",
    "somewhere",
  ];
  if (dummyCities.includes(clean.toLowerCase())) {
    return "Please enter a genuine city name (e.g. Ludhiana, Delhi, Chandigarh).";
  }

  if (!/[aeiouy]/i.test(clean)) {
    return "Please enter a valid real city name.";
  }

  return null;
}

export function validateQualification(qual: string): string | null {
  const clean = (qual || "").trim();
  if (!clean || clean === "") {
    return "Please select your current or highest academic qualification.";
  }
  return null;
}

export function validatePassingYear(year: string): string | null {
  const clean = (year || "").trim();
  if (!clean) return "Passing year is required.";
  if (!/^\d{4}$/.test(clean)) {
    return "Passing year must be a 4-digit year (e.g. 2024 or 2025).";
  }

  const num = parseInt(clean, 10);
  if (num < 2012 || num > 2030) {
    return "Passing year must be between 2012 and 2030.";
  }

  return null;
}

export function validateStudyLevel(level: string): string | null {
  const clean = (level || "").trim();
  if (!clean || clean === "") {
    return "Please select your preferred study level.";
  }
  return null;
}

export function validateFieldOfStudy(field: string): string | null {
  const clean = (field || "").trim();
  if (!clean || clean === "") {
    return "Please select your preferred course or field of study.";
  }
  return null;
}

export function validateCountry(country: string): string | null {
  const clean = (country || "").trim();
  if (!clean || clean === "") {
    return "Please select your preferred destination or choose 'Not sure yet'.";
  }
  return null;
}

export function validateEnglishProficiency(ielts: string): string | null {
  const clean = (ielts || "").trim();
  if (!clean || clean === "") {
    return "Please select your English proficiency status.";
  }
  return null;
}

export function validateMessage(msg: string): string | null {
  const clean = (msg || "").trim();
  if (!clean) return null; // Optional
  if (clean.length < 5) {
    return "Please write at least 5 characters or leave the message blank.";
  }
  if (/([a-zA-Z])\1{4,}/.test(clean)) {
    return "Please enter a meaningful message without repetitive characters.";
  }
  return null;
}

export function validateConsent(consent: boolean): string | null {
  if (!consent) {
    return "Please accept the privacy policy to request consultation.";
  }
  return null;
}

export function validateForm(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  const nameErr = validateFullName(values.name);
  if (nameErr) errors.name = nameErr;

  const phoneErr = validatePhoneNumber(values.phone);
  if (phoneErr) errors.phone = phoneErr;

  const waErr = validateWhatsAppNumber(values.whatsapp, values.sameAsPhone, values.phone);
  if (waErr) errors.whatsapp = waErr;

  const emailErr = validateEmailAddress(values.email);
  if (emailErr) errors.email = emailErr;

  const cityErr = validateCityName(values.city);
  if (cityErr) errors.city = cityErr;

  const qualErr = validateQualification(values.qualification);
  if (qualErr) errors.qualification = qualErr;

  const yearErr = validatePassingYear(values.year);
  if (yearErr) errors.year = yearErr;

  const levelErr = validateStudyLevel(values.level);
  if (levelErr) errors.level = levelErr;

  const fieldErr = validateFieldOfStudy(values.field);
  if (fieldErr) errors.field = fieldErr;

  const countryErr = validateCountry(values.country);
  if (countryErr) errors.country = countryErr;

  const ieltsErr = validateEnglishProficiency(values.ielts);
  if (ieltsErr) errors.ielts = ieltsErr;

  const msgErr = validateMessage(values.message);
  if (msgErr) errors.message = msgErr;

  const consentErr = validateConsent(values.consent);
  if (consentErr) errors.consent = consentErr;

  return errors;
}

export function calculateReadinessScore(values: FormValues): {
  score: number;
  completedFields: number;
  totalFields: number;
} {
  const checks = [
    validateFullName(values.name) === null,
    validatePhoneNumber(values.phone) === null,
    validateEmailAddress(values.email) === null,
    validateCityName(values.city) === null,
    validateQualification(values.qualification) === null,
    validatePassingYear(values.year) === null,
    validateStudyLevel(values.level) === null,
    validateFieldOfStudy(values.field) === null,
    validateCountry(values.country) === null,
    validateEnglishProficiency(values.ielts) === null,
    values.consent === true,
  ];

  const completedFields = checks.filter(Boolean).length;
  const totalFields = checks.length;
  const score = Math.round((completedFields / totalFields) * 100);

  return { score, completedFields, totalFields };
}
