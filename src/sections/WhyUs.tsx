import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight } from 'lucide-react';

const WhyUs = ({ content }: { content: any }) => {
    const { retainerModel, outcomeModel } = content;

    return (
        <section id="business-proposition" className="py-32 bg-[#CFE8E5] relative overflow-hidden">
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
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-medium mb-6 text-[#0f3d32] tracking-tight"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        {content.sectionTitle}
                    </motion.h2>
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

                {/* Grid Layout (2 columns for models) */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto items-stretch">
                    {/* Retainer Model */}
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="p-8 md:p-12 rounded-[32px] bg-white border border-[#0f3d32]/10 flex flex-col justify-between shadow-[0_15px_40px_rgba(15,61,50,0.08)] h-full"
                    >
                        <div>
                            <div className="inline-block px-4 py-1.5 rounded-full bg-[#0f3d32]/5 text-[#0f3d32]/70 text-sm font-bold uppercase tracking-widest mb-6">
                                Standard Model
                            </div>
                            <h3 className="text-3xl font-bold text-[#0f3d32] tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {retainerModel?.title}
                            </h3>
                            <p className="text-[#2a6a5a] leading-relaxed text-lg mb-8">
                                {retainerModel?.description}
                            </p>
                            
                            <ul className="space-y-4 mb-8">
                                {retainerModel?.features.map((feature: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="flex items-center justify-center w-6 h-6 rounded-full shrink-0 mt-0.5 bg-[#0f3d32]/5">
                                            <CheckCircle2 className="w-4 h-4 text-[#0f3d32]" strokeWidth={2.5} />
                                        </div>
                                        <span className="text-base text-[#0f3d32]/80 font-medium leading-tight">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <button 
                            onClick={() => document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' })}
                            className="mt-auto relative z-10 w-full py-4 rounded-xl font-bold text-base bg-[#0f3d32]/5 text-[#0f3d32] hover:bg-[#0f3d32] hover:text-white transition-all duration-300 flex items-center justify-center gap-3 group"
                        >
                            View Fixed Packages
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </button>
                    </motion.div>

                    {/* Outcome Model (Primary) */}
                    <motion.div
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className="relative p-8 md:p-12 rounded-[32px] overflow-hidden bg-[#0f3d32] text-white flex flex-col justify-between shadow-[0_20px_50px_rgba(15,61,50,0.3)] h-full"
                    >
                        {/* Glow effect */}
                        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#4ABFB0]/20 blur-[80px] rounded-full pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
                        
                        <div className="relative z-10">
                            <div className="inline-block px-4 py-1.5 rounded-full bg-[#4ABFB0]/20 text-[#4ABFB0] text-sm font-bold uppercase tracking-widest border border-[#4ABFB0]/30 mb-6">
                                Primary Alternative
                            </div>
                            <h3 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                                {outcomeModel?.title}
                            </h3>
                            <p className="text-white/80 leading-relaxed text-lg mb-8">
                                {outcomeModel?.description}
                            </p>
                            
                            <ul className="space-y-4 mb-10">
                                {outcomeModel?.features.map((feature: string, i: number) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <div className="flex items-center justify-center w-6 h-6 rounded-full shrink-0 mt-0.5 bg-[#4ABFB0]/10 border border-[#4ABFB0]/30">
                                            <CheckCircle2 className="w-4 h-4 text-[#4ABFB0]" strokeWidth={2.5} />
                                        </div>
                                        <span className="text-base text-white/90 font-medium leading-tight">
                                            {feature}
                                        </span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                        
                        <button 
                            onClick={() => window.location.href = 'mailto:gitika@medcytech.com'}
                            className="mt-auto relative z-10 w-full py-4 rounded-xl font-bold text-base bg-[#4ABFB0] text-[#0f3d32] hover:bg-white transition-all duration-300 flex items-center justify-center gap-3 shadow-[0_8px_30px_rgb(74,191,176,0.2)] group"
                        >
                            Partner on Outcome Basis
                            <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                        </button>
                    </motion.div>
                </div>

            </div>
        </section>
    );
};

export default WhyUs;
