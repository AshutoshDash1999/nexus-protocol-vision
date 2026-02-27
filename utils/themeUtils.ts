
import { Theme } from '../contexts/ThemeContext';

interface ThemeClassMap {
  text: string;
  bg: string;
  hoverBg: string;
  disabledBg: string;
  border: string;
  hoverBorder: string;
  focusRing: string;
  shadow: string;
  hoverShadow: string;
  shimmerVia: string;
  gradientFrom: string;
  gradientTo: string;
}

const themeClasses: Record<Theme, ThemeClassMap> = {
  indigo: {
    text: 'text-indigo-400',
    bg: 'bg-indigo-600',
    hoverBg: 'hover:bg-indigo-500',
    disabledBg: 'bg-indigo-800',
    border: 'border-indigo-400',
    hoverBorder: 'hover:border-indigo-500/50',
    focusRing: 'focus:ring-indigo-500',
    shadow: 'shadow-indigo-500/20',
    hoverShadow: 'hover:shadow-indigo-500/10',
    shimmerVia: 'via-indigo-600/30',
    gradientFrom: 'from-indigo-400',
    gradientTo: 'to-fuchsia-500',
  },
  teal: {
    text: 'text-teal-400',
    bg: 'bg-teal-600',
    hoverBg: 'hover:bg-teal-500',
    disabledBg: 'bg-teal-800',
    border: 'border-teal-400',
    hoverBorder: 'hover:border-teal-500/50',
    focusRing: 'focus:ring-teal-500',
    shadow: 'shadow-teal-500/20',
    hoverShadow: 'hover:shadow-teal-500/10',
    shimmerVia: 'via-teal-600/30',
    gradientFrom: 'from-teal-400',
    gradientTo: 'to-cyan-500',
  },
  fuchsia: {
    text: 'text-fuchsia-400',
    bg: 'bg-fuchsia-600',
    hoverBg: 'hover:bg-fuchsia-500',
    disabledBg: 'bg-fuchsia-800',
    border: 'border-fuchsia-400',
    hoverBorder: 'hover:border-fuchsia-500/50',
    focusRing: 'focus:ring-fuchsia-500',
    shadow: 'shadow-fuchsia-500/20',
    hoverShadow: 'hover:shadow-fuchsia-500/10',
    shimmerVia: 'via-fuchsia-600/30',
    gradientFrom: 'from-fuchsia-400',
    gradientTo: 'to-rose-500',
  },
  amber: {
    text: 'text-amber-400',
    bg: 'bg-amber-600',
    hoverBg: 'hover:bg-amber-500',
    disabledBg: 'bg-amber-800',
    border: 'border-amber-400',
    hoverBorder: 'hover:border-amber-500/50',
    focusRing: 'focus:ring-amber-500',
    shadow: 'shadow-amber-500/20',
    hoverShadow: 'hover:shadow-amber-500/10',
    shimmerVia: 'via-amber-600/30',
    gradientFrom: 'from-amber-400',
    gradientTo: 'to-orange-500',
  },
  cyan: {
    text: 'text-cyan-400',
    bg: 'bg-cyan-600',
    hoverBg: 'hover:bg-cyan-500',
    disabledBg: 'bg-cyan-800',
    border: 'border-cyan-400',
    hoverBorder: 'hover:border-cyan-500/50',
    focusRing: 'focus:ring-cyan-500',
    shadow: 'shadow-cyan-500/20',
    hoverShadow: 'hover:shadow-cyan-500/10',
    shimmerVia: 'via-cyan-600/30',
    gradientFrom: 'from-cyan-400',
    gradientTo: 'to-sky-500',
  },
};

export const getThemeClasses = (theme: Theme): ThemeClassMap => {
  return themeClasses[theme];
};
