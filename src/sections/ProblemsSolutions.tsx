import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

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
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const animFrameId = useRef<number | null>(null);

  const handleScroll = () => {
    if (animFrameId.current !== null) return;
    animFrameId.current = requestAnimationFrame(() => {
      animFrameId.current = null;
      const container = scrollContainerRef.current;
      if (!container) return;
      const scrollTop = container.scrollTop;
      const itemHeight = container.clientHeight;
      if (itemHeight > 0) {
        const index = Math.round(scrollTop / itemHeight);
        if (index >= 0 && index < challenges.length && index !== activeIndex) {
          setActiveIndex(index);
        }
      }
    });
  };

  useEffect(() => {
    return () => {
      if (animFrameId.current !== null) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, []);

  return (
    <section id="challenges" className="py-20 md:py-28 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <motion.div 
          className="text-center mb-12 md:mb-16"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#0f3d32]/60 mb-4 bg-[#0f3d32]/5 border border-[#0f3d32]/10 px-4 py-1.5 rounded-full">
            What We Do
          </span>
          <h2
            className="text-4xl md:text-5xl font-medium mb-4 text-[#0f3d32] tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            A Better Way Forward
          </h2>
          <p className="text-[#0f3d32]/80 max-w-2xl mx-auto font-medium leading-relaxed text-sm md:text-base">
            We handle the digital side of your clinic—eliminating waiting room chaos and administrative burnout—so you can focus entirely on providing excellent patient care.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 lg:gap-8 max-w-6xl mx-auto items-stretch">
          
          {/* Left Side: Display-only Problem Cards */}
          <div className="w-full md:w-1/3 flex flex-col justify-between gap-3 relative h-[340px] sm:h-[360px] md:h-[370px]">
            {challenges.map((challenge, index) => {
              const isActive = activeIndex === index;
              return (
                <div
                  key={challenge.id}
                  className={`group relative text-left px-5 py-3 rounded-xl transition-all duration-300 border overflow-hidden flex-1 flex flex-col justify-center select-none ${
                    isActive 
                      ? 'bg-[#0f3d32] border-[#0f3d32] translate-x-1 md:translate-x-2 shadow-lg shadow-[#0f3d32]/10' 
                      : 'bg-white/40 backdrop-blur-sm border-[#0f3d32]/10'
                  }`}
                >
                  <div className="relative z-10 flex items-baseline gap-3">
                    <span className={`text-sm font-bold transition-colors duration-300 ${isActive ? 'text-[#4ABFB0]' : 'text-[#4ABFB0]/70'}`}>
                      {challenge.id}.
                    </span>
                    <h3 className={`text-base md:text-lg font-bold transition-colors duration-300 ${isActive ? 'text-white' : 'text-[#0f3d32]'}`}>
                      {challenge.title}
                    </h3>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Side: Details Box Container */}
          <div className="w-full md:w-2/3 bg-[#e8f5f1]/60 backdrop-blur-md rounded-3xl border border-[#0f3d32]/15 shadow-[0_8px_30px_rgb(15,61,50,0.06)] relative overflow-hidden flex flex-col h-[340px] sm:h-[360px] md:h-[370px]">
            
            {/* Animated decorative background glow */}
            <motion.div 
              className="absolute -top-[30%] -right-[10%] w-[60%] h-[70%] rounded-full bg-[#4ABFB0]/20 blur-3xl pointer-events-none z-0"
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 0.8, 0.5],
              }}
              transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />

            {/* Medcy Lotus Motif Top Right Inside Box */}
            <div className="absolute top-0 right-0 pointer-events-none select-none z-0 w-44 sm:w-56 md:w-64 h-44 sm:h-56 md:h-64 overflow-hidden flex items-start justify-end">
              <img 
                src="/lotus_with_gold_half_left.png" 
                alt="Medcy Logo Motif" 
                className="w-full h-auto max-h-full object-contain object-right-top opacity-35"
              />
            </div>

            {/* Scroll Indicator Badge at Top Right */}
            <div className="absolute top-4 right-5 z-20 flex items-center gap-1.5 text-xs font-medium text-[#0f3d32]/70 bg-white/60 backdrop-blur-sm px-3 py-1 rounded-full border border-[#0f3d32]/15 shadow-sm pointer-events-none">
              <span>Scroll box</span>
              <span className="animate-bounce text-[#0f3d32] font-bold">↓</span>
            </div>

            {/* Inner Native Scroll Container */}
            <div 
              ref={scrollContainerRef}
              onScroll={handleScroll}
              className="w-full h-full overflow-y-auto snap-y snap-mandatory overscroll-contain relative z-10"
              style={{
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
              }}
            >
              {challenges.map((challenge) => (
                <div 
                  key={challenge.id} 
                  className="w-full h-full shrink-0 snap-start flex flex-col justify-between p-6 sm:p-7 md:p-8 box-border relative overflow-hidden"
                >
                  <div className="pr-16 sm:pr-20">
                    <h3 
                      className="text-lg sm:text-xl md:text-2xl font-semibold text-[#0f3d32] tracking-tight mb-3 sm:mb-4 leading-tight"
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {challenge.title}
                    </h3>

                    <div className="space-y-2.5 sm:space-y-3 text-[#0f3d32]/90 text-sm sm:text-base leading-relaxed font-normal">
                      <p>{challenge.problem}</p>
                      <p>{challenge.solution}</p>
                    </div>
                  </div>

                  {/* Bottom Row */}
                  <div className="pt-3 flex items-center justify-between mt-auto border-t border-[#0f3d32]/10">
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-[#0f3d32]/50 uppercase tracking-widest">OFFERING</span>
                      <a 
                        href={
                          challenge.offering === 'Digital Presence' ? '#digital-growth' :
                          challenge.offering === 'Patient Experience' ? '#digital-opd' :
                          challenge.offering === 'Admin' ? '#sakhi-ai' :
                          '#social-media-management'
                        }
                        className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#4ABFB0]/20 text-[#0f3d32] text-xs sm:text-sm font-semibold border border-[#4ABFB0]/30 shadow-xs hover:bg-[#4ABFB0]/30 transition-all cursor-pointer"
                      >
                        {challenge.offering}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ProblemsSolutions;


