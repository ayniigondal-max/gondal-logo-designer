import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy - Gondal AI Logo Generator" },
      {
        name: "description",
        content:
          "Privacy Policy for Gondal AI Logo Generator. Learn how we protect your data and privacy.",
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 lg:px-8">
        <div className="rounded-lg bg-card p-8 shadow-sm">
          <h1 className="mb-8 text-4xl font-bold text-foreground">Privacy Policy</h1>
          <p className="mb-6 text-sm text-muted-foreground">
            Last updated: October 12, 2026
          </p>

          <div className="space-y-8 text-foreground">
            {/* Section 1 */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold">1. Introduction</h2>
              <p className="text-muted-foreground">
                Gondal AI Logo Generator ("we," "us," or "our") operates gondal-logo-designer.vercel.app.
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information
                when you visit our website.
              </p>
            </section>

            {/* Section 2 */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold">2. Information We Collect</h2>
              <p className="mb-3 text-muted-foreground">We may collect information about you in a variety of ways:</p>
              <div className="space-y-3">
                <div>
                  <h3 className="font-semibold text-foreground">Personal Data</h3>
                  <p className="text-muted-foreground">
                    If you choose to download logos or make a payment, we may collect your email address.
                    No credit card details are stored on our servers.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Log Data</h3>
                  <p className="text-muted-foreground">
                    Our servers automatically record information created by your use of the service, including
                    IP address, browser type, pages visited, and time spent on pages.
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Analytics</h3>
                  <p className="text-muted-foreground">
                    We use Google Analytics 4 to track usage patterns and improve our service. This data is
                    anonymized and does not identify you personally.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 3 */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold">3. How We Use Your Information</h2>
              <p className="mb-3 text-muted-foreground">We use the information we collect to:</p>
              <ul className="list-inside space-y-2 text-muted-foreground">
                <li>• Provide and improve our logo generation service</li>
                <li>• Verify user identity and prevent fraud</li>
                <li>• Send emails related to your account or downloads (if applicable)</li>
                <li>• Monitor and analyze website usage and trends</li>
                <li>• Comply with legal obligations</li>
                <li>• Respond to user inquiries and provide customer support</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold">4. Google Analytics & Tag Manager</h2>
              <p className="mb-3 text-muted-foreground">
                We use Google Analytics 4 and Google Tag Manager to track website performance and user behavior.
                These services collect anonymized data about how you interact with our site, including:
              </p>
              <ul className="list-inside space-y-2 text-muted-foreground">
                <li>• Pages visited and time spent</li>
                <li>• Device type and operating system</li>
                <li>• Geographic location (city level)</li>
                <li>• Referral sources</li>
              </ul>
              <p className="mt-3 text-muted-foreground">
                You can opt out of Google Analytics by using the{" "}
                <a
                  href="https://tools.google.com/dlpage/gaoptout"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary underline hover:text-primary/80"
                >
                  Google Analytics Opt-out Browser Add-on
                </a>
                .
              </p>
            </section>

            {/* Section 5 */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold">5. Data Security</h2>
              <p className="text-muted-foreground">
                We implement industry-standard security measures to protect your personal information. However,
                no method of transmission over the internet is 100% secure. We cannot guarantee absolute security
                of your data. If you believe your information has been compromised, please contact us immediately.
              </p>
            </section>

            {/* Section 6 */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold">6. Cookies</h2>
              <p className="text-muted-foreground">
                Our website uses cookies to enhance your experience. Cookies are small data files stored on your
                device. You can disable cookies in your browser settings, but some features may not function
                properly. We use cookies for analytics, session management, and personalization.
              </p>
            </section>

            {/* Section 7 */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold">7. Third-Party Links</h2>
              <p className="text-muted-foreground">
                Our website may contain links to third-party websites. We are not responsible for the privacy
                practices of external sites. We recommend reviewing their privacy policies before providing any
                personal information.
              </p>
            </section>

            {/* Section 8 */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold">8. Data Retention</h2>
              <p className="text-muted-foreground">
                We retain personal data only for as long as necessary to provide our services and comply with
                legal obligations. Log data and analytics are typically retained for up to 12 months. If you
                request deletion of your data, we will remove it within 30 days, except where required by law.
              </p>
            </section>

            {/* Section 9 */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold">9. Your Privacy Rights</h2>
              <p className="mb-3 text-muted-foreground">Depending on your location, you may have the right to:</p>
              <ul className="list-inside space-y-2 text-muted-foreground">
                <li>• Access your personal data</li>
                <li>• Request correction of inaccurate data</li>
                <li>• Request deletion of your data</li>
                <li>• Export your data in a portable format</li>
                <li>• Opt out of marketing communications</li>
              </ul>
              <p className="mt-3 text-muted-foreground">
                To exercise these rights, please contact us at support@gondal.com.
              </p>
            </section>

            {/* Section 10 */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold">10. Children's Privacy</h2>
              <p className="text-muted-foreground">
                Gondal AI is not intended for children under 13 years old. We do not knowingly collect personal
                information from children. If we learn that we have collected data from a child under 13, we will
                delete it immediately. Parents who believe their child has provided information can contact us.
              </p>
            </section>

            {/* Section 11 */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold">11. Changes to This Privacy Policy</h2>
              <p className="text-muted-foreground">
                We may update this Privacy Policy to reflect changes in our practices or for other operational,
                legal, or regulatory reasons. We will notify you of any significant changes by updating the "Last
                Updated" date at the top of this page.
              </p>
            </section>

            {/* Section 12 */}
            <section>
              <h2 className="mb-3 text-2xl font-semibold">12. Contact Us</h2>
              <p className="text-muted-foreground">
                If you have any questions about this Privacy Policy or our privacy practices, please contact us:
              </p>
              <p className="mt-2 font-semibold text-foreground">
                Email: support@gondal.com
                <br />
                Website: gondal-logo-designer.vercel.app
              </p>
            </section>

            {/* Additional Note */}
            <div className="mt-12 border-t border-border pt-8">
              <p className="text-sm text-muted-foreground">
                By using Gondal AI Logo Generator, you consent to our Privacy Policy. If you do not agree with
                our practices, please do not use our service.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
