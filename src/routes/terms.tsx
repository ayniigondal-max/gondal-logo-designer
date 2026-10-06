import { createFileRoute } from "@tanstack/react-router";
import LegalPage, { LegalSection } from "@/components/legal-page";

export const Route = createFileRoute("/terms")({
  component: TermsPage,
  head: () => ({
    meta: [
      { title: "Terms of Use — Gondal AI Logo Generator" },
      {
        name: "description",
        content: "The terms that govern your use of Gondal AI Logo Generator — packages, licenses, acceptable use, and availability.",
      },
      { property: "og:title", content: "Terms of Use — Gondal AI Logo Generator" },
      {
        property: "og:description",
        content: "The terms that govern your use of Gondal AI Logo Generator.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function TermsPage() {
  return (
    <LegalPage
      title="Terms of Use"
      updated="October 6, 2026"
      intro="By using Gondal AI Logo Generator, you agree to these terms. Please read them carefully before creating or downloading a logo."
    >
      <LegalSection title="1. The service">
        <p>
          Gondal AI Logo Generator lets you create logo concepts from your own brand details and
          download them for free. The sample designs shown in the showcase are engine-generated
          examples for demonstration only — they are not client work and may not be used as your
          own logo.
        </p>
      </LegalSection>

      <LegalSection title="2. Pricing">
        <p>
          Every package — Basic, Standard, and Premium — is completely free. There are no
          charges, no subscriptions, and no payment details are ever requested. If the service
          ever asks you for payment information, it is not us.
        </p>
      </LegalSection>

      <LegalSection title="3. Your license">
        <p>
          The rights you receive depend on the package you choose. Basic includes a personal-use
          license; Standard and Premium include commercial rights as described on the package
          cards. All packages are delivered without a watermark. You may not resell or
          redistribute the generated files as standalone design assets.
        </p>
      </LegalSection>

      <LegalSection title="4. Acceptable use">
        <p>You agree not to use the service to create logos that are:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Unlawful, hateful, or misleading</li>
          <li>Imitations of existing trademarks or famous brands</li>
          <li>Intended to defraud or deceive others</li>
        </ul>
        <p>We may refuse access to anyone who violates these rules.</p>
      </LegalSection>

      <LegalSection title="5. Help and issues">
        <p>
          If your files fail to download or something doesn't work as expected, contact us and we
          will make it right.
        </p>
      </LegalSection>

      <LegalSection title="6. Availability and changes">
        <p>
          We work hard to keep the service available, but we do not guarantee uninterrupted access.
          We may update features, packages, or these terms from time to time; the latest version
          will always be posted on this page.
        </p>
      </LegalSection>

      <LegalSection title="7. Contact">
        <p>
          Questions about these terms? Reach us through the contact options on our homepage.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
