import { motion } from 'framer-motion';

const ZigZagItem = ({ item, index }: { item: any, index: number }) => {
  const isEven = index % 2 === 0;

  return (
    <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-24 w-full my-16 md:my-24`}>
      
      {/* Text Content */}
      <motion.div 
        initial={{ opacity: 0, x: isEven ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 w-full"
      >
        <span className="inline-block px-3 py-1 bg-gray-100 text-xs font-semibold text-gray-600 rounded-md mb-6 uppercase tracking-wider">
          Core Solution
        </span>
        
        <h3 className="text-3xl md:text-4xl font-serif text-gray-900 mb-6 leading-tight">
          {item.title}
        </h3>
        
        <p className="text-lg text-gray-600 mb-8 font-medium">
          {item.description}
        </p>

        <ul className="space-y-4">
          {item.bullets.map((bullet: string, idx: number) => (
            <li key={idx} className="flex items-start gap-3">
              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-gray-900 flex-shrink-0" />
              <span className="text-gray-700">{bullet}</span>
            </li>
          ))}
        </ul>
      </motion.div>

      {/* Image Content */}
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.7, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        className="flex-1 w-full flex justify-center"
      >
        <div className="relative w-full aspect-square md:aspect-[4/3] rounded-[32px] overflow-hidden p-4 md:p-8 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 border border-gray-200/50 shadow-sm">
          {/* Subtle colorful blob behind image */}
          <div className="absolute inset-0 opacity-20 blur-3xl rounded-full bg-gradient-to-br from-teal-200 to-orange-200 transform scale-75 mix-blend-multiply" />
          
          <img 
            src={item.image} 
            alt={item.title} 
            className="relative z-10 w-full h-auto max-h-full object-contain rounded-xl shadow-lg border border-white/40"
          />
        </div>
      </motion.div>

    </div>
  );
};

const CoreSolutions = ({ content }: { content: any }) => {
  if (!content) return null;
  
  return (
    <section id="core-solutions" className="py-24 md:py-32 bg-white relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* Section Header */}
        <div className="mb-20 max-w-2xl">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-serif text-gray-900 tracking-tight leading-tight mb-6"
          >
            {content.sectionTitle || "Deploy agents across your customer journey"}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-lg text-gray-600 font-medium"
          >
            {content.sectionSubtitle}
          </motion.p>
        </div>

        {/* Zig Zag Items */}
        <div className="flex flex-col">
          {content.items.map((item: any, index: number) => (
            <ZigZagItem key={item.id} item={item} index={index} />
          ))}
        </div>

      </div>
    </section>
  );
};

export default CoreSolutions;
