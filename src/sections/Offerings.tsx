import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Check, X, ArrowRight, Zap, Activity, MapPin, Monitor } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { submitLead } from '../services/leadService';

const plans = [
  {
    id: 'full-digital',
    icon: Zap,
    name: 'Full Digital Package',
    tagline: 'Complete visibility + patient communication stack',
    price: '₹15,000',
    period: '/ Month',
    includes: [
      'Google Business Profile (GBP) Management',
      'Professional Website Design & Development',
      'WhatsApp Automation & Reminders',
    ],
    highlight: false,
    buttonText: 'Avail this pack',
  },
  {
    id: 'patient-care',
    icon: Activity,
    name: 'Patient Care Suite',
    tagline: 'End-to-end patient journey management',
    price: '₹10,000',
    period: '/ Month',
    includes: [
      'Pre-Care Patient Onboarding',
      'OP Desk Management System',
      'Post-Care Follow-up Automation',
    ],
    highlight: false,
    buttonText: 'Avail this pack',
  },
  {
    id: 'geotagging-hrms',
    icon: MapPin,
    name: 'Geotagging & HRMS',
    tagline: 'Location tracking & staff management',
    price: '₹2,000',
    period: '/ Month each',
    priceNote: '₹2,000/mo Geotagging · ₹2,000/mo HRMS',
    includes: [
      'Real-time staff geotagging (₹2,000/mo)',
      'Complete HRMS suite (₹2,000/mo)',
      'Coverage for up to 20 users (₹6/user)',
    ],
    highlight: false,
    buttonText: 'Avail this pack',
  },
  {
    id: 'op-desk-only',
    icon: Monitor,
    name: 'OP Desk Only',
    tagline: 'Standalone OPD management at minimal cost',
    price: '₹20',
    period: '/ OP',
    priceNote: 'Pay only for what you use',
    includes: [
      'Digital OPD queue management',
      'Patient check-in & token system',
      'No monthly commitment required',
    ],
    highlight: false,
    buttonText: 'Avail this pack',
  },
];

