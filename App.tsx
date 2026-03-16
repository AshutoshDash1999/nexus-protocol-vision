import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// Contexts
import { ThemeProvider } from './contexts/ThemeContext';
import { ToastProvider } from './contexts/ToastContext';
import { GraphComplexityProvider } from './contexts/GraphComplexityContext';
import { ErrorStateProvider } from './contexts/ErrorStateContext';
import { DiagnosticLogProvider } from './contexts/DiagnosticLogContext';
import { RealTimeProvider } from './contexts/RealTimeContext';
import ErrorBoundary from './components/ErrorBoundary';

// Pages
import HomePage from './pages/HomePage';
import SovereignPersonaPage from './pages/SovereignPersonaPage';
import CognitiveGraphPage from './pages/CognitiveGraphPage';
import PrivacyNegotiatorPage from './pages/PrivacyNegotiatorPage';
import CarbonAwarePage from './pages/CarbonAwarePage';

// Navigation Menu Component
const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const menuItems = [
    { name: 'Home', path: '/' },
    { name: 'Sovereign Persona', path: '/sovereign-persona' },
    { name: 'Cognitive Graph', path: '/cognitive-graph' },
    { name: 'Privacy Negotiator', path: '/privacy-negotiator' },
    { name: 'Carbon Aware', path: '/carbon-aware' },
  ];

  return (
    <nav className="bg-gray-900 border-b border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg group-hover:shadow-lg transition-all" />
            <span className="text-white font-bold text-lg hidden sm:inline">Nexus Protocol</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-1">
            {menuItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className="text-gray-300 hover:text-white px-3 py-2 text-sm font-medium rounded-md hover:bg-gray-700 transition-colors"
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-gray-300 hover:text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gray-800 space-y-1 pb-3"
            >
              {menuItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className="text-gray-300 hover:text-white block px-3 py-2 text-base font-medium rounded-md hover:bg-gray-700 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

// Main App Component
const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ToastProvider>
          <GraphComplexityProvider>
            <ErrorStateProvider>
              <DiagnosticLogProvider>
                <RealTimeProvider>
                  <ErrorBoundary>
                    <Navigation />
                    <Routes>
                      <Route path="/" element={<HomePage />} />
                      <Route path="/sovereign-persona" element={<SovereignPersonaPage />} />
                      <Route path="/cognitive-graph" element={<CognitiveGraphPage />} />
                      <Route path="/privacy-negotiator" element={<PrivacyNegotiatorPage />} />
                      <Route path="/carbon-aware" element={<CarbonAwarePage />} />
                    </Routes>
                  </ErrorBoundary>
                </RealTimeProvider>
              </DiagnosticLogProvider>
            </ErrorStateProvider>
          </GraphComplexityProvider>
        </ToastProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
};

export default App;
