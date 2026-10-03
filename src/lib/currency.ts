export type Country = { code: string; name: string; currency: string; rate: number };

/** Estimated rates: 1 USD = rate local currency. Display only — prices are charged in USD tiers. */
export const COUNTRIES: Country[] = [
  { code: "PK", name: "Pakistan", currency: "PKR", rate: 280 },
  { code: "US", name: "United States", currency: "USD", rate: 1 },
  { code: "IN", name: "India", currency: "INR", rate: 84 },
  { code: "AE", name: "United Arab Emirates", currency: "AED", rate: 3.67 },
  { code: "SA", name: "Saudi Arabia", currency: "SAR", rate: 3.75 },
  { code: "GB", name: "United Kingdom", currency: "GBP", rate: 0.77 },
  { code: "DE", name: "Germany", currency: "EUR", rate: 0.92 },
  { code: "FR", name: "France", currency: "EUR", rate: 0.92 },
  { code: "CA", name: "Canada", currency: "CAD", rate: 1.37 },
  { code: "AU", name: "Australia", currency: "AUD", rate: 1.5 },
  { code: "BD", name: "Bangladesh", currency: "BDT", rate: 120 },
  { code: "TR", name: "Turkey", currency: "TRY", rate: 34 },
  { code: "QA", name: "Qatar", currency: "QAR", rate: 3.64 },
  { code: "MY", name: "Malaysia", currency: "MYR", rate: 4.4 },
];

export function detectCountry(): Country | null {
  try {
    const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
    if (tz === "Asia/Karachi") return COUNTRIES[0]!;
    if (tz === "Asia/Kolkata" || tz === "Asia/Calcutta") return COUNTRIES.find((c) => c.code === "IN")!;
    if (tz === "Asia/Dubai") return COUNTRIES.find((c) => c.code === "AE")!;
    if (tz === "Asia/Riyadh") return COUNTRIES.find((c) => c.code === "SA")!;
    const region = navigator.language.split("-")[1]?.toUpperCase();
    return COUNTRIES.find((c) => c.code === region) ?? null;
  } catch {
    return null;
  }
}

export function localPrice(usd: number, c: Country | null): string | null {
  if (!c || c.currency === "USD") return null;
  const v = usd * c.rate;
  const rounded = v >= 100 ? Math.round(v / 10) * 10 : Math.round(v * 100) / 100;
  return `~${rounded.toLocaleString("en-US")} ${c.currency}`;
}
