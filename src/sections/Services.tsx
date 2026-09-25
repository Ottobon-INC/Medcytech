import { useState, useEffect } from 'react';
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
      <div className="w-full h-full min-h-[350px] flex flex-col">
        <motion.div
          whileHover={{ y: -8 }}
          className="relative w-full min-h-[380px] rounded-[24px] overflow-hidden shadow-[0_15px_30px_rgba(15,61,50,0.08)] hover:shadow-[0_25px_50px_rgba(15,61,50,0.18)] transition-all duration-300 border border-[#0f3d32]/10 p-6 sm:p-8 flex flex-col justify-between h-full cursor-pointer group bg-gradient-to-b from-[#F0F9F8] to-[#CFE8E5]"
          onClick={() => setIsModalOpen(true)}
        >
          {service.image && (
            <div 
              className="absolute bottom-0 left-0 right-0 h-[82%] z-0 pointer-events-none overflow-hidden"
              style={{
                WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%)',
                maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%)'
              }}
            >
              <img
                src={service.image}
                alt={service.title}
                loading="lazy"
                decoding="async"
                className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
              />
              {/* Green tint overlay matching 2nd screenshot */}
              <div className="absolute inset-0 bg-[#0f3d32]/20 mix-blend-multiply z-[1]" />
              <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#0f3d32] via-[#0f3d32]/70 to-transparent z-[2]" />
            </div>
          )}

          <div className="relative z-10 pointer-events-none">
            <h3
              className="text-2xl sm:text-3xl font-semibold text-[#0f3d32] tracking-tight leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {service.title}
            </h3>
          </div>

          <div className="relative z-10 flex items-center justify-between pointer-events-none mt-auto pt-6">
            <span className="text-white font-bold text-sm tracking-wide drop-shadow-md">
              Read Full Details
            </span>
            <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm text-white group-hover:bg-white group-hover:text-[#0f3d32] flex items-center justify-center transition-all duration-300 shadow-sm">
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
                  <h3 className="text-2xl md:text-3xl font-medium text-[#0f3d32] tracking-tight pr-8" style={{ fontFamily: "'Playfair Display', serif" }}>
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
  return (
    <section id="services" className="pt-0 pb-32 relative overflow-hidden bg-[#CFE8E5]">
      <h2 className="sr-only">Our Services</h2>
      <div className="max-w-[90rem] mx-auto px-6 relative z-10">
        
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 pb-8">
          {content.items.map((service: any) => (
            <ServiceCard key={service.id} service={service} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default Services;
