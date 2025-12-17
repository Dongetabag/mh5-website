export const metadata = {
  title: 'Privacy Policy | MH5',
  description: 'Privacy Policy for the MH5 website. Learn how we collect, use, and protect your data.',
}

export default function PrivacyPage() {
  return (
    <div className="py-20 bg-midnight min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-offwhite mb-8">Privacy Policy</h1>
        <p className="text-offwhite/60 mb-8">Last updated: December 2024</p>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-8 text-offwhite/70">
            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">1. Information We Collect</h2>
              <p>We collect information you provide directly to us, such as:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Name and email address when you sign up for our newsletter</li>
                <li>Contact information when you submit inquiry forms</li>
                <li>Payment information when you purchase tickets (processed securely via Stripe)</li>
                <li>Any other information you choose to provide</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">2. Automatic Data Collection</h2>
              <p>When you visit our website, we automatically collect:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Log information (IP address, browser type, pages visited)</li>
                <li>Device information (hardware model, operating system)</li>
                <li>Location information (approximate location based on IP)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">3. How We Use Your Information</h2>
              <p>We use the information we collect to:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Process ticket purchases and send confirmations</li>
                <li>Send you newsletters and marketing communications (with your consent)</li>
                <li>Respond to your inquiries and provide customer support</li>
                <li>Improve our website and user experience</li>
                <li>Analyze usage patterns and site performance</li>
                <li>Comply with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">4. Third-Party Services</h2>
              <p>We use the following third-party services that may collect data:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li><strong>Stripe</strong> — Payment processing</li>
                <li><strong>Google Analytics</strong> — Website analytics</li>
                <li><strong>Hotjar</strong> — User behavior analytics</li>
                <li><strong>ConvertKit/Mailchimp</strong> — Email marketing</li>
              </ul>
              <p className="mt-4">
                Each of these services has their own privacy policy governing their use of your data.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">5. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your
                personal information against unauthorized access, alteration, disclosure, or
                destruction. However, no method of transmission over the Internet is 100% secure.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">6. Your Rights</h2>
              <p>Depending on your location, you may have the right to:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Access the personal data we hold about you</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data</li>
                <li>Opt-out of marketing communications</li>
                <li>Data portability</li>
              </ul>
              <p className="mt-4">
                To exercise these rights, contact us at{' '}
                <a href="mailto:privacy@mh5.com" className="text-ice hover:underline">
                  privacy@mh5.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">7. Cookies</h2>
              <p>
                We use cookies and similar tracking technologies to collect and track information
                about your browsing activities. You can instruct your browser to refuse all cookies
                or to indicate when a cookie is being sent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">8. California Privacy Rights (CCPA)</h2>
              <p>
                If you are a California resident, you have specific rights regarding your personal
                information under the California Consumer Privacy Act. Contact us to exercise
                these rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">9. Children&apos;s Privacy</h2>
              <p>
                Our website is not intended for children under 13 years of age. We do not knowingly
                collect personal information from children under 13.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">10. Changes to This Policy</h2>
              <p>
                We may update this privacy policy from time to time. We will notify you of any
                changes by posting the new policy on this page and updating the &quot;Last updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">11. Contact Us</h2>
              <p>
                If you have questions about this Privacy Policy, please contact us at{' '}
                <a href="mailto:privacy@mh5.com" className="text-ice hover:underline">
                  privacy@mh5.com
                </a>
              </p>
            </section>
          </div>
        </div>

        <p className="text-offwhite/40 text-sm mt-12">
          [PLACEHOLDER: This is template legal content. Consult with a licensed attorney
          before deployment to ensure compliance with GDPR, CCPA, and other applicable laws.]
        </p>
      </div>
    </div>
  )
}
