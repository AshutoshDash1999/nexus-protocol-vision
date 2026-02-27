
import React from 'react';
import { FeatureData } from '../types';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';

interface FeatureCardProps extends FeatureData {}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, details }) => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);

  // Clone the icon to inject the theme-specific class, ensuring it's a valid ReactElement first.
  // FIX: Cast the icon to specify it can accept a className prop, resolving the TypeScript error.
  const themedIcon = React.isValidElement(icon) ? React.cloneElement(icon as React.ReactElement<{ className: string }>, {
    className: `w-12 h-12 ${themeClasses.text}`,
  }) : null;

  return (
    <div 
      className={`bg-gray-800/50 backdrop-blur-md border border-gray-700 rounded-xl p-6 transition-all duration-300 ${themeClasses.hoverBorder} hover:shadow-2xl ${themeClasses.hoverShadow} hover:-translate-y-1 h-full`}
    >
      <div className="flex flex-col h-full">
        <div className="mb-4">
          {themedIcon}
        </div>
        <h3 className="text-xl font-bold text-white mb-2">{title}</h3>
        <p className="text-gray-400 mb-4 flex-grow">{description}</p>
        <ul className="space-y-2 text-sm">
          {details.map((detail, idx) => (
            <li key={idx} className="flex items-center">
              <svg className={`w-4 h-4 mr-2 ${themeClasses.text} flex-shrink-0`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4" />
              </svg>
              <span className="text-gray-300">{detail}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default FeatureCard;