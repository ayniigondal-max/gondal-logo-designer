import { createFileRoute } from "@tanstack/react-router";
import LegalPage, { LegalSection } from "@/components/legal-page";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About Us — Gondal AI Logo Generator" },
      {
        name: "description",
        content: "Learn about Gondal AI Logo Generator — a free way for small businesses and creators to design their own professional logo in minutes.",
      },
      { property: "og:title", content: "About Us — Gondal AI Logo Generator" },
      {
        property: "og:description",
        content: "A free way for small businesses and creators to design their own professional logo in minutes.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function AboutPage() {
  return (
    <LegalPage
      title="About Us"
      updated="October 6, 2026"
      intro="Gondal AI Logo Generator helps anyone create a professional brand logo in minutes — free, no design skills, no expensive agencies, no waiting weeks for drafts."
    >
      <LegalSection title="What we do">
        <p>
          We built Gondal AI Logo Generator for small business owners, startups, and creators who
          need a clean, professional logo without a big budget. You describe your brand — its name,
          industry, style, and colors — and our design engine instantly crafts three unique logo
          concepts for you to compare and download.
        </p>
        <p>
          From cafes and clothing brands to tech startups and corporate identities, our guided
          step-by-step flow walks you through every choice: your brand name and slogan, a written or
          voice description of your idea, industry-specific design elements, 2D or 3D finish, and
          your preferred style — from minimalist to luxury.
        </p>
      </LegalSection>

      <LegalSection title="Why we built it">
        <p>
          Professional logo design traditionally costs hundreds of dollars and takes days or weeks.
          We believe every business — no matter how small — deserves a brand identity it can be
          proud of. That's why every package here is completely free: vector source files,
          high-resolution formats, a social media kit, and full commercial rights, all at no cost.
          Every package is watermark-free.
        </p>
      </LegalSection>

      <LegalSection title="Our promise">
        <p>
          Every logo is generated fresh from your own description — the sample designs you see in
          our showcase are engine-generated examples, not client work. Your brand details stay
          yours, downloads are always free with no payment step, and we never ask for card or bank
          details.
        </p>
      </LegalSection>

      <LegalSection title="Get in touch">
        <p>
          Have a question, a suggestion, or need help with an order? Reach us through the contact
          options on our homepage — we read every message and reply as quickly as we can.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
