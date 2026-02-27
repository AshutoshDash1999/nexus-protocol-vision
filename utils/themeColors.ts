
import { Theme } from '../contexts/ThemeContext';

export const themeFocusColors: Record<Theme, { ring: string; shadow: string }> = {
    indigo: { ring: '#6366f1', shadow: 'rgba(99, 102, 241, 0.2)' },
    teal: { ring: '#14b8a6', shadow: 'rgba(20, 184, 166, 0.2)' },
    fuchsia: { ring: '#c026d3', shadow: 'rgba(192, 38, 211, 0.2)' },
    amber: { ring: '#f59e0b', shadow: 'rgba(245, 158, 11, 0.2)' },
    cyan: { ring: '#06b6d4', shadow: 'rgba(6, 182, 212, 0.2)' },
};
