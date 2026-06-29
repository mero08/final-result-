import { useEffect, useRef } from 'react';

const DESKTOP_BREAKPOINT = 1200;

export function useCinematicFullscreen() {
  const hasAttempted = useRef(false);

  useEffect(() => {
    const isDesktop = window.innerWidth >= DESKTOP_BREAKPOINT;
    if (!isDesktop) return;
    if (hasAttempted.current) return;
    hasAttempted.current = true;

    const attempt = async () => {
      try {
        await document.documentElement.requestFullscreen();
        document.documentElement.classList.add('cinematic-fullscreen');
      } catch {
        /* fullscreen blocked — site behaves normally, no classes added */
      }
    };

    const timer = setTimeout(attempt, 200);

    const onChange = () => {
      if (document.fullscreenElement) {
        document.documentElement.classList.add('cinematic-fullscreen');
      } else {
        document.documentElement.classList.remove('cinematic-fullscreen');
      }
    };

    document.addEventListener('fullscreenchange', onChange);
    document.addEventListener('webkitfullscreenchange', onChange);
    document.addEventListener('mozfullscreenchange', onChange);
    document.addEventListener('MSFullscreenChange', onChange);

    return () => {
      clearTimeout(timer);
      document.removeEventListener('fullscreenchange', onChange);
      document.removeEventListener('webkitfullscreenchange', onChange);
      document.removeEventListener('mozfullscreenchange', onChange);
      document.removeEventListener('MSFullscreenChange', onChange);
    };
  }, []);
}
