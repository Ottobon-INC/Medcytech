import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WhyUs = ({ content }: { content: any }) => {
    const navigate = useNavigate();
    const { retainerModel, outcomeModel } = content;

    return (
        <>
            <section id="business-proposition" className="pt-12 pb-16 md:pt-16 md:pb-20 bg-[#CFE8E5] relative overflow-hidden">
            {/* Subtle background flair similar to other sections */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-emerald/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
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

                    <div className="relative w-full mx-auto flex items-center justify-center mb-6">
                        <motion.h2
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="text-4xl md:text-5xl font-medium text-[#0f3d32] tracking-tight text-center"
                            style={{ fontFamily: "'Playfair Display', serif" }}
                        >
                            {content.sectionTitle}
                        </motion.h2>

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

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-[#2a6a5a] max-w-2xl mx-auto text-lg font-light leading-relaxed"
                    >
                        {content.sectionSubtitle}
                    </motion.p>
                </div>

                {/* Grid Layout (2 columns for models - Widened to left and right) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-5xl mx-auto items-stretch">
                    {/* Retainer Model */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="p-5 md:p-6 rounded-[24px] bg-white border border-[#0f3d32]/10 flex flex-col justify-between shadow-[0_15px_40px_rgba(15,61,50,0.08)] h-full"
                    >
                        <div>
                            <div className="inline-block px-3.5 py-1 rounded-full bg-[#0f3d32]/5 text-[#0f3d32]/70 text-xs font-bold uppercase tracking-widest mb-4">
                                Standard Model
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-[#0f3d32] tracking-tight mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {retainerModel?.title}
                            </h3>
                            <p className="text-[#2a6a5a] leading-relaxed text-sm sm:text-base mb-6 font-normal">
                                {retainerModel?.description}
                            </p>
                            
                            <ul className="space-y-3 mb-6">
                                {retainerModel?.features.map((feature: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2.5">
                                        <div className="flex items-center justify-center w-5 h-5 rounded-full shrink-0 mt-0.5 bg-[#0f3d32]/5">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#0f3d32]" strokeWidth={2.5} />
                                        </div>
                                        <span className="text-sm text-[#0f3d32]/80 font-medium leading-snug">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <button 
                            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                            className="mt-auto relative z-10 w-full py-3 rounded-xl font-bold text-sm bg-[#0f3d32]/5 text-[#0f3d32] hover:bg-[#0f3d32] hover:text-white transition-all duration-300 flex items-center justify-center gap-2.5 group cursor-pointer"
                        >
                            View Fixed Packages
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </motion.div>

                    {/* Outcome Model (Primary) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative p-5 md:p-6 rounded-[24px] overflow-hidden bg-[#0f3d32] text-white flex flex-col justify-between shadow-[0_20px_50px_rgba(15,61,50,0.3)] h-full"
                    >
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-[#4ABFB0]/20 blur-[70px] rounded-full pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
                        
                        <div className="relative z-10">
                            <div className="inline-block px-3.5 py-1 rounded-full bg-[#4ABFB0]/20 text-[#4ABFB0] text-xs font-bold uppercase tracking-widest border border-[#4ABFB0]/30 mb-4">
                                Primary Alternative
                            </div>
                            <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight mb-3" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {outcomeModel?.title}
                            </h3>
                            <p className="text-white/80 leading-relaxed text-sm sm:text-base mb-6 font-normal">
                                {outcomeModel?.description}
                            </p>
                            
                            <ul className="space-y-3 mb-6">
                                {outcomeModel?.features.map((feature: string, i: number) => (
                                    <li key={i} className="flex items-start gap-2.5">
                                        <div className="flex items-center justify-center w-5 h-5 rounded-full shrink-0 mt-0.5 bg-[#4ABFB0]/10 border border-[#4ABFB0]/30">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-[#4ABFB0]" strokeWidth={2.5} />
                                        </div>
                                        <span className="text-sm text-white/90 font-medium leading-snug">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <button 
                            onClick={() => window.location.href = 'mailto:gitika@medcytech.com'}
                            className="mt-auto relative z-10 w-full py-3 rounded-xl font-bold text-sm bg-[#4ABFB0] text-[#0f3d32] hover:bg-white transition-all duration-300 flex items-center justify-center gap-2.5 shadow-[0_8px_30px_rgb(74,191,176,0.2)] group cursor-pointer"
                        >
                            Partner on Outcome Basis
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </motion.div>
                </div>

                </div>
            </section>

            {/* ─── FULL-BLEED CTA BANNER AT LANDING PAGE ENDING ─── */}
            <section className="w-full bg-gradient-to-r from-[#AEE0D9] via-[#C8EFE9] to-[#AEE0D9] text-[#0f3d32] py-16 px-6 relative overflow-hidden border-y border-[#0f3d32]/15">
                <div className="max-w-4xl mx-auto text-center space-y-5 relative z-10">
                    <span className="inline-block px-4 py-1.5 rounded-full bg-[#0f3d32]/10 border border-[#0f3d32]/20 text-[#0f3d32] text-xs font-bold uppercase tracking-widest">
                        Get Started
                    </span>
                    <h2 className="text-3xl md:text-4xl font-bold text-[#0f3d32]" style={{ fontFamily: "'Playfair Display', serif" }}>
                        Ready to elevate your clinic's digital presence?
                    </h2>
                    <p className="text-[#0f3d32]/80 max-w-2xl mx-auto text-base sm:text-lg font-medium">
                        Partner with Medcy Health Tech to streamline operations, enhance patient acquisition, and deliver seamless digital care.
                    </p>
                    <div className="pt-3 flex justify-center">
                        <button
                            onClick={() => navigate('/contact')}
                            className="px-8 py-3.5 rounded-full bg-[#0f3d32] hover:bg-[#1294a7] text-white font-semibold text-base transition-all shadow-md flex items-center gap-2 cursor-pointer"
                        >
                            Book a Demo <ArrowRight size={18} />
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default WhyUs;
