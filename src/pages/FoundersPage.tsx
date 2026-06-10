import { motion } from 'framer-motion';
import Founders from '../sections/Founders';

const FoundersPage = ({ content }: { content: any }) => {
  const pageData = content.foundersPage;
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
      
      <Founders content={content.founders} />
      
    </main>
  );
};

export default FoundersPage;
