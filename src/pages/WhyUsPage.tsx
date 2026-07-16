import { motion } from 'framer-motion';
import WhyUs from '../sections/WhyUs';
import SEO from '../components/SEO';

const WhyUsPage = ({ content }: { content: any }) => {
  const pageData = content.whyUsPage;
  return (
    <main className="pt-24 min-h-screen bg-[#CFE8E5]">
      <SEO title="Why Choose Medcytech" description={pageData.headerSubtitle} />
      <div className="max-w-7xl mx-auto px-6 pt-12 pb-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-[#0f3d32] mb-6" style={{ fontFamily: "'Playfair Display', serif" }}>
            {pageData.headerTitle}
          </h1>
          <p className="text-lg text-[#2a6a5a] font-light leading-relaxed">
            {pageData.headerSubtitle}
          </p>
        </motion.div>
      </div>
      
      <WhyUs content={content.whyUs} />
      
      <div className="max-w-7xl mx-auto px-6 py-16 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-[#0f3d32] text-white p-12 md:p-20 rounded-[40px] shadow-2xl relative overflow-hidden"
        >
          {/* Decorative glow */}
          <div className="absolute top-0 right-0 w-[60%] h-[60%] bg-[#4ABFB0]/20 blur-[120px] rounded-full pointer-events-none" />
          
          <h2 className="text-3xl md:text-5xl font-normal mb-8 relative z-10 leading-tight" style={{ fontFamily: "'Playfair Display', serif" }} dangerouslySetInnerHTML={{ __html: pageData.ctaTitle }} />
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="relative z-10 px-8 py-4 bg-white text-[#0f3d32] rounded-full font-bold shadow-lg hover:bg-[#E6F4F1] transition-colors"
          >
            {pageData.ctaButtonText}
          </motion.button>
        </motion.div>
      </div>
    </main>
  );
};

export default WhyUsPage;
