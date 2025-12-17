export const metadata = {
  title: 'Event Terms & Conditions | MH5',
  description: 'Terms and conditions for MH5 events, including ticket policies, refunds, and liability.',
}

export default function EventTermsPage() {
  return (
    <div className="py-20 bg-midnight min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-offwhite mb-8">Event Terms & Conditions</h1>
        <p className="text-offwhite/60 mb-8">Last updated: December 2024</p>

        <div className="prose prose-invert max-w-none">
          <div className="space-y-8 text-offwhite/70">
            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">1. Ticket Purchase Agreement</h2>
              <p>
                By purchasing a ticket to any MH5 event, you agree to these terms and conditions.
                All ticket sales are processed through our secure payment partner, Stripe.
                A confirmation email will be sent upon successful purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">2. Refund Policy</h2>
              <div className="bg-smoke p-6 rounded-xl mt-4">
                <ul className="space-y-3">
                  <li className="flex items-start">
                    <span className="text-ice font-semibold mr-3">•</span>
                    <span><strong>7+ days before event:</strong> Full refund available</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-ice font-semibold mr-3">•</span>
                    <span><strong>3-7 days before event:</strong> 50% refund available</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-danger font-semibold mr-3">•</span>
                    <span><strong>Less than 3 days before event:</strong> No refunds</span>
                  </li>
                </ul>
              </div>
              <p className="mt-4">
                Refund requests must be submitted via email to{' '}
                <a href="mailto:tickets@mh5.com" className="text-ice hover:underline">
                  tickets@mh5.com
                </a>
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">3. Event Cancellation</h2>
              <p>
                In the event of cancellation by MH5 due to unforeseen circumstances, all ticket
                holders will receive a full refund within 5-7 business days. MH5 is not responsible
                for any additional costs incurred (travel, accommodation, etc.).
              </p>
              <p className="mt-4">
                If an event is rescheduled, tickets will be valid for the new date. Refund requests
                for rescheduled events will be honored within 14 days of the announcement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">4. Ticket Transfer</h2>
              <p>
                Tickets are non-transferable unless otherwise stated. Resale of tickets above
                face value is prohibited. Tickets obtained through unauthorized resellers may
                be cancelled without refund.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">5. Age Requirements</h2>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li><strong>Tournaments:</strong> All ages welcome (under 18 must be accompanied by adult)</li>
                <li><strong>Club Nights:</strong> 21+ with valid ID required</li>
                <li><strong>VIP Experiences:</strong> Varies by event (check event details)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">6. Photo & Video Consent</h2>
              <p>
                By attending an MH5 event, you consent to being photographed and/or filmed.
                Images and footage may be used for promotional purposes, social media, and
                marketing materials. If you do not wish to be photographed, please notify
                event staff upon arrival.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">7. Code of Conduct</h2>
              <p>All attendees are expected to:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Treat all attendees, staff, and performers with respect</li>
                <li>Follow venue rules and staff instructions</li>
                <li>Not engage in illegal activities or possess prohibited items</li>
                <li>Not disrupt the event or endanger others</li>
              </ul>
              <p className="mt-4">
                Violation of the code of conduct may result in removal from the event
                without refund.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">8. Assumption of Risk</h2>
              <p>
                Attendance at MH5 events is voluntary. You assume all risks associated with
                attendance, including but not limited to: risk of injury, illness, or
                property damage. MH5 and its affiliates are not liable for any such incidents.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">9. Limitation of Liability</h2>
              <p>
                MH5&apos;s total liability for any claims arising from event attendance shall not
                exceed the ticket price paid. MH5 is not liable for indirect, incidental,
                special, consequential, or punitive damages.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">10. Lost or Stolen Tickets</h2>
              <p>
                MH5 is not responsible for lost, stolen, or damaged tickets. Digital tickets
                should be stored securely. Duplicate tickets may be issued at MH5&apos;s discretion
                with proof of purchase.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">11. VIP Package Terms</h2>
              <p>VIP and VVIP packages include specific benefits outlined at time of purchase:</p>
              <ul className="list-disc list-inside mt-2 space-y-2">
                <li>Meet & greet times and durations are subject to change</li>
                <li>Photo opportunities are with personal devices only unless specified</li>
                <li>Merchandise items are subject to availability</li>
                <li>VIP benefits are non-transferable</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-offwhite mb-4">12. Contact</h2>
              <p>
                For questions about event terms or to request a refund, contact:{' '}
                <a href="mailto:tickets@mh5.com" className="text-ice hover:underline">
                  tickets@mh5.com
                </a>
              </p>
            </section>
          </div>
        </div>

        <p className="text-offwhite/40 text-sm mt-12">
          [PLACEHOLDER: This is template legal content. Consult with a licensed attorney
          before deployment to ensure compliance with applicable event and consumer protection laws.]
        </p>
      </div>
    </div>
  )
}
