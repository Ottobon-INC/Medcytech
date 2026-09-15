import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronUp } from 'lucide-react';

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > 250) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        toggleVisibility();
        
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.button
                    initial={{ opacity: 0, scale: 0.5, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.5, y: 20 }}
                    whileHover={{ scale: 1.1, backgroundColor: "#144e40" }}
                    whileTap={{ scale: 0.9 }}
                    onClick={scrollToTop}
                    className="fixed bottom-8 right-8 z-[90] w-12 h-12 rounded-full bg-[#0f3d32] text-white shadow-[0_10px_30px_rgba(0,0,0,0.3)] border border-white/20 flex items-center justify-center cursor-pointer transition-all duration-300 group"
                    aria-label="Back to top"
                >
                    <ChevronUp className="w-6 h-6 transition-transform duration-300 group-hover:-translate-y-1" />
                </motion.button>
            )}
        </AnimatePresence>
    );
};

export default BackToTop;
