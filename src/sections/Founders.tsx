import { motion } from 'framer-motion';

interface Founder {
    id: string;
    name: string;
    role: string;
    image: string;
    cardImage?: string;
    subtitle?: string;
}

const Founders = ({ content }: { content: any }) => {
    const founders: Founder[] = content?.items || [];
    const founder1 = founders[0];
    const founder2 = founders[1];

    return (
        <section id="our-founders" className="pt-16 pb-28 relative overflow-hidden bg-[#CFE8E5]">
            {/* Ambient background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-emerald/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* ─── SECTION HEADER ─── */}
                <div className="text-center mb-12">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#0f3d32]"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        {content?.sectionTitle || "About Us"}
                    </motion.h2>
                </div>

                {/* ─── FOUNDERS IMAGES ON TOP (SIDE-BY-SIDE, REDUCED SIZE) ─── */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-8 md:gap-12 mb-12">
                    
                    {/* Founder 1 (Dr. B. Sireesha Rani) */}
                    {founder1 && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="w-full max-w-[280px] sm:max-w-[310px] md:max-w-[340px] lg:max-w-[360px] group"
                        >
                            <img
                                src={founder1.cardImage || founder1.image}
                                alt={founder1.name}
                                className="w-full h-auto rounded-[26px] shadow-[0_12px_30px_rgba(15,61,50,0.14)] group-hover:scale-[1.02] transition-transform duration-300 object-cover"
                            />
                        </motion.div>
                    )}

                    {/* Founder 2 (Bhanu Prasad Bonu) */}
                    {founder2 && (
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="w-full max-w-[280px] sm:max-w-[310px] md:max-w-[340px] lg:max-w-[360px] group"
                        >
                            <img
                                src={founder2.cardImage || founder2.image}
                                alt={founder2.name}
                                className="w-full h-auto rounded-[26px] shadow-[0_12px_30px_rgba(15,61,50,0.14)] group-hover:scale-[1.02] transition-transform duration-300 object-cover"
                            />
                        </motion.div>
                    )}

                </div>

                {/* ─── STORY MATTER BELOW THE FOUNDERS IMAGES ─── */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto text-center space-y-6 text-[#0f3d32]/90 text-[17px] md:text-[19px] leading-relaxed font-medium"
                >
                    {/* Story Header Badge */}
                    <div className="flex items-center gap-3 justify-center mb-8">
                        <div className="h-px w-10 sm:w-16 bg-[#0f3d32]/20" />
                        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#0f3d32]">
                            Our Story & Journey
                        </span>
                        <div className="h-px w-10 sm:w-16 bg-[#0f3d32]/20" />
                    </div>

                    <p>
                        Medcy Health Tech was born from the coming together of two professionals with over 20 years of experience—one in software technology and the other in frontline medicine. Their combined insight revealed a shared challenge: while healthcare providers deliver quality care, many struggle to build a strong digital presence and connect with patients seamlessly.
                    </p>

                    <p>
                        Recognizing this critical gap, we set out to build a comprehensive ecosystem tailored specifically for the healthcare industry. We bridge this gap by uniting clinical understanding with digital marketing, automation, and tech infrastructure.
                    </p>

                    <p>
                        From online discovery and enquiry management to appointment booking and ongoing care, our solutions help hospitals and clinics expand their reach, increase patient footfall, and preserve the essential human touch in healthcare.
                    </p>

                    <p>
                        By streamlining operations and automating routine tasks, we empower healthcare professionals to focus on what they do best: providing exceptional patient care. Our technology serves as a seamless extension of your practice.
                    </p>

                    <p>
                        Built upon the strong clinical foundation established by Dr. Sireesha Rani through Medcy IVF and the enterprise technology vision of Bhanu Prasad Bonu, Medcy Health Tech is dedicated to shaping the future of digital healthcare infrastructure.
                    </p>

                    {/* OUR CORE VISION AT THE ENDING */}
                    <div className="pt-10 mt-8 border-t border-[#0f3d32]/20 text-center max-w-3xl mx-auto">
                        <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1294a7] block mb-3">
                            Our Core Vision
                        </span>
                        <p className="text-[19px] sm:text-[22px] font-semibold text-[#0f3d32] italic leading-snug">
                            "Our vision is simple: transform healthcare through innovation, strengthen digital presence, and create better experiences for both healthcare providers and their patients."
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default Founders;
