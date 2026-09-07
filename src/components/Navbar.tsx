import { useState, useEffect } from 'react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate, Link, useLocation } from 'react-router-dom';

const navLinks = ["Offerings", "Our Brands", "Pricing"];
const getNavPath = (link: string) => {
  if (link === "Offerings") return "/#core-solutions";
  if (link === "Pricing") return "/#pricing";
  if (link === "Our Brands") return "/#our-brands";
  return "/";
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

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
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className={`fixed left-0 right-0 top-0 z-50 flex justify-center w-full transition-all duration-300 ${
          isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="w-full max-w-7xl px-6 flex items-center justify-between">
          
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => navigate('/')}>
            <img 
              src="/.png/Group 97.png" 
              alt="Medcy Logo" 
              className="h-10 md:h-12 w-auto object-contain transition-all duration-300" 
            />
          </div>

          {/* Center: Links (Desktop) */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => {
              const path = getNavPath(link);
              const sectionId = path.substring(2);
              const isActive = activeSection ? activeSection === sectionId : (location.pathname === path || location.hash === path.substring(1));
              return (
                <Link 
                  key={link} 
                  to={path} 
                  onClick={(e) => handleNavClick(e, link)}
                  className={`relative font-medium text-sm transition-colors group tracking-wide ${
                    isScrolled 
                      ? (isActive ? 'text-[#4ABFB0]' : 'text-gray-800 hover:text-[#4ABFB0]')
                      : (isActive ? 'text-white' : 'text-white/80 hover:text-white')
                  }`}
                >
                  {link}
                  <span className={`absolute -bottom-1 left-0 h-[2px] transition-all duration-300 bg-[#4ABFB0] ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}></span>
                </Link>
              );
            })}
          </div>

          {/* Right Area: Buttons & Hamburger */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-4">
              <button
                className={`px-6 py-2 rounded-full border text-sm font-medium transition-colors whitespace-nowrap ${
                  isScrolled 
                    ? 'border-gray-300 text-gray-800 hover:bg-gray-50' 
                    : 'border-white/50 text-white hover:bg-white/10'
                }`}
              >
                Login
              </button>
              <button
                onClick={() => navigate('/contact')}
                className={`px-6 py-2 rounded-full text-sm font-medium transition-colors shadow-md whitespace-nowrap ${
                  isScrolled
                    ? 'bg-[#4ABFB0] text-white hover:bg-[#3ca496]'
                    : 'bg-[#4ABFB0] text-white hover:bg-[#3ca496]'
                }`}
              >
                Get Started
              </button>
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-full transition-colors ${
                isScrolled ? 'hover:bg-black/5 text-gray-800' : 'hover:bg-white/10 text-white'
              }`}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[40] bg-white pt-24 px-6 lg:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link, i) => {
                const path = getNavPath(link);
                const sectionId = path.substring(2);
                const isActive = activeSection ? activeSection === sectionId : (location.pathname === path || location.hash === path.substring(1));
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
                      className={`text-2xl font-medium transition-colors ${
                        isActive ? 'text-[#0f3d32]' : 'text-gray-800 hover:text-[#0f3d32]'
                      }`}
                    >
                      {link}
                    </Link>
                  </motion.div>
                );
              })}
              
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="flex flex-col gap-4 mt-8"
              >
                <button
                  className="w-full px-6 py-3 rounded-xl border border-gray-300 text-gray-800 text-lg font-medium hover:bg-gray-50 transition-colors"
                >
                  Login
                </button>
                <button
                  onClick={() => {
                    navigate('/contact');
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-between px-6 py-3 rounded-xl bg-[#1a1a1a] text-white text-lg font-medium group"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
                </button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
