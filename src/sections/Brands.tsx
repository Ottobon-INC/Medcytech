import { motion, AnimatePresence } from 'framer-motion';
import { Baby, Activity, Hourglass, X, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
const iconMap: Record<string, React.ReactNode> = {
  Baby: <Baby className="w-8 h-8 text-[#0f3d32]" />,
  Hourglass: <Hourglass className="w-8 h-8 text-[#0f3d32]" />,
  Activity: <Activity className="w-8 h-8 text-[#0f3d32]" />
};

const BrandModal = ({ brand, onClose }: { brand: any, onClose: () => void }) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return createPortal(
    <div className="fixed inset-0 z-[99999] flex items-center justify-center p-4 sm:p-6 md:p-12">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#0f3d32]/70 backdrop-blur-md"
      />
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        className="relative w-full max-w-3xl bg-white rounded-[24px] shadow-2xl overflow-hidden flex flex-col max-h-[90vh] md:max-h-[85vh] border border-[#0f3d32]/10"
      >
        <button
          className="absolute top-4 right-4 md:top-6 md:right-6 p-2 bg-[#CFE8E5]/50 hover:bg-[#CFE8E5] transition-colors rounded-full text-[#0f3d32] z-30 shadow-sm"
          onClick={onClose}
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-8 md:p-12 overflow-y-auto">
          <h3
            className="text-3xl md:text-4xl font-bold mb-2 text-[#0f3d32] tracking-wider"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {brand.name}
          </h3>
          <p className="text-[#0f3d32] text-lg md:text-xl font-semibold mb-6 italic tracking-tight">{brand.tagline}</p>

          <div className="text-[#08241e] text-base md:text-lg leading-relaxed mb-8 space-y-4 font-medium">
            {brand.content.split('\n\n').map((p: string, i: number) => <p key={i}>{p}</p>)}
          </div>

          <ul className="space-y-4 pt-6 border-t border-[#0f3d32]/10 mb-8">
            {brand.highlights.map((h: string, i: number) => (
              <li key={i} className="flex items-start gap-3 text-base md:text-lg text-[#08241e] font-semibold leading-snug">
                <span className="text-[#4ABFB0] text-sm mt-1.5">●</span>
                {h}
              </li>
            ))}
          </ul>

          {(brand.isComingSoon || brand.name === "Janma Sethu") && (
            <div className="pt-6 border-t border-[#0f3d32]/10 flex flex-col sm:flex-row items-center gap-4">
              {brand.isComingSoon ? (
                <div className="inline-flex bg-[#0f3d32] text-white px-8 py-3.5 rounded-full font-bold text-base md:text-lg shadow-[0_8px_30px_rgb(15,61,50,0.2)]">
                  Launching in {brand.comingSoonDate}
                </div>
              ) : brand.name === "Janma Sethu" ? (
                <a 
                  href="https://janmasethu.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-[#0f3d32] text-white px-8 py-3.5 rounded-full font-bold text-base md:text-lg shadow-[0_8px_30px_rgb(15,61,50,0.2)] hover:shadow-[0_8px_30px_rgb(74,191,176,0.3)] hover:-translate-y-1 transition-all flex items-center gap-3 w-full sm:w-auto justify-center"
                >
                  Visit Janmasethu.com
                  <ArrowRight className="w-5 h-5" />
                </a>
              ) : null}
            </div>
          )}
        </div>
      </motion.div>
    </div>,
    document.body
  );
};

const BrandCard = ({ brand }: { brand: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="w-full h-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-[220px] sm:h-[300px] md:h-[420px] group rounded-[24px] overflow-hidden shadow-[0_15px_30px_rgba(15,61,50,0.1)] border border-[#0f3d32]/5 bg-white cursor-pointer"
          onClick={() => setIsModalOpen(true)}
        >
          {/* Main Image Background */}
          <div className="absolute inset-0 z-0 bg-[#CFE8E5]">
            {brand.frontImage ? (
              <img
                src={brand.frontImage}
                alt={brand.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="p-6 rounded-2xl bg-[#0f3d32]/5 border border-[#0f3d32]/10">
                  {iconMap[brand.icon]}
                </div>
              </div>
            )}
            
            {/* Hover Overlay Desktop */}
            <div className="hidden md:flex absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0f3d32]/90 via-[#0f3d32]/50 to-transparent flex-col items-center justify-end pb-8 opacity-0 group-hover:opacity-100 transition-all duration-400 z-10 translate-y-8 group-hover:translate-y-0">
              <span className="bg-white text-[#0f3d32] px-6 py-2.5 rounded-full font-bold shadow-xl flex items-center gap-2">
                Know More
              </span>
            </div>

            {/* Mobile visible 'Know More' pill */}
            <div className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-[90%] flex justify-center">
              <span className="bg-white/95 backdrop-blur text-[#0f3d32] px-5 py-2.5 rounded-full font-bold shadow-[0_8px_16px_rgba(0,0,0,0.15)] text-sm whitespace-nowrap border border-[#0f3d32]/10">
                Tap to Know More
              </span>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <BrandModal brand={brand} onClose={() => setIsModalOpen(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

const Brands = ({ content, hideCTA }: { content: any; hideCTA?: boolean }) => {
  const navigate = useNavigate();
  return (
    <section id="our-brands" className={`pt-16 ${hideCTA ? 'pb-16' : 'pb-20'} relative overflow-hidden bg-[#CFE8E5]`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#0f3d32]/60 mb-4 bg-[#0f3d32]/5 border border-[#0f3d32]/10 px-4 py-1.5 rounded-full">
            {content.sectionTag}
          </span>
          <h2 className="text-4xl md:text-5xl font-medium mb-4 text-[#0f3d32]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {content.sectionTitle}
          </h2>
          <p className="text-[#0f3d32]/80 max-w-2xl mx-auto font-medium leading-relaxed">
            {content.sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto items-center mb-16">
          {content.items.map((brand: any) => (
            <BrandCard key={brand.name} brand={brand} />
          ))}
        </div>

        {!hideCTA && (
          <div className="flex justify-center">
            <button 
              onClick={() => navigate('/our-brands')}
              className="group relative flex items-center gap-3 bg-[#0f3d32] text-white px-8 py-4 rounded-full font-bold overflow-hidden shadow-[0_8px_30px_rgb(15,61,50,0.2)] hover:shadow-[0_8px_30px_rgb(74,191,176,0.3)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-[#4ABFB0] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
              <span className="relative z-10 flex items-center gap-3">
                Know More About Our Brands
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        )}
      </div>

      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-teal/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

export default Brands;
