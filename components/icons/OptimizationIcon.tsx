
import React from 'react';

const OptimizationIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg {...props} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.5 14.5c.2-.3.4-.6.6-1m2.8 2.8c.2-.3.4-.6.6-1M12 18c.2-.3.4-.6.6-1" />
  </svg>
);

export default OptimizationIcon;
