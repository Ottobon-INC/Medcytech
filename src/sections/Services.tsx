import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { createPortal } from 'react-dom';
import { ArrowRight, X, MapPin, MessageSquare, CheckCircle2, Globe, Users } from 'lucide-react';

const iconMap: any = {
  MapPin: <MapPin className="w-8 h-8" />,
  MessageSquare: <MessageSquare className="w-8 h-8" />,
  Globe: <Globe className="w-8 h-8" />,
  Users: <Users className="w-8 h-8" />
};

const ServiceCard = ({ service }: { service: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <>
      <div className="w-[320px] md:w-[400px] flex-shrink-0 snap-start flex">
        <motion.div
          whileHover={{ y: -8 }}
          className="relative w-full rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#0f3d32]/10 bg-white p-8 flex flex-col h-full cursor-pointer group"
          onClick={() => setIsModalOpen(true)}
        >
          <div className="w-16 h-16 rounded-2xl bg-[#CFE8E5]/50 text-[#0f3d32] flex items-center justify-center mb-6">
            {iconMap[service.icon]}
          </div>
          <h3 className="text-2xl font-bold text-[#0f3d32] tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
            {service.title}
          </h3>
          <p className="text-[#5b6e68] text-sm font-medium leading-relaxed mb-8 flex-1">
            {service.shortDescription}
          </p>
          <div className="flex items-center gap-2 text-sm font-bold text-[#0f3d32] mt-auto">
            Read Full Details
            <div className="w-8 h-8 rounded-full bg-[#0f3d32]/5 flex items-center justify-center group-hover:bg-[#0f3d32] group-hover:text-white transition-colors">
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </div>
          </div>
        </motion.div>
      </div>

      {createPortal(
        <AnimatePresence>
          {isModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={() => setIsModalOpen(false)}
                className="absolute inset-0 bg-[#0f3d32]/60 backdrop-blur-sm cursor-pointer"
              />
              
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative w-full max-w-2xl bg-white rounded-[32px] overflow-hidden shadow-2xl z-10 flex flex-col max-h-[90vh]"
              >
                {/* Header */}
                <div className="p-8 pb-6 bg-[#CFE8E5]/30 relative flex-shrink-0">
                  <button
                    className="absolute top-6 right-6 p-2 bg-white/50 hover:bg-white rounded-full text-[#0f3d32] transition-colors"
                    onClick={() => setIsModalOpen(false)}
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <div className="w-12 h-12 rounded-xl bg-white text-[#0f3d32] flex items-center justify-center mb-4 shadow-sm">
                    {iconMap[service.icon]}
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0f3d32] tracking-tight pr-8" style={{ fontFamily: "'Playfair Display', serif" }}>
                    {service.title}
                  </h3>
                </div>
                
                {/* Body scrollable */}
                <div className="p-8 pt-6 flex-1 overflow-y-auto custom-scrollbar">
                  <p className="text-[#5b6e68] leading-relaxed mb-8 whitespace-pre-wrap">
                    {service.detailedDescription}
                  </p>
                  
                  {service.table && (
                    <div className="mb-10 overflow-hidden rounded-xl border border-[#0f3d32]/10 shadow-sm">
                      <table className="w-full text-sm text-left">
                        <thead className="bg-[#CFE8E5]/30 text-[#0f3d32]">
                          <tr>
                            {service.table.headers.map((header: string, idx: number) => (
                              <th key={idx} className="px-6 py-4 font-bold">{header}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-[#0f3d32]/10 bg-white text-[#5b6e68]">
                          {service.table.rows.map((row: string[], idx: number) => (
                            <tr key={idx}>
                              <td className="px-6 py-4 font-medium text-[#0f3d32]/70 w-1/2">{row[0]}</td>
                              <td className="px-6 py-4 font-semibold w-1/2">{row[1]}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  <h4 className="text-lg font-bold text-[#0f3d32] mb-1">
                    {service.featuresTitle}
                  </h4>
                  {service.featuresSubtitle && (
                    <p className="text-sm text-[#5b6e68] mb-6 italic">{service.featuresSubtitle}</p>
                  )}
                  
                  <div className="space-y-6 mb-8 mt-6">
                    {service.features.map((feature: any, idx: number) => (
                      <div key={idx} className="flex gap-4">
                        <div className="flex-shrink-0 mt-1">
                          <CheckCircle2 className="w-5 h-5 text-[#4ABFB0]" />
                        </div>
                        <div>
                          <h5 className="font-bold text-[#0f3d32] text-sm mb-1">{feature.name}</h5>
                          <p className="text-sm text-[#5b6e68] leading-relaxed">{feature.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="p-6 rounded-2xl bg-[#0f3d32] text-white">
                    <p className="font-medium text-sm leading-relaxed">
                      <span className="font-bold text-[#4ABFB0]">The Bottom Line: </span>
                      {service.bottomLine}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>,
        document.body
      )}
    </>
  );
};

const Services = ({ content }: { content: any }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollLeft = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: -350, behavior: 'smooth' });
  };
  const scrollRight = () => {
    if (scrollRef.current) scrollRef.current.scrollBy({ left: 350, behavior: 'smooth' });
  };

  return (
    <section id="services" className="pt-24 pb-16 relative overflow-hidden bg-[#CFE8E5]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
          <div className="max-w-2xl">
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="inline-block text-xs font-semibold tracking-widest uppercase text-[#0f3d32]/60 mb-5 bg-[#CFE8E5]/50 border border-[#0f3d32]/10 px-4 py-1.5 rounded-full"
            >
              {content.sectionTag}
            </motion.span>
            <motion.h2
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-bold mb-6 text-[#0f3d32] tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {content.sectionTitle}
            </motion.h2>
            <p className="text-[#0f3d32]/60 font-medium text-sm md:text-base italic max-w-xl">
              {content.sectionSubtitle}
            </p>
          </div>
          
          <div className="flex gap-4">
            <button 
              onClick={scrollLeft}
              className="w-12 h-12 rounded-full border border-[#0f3d32]/20 flex items-center justify-center text-[#0f3d32] hover:bg-[#0f3d32] hover:text-white transition-colors"
            >
              <ArrowRight className="w-5 h-5 rotate-180" />
            </button>
            <button 
              onClick={scrollRight}
              className="w-12 h-12 rounded-full border border-[#0f3d32]/20 flex items-center justify-center text-[#0f3d32] hover:bg-[#0f3d32] hover:text-white transition-colors"
            >
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="relative -mx-6 px-6">
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {content.items.map((service: any) => (
              <ServiceCard key={service.id} service={service} />
            ))}
            {/* Empty element to add padding to the end of the scroll container */}
            <div className="w-6 flex-shrink-0" />
          </div>
        </div>

        {/* Scroll Indication */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="flex items-center justify-center mt-2 gap-2 text-[#0f3d32]/50"
        >
          <span className="text-xs font-bold uppercase tracking-widest">Swipe or scroll to explore more</span>
          <ArrowRight className="w-4 h-4 animate-pulse" />
        </motion.div>

      </div>
    </section>
  );
};

export default Services;
