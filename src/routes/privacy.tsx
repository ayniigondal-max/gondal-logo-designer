import { createFileRoute } from "@tanstack/react-router";
import LegalPage, { LegalSection } from "@/components/legal-page";

export const Route = createFileRoute("/privacy")({
  component: PrivacyPage,
  head: () => ({
    meta: [
      { title: "Privacy Policy — Gondal AI Logo Generator" },
      {
        name: "description",
        content: "How Gondal AI Logo Generator collects, uses, and protects your information — brand details, device preferences, and privacy commitments.",
      },
      { property: "og:title", content: "Privacy Policy — Gondal AI Logo Generator" },
      {
        property: "og:description",
        content: "How Gondal AI Logo Generator collects, uses, and protects your information.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
});

function PrivacyPage() {
  return (
    <LegalPage
      title="Privacy Policy"
      updated="October 6, 2026"
      intro="Your privacy matters to us. This policy explains what information Gondal AI Logo Generator collects, why we collect it, and how we keep it safe."
    >
      <LegalSection title="Information you give us">
        <p>
          When you use the generator, you provide your brand name, slogan, industry, style and
          color choices, and an optional written or voice description of your logo idea. We never
          ask for payment details, card numbers, or bank information — every package is free.
        </p>
      </LegalSection>

      <LegalSection title="How your logo ideas are processed">
        <p>
          Logo concepts are generated locally in your browser from the details you enter. Your
          brand descriptions and generated designs are not sent to third-party AI services. Voice
          input is processed by your browser's own speech recognition feature and is only used to
          fill in your description.
        </p>
      </LegalSection>

      <LegalSection title="Information stored on your device">
        <p>
          We store small preferences in your browser's local storage — for example, your selected
          country, so we can show prices with a local-currency estimate. This information never
          leaves your device and you can clear it at any time through your browser settings.
        </p>
      </LegalSection>

      <LegalSection title="How we use your information">
        <p>We use the information you provide only to:</p>
        <ul className="list-disc space-y-1 pl-5">
          <li>Generate your logo concepts according to your choices</li>
          <li>Respond to your questions and support requests</li>
          <li>Prevent fraud and abuse of the service</li>
        </ul>
        <p>We do not sell, rent, or share your personal information with advertisers.</p>
      </LegalSection>

      <LegalSection title="Data retention">
        <p>
          Your brand details and generated designs stay on your device. We do not keep copies of
          your logo ideas on our servers. You may ask us to delete any information at any time by
          contacting us.
        </p>
      </LegalSection>

      <LegalSection title="Changes to this policy">
        <p>
          If we update this policy, we will post the new version on this page with a revised
          "last updated" date. Continued use of the service after changes means you accept the
          updated policy.
        </p>
      </LegalSection>

      <LegalSection title="Contact">
        <p>
          Questions about this policy or your data? Contact us through the options on our homepage
          and we will be happy to help.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
