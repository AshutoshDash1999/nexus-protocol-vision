
import React from 'react';
import { useTheme } from '../contexts/ThemeContext';
import { getThemeClasses } from '../utils/themeUtils';

const ConcludingVision: React.FC = () => {
  const { theme } = useTheme();
  const themeClasses = getThemeClasses(theme);

  return (
    <div className="text-center">
      <h2 className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${themeClasses.gradientFrom} ${themeClasses.gradientTo} mb-4`}>
        The Path Forward
      </h2>
      <div className="max-w-3xl mx-auto space-y-4 text-gray-400">
        <p>
          The Nexus Protocol is more than a technical blueprint; it's a philosophical stance on the future of our relationship with technology. It imagines a world where AI is not a remote, monolithic entity, but a personal, sovereign extension of human intellect and agency.
        </p>
        <p>
          By embedding principles of privacy, efficiency, and security into its very architecture, this vision paves the way for an ecosystem where technology empowers the individual, fosters trust, and enables collaboration on a global scale—all without compromising personal data or autonomy. This is the next step in human-computer interaction.
        </p>
      </div>
    </div>
  );
};

export default ConcludingVision;
