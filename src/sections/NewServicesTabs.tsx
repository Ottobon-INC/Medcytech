import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export default function NewServicesTabs({ content }: { content: any }) {
  const items = content.items || [];
  const [activeIndex, setActiveIndex] = useState(0);

  if (!items.length) return null;

  const activeItem = items[activeIndex];

  return (
    <section className="py-24 px-6 bg-[#83b7b5] text-white overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-sm font-medium tracking-widest uppercase mb-4 opacity-80">
            {content.sectionTag || "How We Can Help You"}
          </h2>
        </div>

        <div className="flex flex-col md:flex-row gap-12 lg:gap-24">
          
          {/* Left Column - Tabs */}
          <div className="w-full md:w-1/3 flex flex-col gap-6">
            {items.map((item: any, idx: number) => (
              <button
                key={item.id}
                onClick={() => setActiveIndex(idx)}
                className={`text-left text-2xl md:text-3xl font-serif transition-all duration-300 ${
                  activeIndex === idx ? 'text-white opacity-100 pl-4 border-l-2 border-white' : 'text-white/50 hover:text-white/80'
                }`}
              >
                {item.title}
              </button>
            ))}
          </div>

          {/* Right Column - Content Card */}
          <div className="w-full md:w-2/3">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeItem.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-3xl p-8 md:p-12"
              >
                <p className="text-lg md:text-xl font-light leading-relaxed mb-8">
                  {activeItem.shortDescription || activeItem.detailedDescription?.substring(0, 150) + '...'}
                </p>
                
                {activeItem.features && (
                  <ul className="space-y-4 mb-10">
                    {activeItem.features.slice(0, 3).map((feature: any, idx: number) => (
                      <li key={idx} className="flex items-start gap-3">
                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-white shrink-0" />
                        <span className="text-white/90">{feature.name || feature}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <button className="flex items-center gap-3 bg-white text-[#83b7b5] px-6 py-3 rounded-full text-sm font-semibold hover:bg-gray-50 transition-colors">
                  Learn More
                  <div className="w-6 h-6 rounded-full bg-[#83b7b5]/10 flex items-center justify-center">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
}
