import { motion } from 'framer-motion';
import { Baby, Activity, Hourglass, ArrowRight } from 'lucide-react';


const iconMap: Record<string, React.ReactNode> = {
  Baby: <Baby className="w-8 h-8 text-[#0f3d32]" />,
  Hourglass: <Hourglass className="w-8 h-8 text-[#0f3d32]" />,
  Activity: <Activity className="w-8 h-8 text-[#0f3d32]" />
};

const BrandCard = ({ brand }: { brand: any }) => {
  return (
    <div className="w-full h-full">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-full h-[220px] sm:h-[300px] md:h-[420px] group rounded-[24px] overflow-hidden shadow-[0_15px_30px_rgba(15,61,50,0.1)] border border-[#0f3d32]/5 bg-white"
        >
          {/* Main Image Background */}
          <div className="absolute inset-0 z-0 bg-[#CFE8E5]">
            {brand.frontImage ? (
              <img
                src={brand.frontImage}
                alt={brand.name}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="p-6 rounded-2xl bg-[#0f3d32]/5 border border-[#0f3d32]/10">
                  {iconMap[brand.icon]}
                </div>
              </div>
            )}
            
            {/* Hover Overlay Desktop */}
            <div className="hidden md:flex absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-[#0f3d32]/90 via-[#0f3d32]/50 to-transparent flex-col items-center justify-end pb-8 opacity-0 group-hover:opacity-100 transition-all duration-400 z-10 translate-y-8 group-hover:translate-y-0">
              {brand.isComingSoon ? (
                <span className="bg-white text-[#0f3d32] px-6 py-2.5 rounded-full font-bold shadow-xl flex items-center gap-2">
                  Launching Soon
                </span>
              ) : brand.name === "Janma Sethu" ? (
                <a 
                  href="https://janmasethu.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white text-[#0f3d32] px-6 py-2.5 rounded-full font-bold shadow-xl flex items-center gap-2 hover:bg-[#CFE8E5] transition-colors cursor-pointer"
                >
                  Visit Janmasethu.com
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : null}
            </div>

            {/* Mobile visible pill */}
            <div className="md:hidden absolute bottom-6 left-1/2 -translate-x-1/2 z-10 w-[90%] flex justify-center">
              {brand.isComingSoon ? (
                <span className="bg-white/95 backdrop-blur text-[#0f3d32] px-5 py-2.5 rounded-full font-bold shadow-[0_8px_16px_rgba(0,0,0,0.15)] text-sm whitespace-nowrap border border-[#0f3d32]/10">
                  Launching Soon
                </span>
              ) : brand.name === "Janma Sethu" ? (
                <a 
                  href="https://janmasethu.com" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="bg-white/95 backdrop-blur text-[#0f3d32] px-5 py-2.5 rounded-full font-bold shadow-[0_8px_16px_rgba(0,0,0,0.15)] text-sm whitespace-nowrap border border-[#0f3d32]/10 flex items-center gap-2"
                >
                  Visit Janmasethu.com
                  <ArrowRight className="w-4 h-4" />
                </a>
              ) : null}
            </div>
          </div>
        </motion.div>
      </div>
  );
};

const Brands = ({ content, hideCTA }: { content: any; hideCTA?: boolean }) => {
  return (
    <section id="our-brands" className={`pt-16 ${hideCTA ? 'pb-16' : 'pb-20'} relative overflow-hidden bg-[#CFE8E5]`}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#0f3d32]/60 mb-4 bg-[#0f3d32]/5 border border-[#0f3d32]/10 px-4 py-1.5 rounded-full">
            {content.sectionTag}
          </span>
          <h2 className="text-4xl md:text-5xl font-medium mb-4 text-[#0f3d32]" style={{ fontFamily: "'Playfair Display', serif" }}>
            {content.sectionTitle}
          </h2>
          <p className="text-[#0f3d32]/80 max-w-2xl mx-auto font-medium leading-relaxed">
            {content.sectionSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 max-w-7xl mx-auto items-center mb-16">
          {content.items.map((brand: any) => (
            <BrandCard key={brand.name} brand={brand} />
          ))}
        </div>


      </div>

      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-brand-teal/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

export default Brands;
