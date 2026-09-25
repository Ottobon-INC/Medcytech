import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import SEO from '../components/SEO';

const AboutUsPage = ({ content }: { content: any }) => {
    const navigate = useNavigate();
    const founders = content?.founders?.items || [];
    const founder1 = founders[0];
    const founder2 = founders[1];

    return (
        <main className="pt-20 sm:pt-22 pb-0 min-h-screen bg-[#CFE8E5] text-[#0f3d32] overflow-hidden">
            <SEO 
                title="About Us - Medcy Health Tech" 
                description="Learn about Medcy Health Tech, our founders Dr. B. Sireesha Rani and Bhanu Prasad Bonu, and our vision to transform healthcare digital infrastructure." 
            />

            {/* ─── FIXED BACK TO HOME BUTTON (BESIDE NAVBAR) ─── */}
            <motion.div 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4 }}
                className="fixed left-4 sm:left-8 md:left-12 top-[20px] z-50 pointer-events-auto"
            >
                <button
                    onClick={() => navigate('/')}
                    className="inline-flex items-center gap-2.5 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#0f3d32]/10 hover:bg-[#0f3d32] text-[#0f3d32] hover:text-white border border-[#0f3d32]/20 font-semibold text-sm sm:text-base transition-all duration-300 shadow-sm backdrop-blur-md cursor-pointer group"
                >
                    <ArrowLeft className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1" />
                    <span>Back to Home</span>
                </button>
            </motion.div>

            {/* ─── HERO HEADER ─── */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-1 pb-1 relative z-10 text-center">
                <motion.div
                    initial={{ opacity: 0, y: 25 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="max-w-4xl mx-auto space-y-1.5"
                >
                    <h1 
                        className="text-3xl sm:text-4xl lg:text-5xl font-semibold leading-tight text-[#0f3d32]"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        About Us
                    </h1>
                    <p className="text-base sm:text-lg text-[#0f3d32]/80 font-medium leading-relaxed max-w-3xl mx-auto">
                        Medcy Health Tech was founded from the unique synergy of frontline medical expertise and world-class enterprise technology leadership.
                    </p>
                </motion.div>
            </div>

            {/* ─── FOUNDERS & STORY SECTION (SIDE-BY-SIDE INTEGRATED LAYOUT) ─── */}
            <section className="max-w-7xl mx-auto px-4 sm:px-6 pt-1 pb-8">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                    
                    {/* LEFT COLUMN: Founder Cards (Side-by-side) */}
                    <div className="lg:col-span-6 flex flex-row items-center justify-center gap-4 sm:gap-6">
                        {founder1 && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5 }}
                                className="w-1/2 max-w-[400px] sm:max-w-[450px] md:max-w-[480px] group"
                            >
                                <img
                                    src={founder1.cardImage || founder1.image}
                                    alt={founder1.name}
                                    className="w-full h-auto rounded-[24px] shadow-[0_14px_35px_rgba(15,61,50,0.16)] group-hover:scale-[1.02] transition-transform duration-300 object-cover"
                                />
                            </motion.div>
                        )}

                        {founder2 && (
                            <motion.div 
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="w-1/2 max-w-[400px] sm:max-w-[450px] md:max-w-[480px] group"
                            >
                                <img
                                    src={founder2.cardImage || founder2.image}
                                    alt={founder2.name}
                                    className="w-full h-auto rounded-[24px] shadow-[0_14px_35px_rgba(15,61,50,0.16)] group-hover:scale-[1.02] transition-transform duration-300 object-cover"
                                />
                            </motion.div>
                        )}
                    </div>

                    {/* RIGHT COLUMN: Key Story & Core Vision */}
                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="lg:col-span-6 space-y-3 sm:space-y-3.5 text-[#0f3d32]/90 text-[15px] sm:text-[16px] md:text-[17px] leading-relaxed font-medium"
                    >
                        {/* Story Header Badge */}
                        <div className="flex items-center gap-3 justify-center mb-1">
                            <span className="text-xs font-bold uppercase tracking-[0.25em] text-[#1294a7] bg-[#1294a7]/10 px-3.5 py-1 rounded-full border border-[#1294a7]/20">
                                Our Story & Journey
                            </span>
                        </div>

                        <p>
                            Medcy Health Tech was born from the unique synergy of two leaders—combining <strong className="font-bold text-[#0f3d32]">20+ years in the medical field</strong> from <strong className="font-bold text-[#0f3d32]">Dr. B. Sireesha Rani</strong> (Medcy IVF) with <strong className="font-bold text-[#0f3d32]">20+ years in the tech field</strong> from <strong className="font-bold text-[#0f3d32]">Bhanu Prasad Bonu</strong>.
                        </p>

                        <p>
                            Recognizing the critical gap between clinical excellence and digital reach, we created a unified ecosystem. We bridge this gap by integrating medical understanding with digital marketing, workflow automation, and scalable tech infrastructure.
                        </p>

                        <p>
                            From online discovery and enquiry management to appointment booking and ongoing care, our technology serves as a seamless extension of your practice—empowering healthcare professionals to focus on exceptional patient care.
                        </p>

                        {/* OUR CORE VISION HIGHLIGHT */}
                        <div className="pt-3.5 mt-3.5 border-t border-[#0f3d32]/20 text-center">
                            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#0f3d32] block mb-1.5">
                                Our Core Vision
                            </span>
                            <p className="text-[17px] sm:text-[19px] font-semibold text-[#0f3d32] italic leading-snug max-w-xl mx-auto">
                                "Transform healthcare through innovation, strengthen digital presence, and create better experiences for both healthcare providers and their patients."
                            </p>
                        </div>
                    </motion.div>

                </div>
            </section>



            {/* ─── CTA FOOTER BANNER ─── */}
            <section className="w-full bg-gradient-to-r from-[#AEE0D9] via-[#C8EFE9] to-[#AEE0D9] text-[#0f3d32] mt-16 py-16 px-6 relative overflow-hidden border-y border-[#0f3d32]/15">
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
        </main>
    );
};

export default AboutUsPage;
