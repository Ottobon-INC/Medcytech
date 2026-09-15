import { motion } from 'framer-motion';
import { Award, Clock, Users, HeartPulse } from 'lucide-react';

const stats = [
  { icon: Clock, value: "20+", label: "Years of Legacy" },
  { icon: HeartPulse, value: "500+", label: "Clinics Empowered" },
  { icon: Users, value: "2M+", label: "Patient Interactions" },
  { icon: Award, value: "100%", label: "Commitment to Care" },
];

const AboutUs = () => {
  return (
    <section id="about-us" className="py-20 md:py-32 bg-[#0a2e25] relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#4ABFB0]/5 blur-[120px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3" />
      
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#4ABFB0] mb-5 bg-[#4ABFB0]/10 border border-[#4ABFB0]/20 px-4 py-1.5 rounded-full">
              Our Journey
            </span>
            <h2 
              className="text-4xl md:text-5xl lg:text-6xl font-medium mb-6 text-white tracking-tight leading-tight"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              20 Years of <br className="hidden md:block" />
              <span className="text-[#4ABFB0] italic">Healthcare Innovation</span>
            </h2>
            <p className="text-white/70 text-base md:text-lg leading-relaxed font-medium mb-8">
              What started two decades ago as a mission to provide exceptional patient care has evolved into a technological revolution. We have spent the last 20 years on the frontlines of healthcare, understanding exactly what clinics need to thrive.
            </p>
            <p className="text-white/60 text-sm md:text-base leading-relaxed mb-12">
              Medcy Tech wasn't built in a silicon valley boardroom. It was forged in waiting rooms, operation theaters, and consultation desks. We combined our deep clinical legacy with cutting-edge artificial intelligence to create the infrastructure of modern healthcare.
            </p>
            
            <div className="grid grid-cols-2 gap-6">
              {stats.map((stat, idx) => {
                const Icon = stat.icon;
                return (
                  <div key={idx} className="flex flex-col gap-2 border-l border-white/10 pl-5">
                    <Icon className="w-5 h-5 text-[#4ABFB0]" />
                    <span className="text-3xl font-bold text-white tracking-tight">{stat.value}</span>
                    <span className="text-sm font-medium text-white/50 uppercase tracking-wider">{stat.label}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>
          
          {/* Right: Visual Experience */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="relative"
          >
            <div className="relative aspect-[4/5] rounded-[32px] overflow-hidden border border-white/10 shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-[#0f3d32] via-[#0f3d32]/20 to-transparent z-10" />
              <img 
                src="/core_digital_network.png" 
                alt="20 Years of Healthcare" 
                className="absolute inset-0 w-full h-full object-cover object-center opacity-50 mix-blend-luminosity"
              />
              
              {/* Overlay Badge */}
              <div className="absolute bottom-10 left-10 right-10 z-20 bg-white/10 backdrop-blur-md border border-white/20 p-8 rounded-2xl">
                <p className="text-white text-lg md:text-xl font-medium leading-relaxed italic" style={{ fontFamily: "'Playfair Display', serif" }}>
                  "Technology should never replace the human touch in healthcare; it should empower it. That has been our philosophy since day one."
                </p>
              </div>
            </div>
            
            {/* Floating Decorative Elements */}
            <div className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-[#4ABFB0] to-[#0f3d32] rounded-full blur-[40px] opacity-50 pointer-events-none" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-gradient-to-tr from-[#CFE8E5] to-[#4ABFB0] rounded-full blur-[50px] opacity-30 pointer-events-none" />
          </motion.div>
          
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
