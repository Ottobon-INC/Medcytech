import { motion } from 'framer-motion';
import Brands from '../sections/Brands';

const BrandsPage = ({ content }: { content: any }) => {
  const pageData = content.brandsPage;
  return (
    <main className="pt-24 min-h-screen bg-[#CFE8E5] overflow-hidden">
      {/* Massive Hero Section for Brands */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pt-16 md:pt-24 pb-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="inline-block text-xs font-bold tracking-[0.2em] uppercase text-[#0f3d32]/60 mb-6 bg-white/50 border border-[#0f3d32]/10 px-6 py-2 rounded-full shadow-sm">
            {pageData.headerTag}
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-[#0f3d32] mb-8 leading-tight tracking-tight" style={{ fontFamily: "'Playfair Display', serif" }} dangerouslySetInnerHTML={{ __html: pageData.headerTitle }} />
          <p className="text-lg md:text-xl text-[#2a6a5a] font-light leading-relaxed max-w-3xl mx-auto">
            {pageData.headerSubtitle}
          </p>
        </motion.div>
      </div>
      
      {/* The core Brands section */}
      <div>
        <Brands content={content.brands} hideCTA={true} />
      </div>
      
      {/* HUGE CONTENT: Deep Dive Sections */}
      <div className="bg-white/40 pt-8 pb-24 border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          
          {pageData.deepDives.map((item: any, i: number) => (
            <div key={i} className={`flex flex-col ${i % 2 !== 0 ? 'lg:flex-row-reverse' : 'lg:flex-row'} gap-12 lg:gap-20 items-center mb-32`}>
              <motion.div 
                initial={{ opacity: 0, x: i % 2 !== 0 ? 50 : -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2 space-y-6"
              >
                <h2 className="text-4xl md:text-5xl font-bold text-[#0f3d32]" style={{ fontFamily: "'Playfair Display', serif" }}>
                  {item.title}
                </h2>
                <h3 className="text-xl text-[#0f3d32] font-medium tracking-wide">{item.subtitle}</h3>
                <p className="text-[#2a6a5a] leading-relaxed text-lg font-light">
                  {item.description}
                </p>
                <ul className="space-y-4 pt-4">
                  {item.highlights.map((highlight: string, j: number) => (
                    <li key={j} className="flex items-start gap-3 text-[#0f3d32]/80">
                      <div className={`w-1.5 h-1.5 rounded-full ${item.colorDot} mt-2 shrink-0`} />
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                className="lg:w-1/2 w-full"
              >
                <div className="relative rounded-[40px] overflow-hidden shadow-2xl group">
                  <div className="absolute inset-0 bg-[#0f3d32]/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                  <img src={item.image} alt={item.title} className="w-full h-[500px] object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              </motion.div>
            </div>
          ))}

        </div>
      </div>
      


    </main>
  );
};

export default BrandsPage;
