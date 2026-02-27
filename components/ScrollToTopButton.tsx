
import React, { useState, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';

const ScrollToTopButton: React.FC = () => {
    const { theme } = useTheme();
    const themeClasses = getThemeClasses(theme);
    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        if (window.scrollY > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    useEffect(() => {
        window.addEventListener('scroll', toggleVisibility);
        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    return (
        <button
            type="button"
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 ${themeClasses.bg}/80 backdrop-blur-sm text-white rounded-full p-3 shadow-lg ${themeClasses.hoverBg} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 ${themeClasses.focusRing} transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
            aria-label="Scroll to top"
        >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
        </button>
    );
};

export default ScrollToTopButton;
