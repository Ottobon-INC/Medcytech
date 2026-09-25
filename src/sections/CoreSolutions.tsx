import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FrontCardContent = ({ solution, isActive }: { solution: any; isActive?: boolean }) => (
  <div className={`w-full h-full bg-gradient-to-b from-[#F0F9F8] to-[#CFE8E5] rounded-[24px] border transition-all duration-300 flex flex-col justify-between overflow-hidden relative group p-6 md:p-8 ${
    isActive
      ? 'border-2 border-[#0f3d32] shadow-[0_20px_45px_rgba(15,61,50,0.25)]'
      : 'border-[#0f3d32]/10 hover:border-[#0f3d32] shadow-[0_15px_30px_rgba(15,61,50,0.08)]'
  }`}>
    {/* Top Header / Title */}
    <div className="relative z-10 pointer-events-none">
      <h3 className="text-2xl md:text-[26px] font-bold text-[#0f3d32] tracking-tight leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
        {solution.title}
      </h3>
    </div>

    {/* Bottom Image with Soft Top Mask Blend & Dark Green Bottom Shading */}
    {solution.image && (
      <div 
        className="absolute bottom-0 left-0 right-0 h-[82%] z-0 pointer-events-none overflow-hidden"
        style={{
          WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%)',
          maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%)'
        }}
      >
        <img 
          src={solution.image} 
          alt={solution.title} 
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Green tint overlay matching 2nd screenshot */}
        <div className="absolute inset-0 bg-[#0f3d32]/20 mix-blend-multiply z-[1]" />
        <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#0f3d32] via-[#0f3d32]/70 to-transparent z-[2]" />
      </div>
    )}

    {/* Bottom Action Area */}
    <div className="relative z-10 flex items-center justify-between pointer-events-none mt-auto pt-4">
      <span className="text-white font-bold text-sm md:text-base tracking-wide drop-shadow-md">
        Read Full Details
      </span>
      <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shrink-0 transition-all duration-300 group-hover:bg-white">
        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:text-[#0f3d32]" strokeWidth={2.5} />
      </div>
    </div>
  </div>
);

const CoreSolutions = ({ content }: { content: any }) => {
  const navigate = useNavigate();

  if (!content) return null;

  return (
    <section id="core-solutions" className="pt-10 pb-12 md:pt-16 relative bg-[#CFE8E5]">
      <div className="max-w-screen-2xl mx-auto px-4 md:px-12 lg:px-16 xl:px-24 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-12 md:mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold tracking-widest uppercase text-[#0f3d32]/60 mb-4 bg-[#0f3d32]/5 border border-[#0f3d32]/10 px-4 py-1.5 rounded-full"
          >
            {content.sectionTag}
          </motion.span>
          
          <div className="relative w-full mx-auto flex items-center justify-center mb-4">
            <motion.h2
              initial={{ opacity: 0, scale: 0.98 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#0f3d32] text-center"
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
          
          <p className="text-[#0f3d32]/80 max-w-2xl mx-auto font-medium leading-relaxed">
            {content.sectionSubtitle}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 xl:gap-6 w-full mx-auto">
          {content.items.map((item: any, index: number) => (
            <div id={item.id} key={item.id} className="relative w-full h-[360px] xl:h-[380px] scroll-mt-24 group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="w-full h-full cursor-pointer hover:-translate-y-2 rounded-[24px] overflow-hidden transition-all duration-300 shadow-[0_15px_40px_rgba(15,61,50,0.08)] hover:shadow-[0_25px_50px_rgba(15,61,50,0.18)]"
                onClick={() => navigate(`/solutions/${item.id}`)}
              >
                <FrontCardContent solution={item} isActive={false} />
              </motion.div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Subtle Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-[#CFE8E5]/10 to-transparent pointer-events-none" />
      <div className="absolute -left-40 top-40 w-96 h-96 bg-[#4ABFB0]/5 blur-[120px] rounded-full pointer-events-none" />
    </section>
  );
};

export default CoreSolutions;
