import { motion } from 'framer-motion';

const partners = [
  { 
    id: "medcy-hospitals", 
    imageUrl: "/partners/medcy_hospitals_nobg.png",
    alt: "Medcy Hospitals Logo",
    sizeClass: "h-[50px] md:h-[80px] w-auto"
  },
  { 
    id: "vizag-ivf", 
    imageUrl: "/partners/vizagivf_logo_nobg.png",
    alt: "Vizag IVF Centre Logo",
    sizeClass: "h-[55px] md:h-[90px] w-auto"
  },
  { 
    id: "medcy-ivf", 
    imageUrl: "/partners/medcy_ivf_nobg.png",
    alt: "Medcy IVF Logo",
    sizeClass: "h-[50px] md:h-[80px] w-auto"
  },
  { 
    id: "orca", 
    imageUrl: "/partners/orca_logo.png",
    alt: "ORCA Logo",
    sizeClass: "h-[70px] md:h-[110px] w-auto scale-[1.3] translate-y-2",
    blend: true
  },
  { 
    id: "sri-venkateswara", 
    imageUrl: "/partners/sri_venkateswara_logo.png",
    alt: "Sri Venkateswara Hospital Logo",
    sizeClass: "h-[65px] md:h-[105px] w-auto scale-[1.2]",
    blend: true
  },
];

const Partners = () => {
  return (
    <section id="partners" className="pt-20 pb-8 md:pt-28 md:pb-12 bg-[#CFE8E5] overflow-hidden relative">

      {/* Subtle radial background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-brand-emerald/5 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-6xl mx-auto px-6 relative">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-widest uppercase text-[#0f3d32]/60 mb-5 bg-[#0f3d32]/5 border border-[#0f3d32]/10 px-4 py-1.5 rounded-full">
            Trusted By
          </span>
          <h2
            className="text-4xl md:text-5xl font-medium mb-5 text-[#0f3d32] tracking-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Our Partners
          </h2>
          <p className="text-[#0f3d32]/80 max-w-xl mx-auto font-medium leading-relaxed text-sm md:text-base">
            Collaborating with leading clinics and healthcare organizations to build a unified ecosystem that elevates patient care.
          </p>
        </motion.div>

        {/* Partner Logos - Direct on green background, scale up on touch/hover */}
        <div className="grid grid-cols-5 gap-3 md:gap-10 items-center justify-items-center w-full">
          {partners.map((partner, index) => (
            <motion.div
              key={partner.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.12, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ scale: 1.12, y: -4 }}
              whileTap={{ scale: 1.12 }}
              className={`w-full flex items-center justify-center cursor-pointer ${partner.blend ? 'mix-blend-multiply' : ''}`}
            >
              <img
                src={partner.imageUrl}
                alt={partner.alt}
                className={`${partner.sizeClass} object-contain transition-transform duration-300 ${partner.blend ? '' : 'drop-shadow-sm hover:drop-shadow-md'}`}
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default Partners;

