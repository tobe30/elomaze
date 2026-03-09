import { useEffect, useState } from "react";

const sections = [
  { id: "acceptance", title: "1. Acceptance of Terms" },
  { id: "eligibility", title: "2. Eligibility" },
  { id: "account", title: "3. Account Registration" },
  { id: "use", title: "4. Acceptable Use" },
  { id: "listings", title: "5. Listings & Transactions" },
  { id: "payments", title: "6. Payments & Fees" },
  { id: "content", title: "7. User Content" },
  { id: "intellectual", title: "8. Intellectual Property" },
  { id: "privacy", title: "9. Privacy" },
  { id: "disclaimers", title: "10. Disclaimers" },
  { id: "liability", title: "11. Limitation of Liability" },
  { id: "indemnification", title: "12. Indemnification" },
  { id: "termination", title: "13. Termination" },
  { id: "disputes", title: "14. Dispute Resolution" },
  { id: "changes", title: "15. Changes to Terms" },
  { id: "contact", title: "16. Contact Information" },
];

const Terms = () => {
  const [activeSection, setActiveSection] = useState("acceptance");

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
            Terms & Conditions
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
                {sections.map((section) => (
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
          <main className="flex-1 max-w-3xl space-y-12 text-gray-500">
            <p className="leading-relaxed text-base mb-8">
              Welcome to Elomaze. These Terms and Conditions ("Terms") govern your access to and use of the Elomaze platform, 
              including our website, mobile applications, and all related services (collectively, the "Service"). 
              By using the Service, you agree to these Terms in full.
            </p>

            {/* Sections */}
            <section id="acceptance" className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                1. Acceptance of Terms
              </h2>
              <div className="space-y-4 leading-relaxed">
                <p>By accessing or using Elomaze, you agree to be bound by these Terms and our Privacy Policy. If you do not agree to these Terms, you may not access or use the Service. Elomaze may update these Terms at any time, and continued use of the Service constitutes acceptance of the updated Terms.</p>
              </div>
            </section>

            <section id="eligibility" className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                2. Eligibility
              </h2>
              <div className="space-y-4 leading-relaxed">
                <p>To use the Service, you must be at least 18 years old and capable of entering into a binding agreement. By using the Service, you represent that you meet these eligibility requirements and are not prohibited from using the Service under any applicable laws.</p>
              </div>
            </section>

            <section id="account" className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                3. Account Registration
              </h2>
              <div className="space-y-4 leading-relaxed">
                <p>To access certain features, you must create an account. You agree to provide accurate information, maintain account security, and notify us immediately of any unauthorized use.</p>
              </div>
            </section>

            <section id="use" className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                4. Acceptable Use
              </h2>
              <div className="space-y-4 leading-relaxed">
                <p>You agree not to misuse the Service. Prohibited activities include, but are not limited to: illegal activity, posting harmful content, attempting unauthorized access, distributing malware, or disrupting the Service.</p>
              </div>
            </section>

            <section id="listings" className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                5. Listings & Transactions
              </h2>
              <div className="space-y-4 leading-relaxed">
                <p>Elomaze provides a platform to list and find housing, products, and services. Users are responsible for the accuracy of listings, compliance with applicable laws, and due diligence in transactions. Elomaze is not a party to any transaction and does not guarantee quality or legality.</p>
              </div>
            </section>

            <section id="payments" className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                6. Payments & Fees
              </h2>
              <div className="space-y-4 leading-relaxed">
                <p>Some services may require payment. Users agree to pay all applicable fees and authorize charges. All payments are non-refundable unless specified. Elomaze may change fees with prior notice.</p>
              </div>
            </section>

            <section id="content" className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                7. User Content
              </h2>
              <div className="space-y-4 leading-relaxed">
                <p>Users retain ownership of content they post. By posting, you grant Elomaze a non-exclusive license to display and distribute content. Users are responsible for their content and must not violate third-party rights or laws.</p>
              </div>
            </section>

            <section id="intellectual" className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                8. Intellectual Property
              </h2>
              <div className="space-y-4 leading-relaxed">
                <p>The Service and its content are owned by Elomaze and protected by intellectual property laws. You may not copy, distribute, or modify any content without permission. Elomaze trademarks are protected.</p>
              </div>
            </section>

            <section id="privacy" className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                9. Privacy
              </h2>
              <div className="space-y-4 leading-relaxed">
                <p>Your privacy is important. We collect and use personal data only as described in our Privacy Policy. Users must safeguard account credentials and understand no method of transmission is 100% secure.</p>
              </div>
            </section>

            <section id="disclaimers" className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                10. Disclaimers
              </h2>
              <div className="space-y-4 leading-relaxed">
                <p>The Service is provided "as is" without warranties. Elomaze does not guarantee uninterrupted access, accuracy of content, or quality of products/services obtained via the Service.</p>
              </div>
            </section>

            <section id="liability" className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                11. Limitation of Liability
              </h2>
              <div className="space-y-4 leading-relaxed">
                <p>Elomaze is not liable for indirect, incidental, or consequential damages. Total liability is limited to the amount paid by the user in the 12 months prior to the claim, or $100, whichever is greater.</p>
              </div>
            </section>

            <section id="indemnification" className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                12. Indemnification
              </h2>
              <div className="space-y-4 leading-relaxed">
                <p>Users agree to indemnify Elomaze and its affiliates from any claims, damages, losses, or expenses arising from use of the Service or violation of Terms.</p>
              </div>
            </section>

            <section id="termination" className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                13. Termination
              </h2>
              <div className="space-y-4 leading-relaxed">
                <p>Elomaze may suspend or terminate accounts for breach of Terms or illegal activity. Upon termination, rights to use the Service end, but provisions regarding liability, ownership, and indemnity survive.</p>
              </div>
            </section>

            <section id="disputes" className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                14. Dispute Resolution
              </h2>
              <div className="space-y-4 leading-relaxed">
                <p>Disputes must be resolved through binding arbitration in accordance with the rules of the American Arbitration Association. Users waive rights to class actions or class-wide arbitration.</p>
              </div>
            </section>

            <section id="changes" className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                15. Changes to Terms
              </h2>
              <div className="space-y-4 leading-relaxed">
                <p>Elomaze may modify Terms at any time. Users’ continued use after changes constitutes acceptance. Updates will be posted with a revised “Last updated” date.</p>
              </div>
            </section>

            <section id="contact" className="mb-12">
              <h2 className="text-xl font-semibold text-gray-900 mb-4 pb-2 border-b border-gray-300">
                16. Contact Information
              </h2>
              <div className="space-y-4 leading-relaxed">
                <p>If you have questions regarding these Terms, contact us:</p>
                <div className="bg-gray-100 rounded-lg p-6 mt-4">
                  <p className="font-semibold text-gray-900">Elomaze Legal Team</p>
                  <p className="mt-2">Email: legal@elomaze.com</p>
                  <p>Address: 123 Innovation Drive, Suite 400</p>
                  <p>San Francisco, CA 94105</p>
                </div>
              </div>
            </section>

          </main>
        </div>
      </div>

    </div>
  );
};

export default Terms;
