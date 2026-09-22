import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const challenges = [
  {
    id: '01',
    title: 'Limited Digital Visibility',
    problem: 'Your healthcare organization may not have a strong digital presence that clearly communicates your services and makes it easy for patients to find and connect with you.',
    solution: 'We build a clear, professional digital presence that helps patients discover your organization and understand what you offer.',
    offering: 'Digital Presence',
  },
  {
    id: '02',
    title: 'Friction in the Patient Journey',
    problem: 'Patients can face difficulties finding information, navigating services or interacting with your organization across different touchpoints.',
    solution: 'We simplify key patient interactions and create a more connected, convenient digital experience.',
    offering: 'Patient Experience',
  },
  {
    id: '03',
    title: 'Time-Consuming Administrative Work',
    problem: 'Repetitive administrative tasks and manual processes can take valuable time away from healthcare teams.',
    solution: 'We streamline workflows and use technology to reduce unnecessary manual effort and improve operational efficiency.',
    offering: 'Admin',
  },
  {
    id: '04',
    title: 'Gaps in Technology Infrastructure',
    problem: 'Existing technology systems may not be equipped to support changing operational needs, integration or future growth.',
    solution: 'We develop and strengthen the underlying technology infrastructure needed to support reliable, scalable healthcare operations.',
    offering: 'Infrastructure Development',
  },
];



const ProblemsSolutions = () => {
  const [activeTab, setActiveTab] = useState(challenges[0].id);
  const activeChallenge = challenges.find((c) => c.id === activeTab) || challenges[0];

  return (
    <section id="challenges" className="py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#0f3d32]/60 mb-5 bg-[#0f3d32]/5 border border-[#0f3d32]/10 px-4 py-1.5 rounded-full">
            What We Do
          </span>
          <h2
            className="text-4xl md:text-5xl font-medium mb-5 text-[#0f3d32] tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            A Better Way Forward
          </h2>
          <p className="text-[#0f3d32]/80 max-w-2xl mx-auto font-medium leading-relaxed text-sm md:text-base">
            We handle the digital side of your clinic—eliminating waiting room chaos and administrative burnout—so you can focus entirely on providing excellent patient care.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 lg:gap-12 max-w-6xl mx-auto items-stretch">
          
          {/* Left Side: Tabs */}
          <div className="w-full md:w-1/3 flex flex-col gap-3 relative">
            {challenges.map((challenge) => {
              const isActive = activeTab === challenge.id;
              return (
                <button
                  key={challenge.id}
                  onClick={() => setActiveTab(challenge.id)}
                  onMouseEnter={() => setActiveTab(challenge.id)}
                  className={`group relative text-left p-5 rounded-xl transition-all duration-300 border overflow-hidden ${
                    isActive 
                      ? 'border-[#0f3d32] translate-x-1 md:translate-x-2 shadow-lg shadow-[#0f3d32]/10' 
                      : 'bg-white/40 backdrop-blur-sm border-[#0f3d32]/10 hover:border-[#4ABFB0]/50 hover:bg-white/70 hover:translate-x-1'
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTabBackground"
                      className="absolute inset-0 bg-[#0f3d32]"
                      initial={false}
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {/* Hover Background for inactive tabs */}
                  {!isActive && (
                    <div className="absolute inset-0 bg-slate-50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  )}
                  <div className="relative z-10 flex items-baseline gap-3">
                    <span className={`text-sm font-bold transition-colors duration-300 ${isActive ? 'text-[#4ABFB0]' : 'text-[#4ABFB0]/70'}`}>
                      {challenge.id}.
                    </span>
                    <h3 className={`text-base md:text-lg font-bold transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#0f3d32]'}`}>
                      {challenge.title}
                    </h3>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Right Side: Content */}
          <div className="w-full md:w-2/3 bg-white/40 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-[#0f3d32]/10 shadow-[0_8px_40px_rgb(0,0,0,0.06)] relative overflow-hidden flex flex-col min-h-[320px]">
            {/* Animated decorative blobs */}
            <motion.div 
              className="absolute -top-[30%] -right-[10%] w-[60%] h-[70%] rounded-full bg-[#4ABFB0]/15 blur-3xl pointer-events-none"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
                x: [0, -30, 0],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div 
              className="absolute -bottom-[20%] -left-[10%] w-[50%] h-[50%] rounded-full bg-[#0f3d32]/5 blur-3xl pointer-events-none"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.3, 0.6, 0.3],
                x: [0, 30, 0],
              }}
              transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
            />

            {/* Decorative top line */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#0f3d32] to-[#4ABFB0]" />

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="flex flex-col h-full flex-1 relative z-10"
              >
                <div className="flex items-baseline gap-3 mb-6">
                  <h3 className="text-2xl md:text-3xl font-bold text-[#0f3d32] tracking-tight">{activeChallenge.title}</h3>
                </div>

                <p className="text-base md:text-lg text-slate-600 leading-relaxed mb-8 flex-1">
                  <span className="block mb-3">{activeChallenge.problem}</span>
                  <span className="block text-[#0f3d32] font-medium">{activeChallenge.solution}</span>
                </p>

                <div className="pt-6 border-t border-slate-200/60 mt-auto flex items-center">
                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Offering</span>
                    <a 
                      href={
                        activeChallenge.offering === 'Digital Presence' ? '#digital-growth' :
                        activeChallenge.offering === 'Patient Experience' ? '#digital-opd' :
                        activeChallenge.offering === 'Admin' ? '#sakhi-ai' :
                        '#social-media-management'
                      }
                      className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#4ABFB0]/10 text-[#4ABFB0] text-sm font-bold border border-[#4ABFB0]/20 shadow-sm hover:bg-[#4ABFB0]/20 hover:-translate-y-0.5 transition-all cursor-pointer"
                    >
                      {activeChallenge.offering}
                    </a>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProblemsSolutions;
