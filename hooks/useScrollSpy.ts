
import { useState, useEffect, useCallback } from 'react';
import { throttle } from '../utils/throttle';

export const useScrollSpy = (
  ids: string[],
  options: { offset?: number } = {}
): string | null => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const { offset = 0 } = options;

  const handleScroll = useCallback(() => {
    const scrollPosition = window.scrollY + offset;
    
    let currentActiveId: string | null = null;

    for (const id of ids) {
      const element = document.getElementById(id);
      if (element) {
        if (element.offsetTop <= scrollPosition) {
          currentActiveId = id;
        } else {
          break;
        }
      }
    }
    setActiveId(currentActiveId);
  }, [ids, offset]);

  useEffect(() => {
    const throttledScrollHandler = throttle(handleScroll, 100);
    
    window.addEventListener('scroll', throttledScrollHandler);
    handleScroll(); // Call on mount to set initial state

    return () => {
      // The throttle function creates a closure, so we can't remove the exact listener instance directly
      // without more complexity. For this app, since the hook is mounted once, this is acceptable.
      // In a more complex app, the throttle utility would need to return a way to cancel pending calls.
      window.removeEventListener('scroll', throttledScrollHandler);
    };
  }, [handleScroll]);

  return activeId;
};
