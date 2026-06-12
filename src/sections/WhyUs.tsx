import { motion } from 'framer-motion';
import { Target, Users, Shield, Zap } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Target: <Target className="w-6 h-6 text-[#4ABFB0]" />,
  Users: <Users className="w-6 h-6 text-[#4ABFB0]" />,
  Shield: <Shield className="w-6 h-6 text-[#4ABFB0]" />,
  Zap: <Zap className="w-6 h-6 text-[#4ABFB0]" />
};

const WhyUs = ({ content }: { content: any }) => {
    const whyUsPoints = content.items;


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

                {/* Grid Layout (2x2) */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                    {whyUsPoints.map((point: any, i: number) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.1 }}
                            whileHover={{ scale: 1.05, transition: { duration: 0.3 }, boxShadow: "0 15px 35px rgba(15, 61, 50, 0.1)" }}
                            className="group p-8 rounded-[28px] bg-white/80 backdrop-blur-sm border border-[#0f3d32]/5 transition-all duration-500 flex flex-col gap-5 shadow-[0_15px_30px_rgba(15,61,50,0.05)]"
                        >
                            <div className="w-12 h-12 rounded-xl bg-[#0f3d32] flex items-center justify-center transition-transform duration-500 group-hover:scale-110 shadow-lg shadow-[#0f3d32]/20">
                                {iconMap[point.icon]}
                            </div>
                            <div className="space-y-3">
                                <h3 
                                    className="text-xl md:text-2xl font-bold text-[#0f3d32] tracking-tight"
                                    style={{ fontFamily: "'Playfair Display', serif" }}
                                >
                                    {point.title}
                                </h3>
                                <p className="text-[#2a6a5a] leading-relaxed font-light text-base">
                                    {point.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>


            </div>
        </section>
    );
};

export default WhyUs;
