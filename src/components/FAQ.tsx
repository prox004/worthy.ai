import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const faqs = [
  {
    question: "How accurate is the salary data?",
    answer: "Our salary data is sourced from multiple reliable sources including verified user submissions, company reports, and market surveys. We maintain an accuracy rate of over 87% through continuous validation and updates."
  },
  {
    question: "How often is the data updated?",
    answer: "We update our database daily with new salary information and market trends. Our AI algorithms continuously process and validate new data points to ensure you have access to the most current market insights."
  },
  {
    question: "Can I use this for team salary planning?",
    answer: "Yes! Our Enterprise plan is specifically designed for HR teams and managers. It includes team collaboration features, custom reports, and advanced analytics to help with compensation planning and market positioning."
  },
  {
    question: "Is my data secure and private?",
    answer: "Absolutely. We take data privacy seriously. All personal information is encrypted, and we comply with GDPR and other relevant data protection regulations. You can read more about our security measures in our Privacy Policy."
  },
  {
    question: "Do you offer a free trial?",
    answer: "Yes, we offer a 14-day free trial of our Professional plan. No credit card required. You can explore all features and decide if it's the right fit for your needs."
  }
];

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about Worthy AI
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border-b border-slate-200 last:border-0"
            >
              <button
                className="w-full py-6 text-left flex justify-between items-center focus:outline-none"
                onClick={() => toggleFAQ(index)}
              >
                <span className="text-lg font-semibold text-slate-900">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`w-5 h-5 text-slate-500 transform transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 pb-6' : 'max-h-0'
                }`}
              >
                <p className="text-slate-600">{faq.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ; 