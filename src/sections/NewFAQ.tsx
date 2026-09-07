import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const placeholderFAQs = [
  {
    question: 'How long does it take to set up?',
    answer: 'Most clinics are fully onboarded and operational within 48 to 72 hours, depending on the complexity of your existing systems.'
  },
  {
    question: 'Does this integrate with our current EMR?',
    answer: 'Yes, our platform is designed to run alongside or integrate directly with most major Electronic Medical Record systems to ensure seamless data flow.'
  },
  {
    question: 'Do we need technical staff to run this?',
    answer: 'Not at all. We handle all the technical heavy lifting, setup, and maintenance. Your staff just uses the intuitive front-end dashboard.'
  },
  {
    question: 'What happens if we need help or support?',
    answer: 'We provide dedicated account managers and 24/7 technical support for all our clinical partners to ensure zero downtime.'
  }
];

export default function NewFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-[#fafafa]">
      <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row gap-12 md:gap-24">
        
        {/* Left side: Title */}
        <div className="md:w-1/3 mb-8 md:mb-0">
          <h2 className="text-2xl font-serif text-gray-900">
            Frequently Asked Questions
          </h2>
        </div>

        {/* Right side: Accordion */}
        <div className="md:w-2/3 flex flex-col gap-4">
          {placeholderFAQs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div 
                key={idx} 
                className={`bg-[#f0efeb] rounded-2xl transition-all duration-300 overflow-hidden ${isOpen ? 'shadow-sm' : ''}`}
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left px-6 py-5 flex justify-between items-center focus:outline-none"
                >
                  <span className="font-medium text-gray-900 pr-8">{faq.question}</span>
                  <div className="w-8 h-8 rounded-full bg-white/50 flex items-center justify-center shrink-0">
                    {isOpen ? (
                      <Minus className="w-4 h-4 text-gray-600" />
                    ) : (
                      <Plus className="w-4 h-4 text-gray-600" />
                    )}
                  </div>
                </button>
                
                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="px-6 pb-6 text-gray-600 text-sm leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
