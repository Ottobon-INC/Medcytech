import { motion } from 'framer-motion';
import { Shield, Globe, Zap, ArrowRight } from 'lucide-react';

const iconMap: Record<string, React.ReactNode> = {
  Globe: <Globe className="w-10 h-10 text-brand-teal" />,
  Shield: <Shield className="w-10 h-10 text-brand-teal" />,
  Zap: <Zap className="w-10 h-10 text-brand-teal" />
};

const DigitalIdentityPage = ({ content }: { content: any }) => {
  const pageData = content.digitalIdentityPage;
  return (
    <main className="min-h-screen bg-background text-foreground pt-24 overflow-hidden">
      {/* Hero Section */}
      <section className="relative py-20 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block text-xs font-semibold tracking-widest uppercase text-brand-teal mb-5 bg-brand-teal/5 border border-brand-teal/10 px-4 py-1.5 rounded-full"
          >
            {pageData.hero.tag}
          </motion.span>
          <motion.h1
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 text-[#0f3d32] tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {pageData.hero.titleLine1} <br />
            <span className="text-brand-teal">{pageData.hero.titleLine2}</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[#5b6e68] max-w-2xl mx-auto text-lg md:text-xl font-medium leading-relaxed mb-10"
          >
            {pageData.hero.subtitle}
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <button className="px-8 py-4 bg-[#0f3d32] text-white rounded-full font-bold text-lg hover:bg-brand-teal transition-all shadow-xl shadow-[#0f3d32]/20">
              {pageData.hero.cta1}
            </button>
            <button className="px-8 py-4 bg-white text-[#0f3d32] border border-[#0f3d32]/10 rounded-full font-bold text-lg hover:bg-[#f8faf9] transition-all">
              {pageData.hero.cta2}
            </button>
          </motion.div>
        </div>

        {/* Decorative background elements */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-mesh pointer-events-none opacity-40" />
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-[#CFE8E5]/30 relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {pageData.features.map((feature: any, i: number) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-8 rounded-[32px] bg-white border border-[#0f3d32]/5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="mb-6">{iconMap[feature.icon]}</div>
                <h3 className="text-2xl font-bold text-[#0f3d32] mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {feature.title}
                </h3>
                <p className="text-[#5b6e68] font-medium leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Showcase Section */}
      <section className="py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-[#0f3d32] mb-8 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
              {pageData.showcase.titleLine1} <br />
              <span className="text-brand-teal">{pageData.showcase.titleLine2}</span>
            </h2>
            <p className="text-[#5b6e68] text-lg font-medium leading-relaxed mb-10">
              {pageData.showcase.description}
            </p>
            
            <ul className="space-y-6">
              {pageData.showcase.points.map((item: string, i: number) => (
                <li key={i} className="flex items-center gap-4 text-[#0f3d32] font-bold">
                  <div className="w-6 h-6 rounded-full bg-brand-teal/20 flex items-center justify-center text-brand-teal">
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={3} />
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="rounded-[40px] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src={pageData.showcase.image} 
                alt="Digital Identity Preview" 
                className="w-full h-auto object-cover"
              />
            </div>
            {/* Floating UI Element */}
            <div className="absolute -bottom-10 -left-10 p-6 bg-white rounded-3xl shadow-xl border border-[#0f3d32]/5 max-w-[200px]">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                <span className="text-[10px] font-bold text-[#0f3d32]/40 uppercase tracking-widest">{pageData.showcase.floatingCard.tag}</span>
              </div>
              <p className="text-sm font-bold text-[#0f3d32]">{pageData.showcase.floatingCard.name}</p>
              <p className="text-[10px] text-brand-teal font-bold">{pageData.showcase.floatingCard.role}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-[#0f3d32] text-white relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-6 text-center relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold mb-8 tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }}>
            {pageData.cta.title}
          </h2>
          <p className="text-white/60 text-lg font-medium mb-12 max-w-2xl mx-auto">
            {pageData.cta.subtitle}
          </p>
          <button className="px-10 py-5 bg-brand-teal text-white rounded-full font-bold text-xl hover:bg-white hover:text-[#0f3d32] transition-all shadow-2xl shadow-black/20">
            {pageData.cta.buttonText}
          </button>
        </div>
        
        {/* Background Accents */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-teal/20 blur-[100px] rounded-full" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-brand-teal/10 blur-[100px] rounded-full" />
      </section>
    </main>
  );
};

export default DigitalIdentityPage;
