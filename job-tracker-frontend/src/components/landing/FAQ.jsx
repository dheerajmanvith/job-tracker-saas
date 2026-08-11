import { useState } from "react";

function FAQ() {
  const faqs = [
    {
      question: "What is Job Tracker?",
      answer:
        "Job Tracker is a platform that helps you organize job applications, manage interviews, store resumes, and monitor your overall job search progress.",
    },
    {
      question: "Can I use Job Tracker for free?",
      answer:
        "Yes. You can start with the free plan and use the core job tracking features without paying.",
    },
    {
      question: "Can I track interview information?",
      answer:
        "Yes. You can keep track of interview stages, important dates, and other details related to your applications.",
    },
    {
      question: "Can I manage my resumes?",
      answer:
        "Yes. Job Tracker allows you to upload and manage resumes so your application documents stay organized.",
    },
    {
      question: "Is my data secure?",
      answer:
        "Yes. The application uses authentication and access controls to help protect your job search information.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="bg-gray-50 py-20">
      <div className="max-w-4xl mx-auto px-6">

        {/* Section heading */}
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-blue-600">
            FAQ
          </p>

          <h2 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">
            Frequently Asked Questions
          </h2>

          <p className="mt-4 text-lg text-gray-600">
            Find answers to common questions about Job Tracker.
          </p>
        </div>

        {/* FAQ list */}
        <div className="mt-12 space-y-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={faq.question}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white"
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(index)}
                  className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left font-semibold text-gray-900 transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
                  aria-expanded={isOpen}
                >
                  <span>{faq.question}</span>

                  <span
                    className={`text-xl transition-transform duration-200 ${
                      isOpen ? "rotate-45" : ""
                    }`}
                  >
                    +
                  </span>
                </button>

                {isOpen && (
                  <div className="border-t border-gray-100 px-6 py-5 text-gray-600 leading-7">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

export default FAQ;