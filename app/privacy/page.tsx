import { Header } from "@/components/header"
import Link from "next/link"

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <div className="container py-10">
          <div className="max-w-3xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>

            <div className="prose prose-slate max-w-none">
              <p className="text-muted-foreground mb-6">Last updated: May 12, 2025</p>

              <p className="mb-6">
                At BadgeBoost, we take your privacy seriously. This Privacy Policy explains how we collect, use,
                disclose, and safeguard your information when you use our website and services.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">1. Information We Collect</h2>

              <h3 className="text-lg font-medium mt-6 mb-3">Personal Information</h3>
              <p>We may collect personal information that you voluntarily provide to us when you:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Register for an account</li>
                <li>Create or share badges</li>
                <li>Complete your profile</li>
                <li>Contact our customer support</li>
                <li>Participate in community activities</li>
              </ul>
              <p>
                This information may include your name, email address, profile picture, and other information you choose
                to provide.
              </p>

              <h3 className="text-lg font-medium mt-6 mb-3">Usage Information</h3>
              <p>
                We automatically collect certain information about your device and how you interact with our services,
                including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>IP address</li>
                <li>Browser type</li>
                <li>Operating system</li>
                <li>Pages visited and features used</li>
                <li>Time and date of your visits</li>
                <li>Referring website or application</li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">2. How We Use Your Information</h2>
              <p>We may use the information we collect for various purposes, including to:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>Provide, maintain, and improve our services</li>
                <li>Create and manage your account</li>
                <li>Process your requests and transactions</li>
                <li>Communicate with you about our services, updates, and promotions</li>
                <li>Personalize your experience</li>
                <li>Monitor and analyze usage patterns and trends</li>
                <li>Protect against unauthorized access and ensure the security of our services</li>
                <li>Comply with legal obligations</li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">3. Sharing Your Information</h2>
              <p>We may share your information in the following circumstances:</p>
              <ul className="list-disc pl-6 mb-4">
                <li>
                  <strong>With Service Providers:</strong> We may share your information with third-party vendors,
                  service providers, and contractors who perform services on our behalf.
                </li>
                <li>
                  <strong>With Your Consent:</strong> We may share your information when you have given us permission to
                  do so.
                </li>
                <li>
                  <strong>For Legal Reasons:</strong> We may disclose your information if required to do so by law or in
                  response to valid requests by public authorities.
                </li>
                <li>
                  <strong>Business Transfers:</strong> We may share your information in connection with a merger,
                  acquisition, or sale of all or a portion of our assets.
                </li>
              </ul>

              <h2 className="text-xl font-semibold mt-8 mb-4">4. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal information from
                unauthorized access, disclosure, alteration, and destruction. However, no method of transmission over
                the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">5. Your Rights and Choices</h2>
              <p>
                Depending on your location, you may have certain rights regarding your personal information, including:
              </p>
              <ul className="list-disc pl-6 mb-4">
                <li>Accessing, correcting, or deleting your personal information</li>
                <li>Withdrawing your consent</li>
                <li>Objecting to or restricting certain processing activities</li>
                <li>Requesting portability of your personal information</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided in the "Contact Us" section.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">6. Cookies and Similar Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to collect and store information about your
                interactions with our services. You can control cookies through your browser settings and other tools.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">7. Children's Privacy</h2>
              <p>
                Our services are not intended for individuals under the age of 13. We do not knowingly collect personal
                information from children under 13. If we become aware that we have collected personal information from
                a child under 13, we will take steps to delete such information.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">8. Changes to This Privacy Policy</h2>
              <p>
                We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new
                Privacy Policy on this page and updating the "Last updated" date. You are advised to review this Privacy
                Policy periodically for any changes.
              </p>

              <h2 className="text-xl font-semibold mt-8 mb-4">9. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy, please contact us at:</p>
              <p className="mb-8">
                <strong>Email:</strong> privacy@badgeboost.com
                <br />
                <strong>Address:</strong> 123 Badge Way, San Francisco, CA 94103
              </p>

              <div className="border-t pt-6 mt-8">
                <p>
                  By using BadgeBoost, you acknowledge that you have read and understood this Privacy Policy and agree
                  to its terms.
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
