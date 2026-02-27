
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FEATURES } from './constants';
import Header from './components/Header';
import Hero from './components/Hero';
import FeatureCard from './components/FeatureCard';
import AskNexus from './components/AskNexus';
import VisualizeConcept from './components/VisualizeConcept';
import DynamicOptimizationGraph from './components/DynamicOptimizationGraph';
import ScenarioGenerator from './components/ScenarioGenerator';
import ConcludingVision from './components/ConcludingVision';
import DiveDeeper from './components/DiveDeeper';
import AnimatedSection from './components/AnimatedSection';
import ScrollToTopButton from './components/ScrollToTopButton';
import Preloader from './components/Preloader';
import FloatingNav from './components/FloatingNav';
import ConfirmationModal from './components/ConfirmationModal';
import { useToast } from './contexts/ToastContext';
import GlobalReset from './components/GlobalReset';
import { useErrorState } from './contexts/ErrorStateContext';
import ProtocolDiagnostics from './components/ProtocolDiagnostics';
import NexusReport from './components/NexusReport';
import RealTimeSovereignPersona from './components/RealTimeSovereignPersona';
import RealTimeSystemMetrics from './components/RealTimeSystemMetrics';
import RealTimeCognitiveGraph from './components/RealTimeCognitiveGraph';
import RealTimePrivacyNegotiator from './components/RealTimePrivacyNegotiator';
import RealTimeCarbonAware from './components/RealTimeCarbonAware';

const gridContainerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const gridItemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.5, ease: 'easeOut' },
  },
};

const navItems = [
    { name: 'Explore', link: '#explore' },
    { name: 'Concepts', link: '#concepts' },
    { name: 'Real-Time', link: '#realtime' },
    { name: 'Diagnostics', link: '#diagnostics' },
    { name: 'Visualize', link: '#visualize' },
    { name: 'Scenarios', link: '#scenarios' },
    { name: 'Report', link: '#report' },
];

const sectionIds = navItems.map(item => item.link.substring(1));


const App: React.FC = () => {
  const [isAppLoading, setIsAppLoading] = React.useState(true);
  const [isResetModalOpen, setIsResetModalOpen] = React.useState(false);
  const { showToast } = useToast();
  const { setHasComponentError } = useErrorState();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setIsAppLoading(false);
    }, 2000); // Simulate asset loading

    return () => clearTimeout(timer);
  }, []);

  const handleRequestReset = () => {
    setIsResetModalOpen(true);
  };
  
  const handleConfirmReset = () => {
    try {
      const keysToRemove = [
          'nexus-chat-history',
          'visualize-concept',
          'visualize-prompt',
          'visualize-image-url',
          'visualize-model-config',
          'scenario-domain',
          'scenario-text',
          'scenario-model-config',
          'nexus-theme'
      ];
      keysToRemove.forEach(key => localStorage.removeItem(key));
      setHasComponentError(false);
      setIsResetModalOpen(false);
      // Brief delay to allow modal to animate out before the jarring reload
      setTimeout(() => window.location.reload(), 300);
    } catch (error) {
      console.error("Failed to reset application state:", error);
      setIsResetModalOpen(false);
      showToast("Error: Could not reset application state.");
    }
  };


  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 font-sans antialiased">
      <AnimatePresence>
        {isAppLoading && <Preloader />}
      </AnimatePresence>
      
      {!isAppLoading && (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
        >
            <div className="absolute top-0 left-0 w-full h-full bg-grid-gray-700/[0.2] [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="relative z-10">
                <Header />
                <FloatingNav navItems={navItems} sectionIds={sectionIds} />
                <main className="container mx-auto px-4 py-12 md:py-20 space-y-16 md:space-y-24">
                <AnimatedSection>
                    <Hero />
                </AnimatedSection>
                <AnimatedSection id="explore">
                    <AskNexus />
                </AnimatedSection>
                
                <AnimatedSection id="concepts">
                    <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    variants={gridContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    >
                    {FEATURES.map((feature, index) => (
                        <motion.div 
                          key={index} 
                          variants={gridItemVariants}
                          whileHover={{ scale: 1.03, y: -5 }}
                          transition={{ type: 'spring', stiffness: 300 }}
                        >
                        <FeatureCard
                            icon={feature.icon}
                            title={feature.title}
                            description={feature.description}
                            details={feature.details}
                        />
                        </motion.div>
                    ))}
                    </motion.div>
                </AnimatedSection>

                <AnimatedSection id="realtime">
                    <div className="space-y-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-bold text-white mb-4">Real-Time Core Systems</h2>
                            <p className="text-gray-300 max-w-2xl mx-auto">
                                Experience the Nexus Protocol core systems operating in real-time with live data processing, 
                                privacy negotiations, cognitive graph updates, and carbon-aware optimization.
                            </p>
                        </div>
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <RealTimeSovereignPersona />
                            <RealTimeSystemMetrics />
                        </div>
                        
                        <RealTimeCognitiveGraph />
                        
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                            <RealTimePrivacyNegotiator />
                            <RealTimeCarbonAware />
                        </div>
                    </div>
                </AnimatedSection>

                <AnimatedSection id="diagnostics">
                    <ProtocolDiagnostics />
                </AnimatedSection>
                
                <AnimatedSection id="visualize">
                    <VisualizeConcept />
                </AnimatedSection>
                <AnimatedSection id="scenarios">
                    <ScenarioGenerator />
                </AnimatedSection>
                <AnimatedSection id="optimize">
                    <DynamicOptimizationGraph />
                </AnimatedSection>
                <AnimatedSection id="report">
                    <NexusReport />
                </AnimatedSection>
                <AnimatedSection>
                    <DiveDeeper />
                </AnimatedSection>
                <AnimatedSection>
                    <ConcludingVision />
                </AnimatedSection>
                <footer className="text-center pt-8 border-t border-gray-800 text-gray-500">
                    <p className="font-semibold">The Nexus Protocol: A Vision for Sovereign AI</p>
                    <p className="mt-2 text-sm">This project is an open-source thought experiment.</p>
                    <p className="text-xs mt-1">Designed to inspire the future of decentralized, agentic infrastructure.</p>
                     <div className="mt-4">
                        <button 
                            onClick={handleRequestReset}
                            className="text-xs text-gray-600 hover:text-rose-400 transition-colors"
                        >
                            Reset Application State
                        </button>
                    </div>
                </footer>
                </main>
                <ScrollToTopButton />
                <GlobalReset onReset={handleRequestReset} />
            </div>
            <ConfirmationModal
                isOpen={isResetModalOpen}
                onClose={() => setIsResetModalOpen(false)}
                onConfirm={handleConfirmReset}
                title="Reset Application State"
                confirmText="Confirm Reset"
            >
                Are you sure you want to reset all application data? This will permanently clear chat history, generated images, and scenarios. This action cannot be undone.
            </ConfirmationModal>
        </motion.div>
      )}
    </div>
  );
};

export default App;
