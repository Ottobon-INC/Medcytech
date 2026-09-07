import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function NewHero({ content }: { content: any, brands?: any[] }) {
  const navigate = useNavigate();
  // Strip out HTML tags for the title to match the plain text look in the reference
  const plainTitle = content.title.replace(/<[^>]*>?/gm, '');

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-start bg-white overflow-hidden font-sans">
      
      {/* Dia-style Aurora Background */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        {/* Top Left - subtle blue/purple */}
        <div className="absolute -top-[20%] -left-[10%] w-[50%] h-[50%] bg-indigo-100/60 rounded-full blur-[120px] mix-blend-multiply" />
        
        {/* Top Right - subtle pink/purple */}
        <div className="absolute -top-[20%] -right-[10%] w-[50%] h-[50%] bg-purple-100/60 rounded-full blur-[120px] mix-blend-multiply" />
        
        {/* Bottom Left - strong red/pink */}
        <div className="absolute bottom-[10%] -left-[20%] w-[60%] h-[60%] bg-rose-200/50 rounded-full blur-[120px] mix-blend-multiply" />
        
        {/* Bottom Right - strong red/pink */}
        <div className="absolute bottom-[10%] -right-[20%] w-[60%] h-[60%] bg-red-200/50 rounded-full blur-[120px] mix-blend-multiply" />
      </div>

      {/* Main Hero Content */}
      <div className="relative z-10 w-full max-w-4xl mx-auto text-center flex flex-col items-center pt-40 md:pt-48 pb-20">
        
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl md:text-[5rem] font-medium text-gray-900 mb-6 leading-[1.05] tracking-tight max-w-3xl"
        >
          {plainTitle || "A dedicated guide for every buyer"}
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-[15px] md:text-base text-gray-800 mb-8 max-w-2xl font-medium tracking-tight"
        >
          {content.subtitle || "AI agents running tailored demos & onboarding 24/7"}
        </motion.p>
        
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          onClick={() => navigate('/contact')}
          className="glow-on-hover flex items-center gap-2 text-sm font-medium shadow-md"
        >
          <Sparkles className="w-4 h-4 z-10 relative" />
          <span className="z-10 relative">{content.ctaText || "See AI demo"}</span>
        </motion.button>
      </div>

      {/* Brands & Stats Block below Hero */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
        className="relative z-10 w-full max-w-6xl mx-auto flex flex-col items-center mt-8 pb-16 px-6"
      >
        {/* Brand Logos */}
        <div className="flex flex-col items-center gap-4 w-full">
           <h3 className="text-sm uppercase tracking-widest text-gray-500 font-medium">Our Partners</h3>
           <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 w-full opacity-60 grayscale hover:grayscale-0 transition-all duration-500 mix-blend-multiply">
              <img src="/vizag-ivf.png" alt="Vizag IVF Centre" className="h-10 md:h-14 object-contain" />
              <img src="/medcy-logo.jpg" alt="Medcy IVF" className="h-12 md:h-16 object-contain" />
           </div>
        </div>

      </motion.div>
    </section>
  );
}
