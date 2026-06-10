"use client";
import { motion } from 'framer-motion';
import { AlertCircle, ArrowRight } from 'lucide-react';
import { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';



const Challenges = ({ content, hideCTA }: { content: any; hideCTA?: boolean }) => {
  const challenges = content.items;
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const navigate = useNavigate();

  const advance = useCallback(() => {
    setActiveIndex(prev => (prev + 1) % challenges.length);
  }, []);

  useEffect(() => {
    if (isPaused) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }
    intervalRef.current = setInterval(advance, 3000); // SLOWED DOWN
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, advance]);

  return (
    <section id="challenges" className="pt-0 pb-16 relative overflow-hidden bg-[#CFE8E5]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center min-h-[560px]">

          {/* ── LEFT: Sticky text block ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="w-full lg:w-[42%] flex-shrink-0 lg:sticky lg:top-28 self-start"
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#0f3d32]/60 mb-5 bg-[#0f3d32]/5 border border-[#0f3d32]/10 px-4 py-1.5 rounded-full">
              {content.sectionTag}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight text-[#0f3d32] leading-tight" style={{ fontFamily: "'Playfair Display', serif" }} dangerouslySetInnerHTML={{ __html: content.sectionTitle }} />
            <p className="text-lg text-[#2a6a5a] font-light leading-relaxed mb-8">
              {content.sectionSubtitle}
            </p>

            {/* Progress dots */}
            <div className="flex gap-3 items-center">
              {challenges.map((_: any, i: number) => (
                <button
                  key={i}
                  onClick={() => setActiveIndex(i)}
                  className={`h-2 rounded-full transition-all duration-500 ${i === activeIndex
                    ? 'w-8 bg-[#0f3d32]'
                    : 'w-2 bg-[#0f3d32]/20 hover:bg-[#0f3d32]/40'
                    }`}
                />
              ))}
            </div>
          </motion.div>

          {/* ── RIGHT: Auto-scrolling card stack ── */}
          <div className="w-full lg:w-[58%] relative">
            {/* Stacked card viewport — shows 1 prominent + peek of next */}
            <div
              className="relative overflow-hidden h-[400px] md:h-[450px] lg:h-[420px]"
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              {challenges.map((challenge: any, i: number) => {
                // Compute position relative to activeIndex
                const total = challenges.length;
                let offset = (i - activeIndex + total) % total;
                // 0 = active, 1 = next, 2+ = hidden below
                return (
                  <motion.div
                    key={i}
                    animate={{
                      y: offset === 0 ? 0 : offset === 1 ? '105%' : '210%',
                      scale: offset === 0 ? 1 : 0.94,
                      opacity: offset === 0 ? 1 : offset === 1 ? 0.5 : 0,
                      zIndex: offset === 0 ? 10 : offset === 1 ? 5 : 0,
                    }}
                    transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-0 cursor-pointer"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                    onClick={() => setActiveIndex(i)}
                  >
                    <div className="relative w-full h-full rounded-[2rem] overflow-hidden shadow-xl">
                      {/* Background image */}
                      <div
                        className="absolute inset-0 bg-cover bg-center scale-100 hover:scale-105 transition-transform duration-700"
                        style={{ backgroundImage: `url(${challenge.image})` }}
                      />

                      {/* Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

                      {/* Content always visible */}
                      <div className="absolute inset-x-0 bottom-0 p-8 flex flex-col gap-3">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#4ABFB0]/30 border border-[#4ABFB0]/60 flex items-center justify-center backdrop-blur-md shrink-0">
                            <AlertCircle className="w-4 h-4 text-[#4ABFB0]" />
                          </div>
                          <h3 className="text-2xl font-bold text-white tracking-tight leading-tight">
                            {challenge.title}
                          </h3>
                        </div>
                        <div className="h-px w-12 bg-gradient-to-r from-[#4ABFB0]/60 to-transparent" />
                        <p className="text-sm text-slate-200 font-light leading-relaxed max-w-sm">
                          {challenge.description}
                        </p>
                      </div>

                      {/* Teal border glow */}
                      <div className="absolute inset-0 border border-[#4ABFB0]/20 rounded-[2rem] pointer-events-none" />
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Pause hint */}
            <p className="text-xs text-[#2a6a5a]/60 text-center mt-4 tracking-wide">
              Hover to pause · Click dot to jump
            </p>
          </div>
        </div>

        {/* Section Know More Button */}
        {!hideCTA && (
          <div className="flex justify-center mt-8">
            <button 
              onClick={() => navigate('/challenges')}
              className="group relative flex items-center gap-3 bg-[#0f3d32] text-white px-8 py-4 rounded-full font-bold overflow-hidden shadow-[0_8px_30px_rgb(15,61,50,0.2)] hover:shadow-[0_8px_30px_rgb(74,191,176,0.3)] transition-all duration-300 hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-[#4ABFB0] translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-in-out z-0" />
              <span className="relative z-10 flex items-center gap-3">
                Explore All Challenges
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default Challenges;
