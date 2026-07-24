import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, X, ArrowRight } from 'lucide-react';
import { submitLead } from '../services/leadService';


const PricingCard = ({ tier }: { tier: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(
    tier.isCustomizable ? [
      "Landing page for digital identity",
      "Google Business Profile management",
      "WhatsApp appointment + reminders"
    ] : []
  );
  
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  // Calculate total price for customizable tiers
  const currentTotal = tier.isCustomizable 
    ? tier.basePrice + tier.addons.reduce((sum: number, addon: any) => 
        selectedAddons.includes(addon.name) ? sum + addon.price : sum, 0)
    : 0;

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    let message = `Interested in Plan: ${tier.name}.`;
    if (tier.isCustomizable) {
      message += ` Selected Addons: ${selectedAddons.join(', ')}. Total: ₹${currentTotal.toLocaleString('en-IN')}/Month.`;
    } else if (tier.isSplit) {
      message += ` Multiple Options.`;
    } else {
      message += ` Price: ${tier.priceRange}/Month.`;
    }

    const { error } = await submitLead({
      ...formData,
      message,
      role: 'Clinic Owner'
    });

    if (error) {
      setStatus('error');
    } else {
      setStatus('success');
      setTimeout(() => {
        setIsModalOpen(false);
        setStatus('idle');
        setFormData({ name: '', email: '', phone: '' });
      }, 2000);
    }
  };

  return (
    <>
      <div className="w-full h-full flex">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full rounded-[24px] overflow-hidden shadow-[0_15px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_25px_50px_rgba(0,0,0,0.3)] transition-all duration-300 border border-white/10 bg-white/5 backdrop-blur-md hover:bg-white/10 p-6 sm:p-8 flex flex-col h-full"
        >
          <div className="space-y-4 mb-8">
            <div className={`w-12 h-1.5 rounded-full ${tier.accent} opacity-40`} />
            <h3
              className="text-3xl font-medium text-white tracking-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              {tier.name}
            </h3>
            <p className="text-white/70 text-sm font-semibold leading-relaxed italic">
              {tier.tagline}
            </p>
          </div>

          <div className="flex flex-col flex-1">
            {tier.promo && (
              <div className="mb-6 p-3 rounded-xl bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30">
                <p className="text-emerald-300 font-bold text-sm tracking-wide text-center uppercase">
                  {tier.promo}
                </p>
              </div>
            )}

            {tier.isCustomizable ? (
              <div className="flex flex-col mb-6 mt-2">
                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                    ₹{currentTotal.toLocaleString('en-IN')}
                  </span>
                  <span className="text-white/50 font-bold text-sm uppercase tracking-widest">
                    / Month
                  </span>
                </div>
                <p className="text-white/70 text-sm font-medium mb-3">Build your own plan:</p>
                <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar max-h-[250px] pr-2">
                  {tier.addons.map((opt: any, idx: number) => (
                    <label key={idx} className="flex items-start gap-3 cursor-pointer group">
                      <div className={`w-5 h-5 rounded border flex items-center justify-center shrink-0 transition-colors ${selectedAddons.includes(opt.name) ? 'bg-[#4ABFB0] border-[#4ABFB0]' : 'border-white/30 group-hover:border-white/60'}`}>
                        {selectedAddons.includes(opt.name) && <CheckCircle2 className="w-3.5 h-3.5 text-[#0f3d32]" strokeWidth={4} />}
                      </div>
                      <div className="flex-1 flex justify-between items-start gap-2">
                        <span className="text-white/90 font-medium text-sm leading-snug group-hover:text-white transition-colors pt-[1px]">{opt.name}</span>
                        {opt.isComplementary && (
                          <span className="text-[10px] font-bold uppercase tracking-wider bg-[#4ABFB0]/20 text-[#4ABFB0] px-2 py-0.5 rounded-full shrink-0">Complementary</span>
                        )}
                      </div>
                      <input 
                        type="checkbox" 
                        className="hidden" 
                        checked={selectedAddons.includes(opt.name)}
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedAddons([...selectedAddons, opt.name]);
                          } else {
                            setSelectedAddons(selectedAddons.filter(name => name !== opt.name));
                          }
                        }}
                      />
                    </label>
                  ))}
                </div>
              </div>
            ) : tier.isSplit ? (
              <div className="flex flex-col gap-3 mb-6 mt-2">
                {tier.splitOptions.map((opt: any, idx: number) => (
                  <div key={idx} className="flex justify-between items-center bg-white/5 p-4 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                    <span className="text-white font-medium">{opt.name}</span>
                    <div className="text-right">
                      <div className="text-xl font-bold text-white tracking-tight">{opt.priceRange}</div>
                      <div className="text-white/50 text-xs uppercase tracking-widest">/ Month</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : tier.features ? (
              <div className="flex flex-col mb-6 mt-2">
                {tier.priceRange && (
                  <div className="flex items-baseline gap-2 mb-6">
                    <span className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                      {tier.priceRange}
                    </span>
                  </div>
                )}
                <div className="flex flex-col gap-3 overflow-y-auto custom-scrollbar max-h-[280px] pr-2">
                  {tier.features.map((feature: string, idx: number) => (
                    <div key={idx} className="flex items-start gap-3 group">
                      <div className="flex items-center justify-center shrink-0 mt-[2px]">
                        <CheckCircle2 className="w-4 h-4 text-white/40" strokeWidth={3} />
                      </div>
                      <span className="text-white/60 font-medium text-sm leading-snug pt-[1px]">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="flex flex-col mb-6 mt-2">
                {tier.pricePrefix && (
                  <span className="text-white/70 text-sm font-medium mb-1">{tier.pricePrefix}</span>
                )}
                <div className="flex items-baseline gap-2">
                  <span className="text-4xl md:text-5xl font-bold text-white tracking-tighter">
                    {tier.priceRange}
                  </span>
                  <span className="text-white/50 font-bold text-sm uppercase tracking-widest">
                    / Month
                  </span>
                </div>
              </div>
            )}
          </div>
            
          <div className="mt-auto pt-6">
            {tier.externalLink ? (
              <button 
                onClick={() => window.open(tier.externalLink, '_blank')}
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#4ABFB0] text-[#0f3d32] hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_8px_30px_rgb(74,191,176,0.2)]"
              >
                {tier.buttonText || "Visit"}
                <ArrowRight className="w-4 h-4" />
              </button>
            ) : tier.isComingSoon ? (
              <button 
                disabled
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-white/10 text-white/50 cursor-not-allowed flex items-center justify-center gap-2"
              >
                Coming Soon
              </button>
            ) : (
              <button 
                onClick={() => setIsModalOpen(true)}
                className="w-full py-3.5 rounded-xl font-bold text-sm bg-[#4ABFB0] text-[#0f3d32] hover:bg-white transition-all duration-300 flex items-center justify-center gap-2 shadow-[0_8px_30px_rgb(74,191,176,0.2)]"
              >
                Contact
                <ArrowRight className="w-4 h-4" />
              </button>
            )}
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
                <h3 className="text-2xl font-medium text-[#0f3d32] tracking-tight mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {tier.name}
                </h3>
                <div className="flex items-center gap-2">
                  {tier.isCustomizable ? (
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-bold text-[#0f3d32] tracking-tighter">
                        ₹{currentTotal.toLocaleString('en-IN')}
                      </span>
                      <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">/ Month</span>
                    </div>
                  ) : tier.isSplit ? (
                    <span className="text-xl font-bold text-[#0f3d32] tracking-tighter">
                      Multiple Options
                    </span>
                  ) : (
                    <div className="flex flex-col">
                      {tier.pricePrefix && (
                        <span className="text-[#0f3d32]/60 text-xs font-medium mb-0.5">{tier.pricePrefix}</span>
                      )}
                      <div className="flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-[#0f3d32] tracking-tighter">
                          {tier.priceRange}
                        </span>
                        <span className="text-slate-400 font-bold text-[10px] uppercase tracking-widest mt-1">/ Month</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <form onSubmit={handleSubmit} className="p-8 pt-6 flex-1 overflow-y-auto max-h-[60vh] custom-scrollbar">
                <h4 className="text-xs font-bold text-[#0f3d32]/60 uppercase tracking-[0.2em] mb-6 flex items-center gap-3">
                  Contact details
                </h4>
                
                {status === 'success' ? (
                  <div className="bg-[#4ABFB0]/10 text-[#0f3d32] p-4 rounded-xl text-center font-medium mb-6 border border-[#4ABFB0]/20">
                    Thank you! We'll be in touch shortly.
                  </div>
                ) : (
                  <div className="space-y-4 mb-8">
                    <div>
                      <label className="block text-sm font-medium text-[#0f3d32] mb-1">Name *</label>
                      <input 
                        type="text" 
                        required 
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4ABFB0] transition-shadow text-[#0f3d32]"
                        placeholder="John Doe"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0f3d32] mb-1">Email *</label>
                      <input 
                        type="email" 
                        required 
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4ABFB0] transition-shadow text-[#0f3d32]"
                        placeholder="john@example.com"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-[#0f3d32] mb-1">Phone *</label>
                      <input 
                        type="tel" 
                        required 
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4ABFB0] transition-shadow text-[#0f3d32]"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>
                )}

                {status === 'error' && (
                  <div className="text-red-500 text-sm mb-4 text-center font-medium">
                    Something went wrong. Please try again.
                  </div>
                )}

                <button 
                  type="submit" 
                  disabled={status === 'loading' || status === 'success'}
                  className={`w-full py-4 rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-2 group/btn ${tier.btn} ${status === 'loading' ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {status === 'loading' ? 'Submitting...' : status === 'success' ? 'Submitted' : 'Contact Us'}
                  {status !== 'loading' && status !== 'success' && <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />}
                </button>
              </form>
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
    <section id="pricing" className="pt-20 pb-32 relative overflow-hidden bg-[#0f3d32] text-white">
      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold tracking-widest uppercase text-[#4ABFB0] mb-5 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full"
          >
            {content.sectionTag}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-medium mb-6 text-white tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {content.sectionTitle}
          </motion.h2>
          <p className="text-white/70 max-w-xl mx-auto font-medium text-sm md:text-base italic">
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
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[#4ABFB0]/10 blur-[150px] rounded-full pointer-events-none" />
    </section>
  );
};

export default Offerings;
