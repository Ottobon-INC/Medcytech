import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import MedcyIvfHero from './components/ui/medcy-ivf-hero';
import Brands from './sections/Brands';
import CoreSolutions from './sections/CoreSolutions';
// import Challenges from './sections/Challenges';
import Offerings from './sections/Offerings';
import Services from './sections/Services';

import WhyUs from './sections/WhyUs';
import Founders from './sections/Founders';
import Contact from './pages/Contact';
import Preloader from './components/Preloader';

import ChallengesPage from './pages/ChallengesPage';
import OfferingsPage from './pages/OfferingsPage';
import WhyUsPage from './pages/WhyUsPage';


import BackToTop from './components/BackToTop';
import content from './tier3-content/content.json';
import SEO from './components/SEO';

const Footer = () => (
  <footer className="pt-0 pb-6 border-t border-white/5 bg-background">
    <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
      <div className="flex items-center">
        <img
          src="/.png/Group 97.png"
          alt="Medcy Logo"
          className="h-12 md:h-16 w-auto object-contain"
        />
      </div>

      <div className="flex gap-8 text-sm text-slate-500 font-medium">
        <a href="#" className="hover:text-brand-teal transition-colors">Privacy Policy</a>
        <a href="#" className="hover:text-brand-teal transition-colors">Terms of Service</a>
        <a href="#" className="hover:text-brand-teal transition-colors">Cookies</a>
      </div>

      <p className="text-sm text-slate-400">© 2026 Medcy health Tech. Built for the future of care.</p>
    </div>
  </footer>
);

const HomePage = () => (
  <main>
    <SEO title="Home" description={content.hero.subtitle} />
    <MedcyIvfHero content={content.hero} />
    <CoreSolutions content={content.coreSolutions} />
    <Services content={content.services} />
    <Brands content={content.brands} />
    {/* <Challenges content={content.challenges} /> */}
    <WhyUs content={content.whyUs} />
    <Offerings content={content.offerings} />

    <Founders content={content.founders} />
  </main>
);

const ScrollToTop = () => {
  useEffect(() => {
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
  }, []);

  return null;
};

const PageTransition = ({ children }: { children: React.ReactNode }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};

const AnimatedRoutes = () => {
  const location = useLocation();
  const navType = useNavigationType();

  return (
    <AnimatePresence 
      mode="wait" 
      onExitComplete={() => {
        if (navType === 'POP' || !window.location.hash) {
          window.scrollTo(0, 0);
        } else {
          setTimeout(() => {
            const id = window.location.hash.substring(1);
            const element = document.getElementById(id);
            if (element) {
              const navbarOffset = 100;
              const elementPosition = element.getBoundingClientRect().top;
              const offsetPosition = elementPosition + window.scrollY - navbarOffset;
              window.scrollTo({ top: offsetPosition, behavior: 'auto' });
            }
          }, 10);
        }
      }}
    >
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageTransition><HomePage /></PageTransition>} />
        <Route path="/challenges" element={<PageTransition><ChallengesPage content={content} /></PageTransition>} />
        <Route path="/offerings" element={<PageTransition><OfferingsPage content={content} /></PageTransition>} />
        <Route path="/why-us" element={<PageTransition><WhyUsPage content={content} /></PageTransition>} />

        <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
      </Routes>
    </AnimatePresence>
  );
};

const App = () => {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {loading && <Preloader onComplete={() => setLoading(false)} />}
      {!loading && (
        <div className="min-h-screen bg-background text-foreground font-sans selection:bg-[#0f3d32] selection:text-white transition-opacity duration-700 opacity-100">
          <Router>
            <ScrollToTop />
            {/* Background Mesh Overlay */}
            <div className="fixed inset-0 bg-mesh pointer-events-none" />

            <Navbar />
            <BackToTop />

            <AnimatedRoutes />

            <Footer />
          </Router>
        </div>
      )}
    </>
  );
}

export default App;
