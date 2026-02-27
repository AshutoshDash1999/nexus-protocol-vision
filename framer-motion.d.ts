import * as React from 'react';

// This file provides an ambient module declaration for framer-motion to resolve 
// "is not a module" errors caused by the local .d.ts shadowing the package.
// FIX: Moved import * as React from 'react' to the top level outside of declare module.
declare module 'framer-motion' {
  export const motion: any;
  export const AnimatePresence: React.ComponentType<{
    children?: React.ReactNode;
    mode?: 'wait' | 'popLayout' | 'sync';
    initial?: any;
    animate?: any;
    exit?: any;
    transition?: any;
    onExitComplete?: () => void;
  }>;
  export type Variants = any;
}

export {};