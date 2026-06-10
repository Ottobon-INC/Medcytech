import { motion } from 'framer-motion';
import { ArrowRight, Globe, Shield, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-8 h-8 text-[#0f3d32]" />,
  Shield: <Shield className="w-8 h-8 text-[#0f3d32]" />,
  Zap: <Zap className="w-8 h-8 text-[#0f3d32]" />
};

const DigitalIdentity = ({ content }: { content: any }) => {
  const navigate = useNavigate();
  const hero = content.hero;
  const features = content.features;

  return (
    <section id="digital-identity" className="py-24 relative overflow-hidden bg-[#0f3d32] text-white">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-teal/10 blur-[150px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold tracking-widest uppercase text-brand-teal mb-4 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full"
          >
            {hero.tag}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {hero.titleLine1} <span className="text-brand-teal">{hero.titleLine2}</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white/70 max-w-2xl mx-auto font-light leading-relaxed text-lg"
          >
            {hero.subtitle}
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature: any, i: number) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/5 border border-white/10 p-8 rounded-[24px] backdrop-blur-sm hover:bg-white/10 transition-colors"
            >
              <div className="w-16 h-16 rounded-2xl bg-brand-teal mb-6 flex items-center justify-center">
                {iconMap[feature.icon]}
              </div>
              <h3 className="text-2xl font-bold mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                {feature.title}
              </h3>
              <p className="text-white/70 font-light leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Section Know More Button */}
        <div className="flex justify-center">
          <button 
            onClick={() => navigate('/digital-identity')}
            className="group relative flex items-center gap-3 bg-[#4ABFB0] text-[#0f3d32] px-8 py-4 rounded-full font-bold overflow-hidden shadow-[0_8px_30px_rgb(74,191,176,0.2)] hover:shadow-[0_8px_30px_rgb(255,255,255,0.3)] transition-all duration-300 hover:-translate-y-1"
          >
            <div className="absolute inset-0 bg-white translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
            <span className="relative z-10 flex items-center gap-3">
              Explore Digital Identity
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default DigitalIdentity;
