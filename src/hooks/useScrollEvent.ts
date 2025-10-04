import { useEffect } from 'react';

export function useScrollEvent(onScroll: () => void) {
  useEffect(() => {
    window.addEventListener(`scroll`, onScroll, {
      passive: false,
    } as AddEventListenerOptions);
    return () => {
      window.removeEventListener(`scroll`, onScroll, {
        passive: false,
      } as AddEventListenerOptions);
    };
  }, [onScroll]);
}
