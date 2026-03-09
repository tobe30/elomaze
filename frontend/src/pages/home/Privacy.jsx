import { useEffect, useState } from "react";

const sections = [
  { id: "introduction", title: "1. Introduction" },
  { id: "collection", title: "2. Information We Collect" },
  { id: "usage", title: "3. How We Use Your Information" },
  { id: "sharing", title: "4. Information Sharing" },
  { id: "cookies", title: "5. Cookies & Tracking" },
  { id: "security", title: "6. Data Security" },
  { id: "retention", title: "7. Data Retention" },
  { id: "rights", title: "8. Your Rights" },
  { id: "children", title: "9. Children's Privacy" },
  { id: "international", title: "10. International Transfers" },
  { id: "thirdparty", title: "11. Third-Party Links" },
  { id: "changes", title: "12. Policy Changes" },
  { id: "contact", title: "13. Contact Us" },
];

const Privacy = () => {
  const [activeSection, setActiveSection] = useState("introduction");

  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = sections.map(section => ({
        id: section.id,
        element: document.getElementById(section.id),
      }));

      for (const section of sectionElements.reverse()) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect();
          if (rect.top <= 150) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: elementPosition - offset, behavior: "smooth" });
    }
  };

  return (
    <div className="min-h-screen bg-base-100">

      {/* Header */}
      <section className="bg-gray-100 border-b border-gray-300 pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-lg">Last updated: February 5, 2026</p>
        </div>
      </section>

      {/* Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex gap-12 max-w-6xl mx-auto">
          {/* Sticky Table of Contents */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-24">
              <h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">
                Table of Contents
              </h2>
              <nav className="space-y-1">
                {sections.map(section => (
                  <button
                    key={section.id}
                    onClick={() => scrollToSection(section.id)}
                    className={`block w-full text-left text-sm py-2 px-3 rounded-md transition-colors ${
                      activeSection === section.id
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-gray-400 hover:text-gray-900 hover:bg-gray-200"
                    }`}
                  >
                    {section.title}
                  </button>
                ))}
              </nav>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1 max-w-3xl">
            <div className="space-y-12 text-gray-500">

              <section id="introduction">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                  1. Introduction
                </h2>
                <p>
                  At Elomaze, your privacy is our priority. This Privacy Policy explains how we collect, use, disclose, and protect your information when you use our platform, including our website, mobile apps, and services. By using Elomaze, you agree to this policy.
                </p>
              </section>

              <section id="collection">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                  2. Information We Collect
                </h2>
                <p>We collect information you provide and information collected automatically:</p>
                <h3 className="font-medium mt-4">Information You Provide:</h3>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Name, email, phone number, and password</li>
                  <li>Profile details like photo, bio, preferences, and location</li>
                  <li>Property listings, photos, pricing, and descriptions</li>
                  <li>Communications with support, other users, or agents</li>
                  <li>Documents for verification such as ID or business licenses</li>
                </ul>
                <h3 className="font-medium mt-4">Information Collected Automatically:</h3>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Device type, operating system, and browser information</li>
                  <li>Usage data including pages visited and features used</li>
                  <li>Location data if enabled for location-based services</li>
                  <li>IP addresses, log files, and referrer URLs</li>
                  <li>Cookies and similar tracking technologies</li>
                </ul>
              </section>

              <section id="usage">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                  3. How We Use Your Information
                </h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>To provide, maintain, and improve our services</li>
                  <li>To communicate updates, promotions, and important notifications</li>
                  <li>To verify identities and prevent fraud</li>
                  <li>To connect users with relevant listings or services</li>
                  <li>To respond to inquiries, support requests, and feedback</li>
                  <li>To analyze trends and usage for improving the platform</li>
                  <li>To comply with legal obligations</li>
                </ul>
              </section>

              <section id="sharing">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                  4. Information Sharing
                </h2>
                <p>We may share your information under the following circumstances:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>With other users for interactions and property inquiries</li>
                  <li>With service providers performing work on our behalf</li>
                  <li>When required by law or legal processes</li>
                  <li>To protect rights, property, or safety of Elomaze and others</li>
                  <li>During business transfers such as mergers or acquisitions</li>
                  <li>With your consent for specific purposes</li>
                </ul>
                <p className="mt-2">We do not sell your personal information for marketing purposes.</p>
              </section>

              <section id="cookies">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                  5. Cookies & Tracking
                </h2>
                <p>
                  Cookies and similar technologies help us improve our service, remember your preferences, and analyze trends.
                </p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Essential cookies for basic functionality</li>
                  <li>Analytics cookies to understand usage</li>
                  <li>Preference cookies for settings</li>
                  <li>Marketing cookies for targeted ads</li>
                </ul>
              </section>

              <section id="security">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                  6. Data Security
                </h2>
                <p>We implement reasonable measures to protect your information:</p>
                <ul className="list-disc pl-6 mt-2 space-y-1">
                  <li>Encryption of sensitive data</li>
                  <li>Access controls and authentication</li>
                  <li>Regular security audits and monitoring</li>
                  <li>Employee training on data privacy</li>
                  <li>Secure data storage facilities</li>
                </ul>
                <p className="mt-2">No system is completely secure, but we strive to protect your data.</p>
              </section>

              <section id="retention">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                  7. Data Retention
                </h2>
                <p>We retain your personal data only as long as necessary for our services and legal obligations. You may request deletion of your data at any time.</p>
              </section>

              <section id="rights">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                  8. Your Rights
                </h2>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Access your data</li>
                  <li>Correct inaccuracies</li>
                  <li>Request deletion</li>
                  <li>Transfer data to another service</li>
                  <li>Object to processing</li>
                  <li>Restrict processing</li>
                  <li>Withdraw consent</li>
                </ul>
              </section>

              <section id="children">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                  9. Children's Privacy
                </h2>
                <p>Our service is not intended for children under 18. We do not knowingly collect data from minors. If discovered, we will delete it promptly.</p>
              </section>

              <section id="international">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                  10. International Transfers
                </h2>
                <p>We may transfer your information to countries with different data laws. We ensure protection through contractual safeguards and compliance with international standards.</p>
              </section>

              <section id="thirdparty">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                  11. Third-Party Links
                </h2>
                <p>Our platform may link to third-party websites and services. We are not responsible for their privacy practices. Review their policies before sharing personal data.</p>
              </section>

              <section id="changes">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                  12. Policy Changes
                </h2>
                <p>We may update this Privacy Policy occasionally. Changes will be posted with an updated date. Continued use indicates acceptance of changes.</p>
              </section>

              <section id="contact">
                <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                  13. Contact Us
                </h2>
                <p>For questions or concerns, contact us:</p>
                <div className="bg-gray-100 rounded-lg p-6 mt-4">
                  <p className="font-semibold text-gray-900">Elomaze Privacy Team</p>
                  <p className="mt-2">Email: privacy@elomaze.com</p>
                  <p>Address: 123 Innovation Drive, Suite 400</p>
                  <p>San Francisco, CA 94105</p>
                </div>
                <p className="mt-2">EU residents may lodge complaints with local data protection authorities.</p>
              </section>

            </div>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
