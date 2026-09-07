import { motion } from 'framer-motion';

const NewTestimonial = () => {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-4xl mx-auto px-6 text-left md:text-center flex flex-col md:items-center">
        
        {/* Decorative Quote Mark */}
        <div className="text-4xl text-gray-300 mb-6 font-serif">"</div>
        
        {/* Quote */}
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-5xl font-serif text-gray-900 leading-tight mb-12"
        >
          A system that adapts to your organizational scale — not the other way around. It's an efficient tool for capturing leads and managing patients in every clinic we operate.
        </motion.h2>

        {/* Author info */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-4"
        >
          <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100">
            <img src="/.png/profile2.png" alt="Bhanu Prasad" className="w-full h-full object-cover" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-base font-bold text-gray-900">Bhanu Prasad</span>
            <span className="text-sm text-gray-500">Enterprise Architect & Technology Leader</span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default NewTestimonial;
