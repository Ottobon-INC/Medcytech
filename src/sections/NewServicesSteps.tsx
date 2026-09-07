import { motion } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

const NewServicesSteps = ({ content }: { content: any }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  // We want to limit to 3 or 4 items for this specific layout if there are many,
  // but let's assume we render all items. The reference design had 3 steps.
  const items = content?.items?.slice(0, 4) || [];

  // Determine which step is active based on scroll position within the container
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const { top, height } = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate how far we've scrolled through the container
      const scrollProgress = -top / (height - windowHeight);

      if (scrollProgress >= 0 && scrollProgress <= 1) {
        // Map progress to active index
        const index = Math.min(Math.floor(scrollProgress * items.length), items.length - 1);
        setActiveIndex(Math.max(0, index));
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items.length]);

  if (!content || items.length === 0) return null;

  return (
    <section className="py-24 md:py-32 bg-[#fafafa] border-t border-gray-100">
      <div className="max-w-6xl mx-auto px-6">

        {/* Header */}
        <div className="mb-16 md:mb-24">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-gray-900 tracking-tight"
          >
            {content.sectionTitle || "Get started in minutes"}
          </motion.h2>
        </div>

        <div className="flex flex-col md:flex-row gap-16 md:gap-24 relative" ref={containerRef}>

          {/* Left Column: Numbered Steps (Scrollable) */}
          <div className="flex-1 space-y-16 md:space-y-48 pb-24 md:pb-[50vh]">
            {items.map((item: any, idx: number) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ margin: "-20% 0px -20% 0px" }}
                className={`transition-opacity duration-500 ${activeIndex === idx ? 'opacity-100' : 'opacity-100 md:opacity-40'}`}
              >
                <div className="text-3xl font-serif text-gray-400 mb-4 pb-4 border-b border-gray-200">
                  {idx + 1}
                </div>
                <h3 className="text-2xl md:text-3xl font-medium text-gray-900 mb-4">
                  {item.title}
                </h3>
                <p className="text-gray-600 mb-6 text-lg">
                  {item.shortDescription}
                </p>
                {/* Mobile inline image */}
                <div className="md:hidden w-full bg-white rounded-2xl shadow-sm border border-gray-100 mb-6 overflow-hidden flex items-center justify-center p-4">
                  <img src={item.image} alt={item.title} className="w-full h-auto max-h-[300px] object-contain" />
                </div>
                <button className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-gray-800 transition-colors">
                  Learn more
                </button>
              </motion.div>
            ))}
          </div>

          {/* Right Column: Sticky Image */}
          <div className="flex-1 hidden md:block">
            <div className="sticky top-1/4 h-[500px] w-full bg-white rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-gray-100 overflow-hidden flex items-center justify-center p-8 transition-all duration-500">
              {/* Display the image for the currently active step */}
              <div className="relative w-full h-full bg-gray-50 rounded-2xl border border-gray-100 shadow-inner flex items-center justify-center overflow-hidden">
                {items.map((item: any, idx: number) => (
                  <img
                    key={item.id}
                    src={item.image}
                    alt={item.title}
                    className={`absolute w-full h-auto object-contain transition-opacity duration-500 ${activeIndex === idx ? 'opacity-100' : 'opacity-0'}`}
                  />
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default NewServicesSteps;
