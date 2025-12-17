export const metadata = {
  title: 'Terms of Service | MH5',
  description: 'Terms of Service for the MH5 website and services.',
}

export default function TermsPage() {
  return (
    <div className="py-20 bg-midnight min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-offwhite mb-8">Terms of Service</h1>
        <p className="text-offwhite/60 mb-8">Last updated: December 2024</p>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-8 text-offwhite/70">
            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">1. Acceptance of Terms</h2>
              <p>
                By accessing and using the MH5 website (mh5.com), you accept and agree to be bound
                by the terms and provision of this agreement. If you do not agree to abide by these
                terms, please do not use this site.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">2. Use License</h2>
              <p>
                Permission is granted to temporarily view the materials on MH5&apos;s website for
                personal, non-commercial transitory viewing only. This is the grant of a license,
                not a transfer of title.
              </p>
              <p className="mt-4">Under this license you may not:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Modify or copy the materials</li>
                <li>Use the materials for any commercial purpose</li>
                <li>Attempt to decompile or reverse engineer any software on the website</li>
                <li>Remove any copyright or other proprietary notations</li>
                <li>Transfer the materials to another person</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">3. Ticket Purchases</h2>
              <p>
                All ticket purchases are final. Refund policies are outlined in our Event Terms.
                Tickets are non-transferable unless otherwise stated. We reserve the right to
                cancel or reschedule events with appropriate notice and refund provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">4. User Accounts</h2>
              <p>
                When you create an account with us, you must provide accurate and complete
                information. You are responsible for safeguarding your account credentials and
                for any activities or actions under your account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">5. Intellectual Property</h2>
              <p>
                The MH5 brand, logo, and all content on this website are the property of
                Milan Harrison and MH5. You may not use any trademarks, logos, or other
                proprietary information without express written consent.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">6. Limitation of Liability</h2>
              <p>
                In no event shall MH5 or its suppliers be liable for any damages arising out of
                the use or inability to use the materials on MH5&apos;s website, even if MH5 or an
                authorized representative has been notified of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">7. Governing Law</h2>
              <p>
                These terms and conditions are governed by and construed in accordance with the
                laws of the Commonwealth of Massachusetts, and you irrevocably submit to the
                exclusive jurisdiction of the courts in that State.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">8. Changes to Terms</h2>
              <p>
                MH5 may revise these terms of service at any time without notice. By using this
                website you are agreeing to be bound by the then current version of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">9. Contact</h2>
              <p>
                If you have any questions about these Terms, please contact us at{' '}
                <a href="mailto:legal@mh5.com" className="text-ice hover:underline">
                  legal@mh5.com
                </a>
              </p>
            </section>
          </div>
        </div>

        <p className="text-offwhite/40 text-sm mt-12">
          [PLACEHOLDER: This is template legal content. Consult with a licensed attorney
          before deployment to ensure compliance with applicable laws.]
        </p>
      </div>
    </div>
  )
}
