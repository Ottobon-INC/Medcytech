import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const navLinks = ["Our Brands", "Challenges", "Our Services", "Pricing Plans", "Business Proposition", "Founders"];
const getNavPath = (link: string) => {
  if (link === "Our Brands") return "/#our-brands";
  if (link === "Challenges") return "/#challenges";
  if (link === "Our Services") return "/#services";
  if (link === "Pricing Plans") return "/#pricing";
  if (link === "Business Proposition") return "/#business-proposition";
  if (link === "Founders") return "/#our-founders";
  return "/";
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 80);

      const sections = navLinks.map(link => getNavPath(link).substring(2)).filter(Boolean);
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150) {
            current = section;
          }
        }
      }
      setActiveSection(current);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e: React.MouseEvent, link: string) => {
    const path = getNavPath(link);
    if (path.startsWith("/#")) {
      const id = path.substring(2);
      if (location.pathname === "/") {
        e.preventDefault();
        const element = document.getElementById(id);
        if (element) {
          const navbarOffset = 100;
          const elementPosition = element.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.scrollY - navbarOffset;
          
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
          setActiveSection(id);
        }
      }
    }
  };

  return (
    <>
      {/* Top mask to hide scrolling text in the gap above the navbar */}
      <div className="fixed top-0 left-0 right-0 h-[24px] bg-background z-[45] pointer-events-none" />

      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
        className="fixed left-0 right-0 z-50 flex justify-center w-full pointer-events-none"
        style={{ top: "20px" }}
      >
        <motion.nav
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          initial={false}
          animate={{
            width: isScrolled && !isHovered ? "min(750px, 90vw)" : "min(1200px, 95vw)",
            maxWidth: "1200px",
            padding: isScrolled && !isHovered ? "8px 8px 8px 16px" : "10px 10px 10px 20px",
            backgroundColor: isScrolled ? "rgba(0, 0, 0, 0.98)" : "rgba(0, 0, 0, 0.95)",
            backdropFilter: isScrolled ? "blur(30px)" : "blur(15px)",
            boxShadow: isScrolled ? "0 10px 50px rgba(0, 0, 0, 0.5)" : "0 4px 30px rgba(0, 0, 0, 0.3)",
            border: isScrolled ? "1px solid rgba(255, 255, 255, 0.25)" : "1px solid rgba(255, 255, 255, 0.2)",
          }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center justify-between rounded-[50px] pointer-events-auto shadow-sm"
        >
          {/* Left: Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <motion.div
              animate={{ scale: (!isScrolled || isHovered) ? 1 : 0.9 }}
              transition={{ duration: 0.4 }}
              className="flex items-center justify-center p-1"
            >
              <img src="/.png/Group 97.png" alt="Medcy Logo" className="h-12 w-auto object-contain" />
            </motion.div>
          </div>

          {/* Center: Links (Desktop) */}
          <AnimatePresence>
            {(!isScrolled || isHovered) && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9, pointerEvents: "none" }}
                transition={{ duration: 0.2 }}
                className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 gap-[28px] pointer-events-auto"
              >
                {navLinks.map(link => {
                  const path = getNavPath(link);
                  const sectionId = path.substring(2);
                  const isActive = activeSection === sectionId || location.pathname === path || location.hash === path.substring(1);
                  return (
                    <Link 
                      key={link} 
                      to={path} 
                      onClick={(e) => handleNavClick(e, link)}
                      className={`relative font-semibold text-sm transition-colors group pointer-events-auto tracking-wide whitespace-nowrap ${
                        isActive ? 'text-[#4ABFB0]' : 'text-white hover:text-[#4ABFB0]'
                      }`}
                    >
                      {link}
                      <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#4ABFB0] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                    </Link>
                  );
                })}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Right Area: CTA & Hamburger */}
          <div className="flex items-center gap-2">
            <motion.button
              whileHover={{
                scale: 1.03,
                boxShadow: "0 25px 50px rgba(15, 61, 50, 0.45)",
                backgroundColor: "#08241e"
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/contact')}
              transition={{ duration: 0.4 }}
              className="group hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0f3d32] text-white text-sm font-semibold transition-all shadow-[0_15px_30px_rgba(15, 61, 50, 0.35)] whitespace-nowrap"
            >
              Partner with us? <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </motion.button>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-full hover:bg-white/10 transition-colors text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </motion.nav>
      </motion.div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[40] bg-black pt-32 px-6 md:px-10 lg:hidden"
          >
            <div className="flex flex-col gap-8">
              {navLinks.map((link, i) => {
                const path = getNavPath(link);
                const sectionId = path.substring(2);
                const isActive = activeSection === sectionId || location.pathname === path || location.hash === path.substring(1);
                return (
                  <motion.div
                    key={link}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={path}
                      onClick={(e) => {
                        handleNavClick(e, link);
                        setIsMobileMenuOpen(false);
                      }}
                      className={`text-3xl sm:text-4xl font-light transition-colors whitespace-normal ${
                        isActive ? 'text-[#4ABFB0]' : 'text-white hover:text-[#4ABFB0]'
                      }`}
                      style={{ fontFamily: "'Playfair Display', serif" }}
                    >
                      {link}
                    </Link>
                  </motion.div>
                );
              })}
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                onClick={() => {
                  navigate('/contact');
                  setIsMobileMenuOpen(false);
                }}
                className="mt-8 flex items-center justify-between p-6 rounded-3xl bg-[#0f3d32] text-white text-xl font-medium group"
              >
                Partner with us?
                <ArrowRight className="w-6 h-6 transition-transform group-hover:translate-x-2" />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
