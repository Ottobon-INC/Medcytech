import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, ArrowRight, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';



const PricingCard = ({ tier }: { tier: any }) => {
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
      <div className="w-full h-full flex">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-[#0f3d32]/10 bg-white p-6 sm:p-8 flex flex-col h-full"
        >
          <div className="space-y-4 mb-8">
            <div className={`w-12 h-1.5 rounded-full ${tier.accent} opacity-40`} />
            <h3
              className="text-3xl font-bold text-[#0f3d32] tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {tier.name}
            </h3>
            <p className="text-[#5b6e68] text-sm font-semibold leading-relaxed italic">
              {tier.tagline}
            </p>
          </div>

          <div className="flex flex-col gap-1 mt-auto">
            <div className="flex items-center gap-2 mb-6">
              <span className="text-4xl md:text-5xl font-bold text-[#0f3d32] tracking-tighter">
                {tier.priceRange}
              </span>
              <div className="flex flex-col">
                <span className="text-[#5b6e68]/40 font-bold leading-none text-xl">|</span>
                <span className="text-slate-400 font-bold text-xs uppercase tracking-widest leading-none mt-1">Month</span>
              </div>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#CFE8E5]/50 text-[#0f3d32] hover:bg-[#0f3d32] hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              Explore Features
              <ArrowRight className="w-4 h-4" />
            </button>
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
              className="relative w-full max-w-lg bg-white rounded-[32px] overflow-hidden shadow-2xl z-10 flex flex-col"
            >
              <div className="p-8 pb-6 bg-[#CFE8E5]/30 relative">
                <button
                  className="absolute top-6 right-6 p-2 bg-white/50 hover:bg-white rounded-full text-[#0f3d32] transition-colors"
                  onClick={() => setIsModalOpen(false)}
                >
                  <X className="w-5 h-5" />
                </button>
                <div className={`w-12 h-1.5 rounded-full ${tier.accent} opacity-40 mb-4`} />
                <h3 className="text-2xl font-bold text-[#0f3d32] tracking-tight mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {tier.name}
                </h3>
                <div className="flex items-center gap-2">
                  <span className="text-3xl font-bold text-[#0f3d32] tracking-tighter">
                    {tier.priceRange}
                  </span>
                  <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">/ Month</span>
                </div>
              </div>
              
              <div className="p-8 pt-6 flex-1 overflow-y-auto max-h-[60vh] custom-scrollbar">
                <h4 className="text-xs font-bold text-[#0f3d32]/60 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                  Included features
                </h4>
                <ul className="space-y-4 mb-8">
                  {tier.features.map((feature: string, i: number) => (
                    <li key={i} className="flex items-start gap-4">
                      <div className="flex items-center justify-center w-5 h-5 rounded-full border border-slate-100 shrink-0 mt-0.5 bg-slate-50">
                        <CheckCircle2 className="w-3 h-3 text-[#4ABFB0]" strokeWidth={3} />
                      </div>
                      <span className="text-[14px] text-[#5b6e68] font-medium leading-tight">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Link 
                  to="/digital-identity" 
                  className="text-center text-[12px] font-bold text-[#0f3d32]/60 hover:text-[#4ABFB0] transition-colors mb-6 flex items-center justify-center gap-1.5"
                  onClick={() => setIsModalOpen(false)}
                >
                  Explore Digital Identity <ExternalLink className="w-3 h-3" />
                </Link>

                <button className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn ${tier.btn}`}>
                  Purchase Plan
                  <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
                </button>
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

const Offerings = ({ content }: { content: any }) => {
  const pricingTiers = content.items;
  return (
    <section id="pricing" className="pt-12 pb-20 relative overflow-hidden bg-[#CFE8E5]">
      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold tracking-widest uppercase text-[#0f3d32]/60 mb-5 bg-[#0f3d32]/5 border border-[#0f3d32]/10 px-4 py-1.5 rounded-full"
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
          <p className="text-[#0f3d32]/60 max-w-xl mx-auto font-medium text-sm md:text-base italic">
            {content.sectionSubtitle}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-6xl mx-auto items-stretch">
          {pricingTiers.map((tier: any) => (
            <PricingCard key={tier.id} tier={tier} />
          ))}
        </div>


      </div>

      {/* Background radial glow matching Brands section */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-teal/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

export default Offerings;
