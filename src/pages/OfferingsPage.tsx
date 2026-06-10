import { motion } from 'framer-motion';
import Offerings from '../sections/Offerings';

const OfferingsPage = ({ content }: { content: any }) => {
  const pageData = content.offeringsPage;
  return (
    <main className="pt-24 min-h-screen bg-[#CFE8E5]">
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
      
      <Offerings content={content.offerings} />
      
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="rounded-[32px] overflow-hidden shadow-xl order-2 md:order-1"
          >
            <img src={pageData.footerImage} alt="Clinical technology" className="w-full h-[300px] object-cover" />
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-6 order-1 md:order-2"
          >
            <h2 className="text-3xl font-bold text-[#0f3d32]" style={{ fontFamily: "'Playfair Display', serif" }}>
              {pageData.footerTitle}
            </h2>
            <p className="text-[#2a6a5a] leading-relaxed">
              {pageData.footerSubtitle}
            </p>
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default OfferingsPage;
