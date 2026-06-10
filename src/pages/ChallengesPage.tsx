import { motion } from 'framer-motion';
import Challenges from '../sections/Challenges';

const ChallengesPage = ({ content }: { content: any }) => {
  const pageData = content.challengesPage;
  return (
    <main className="pt-24 min-h-screen bg-[#CFE8E5]">
      {/* Extra informative content header */}
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

      {/* The core Challenges section */}
      <Challenges content={content.challenges} hideCTA={true} />

      {/* Extra informative content footer */}
      <div className="max-w-7xl mx-auto px-6 pt-0 pb-16">
        <div className="bg-white/60 backdrop-blur-md rounded-[32px] p-10 md:p-16 border border-[#0f3d32]/5 shadow-sm text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-[#0f3d32] mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            {pageData.footerTitle}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-[#2a6a5a] leading-relaxed max-w-3xl mx-auto text-lg font-light mb-8"
          >
            {pageData.footerSubtitle}
          </motion.p>
          <img src={pageData.footerImage} alt="Medical professional smiling" className="w-full max-w-4xl mx-auto h-[400px] object-cover rounded-[24px] shadow-lg" />
        </div>
      </div>
    </main>
  );
};

export default ChallengesPage;
