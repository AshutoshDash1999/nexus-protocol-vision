
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { WhitepaperIcon, CodeIcon, CommunityIcon, XCircleIcon } from './icons';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';
import ProjectDetailsModal from './ProjectDetailsModal';
import { useRealTimeMetrics } from '../contexts/RealTimeContext';

export type ActionType = 'whitepaper' | 'code' | 'community' | null;

const actions = [
  {
    id: 'whitepaper' as ActionType,
    icon: <WhitepaperIcon />,
    title: 'Read the Whitepaper',
    description: 'Explore the in-depth technical and philosophical framework behind the protocol.',
  },
  {
    id: 'code' as ActionType,
    icon: <CodeIcon />,
    title: 'Explore the Code',
    description: 'Visit the open-source repository to see the building blocks and contribute to the vision.',
  },
  {
    id: 'community' as ActionType,
    icon: <CommunityIcon />,
    title: 'Join the Community',
    description: 'Engage with developers and thinkers who are shaping the future of decentralized AI.',
  },
];

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

const DiveDeeper: React.FC = () => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);
  const { metrics } = useRealTimeMetrics();
  const [activeAction, setActiveAction] = useState<ActionType>(null);

  return (
    <div>
      <h2 className="text-3xl font-bold text-white mb-4 text-center">Dive Deeper</h2>
      <p className="text-gray-400 mb-6 max-w-2xl mx-auto text-center">
        The Nexus Protocol is an open-source thought experiment. Explore the concepts further and see how you can get involved.
      </p>
      <div className="flex items-center justify-center gap-4 mb-10">
        <span className="text-xs text-gray-400">Live users: <span className="text-white font-semibold">{metrics.activeUsers}</span></span>
        <span className="text-xs text-gray-400">Latency: <span className="text-white font-semibold">{metrics.latencyMs}ms</span></span>
        <span className="text-xs text-gray-400">Energy savings: <span className="text-white font-semibold">{metrics.energySavingsPercent}%</span></span>
      </div>
      
      <motion.div 
        className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
        variants={gridContainerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {actions.map((action) => {
          const themedIcon = React.isValidElement(action.icon) ? React.cloneElement(action.icon as React.ReactElement<{ className: string }>, {
            className: `w-10 h-10 text-gray-400 group-hover:${themeClasses.text} transition-colors duration-300`,
          }) : null;
          
          return (
            <motion.div 
              key={action.id} 
              variants={gridItemVariants}
              whileHover={{ scale: 1.03, y: -5 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <button
                onClick={() => setActiveAction(action.id)}
                className={`w-full group bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl p-6 text-center transition-all duration-300 ${themeClasses.hoverBorder} hover:shadow-2xl ${themeClasses.hoverShadow} h-full flex flex-col items-center justify-center cursor-pointer relative overflow-hidden`}
              >
                {/* Visual indicator for active selection like in user image */}
                {activeAction === action.id && (
                    <div className={`absolute inset-0 border-2 ${themeClasses.border} pointer-events-none rounded-xl`}></div>
                )}
                
                <div className="flex justify-center mb-4">
                  {themedIcon}
                </div>
                <h3 className={`text-xl font-bold text-white mb-2 group-hover:${themeClasses.text} transition-colors`}>
                  {action.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">{action.description}</p>
                
                <div className={`mt-6 text-[10px] font-bold uppercase tracking-[0.2em] ${themeClasses.text} opacity-0 group-hover:opacity-100 transition-opacity`}>
                   Initialize View
                </div>
              </button>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Detail Modal Component */}
      <ProjectDetailsModal 
        type={activeAction} 
        onClose={() => setActiveAction(null)} 
      />
    </div>
  );
};

export default DiveDeeper;
