import { motion } from 'framer-motion';

export default function NewBottomCTA({ content }: { content?: any }) {
  return (
    <section className="relative py-32 bg-[#fcfdfc] overflow-hidden">
      
      {/* Abstract background graphics (replacing the hands from the reference) */}
      <div className="absolute top-1/2 left-0 w-full h-[500px] -translate-y-1/2 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-10 -left-40 w-96 h-96 bg-gradient-to-tr from-orange-200/40 to-blue-200/40 blur-3xl rounded-full" />
        <div className="absolute bottom-10 -right-40 w-96 h-96 bg-gradient-to-bl from-teal-200/40 to-yellow-200/40 blur-3xl rounded-full" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center flex flex-col items-center">
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-6xl font-serif text-gray-900 mb-10 leading-tight"
          dangerouslySetInnerHTML={{ __html: content?.ctaTitle || "Ready to transform your<br/>clinic's operations?" }}
        />
        
        <motion.button 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="bg-black text-white px-8 py-3.5 rounded-full text-base font-medium hover:bg-gray-800 transition-colors shadow-lg hover:shadow-xl"
        >
          {content?.ctaButtonText || "Partner With Us"}
        </motion.button>
        
      </div>
    </section>
  );
}
