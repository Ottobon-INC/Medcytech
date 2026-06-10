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
    const founders: Founder[] = content.items;

    return (
        <section id="our-founders" className="pt-0 pb-20 relative overflow-hidden bg-[#CFE8E5]">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-emerald/5 blur-[120px] rounded-full pointer-events-none" />

            <div className="max-w-7xl mx-auto px-6 relative z-10">
                <div className="text-center mb-16">
                    <motion.span
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block text-xs font-semibold tracking-widest uppercase text-[#0f3d32]/60 mb-4 bg-[#0f3d32]/5 border border-[#0f3d32]/10 px-4 py-1.5 rounded-full"
                    >
                        {content.sectionTag}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold mb-4 text-[#0f3d32]"
                        style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                        {content.sectionTitle}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.1 }}
                        className="text-[#2a6a5a] max-w-2xl mx-auto font-light leading-relaxed"
                    >
                        {content.sectionSubtitle}
                    </motion.p>
                </div>

                <div className="flex flex-wrap justify-center gap-8 md:gap-12 perspective-1000">
                    {/* Actual Founders */}
                    {founders.map((founder, i) => (
                        <motion.img
                            key={founder.id}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-40px" }}
                            transition={{ duration: 0.6, delay: i * 0.2, ease: "easeOut" }}
                            whileHover={{ y: -10, scale: 1.02, boxShadow: "0 20px 40px -10px rgba(15, 61, 50, 0.2)" }}
                            src={founder.cardImage || founder.image}
                            alt={founder.name}
                            className="w-full max-w-[320px] md:max-w-[360px] rounded-[32px] shadow-xl"
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Founders;
