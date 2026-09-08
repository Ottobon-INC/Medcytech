import { motion } from 'framer-motion';

const SolutionCard = ({ solution, index }: { solution: any, index: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full rounded-[24px] overflow-hidden shadow-[0_15px_40px_rgba(15,61,50,0.08)] hover:shadow-[0_25px_50px_rgba(15,61,50,0.15)] transition-all duration-300 border border-[#0f3d32]/5 bg-white flex flex-col h-[520px] group"
      id={solution.id}
    >
      {/* Top Content Area */}
      <div className="p-8 md:p-10 flex flex-col flex-1 relative z-10 h-full">
        <h3 className="text-[28px] md:text-3xl font-bold text-[#0f3d32] tracking-tight mb-8">
          {solution.title}
        </h3>
        
        <div className="flex-1 space-y-3.5 mb-8">
          {solution.bullets.map((bullet: string, idx: number) => (
            <div key={idx} className="flex items-start">
              <span className="text-[15px] font-medium text-[#6f827d] leading-relaxed">{bullet}</span>
            </div>
          ))}
        </div>


      </div>

      {/* Bottom Fluid Image Area */}
      {solution.image && (
        <div 
          className="absolute bottom-0 left-0 right-0 h-[280px] z-0 pointer-events-none"
          style={{ WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)', maskImage: 'linear-gradient(to bottom, transparent 0%, black 40%)' }}
        >
          <img 
            src={solution.image} 
            alt={solution.title} 
            className="w-full h-full object-cover object-center opacity-100 transition-transform duration-700 group-hover:scale-110"
          />
        </div>
      )}
    </motion.div>
  );
};

const CoreSolutions = ({ content }: { content: any }) => {
  if (!content) return null;
  
  return (
    <section id="core-solutions" className="pt-24 pb-12 relative overflow-hidden bg-[#CFE8E5]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        {/* Section Header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block text-xs font-semibold tracking-widest uppercase text-[#0f3d32]/60 mb-5 bg-white border border-[#0f3d32]/10 shadow-sm px-5 py-2 rounded-full"
          >
            {content.sectionTag}
          </motion.span>
          
          <motion.h2
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-[#0f3d32] tracking-tight max-w-4xl mx-auto"
          >
            {content.sectionTitle}
          </motion.h2>
          
          <p className="text-[#0f3d32]/60 max-w-2xl mx-auto font-medium text-base md:text-lg">
            {content.sectionSubtitle}
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl mx-auto">
          {content.items.map((item: any, index: number) => (
            <SolutionCard key={item.id} solution={item} index={index} />
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