const ContactModal = ({ plan, onClose }: { plan: any; onClose: () => void }) => {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '' });
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = 'unset'; };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');

    try {
      await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          access_key: "cfacfc4e-2717-440f-996b-1200fbf64a1c",
          subject: `Package Inquiry: ${plan.name}`,
          package_name: plan.name,
          package_price: `${plan.price} ${plan.period}`,
          name: formData.name,
          email: formData.email,
          phone: formData.phone
        })
      });
    } catch (emailErr) {
      console.error("Web3Forms Email Error:", emailErr);
    }

    await submitLead({
      ...formData,
      message: `Interested in Plan: ${plan.name} — ${plan.price}${plan.period}`,
      role: 'Clinic Owner',
    });

    setStatus('success');
    setTimeout(() => { onClose(); }, 2000);
  };

  return createPortal(
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-[#0f3d32]/60 backdrop-blur-sm cursor-pointer"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative w-full max-w-lg bg-white rounded-[32px] overflow-hidden shadow-2xl z-10"
        >
          <div className="p-8 pb-6 bg-[#CFE8E5]/30">
            <button
              className="absolute top-6 right-6 p-2 bg-white/50 hover:bg-white rounded-full text-[#0f3d32] transition-colors"
              onClick={onClose}
            >
              <X className="w-5 h-5" />
            </button>
            <h3 className="text-2xl font-medium text-[#0f3d32] tracking-tight mb-1" style={{ fontFamily: "'Playfair Display', serif" }}>
              {plan.name}
            </h3>
            <div className="flex items-baseline gap-1 mt-2">
              <span className="text-3xl font-bold text-[#0f3d32]">{plan.price}</span>
              <span className="text-slate-400 text-xs font-bold uppercase tracking-widest">{plan.period}</span>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 pt-6">
            <h4 className="text-xs font-bold text-[#0f3d32]/60 uppercase tracking-[0.2em] mb-6">Your details</h4>

            {status === 'success' ? (
              <div className="bg-[#4ABFB0]/10 text-[#0f3d32] p-4 rounded-xl text-center font-medium mb-6 border border-[#4ABFB0]/20">
                Thank you! We'll be in touch shortly.
              </div>
            ) : (
              <div className="space-y-4 mb-8">
                {['name', 'email', 'phone'].map((field) => (
                  <div key={field}>
                    <label className="block text-sm font-medium text-[#0f3d32] mb-1 capitalize">{field} *</label>
                    <input
                      type={field === 'email' ? 'email' : field === 'phone' ? 'tel' : 'text'}
                      required
                      value={(formData as any)[field]}
                      onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#4ABFB0] transition-shadow text-[#0f3d32]"
                      placeholder={field === 'name' ? 'Dr. John Doe' : field === 'email' ? 'john@clinic.com' : '+91 98765 43210'}
                    />
                  </div>
                ))}
              </div>
            )}

            {status === 'error' && (
              <p className="text-red-500 text-sm mb-4 text-center">Something went wrong. Please try again.</p>
            )}

            <button
              type="submit"
              disabled={status === 'loading' || status === 'success'}
              className="w-full py-4 rounded-xl font-bold text-sm bg-[#4ABFB0] text-[#0f3d32] hover:bg-[#0f3d32] hover:text-white transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {status === 'loading' ? 'Submitting...' : status === 'success' ? 'Submitted!' : 'Get Started'}
              {status === 'idle' && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>,
    document.body
  );
};

const Offerings = () => {
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<any | null>(null);

  const [isBannerExpanded, setIsBannerExpanded] = useState(false);

  return (
    <section id="pricing" className="pt-20 pb-8 md:pt-28 md:pb-12 bg-[#CFE8E5] relative overflow-hidden">
      {/* Subtle Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-emerald/5 blur-[160px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative z-10">

        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#0f3d32]/60 mb-5 bg-[#0f3d32]/5 border border-[#0f3d32]/10 px-4 py-1.5 rounded-full">
            Pricing
          </span>

          <div className="relative w-full mx-auto flex items-center justify-center mb-5">
            <h2
              className="text-4xl md:text-5xl font-medium text-[#0f3d32] tracking-tight text-center"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Simple, Transparent Pricing
            </h2>

            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.05, boxShadow: "0 15px 35px rgba(18,148,167,0.4)", backgroundColor: "#0e7685" }}
              whileTap={{ scale: 0.96 }}
              onClick={() => navigate('/contact')}
              className="hidden md:inline-flex absolute right-0 top-1/2 -translate-y-1/2 group items-center gap-2 px-5 py-2.5 rounded-full bg-[#1294a7] text-white text-xs sm:text-sm font-semibold transition-all shadow-[0_10px_25px_rgba(18,148,167,0.3)] whitespace-nowrap cursor-pointer"
            >
              Book a Demo
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </motion.button>
          </div>

          {/* Mobile button */}
          <div className="md:hidden flex justify-center mb-4">
            <button
              onClick={() => navigate('/contact')}
              className="group inline-flex items-center gap-2 px-5 py-2 rounded-full bg-[#1294a7] text-white text-xs font-semibold shadow-md cursor-pointer"
            >
              Book a Demo
              <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
          </div>

          <p className="text-[#0f3d32]/80 max-w-xl mx-auto font-medium leading-relaxed text-sm md:text-base">
            Choose the plan that fits your clinic. No hidden fees, no long-term lock-ins.
          </p>
        </motion.div>

        {/* Free Trial Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 w-full flex justify-center px-4 md:px-0"
        >
          <motion.div 
            layout
            animate={{ scale: isBannerExpanded ? 1.08 : 1 }}
            transition={{ 
              layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
              scale: { type: "spring", stiffness: 300, damping: 20 }
            }}
            onMouseEnter={() => setIsBannerExpanded(true)}
            onMouseLeave={() => setIsBannerExpanded(false)}
            onClick={() => setIsBannerExpanded(!isBannerExpanded)}
            className="w-full max-w-[1100px] min-h-[360px] md:min-h-[340px] relative p-6 md:p-8 flex flex-col md:flex-row items-center justify-center gap-6 transition-all duration-500 cursor-pointer"
          >
            {/* Animated Shine Effect */}
            <motion.div
              animate={{ left: ['-100%', '200%'] }}
              transition={{ duration: 3, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
              className="absolute top-0 bottom-0 w-[100%] bg-gradient-to-r from-transparent via-[#4ABFB0]/15 to-transparent -skew-x-12 z-0 pointer-events-none"
            />

            {/* Glow accents */}
            <div className="absolute -left-10 top-1/2 -translate-y-1/2 w-48 h-48 bg-[#4ABFB0]/10 blur-[60px] rounded-full pointer-events-none" />
            <div className="absolute -right-10 top-1/2 -translate-y-1/2 w-48 h-48 bg-[#4ABFB0]/10 blur-[60px] rounded-full pointer-events-none" />

            <motion.div layout transition={{ layout: { duration: 0.4, ease: [0.4, 0, 0.2, 1] } }} className="relative z-20 flex flex-col text-center items-center shrink-0">

              {/* Gold Seal Tag */}
              <motion.div 
                layout
                whileHover={{ scale: 1.05, rotate: 2 }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
                className="relative w-44 h-44 md:w-52 md:h-52 flex items-center justify-center shrink-0 my-3 cursor-pointer group drop-shadow-[0_10px_20px_rgba(178,135,59,0.3)]"
                onClick={() => setIsBannerExpanded(!isBannerExpanded)}
              >
                {/* Ambient Glow */}
                <motion.div 
                  animate={{ opacity: [0.5, 0.8, 0.5], scale: [1, 1.05, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -inset-4 blur-2xl -z-10 rounded-full transition-colors duration-500 bg-[#D4AF37]/40"
                />

                {/* Rosette Backgrounds */}
                <div className="absolute inset-0 rounded-[2rem] transition-colors duration-500 rotate-0 bg-gradient-to-br from-[#D4AF37] via-[#FFE5A3] to-[#AA7F32]" />
                <div className="absolute inset-0 rounded-[2rem] transition-colors duration-500 rotate-[30deg] bg-gradient-to-br from-[#D4AF37] via-[#FFE5A3] to-[#AA7F32]" />
                <div className="absolute inset-0 rounded-[2rem] transition-colors duration-500 rotate-[60deg] bg-gradient-to-br from-[#D4AF37] via-[#FFE5A3] to-[#AA7F32]" />
                
                {/* Inner Border */}
                <div className="absolute inset-3 rounded-full border-[2px] border-dashed z-10 transition-colors duration-500 border-[#0f3d32]/30" />
                
                {/* Inner Gradient Circle for Depth */}
                <div className="absolute inset-1.5 rounded-full bg-gradient-to-b z-10 transition-colors duration-500 from-white/30 to-transparent" />

                {/* Content */}
                <motion.div 
                  animate={isBannerExpanded ? { backgroundPosition: ["200% center", "-200% center"] } : { backgroundPosition: "0% center" }}
                  transition={isBannerExpanded ? { duration: 3, repeat: Infinity, ease: "linear" } : { duration: 0.5 }}
                  style={{ 
                    backgroundImage: isBannerExpanded 
                      ? 'linear-gradient(120deg, #0f3d32 35%, #4ABFB0 50%, #0f3d32 65%)' 
                      : 'none',
                    backgroundSize: '200% auto',
                    WebkitBackgroundClip: isBannerExpanded ? 'text' : 'border-box',
                    WebkitTextFillColor: isBannerExpanded ? 'transparent' : 'initial',
                    color: '#0f3d32'
                  }}
                  className="relative z-20 flex flex-col items-center justify-center pt-1"
                >
                  <span className="text-xs md:text-sm font-bold tracking-[0.2em] uppercase mb-0">1 Month</span>
                  <span className="text-4xl md:text-5xl font-black leading-none tracking-tight flex flex-col items-center drop-shadow-sm mb-0" style={{ fontFamily: "'Playfair Display', serif" }}>
                    <span>FREE</span>
                  </span>
                  <span className="text-base md:text-lg font-bold tracking-[0.1em] uppercase">Trial</span>
                  {/* Simple Text */}
                  <motion.div layout className="mt-1.5 flex items-center justify-center">
                    <span className="text-[9px] md:text-[10px] font-extrabold tracking-wider uppercase opacity-90">
                      No Upfront Payment
                    </span>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>

            <AnimatePresence>
              {isBannerExpanded && (
                <motion.div 
                  layout
                  initial={{ opacity: 0, x: -30, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: "auto" }}
                  exit={{ opacity: 0, x: -30, width: 0 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                  className="relative z-10 bg-gradient-to-br from-[#0f3d32] via-[#2D7A70] to-[#0f3d32] shadow-2xl rounded-none overflow-hidden shrink-0 -mt-12 md:mt-0 md:-ml-12 md:h-52 flex flex-col justify-center border-b md:border-b-0 md:border-r border-white/10"
                >
                  <div className="w-[320px] md:w-[320px] lg:w-[380px] flex flex-col gap-2.5 px-6 md:pl-20 lg:pl-24 md:pr-6 py-6 md:py-3.5">
                    <div className="flex flex-col gap-2 lg:gap-2.5">
                      {[
                        'Use all our services for 1 month',
                        'Evaluate in your own practice',
                        'Walk away anytime during the pilot',
                        'Continue only if you see value'
                      ].map((item, i) => (
                        <motion.div 
                          key={i} 
                          className="flex items-center gap-3 md:gap-3.5 cursor-pointer group"
                          whileHover={{ x: 2 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div 
                            whileTap={{ backgroundColor: "rgba(255,255,255,0.6)", boxShadow: "0 0 15px rgba(255,255,255,0.5)", scale: 0.9 }}
                            className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-white/20 flex items-center justify-center shrink-0 transition-colors group-hover:bg-white/30"
                          >
                            <CheckCircle2 className="w-3.5 h-3.5 md:w-4 md:h-4 text-white" strokeWidth={3} />
                          </motion.div>
                          <span className="text-white/95 font-medium text-[12px] md:text-[14px] whitespace-nowrap group-hover:text-white transition-colors">{item}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Third Box: Shield Text */}
            <AnimatePresence>
              {isBannerExpanded && (
                <motion.div 
                  layout
                  initial={{ opacity: 0, x: -30, width: 0 }}
                  animate={{ opacity: 1, x: 0, width: "auto" }}
                  exit={{ opacity: 0, x: -30, width: 0 }}
                  transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1], delay: 0.05 }}
                  className="relative z-0 bg-gradient-to-br from-[#0f3d32] via-[#2D7A70] to-[#0f3d32] shadow-2xl rounded-b-3xl rounded-t-none md:rounded-none md:rounded-r-[2.5rem] overflow-hidden shrink-0 -mt-12 md:mt-0 md:-ml-12 md:h-52 flex flex-col justify-center"
                >
                  <div className="w-[320px] md:w-[260px] lg:w-[320px] flex flex-col px-6 md:pl-16 lg:pl-16 md:pr-10 py-6 md:py-3.5 h-full items-center justify-center">
                    <motion.div 
                      className="flex flex-col items-center justify-center text-center cursor-pointer group h-full px-2"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <p className="text-white/85 text-[13px] md:text-[14px] lg:text-[15px] font-medium leading-relaxed max-w-[220px]">
                        Because we believe partnerships are built on
                        <br />
                        <span className="font-black text-[15px] md:text-[17px] lg:text-[19px] bg-gradient-to-r from-[#D4AF37] via-[#FFE5A3] to-[#D4AF37] bg-clip-text text-transparent drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)] mt-2 inline-block uppercase tracking-wider">
                          results, not promises.
                        </span>
                      </p>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </motion.div>

        {/* Cards Grid */}
        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto items-stretch">
          {plans.map((plan, index) => {
            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`relative flex flex-col h-full bg-gradient-to-b from-[#326D5D] to-[#357A6C] rounded-2xl border-2 ${plan.highlight ? 'border-[#0f3d32] shadow-2xl z-10 scale-[1.02]' : 'border-white/20 hover:border-white/50 shadow-lg'} overflow-hidden cursor-pointer active:border-white hover:shadow-[0_12px_32px_rgba(50,109,93,0.4)] transition-all duration-300`}
                onClick={() => setSelectedPlan(plan)}
              >
                {/* Banner for highlight */}
                {plan.highlight && (
                  <div className="bg-[#0f3d32] text-white text-center py-1.5 text-[10px] font-bold tracking-[0.15em] uppercase w-full">
                    BEST VALUE
                  </div>
                )}
                
                <div className={`p-6 flex flex-col flex-1 ${plan.highlight ? 'pt-5' : 'pt-6'}`}>
                  {/* Header */}
                  <div className="mb-4 min-h-[76px] flex flex-col justify-start">
                    <h3 className="text-xl md:text-2xl font-semibold text-white mb-1 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {plan.name}
                    </h3>
                    <p className="text-[11px] md:text-xs text-[#CFE8E5]/90 font-medium leading-relaxed">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price */}
                  <div className="mb-5 min-h-[64px] flex flex-col justify-end">
                    <div className="flex items-baseline flex-wrap gap-1 text-white">
                      <span className="text-3xl md:text-4xl font-bold tracking-tight text-white">
                        {plan.price}
                      </span>
                      <span className="text-sm font-medium text-[#CFE8E5]">
                        {plan.period}
                      </span>
                    </div>
                    {plan.priceNote ? (
                      <p className="text-[11px] font-semibold text-[#CFE8E5] mt-1 leading-normal">
                        {plan.priceNote}
                      </p>
                    ) : (
                      <p className="text-[11px] font-medium text-transparent mt-1 select-none">
                        Spacer
                      </p>
                    )}
                  </div>

                  {/* Plan details */}
                  <div className="flex-1 mb-6">
                    <p className="text-[11px] font-bold text-white uppercase tracking-wider mb-3">Plan details:</p>
                    <ul className="space-y-3">
                      {plan.includes.map((item, i) => (
                        <li key={i} className="flex items-start gap-2.5">
                          <Check className="w-3.5 h-3.5 shrink-0 mt-[1.5px] text-[#CFE8E5]" strokeWidth={3} />
                          <span className="text-[11.5px] md:text-xs text-white/95 font-medium leading-snug">
                            {item}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Button */}
                  <div className="mt-auto">
                    <button
                      onClick={(e) => {
                         e.stopPropagation();
                         setSelectedPlan(plan);
                      }}
                      className="w-full py-2.5 rounded-xl font-bold text-xs md:text-sm transition-all duration-300 text-center bg-[#0f3d32] text-white hover:bg-white hover:text-[#0f3d32] shadow-sm"
                    >
                      {plan.buttonText || 'Find your plan'}
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Reassurance note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-center text-[#0f3d32]/60 text-xs font-semibold mt-10 tracking-wide"
        >
          All plans include a 30-day free trial · No credit card required · Cancel anytime
        </motion.p>

      </div>

      {/* Modal */}
      {selectedPlan && <ContactModal plan={selectedPlan} onClose={() => setSelectedPlan(null)} />}
    </section>
  );
};

export default Offerings;
