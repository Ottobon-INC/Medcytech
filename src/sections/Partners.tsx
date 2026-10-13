import { motion } from 'framer-motion';

const partners = [
  { 
    id: "medcy-hospitals", 
    imageUrl: "/partners/medcy_hospitals_nobg.png",
    alt: "Medcy Hospitals Logo",
    sizeClass: "h-[44px] md:h-[68px] w-auto"
  },
  { 
    id: "vizag-ivf", 
    imageUrl: "/partners/vizagivf_logo_nobg.png",
    alt: "Vizag IVF Centre Logo",
    sizeClass: "h-[46px] md:h-[72px] w-auto"
  },
  { 
    id: "medcy-ivf", 
    imageUrl: "/partners/medcy_ivf_nobg.png",
    alt: "Medcy IVF Logo",
    sizeClass: "h-[44px] md:h-[68px] w-auto"
  },
  { 
    id: "orca", 
    imageUrl: "/partners/orca_logo_nobg.png",
    alt: "ORCA Logo",
    sizeClass: "orca-client-logo h-[80px] md:h-[126px] w-auto"
  },
  { 
    id: "sri-venkateswara", 
    imageUrl: "/partners/sri_venkateswara_logo_nobg.png",
    alt: "Sri Venkateswara Hospital Logo",
    sizeClass: "h-[48px] md:h-[74px] w-auto"
  },
  { 
    id: "kavety-hospital", 
    imageUrl: "/partners/kavety_hospital_logo.png",
    alt: "Kavety Multispeciality Hospital Logo",
    sizeClass: "h-[48px] md:h-[74px] w-auto"
  },
  { 
    id: "global-physio", 
    imageUrl: "/partners/global_physio_logo.png",
    alt: "Global Physio Logo",
    sizeClass: "h-[48px] md:h-[74px] w-auto"
  },
  { 
    id: "vd-clinic", 
    imageUrl: "/partners/vd_clinic_logo.png",
    alt: "VD Clinic Logo",
    sizeClass: "h-[48px] md:h-[74px] w-auto"
  },
];

// Duplicated list to ensure track width extends beyond wide screens for a seamless loop
const duplicatedPartners = [...partners, ...partners];

const Partners = () => {
  return (
    <section id="partners" className="pt-20 pb-12 md:pt-28 md:pb-16 bg-[#CFE8E5] overflow-hidden relative">

      {/* Subtle radial background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-emerald/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative mb-12 md:mb-16">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#0f3d32]/60 mb-5 bg-[#0f3d32]/5 border border-[#0f3d32]/10 px-4 py-1.5 rounded-full">
            Trusted By
          </span>
          <h2
            className="text-4xl md:text-5xl font-medium mb-5 text-[#0f3d32] tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Clients
          </h2>
          <p className="text-[#0f3d32]/80 max-w-xl mx-auto font-medium leading-relaxed text-sm md:text-base">
            Collaborating with leading clinics and healthcare organizations to build a unified ecosystem that elevates patient care.
          </p>
        </motion.div>

      </div>

      {/* Single Horizontal Row - Smooth Infinite Leftward-Scrolling Marquee */}
      <div className="w-full overflow-hidden marquee-mask relative py-4 select-none">
        <div className="flex w-max animate-marquee-logos items-center flex-nowrap whitespace-nowrap">
          {/* Half 1 */}
          <div className="flex items-center flex-nowrap shrink-0 gap-8 md:gap-14 pr-8 md:pr-14">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`p1-${partner.id}-${index}`}
                className="flex items-center justify-center shrink-0 h-28 md:h-36 px-4 md:px-6 cursor-pointer transition-transform duration-300 hover:scale-110"
              >
                <img
                  src={partner.imageUrl}
                  alt={partner.alt}
                  className={`${partner.sizeClass} ${partner.id === 'orca' ? '' : 'max-w-[180px] md:max-w-[260px]'} object-contain drop-shadow-sm hover:drop-shadow-md transition-all duration-300`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>

          {/* Half 2 (Exact Duplicate for Seamless Infinite Loop) */}
          <div className="flex items-center flex-nowrap shrink-0 gap-8 md:gap-14 pr-8 md:pr-14" aria-hidden="true">
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`p2-${partner.id}-${index}`}
                className="flex items-center justify-center shrink-0 h-28 md:h-36 px-4 md:px-6 cursor-pointer transition-transform duration-300 hover:scale-110"
              >
                <img
                  src={partner.imageUrl}
                  alt={partner.alt}
                  className={`${partner.sizeClass} ${partner.id === 'orca' ? '' : 'max-w-[180px] md:max-w-[260px]'} object-contain drop-shadow-sm hover:drop-shadow-md transition-all duration-300`}
                  loading="lazy"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

    </section>
  );
};

export default Partners;

