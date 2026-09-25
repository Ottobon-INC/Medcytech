import { BrowserRouter as Router, Routes, Route, useLocation, useNavigationType } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './components/Navbar';
import MedcyIvfHero from './components/ui/medcy-ivf-hero';
import ProblemsSolutions from './sections/ProblemsSolutions';
import Partners from './sections/Partners';

import CoreSolutions from './sections/CoreSolutions';
// import Challenges from './sections/Challenges';
import Offerings from './sections/Offerings';


import WhyUs from './sections/WhyUs';
import Contact from './pages/Contact';
import Preloader from './components/Preloader';

import ChallengesPage from './pages/ChallengesPage';
import OfferingsPage from './pages/OfferingsPage';
import WhyUsPage from './pages/WhyUsPage';
import SolutionDetailsPage from './pages/SolutionDetailsPage';
import AboutUsPage from './pages/AboutUsPage';


import BackToTop from './components/BackToTop';
import content from './tier3-content/content.json';
import SEO from './components/SEO';
import Footer from './components/Footer';

const HomePage = () => (
  <main>
    <SEO title="Home" description={content.hero.subtitle} />
    <MedcyIvfHero content={content.hero} />
    <ProblemsSolutions />
    <CoreSolutions content={content.coreSolutions} />
    <Partners />
    {/* <Challenges content={content.challenges} /> */}
    <Offerings />
    <WhyUs content={content.whyUs} />
    {/* <Founders content={content.founders} /> */}
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
              const navbarOffset = 20;
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
        <Route path="/about" element={<PageTransition><AboutUsPage content={content} /></PageTransition>} />
        <Route path="/about-us" element={<PageTransition><AboutUsPage content={content} /></PageTransition>} />
        <Route path="/why-us" element={<PageTransition><WhyUsPage content={content} /></PageTransition>} />
        <Route path="/solutions/:id" element={<PageTransition><SolutionDetailsPage /></PageTransition>} />
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
        <div className="min-h-screen bg-[#0f3d32] text-foreground font-sans selection:bg-[#0f3d32] selection:text-white transition-opacity duration-700 opacity-100 flex flex-col justify-between">
          <Router>
            <ScrollToTop />
            {/* Background Mesh Overlay */}
            <div className="fixed inset-0 bg-mesh pointer-events-none" />

            <Navbar />
            <BackToTop />

            <div className="flex-1 bg-[#CFE8E5]">
              <AnimatedRoutes />
            </div>

            <Footer />
          </Router>
        </div>
      )}
    </>
  );
}

export default App;
