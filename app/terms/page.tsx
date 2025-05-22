import { Header } from "@/components/header"
import Link from "next/link"

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Terms of Service</h1>

            <div className="prose prose-slate max-w-none">
              <p className="text-muted-foreground mb-6">Last updated: May 12, 2025</p>

              <h2 className="text-xl font-semibold mt-8 mb-4">1. Introduction</h2>
              <p>
                Welcome to BadgeBoost ("we," "our," or "us"). These Terms of Service ("Terms") govern your access to and
                use of the BadgeBoost website, services, and applications (collectively, the "Service").
              </p>
              <p>
                By accessing or using the Service, you agree to be bound by these Terms. If you do not agree to these
                Terms, you may not access or use the Service.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">2. Account Registration</h2>
              <p>
                To use certain features of the Service, you must register for an account. When you register, you agree
                to provide accurate, current, and complete information about yourself and to update this information to
                keep it accurate, current, and complete.
              </p>
              <p>
                You are responsible for safeguarding your password and for all activities that occur under your account.
                You agree to notify us immediately of any unauthorized use of your account.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">3. User Content</h2>
              <p>
                Our Service allows you to create, upload, post, send, receive, store, and share content, including
                badges, messages, text, photos, and other materials (collectively, "User Content").
              </p>
              <p>
                You retain all rights in and to your User Content. By submitting User Content to the Service, you grant
                us a worldwide, non-exclusive, royalty-free license to use, copy, modify, create derivative works based
                on, distribute, publicly display, and publicly perform your User Content in connection with operating
                and providing the Service.
              </p>
              <p>
                You represent and warrant that: (i) you own your User Content or have the right to grant the rights and
                licenses contained in these Terms; and (ii) your User Content does not violate any third party's rights,
                including intellectual property rights and privacy rights.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">4. Prohibited Conduct</h2>
              <p>You agree not to engage in any of the following prohibited activities:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  Using the Service for any illegal purpose or in violation of any local, state, national, or
                  international law
                </li>
                <li>Harassing, threatening, intimidating, or impersonating any other user of the Service</li>
                <li>
                  Posting or transmitting any content that is abusive, harassing, threatening, obscene, defamatory, or
                  otherwise objectionable
                </li>
                <li>Attempting to circumvent any security feature of the Service</li>
                <li>Using the Service to send unsolicited communications, promotions, or advertisements</li>
                <li>Interfering with, disrupting, or creating an undue burden on the Service</li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">5. Intellectual Property</h2>
              <p>
                The Service and its original content, features, and functionality are and will remain the exclusive
                property of BadgeBoost and its licensors. The Service is protected by copyright, trademark, and other
                laws of both the United States and foreign countries.
              </p>
              <p>
                Our trademarks and trade dress may not be used in connection with any product or service without the
                prior written consent of BadgeBoost.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">6. Termination</h2>
              <p>
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice
                or liability, under our sole discretion, for any reason whatsoever and without limitation, including but
                not limited to a breach of the Terms.
              </p>
              <p>
                If you wish to terminate your account, you may simply discontinue using the Service or contact us to
                request account deletion.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">7. Limitation of Liability</h2>
              <p>
                In no event shall BadgeBoost, nor its directors, employees, partners, agents, suppliers, or affiliates,
                be liable for any indirect, incidental, special, consequential or punitive damages, including without
                limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from (i) your
                access to or use of or inability to access or use the Service; (ii) any conduct or content of any third
                party on the Service; (iii) any content obtained from the Service; and (iv) unauthorized access, use or
                alteration of your transmissions or content.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">8. Changes to Terms</h2>
              <p>
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a
                revision is material, we will provide at least 30 days' notice prior to any new terms taking effect.
                What constitutes a material change will be determined at our sole discretion.
              </p>
              <p>
                By continuing to access or use our Service after any revisions become effective, you agree to be bound
                by the revised terms. If you do not agree to the new terms, you are no longer authorized to use the
                Service.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">9. Governing Law</h2>
              <p>
                These Terms shall be governed and construed in accordance with the laws of the United States, without
                regard to its conflict of law provisions.
              </p>
              <p>
                Our failure to enforce any right or provision of these Terms will not be considered a waiver of those
                rights. If any provision of these Terms is held to be invalid or unenforceable by a court, the remaining
                provisions of these Terms will remain in effect.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">10. Contact Us</h2>
              <p>If you have any questions about these Terms, please contact us at:</p>
              <p className="mb-8">
                <strong>Email:</strong> support@badgeboost.com
                <br />
                <strong>Address:</strong> 123 Badge Way, San Francisco, CA 94103
              </p>

              <div className="border-t pt-6 mt-8">
                <p>
                  By using the BadgeBoost service, you acknowledge that you have read and understood these Terms of
                  Service and agree to be bound by them.
                </p>
              </div>
            </div>

            <div className="mt-8">
              <Link href="/signup" className="text-primary hover:underline">
                Back to Sign Up
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
