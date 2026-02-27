
/**
 * A generic throttle function to limit the execution rate of a function.
 * It ensures that the function is called at most once in a specified time limit.
 * @param func The function to throttle.
 * @param waitFor The time in milliseconds to wait before allowing the next execution.
 */
export const throttle = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
    let inThrottle = false;
  
    return (...args: Parameters<F>): void => {
      if (!inThrottle) {
        func(...args);
        inThrottle = true;
        setTimeout(() => {
          inThrottle = false;
        }, waitFor);
      }
    };
  };
