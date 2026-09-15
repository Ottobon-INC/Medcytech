import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { markIntroComplete } from '../utils/introSync';

const navLinks = ["Partners", "Offerings", "Pricing", "About Us"];
const getNavPath = (link: string) => {
  if (link === "Partners") return "/#partners";
  if (link === "Offerings") return "/#core-solutions";
  if (link === "Pricing") return "/#pricing";
  if (link === "About Us") return "/#our-founders";
  return "/";
};

// Helper to check if intro process should run (ONLY on page reload or initial fresh visit)
const checkShouldRunIntro = () => {
  if (typeof window === 'undefined') return false;
  
  // Check if current page load is a browser reload (F5 / Refresh button)
  const navEntries = performance.getEntriesByType?.('navigation') as PerformanceNavigationTiming[];
  const isReload = navEntries && navEntries.length > 0 
    ? navEntries[0].type === 'reload'
    : (performance as any).navigation?.type === 1;

  if (isReload) {
    return true;
  }

  // Check if this is the first initial load in this browser session
  const hasVisited = sessionStorage.getItem('medcy_has_visited');
  if (!hasVisited) {
    sessionStorage.setItem('medcy_has_visited', 'true');
    return true;
  }

  return false;
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [isHovered, setIsHovered] = useState(false);
  const [runIntro] = useState(() => checkShouldRunIntro());
  const navigate = useNavigate();
  const location = useLocation();

  // Fire markIntroComplete when intro finishes (or immediately if intro is skipped)
  useEffect(() => {
    if (!runIntro) {
      markIntroComplete();
      return;
    }
    const t = setTimeout(() => {
      markIntroComplete();
    }, 1450);
    return () => clearTimeout(t);
  }, [runIntro]);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 80;
      setIsScrolled(scrolled);

      if (window.scrollY < 250) { setActiveSection(""); return; }
      const sections = navLinks.map(link => getNavPath(link).substring(2)).filter(Boolean);
      let current = "";
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.getBoundingClientRect().top <= 200) current = section;
      }
      setActiveSection(current);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);



  const handleNavClick = (e: React.MouseEvent, link: string, closeMenu?: () => void) => {
    const path = getNavPath(link);
    if (path.startsWith("/#") && location.pathname === "/") {
      e.preventDefault();
      const id = path.substring(2);
      const element = document.getElementById(id);
      if (element) {
        window.scrollTo({ top: element.getBoundingClientRect().top + window.scrollY - 20, behavior: 'smooth' });
        setActiveSection(id);
      }
    }
    closeMenu?.();
  };

  const isCompact = isScrolled && !isHovered;

  return (
    <>
      {/* ─── FULL CENTERED NAV (ALWAYS VISIBLE) ─── */}
      <motion.div
        key="full-nav"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.45, ease: "easeOut" }}
        className="fixed left-0 right-0 z-50 flex justify-center w-full pointer-events-none"
        style={{ top: "20px" }}
      >
        {/*
          KEY SMOOTHNESS FIX:
          - No React state changes during the animation.
          - `initial` drives the start state, `animate` drives the end state.
          - framer-motion handles all interpolation internally (rAF-based, no re-renders).
          - `will-change: width` tells the browser to prepare a composited layer.
        */}
        <motion.nav
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onTouchStart={() => setIsHovered(true)}
          // Skip intro initial state if already played
          initial={runIntro ? { width: "220px" } : false}
          animate={{
            width: isCompact ? "min(520px, 95vw)" : "min(850px, 95vw)",
            padding: "10px 10px 10px 20px",
            backgroundColor: "rgba(0,0,0,0.95)",
            backdropFilter: "blur(15px)",
            boxShadow: "0 4px 30px rgba(0,0,0,0.3)",
            border: "1px solid rgba(255,255,255,0.2)",
          }}
          transition={{
            width: {
              duration: 0.5,
              delay: runIntro && !isScrolled ? 0.5 : 0,
              ease: [0.16, 1, 0.3, 1],
            },
            default: { duration: 0.4, ease: [0.16, 1, 0.3, 1] },
          }}
          style={{ willChange: 'width' }}
          className="flex items-center justify-between rounded-[50px] pointer-events-auto shadow-sm overflow-hidden"
        >
          {/* Logo — always visible */}
          <div
            className="flex items-center gap-3 cursor-pointer shrink-0"
            onClick={() => navigate('/')}
          >
            <div className="flex items-center justify-center p-1">
              <img src="/.png/Group 97.png" alt="Medcy Logo" className="h-12 w-auto object-contain" />
            </div>
          </div>

          {/* Center links — fade in after expansion, no state change */}
          <motion.div
            initial={runIntro ? { opacity: 0 } : false}
            animate={{ 
              opacity: isCompact ? 0 : 1,
              scale: isCompact ? 0.95 : 1
            }}
            transition={{ duration: 0.3, delay: (runIntro && !isScrolled && !isCompact) ? 1.45 : 0, ease: 'easeOut' }}
            className={`hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 gap-[28px] ${isCompact ? 'pointer-events-none' : 'pointer-events-auto'}`}
          >
            {navLinks.map(link => {
              const path = getNavPath(link);
              const sectionId = path.substring(2);
              const isActive = Boolean(activeSection) && activeSection === sectionId;
              return (
                <Link
                  key={link}
                  to={path}
                  onClick={(e) => handleNavClick(e, link)}
                  className={`relative font-semibold text-sm transition-colors group tracking-wide whitespace-nowrap ${
                    isActive ? 'text-[#4ABFB0]' : 'text-white hover:text-[#4ABFB0]'
                  }`}
                >
                  {link}
                  <span className={`absolute -bottom-1 left-0 h-[2px] bg-[#4ABFB0] transition-all duration-300 ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`} />
                </Link>
              );
            })}
          </motion.div>

          {/* Right: CTA + hamburger — fade in after expansion, no state change */}
          <motion.div
            initial={runIntro ? { opacity: 0 } : false}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: runIntro ? 1.55 : 0, ease: 'easeOut' }}
            className="flex items-center gap-2 shrink-0"
          >
            <motion.button
              whileHover={{ scale: 1.03, boxShadow: "0 25px 50px rgba(15,61,50,0.45)", backgroundColor: "#08241e" }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate('/contact')}
              className="group hidden sm:flex items-center gap-2 px-6 py-2.5 rounded-full bg-[#0f3d32] text-white text-sm font-semibold transition-all shadow-[0_15px_30px_rgba(15,61,50,0.35)] whitespace-nowrap"
            >
              Partner with us? <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1.5" />
            </motion.button>

            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-3 rounded-full hover:bg-white/10 transition-colors text-white"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </motion.div>
        </motion.nav>
      </motion.div>

      {/* ─── Mobile Menu ─── */}
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
                const isActive = Boolean(activeSection) && activeSection === sectionId;
                return (
                  <motion.div
                    key={link}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                  >
                    <Link
                      to={path}
                      onClick={(e) => { handleNavClick(e, link); setIsMobileMenuOpen(false); }}
                      className={`text-3xl sm:text-4xl font-light transition-colors ${
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
                onClick={() => { navigate('/contact'); setIsMobileMenuOpen(false); }}
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
