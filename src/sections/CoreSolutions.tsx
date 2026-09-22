import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const FrontCardContent = ({ solution, isActive }: { solution: any; isActive?: boolean }) => (
  <div className={`w-full h-full bg-gradient-to-b from-[#F0F9F8] to-[#CFE8E5] rounded-[24px] border transition-all duration-300 flex flex-col overflow-hidden relative group ${
    isActive
      ? 'border-2 border-[#0f3d32] ring-2 ring-[#0f3d32] shadow-[0_20px_45px_rgba(15,61,50,0.25)]'
      : 'border-[#0f3d32]/10 hover:border-[#0f3d32]'
  }`}>
    <div className="p-6 md:p-8 flex flex-col relative z-10 h-full pointer-events-none">
      <h3 className="text-2xl md:text-[26px] font-bold text-[#0f3d32] tracking-tight mb-6 leading-snug" style={{ fontFamily: "'Playfair Display', serif" }}>
        {solution.title}
      </h3>
    </div>

    {solution.image && (
      <div 
        className="absolute bottom-0 left-0 right-0 h-[270px] z-0 pointer-events-none"
        style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 25%)', maskImage: 'linear-gradient(to bottom, transparent 0%, black 25%)' }}
      >
        <img 
          src={solution.image} 
          alt={solution.title} 
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-110 group-active:scale-[1.15]"
        />
        {/* Dark Green Gradient from below */}
        <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-[#0f3d32]/80 to-transparent"></div>
      </div>
    )}

    {/* Bottom Action Area */}
    <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 z-10 flex items-center justify-between pointer-events-none">
      <span className="text-white font-bold text-sm md:text-base drop-shadow-sm">Read Full Details</span>
      <div className="w-8 h-8 md:w-10 md:h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:translate-x-2">
        <ArrowRight className="w-4 h-4 md:w-5 md:h-5 text-white" strokeWidth={2.5} />
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
            <div id={item.id} key={item.id} className="relative w-full h-[340px] xl:h-[360px] scroll-mt-24 group">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className="absolute inset-0 w-full h-full cursor-pointer shadow-[0_15px_40px_rgba(15,61,50,0.08)] hover:shadow-[0_25px_50px_rgba(15,61,50,0.15)] hover:-translate-y-2 group-target:scale-[1.05] group-target:shadow-[0_30px_60px_rgba(15,61,50,0.25)] rounded-[24px] transition-all duration-500 z-10"
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
