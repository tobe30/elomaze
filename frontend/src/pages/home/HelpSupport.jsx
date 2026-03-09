import { useState } from "react";
import {
  Search,
  MessageCircle,
  Mail,
  Phone,
  ChevronRight,
} from "lucide-react";

const faqCategories = [
  {
    category: "Getting Started",
    faqs: [
      {
        question: "How do I create an account on Elomaze?",
        answer:
          "Creating an account is simple. Click the 'Sign Up' button, enter your email and password, verify your email address, and you're ready to explore listings and services in your area.",
      },
      {
        question: "Is Elomaze free to use?",
        answer:
          "Yes, browsing listings, connecting with agents, and accessing community features is completely free.",
      },
      {
        question: "What areas does Elomaze cover?",
        answer:
          "Elomaze currently operates in major university towns and cities and is expanding continuously.",
      },
    ],
  },
  {
    category: "Listings & Properties",
    faqs: [
      {
        question: "How do I list my property?",
        answer:
          "Go to 'List Your Space', fill in property details, upload photos, and submit for review.",
      },
      {
        question: "Can I edit my listing?",
        answer:
          "Yes, listings can be edited anytime from your dashboard.",
      },
      {
        question: "How do I contact an agent?",
        answer:
          "Each listing has a contact option to message or schedule a viewing.",
      },
    ],
  },
];

const HelpSupport = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = faqCategories
    .map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.faqs.length > 0);

  return (
    <div className="min-h-screen bg-base-100">


      {/* HERO */}
      <section className="pt-28 pb-16 bg-base-200 text-center px-4">
        <h1 className="text-3xl md:text-5xl font-bold mb-4">
          Help & Support
        </h1>
        <p className="text-base-content/70 max-w-2xl mx-auto mb-8">
          Find answers to common questions or reach out to our support team.
        </p>
      </section>

      {/* QUICK HELP */}
      <section className="-mt-10 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-4">
          {[
            {
              icon: <MessageCircle />,
              title: "Whatsapp Support",
              text: "Chat with our team",
            },
            {
              icon: <Mail />,
              title: "Email Us",
              text: "support@elomaze.com",
            },
            {
              icon: <Phone />,
              title: "Call Us",
              text: "Mon–Fri, 9am–6pm",
              call: "+234 123 456 7890",

            },
          ].map((item, i) => (
            <div
              key={i}
              className="card bg-base-100 shadow-md hover:shadow-lg transition cursor-pointer"
            >
              <div className="card-body flex-row items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="text-sm opacity-70">{item.text}</p>
                  <p className="text-sm opacity-70">{item.call}</p>

                </div>
                <ChevronRight className="opacity-50" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-center mb-10">
            Frequently Asked Questions
          </h2>

          {filteredCategories.length === 0 ? (
            <div className="text-center">
              <p>No results found.</p>
              <button
                className="btn btn-outline mt-4"
                onClick={() => setSearchQuery("")}
              >
                Clear Search
              </button>
            </div>
          ) : (
            <div className="space-y-8">
              {filteredCategories.map((category, index) => (
                <div key={index} className="card bg-base-100 shadow">
                  <div className="card-body">
                    <h3 className="text-lg font-semibold mb-4">
                      {category.category}
                    </h3>

                    <div className="space-y-2">
                      {category.faqs.map((faq, i) => (
                        <div
                          key={i}
                          className="collapse collapse-arrow bg-base-200"
                        >
                          <input type="checkbox" />
                          <div className="collapse-title font-medium">
                            {faq.question}
                          </div>
                          <div className="collapse-content text-base-content/70">
                            <p>{faq.answer}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
     <section className="bg-base-200 py-16 text-center px-4">
  <h2 className="text-2xl md:text-3xl font-bold mb-4">
    Still need help?
  </h2>
  <p className="max-w-xl mx-auto opacity-70 mb-6">
    Our support team usually responds within 24 hours.
  </p>
  <button className="inline-flex items-center gap-2 bg-primary text-white px-5 py-2.5 text-sm font-medium rounded-xl hover:opacity-90 transition mx-auto">
    <Mail className="w-4 h-4" />
    Contact Support
  </button>
</section>

    </div>
  );
};

export default HelpSupport;
