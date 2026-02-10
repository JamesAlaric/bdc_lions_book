import { useEffect, useRef } from 'preact/hooks';
import { gsap } from 'gsap';

/**
 * Dark veil page transition.
 * On route change: brief dark overlay fades in then lifts to reveal new page.
 * The new page content slides up via CSS animation on each route component.
 */
export function PageTransition() {
  const overlayRef = useRef<HTMLDivElement>(null);
  const lastPath = useRef(location.pathname);

  useEffect(() => {
    const handleRouteChange = () => {
      const newPath = location.pathname;
      if (newPath === lastPath.current) return;
      lastPath.current = newPath;

      const overlay = overlayRef.current;
      if (!overlay) return;

      // Kill any in-progress animation
      gsap.killTweensOf(overlay);

      // Soft subtle pulse: fade in to 0.15 → smooth fade out
      gsap.fromTo(
        overlay,
        { opacity: 0 },
        {
          opacity: 0.15,
          duration: 0.1,
          ease: 'power1.in',
          onComplete: () => {
            gsap.to(overlay, {
              opacity: 0,
              duration: 0.25,
              delay: 0.02,
              ease: 'power2.out',
            });
          },
        }
      );
    };

    globalThis.addEventListener('routechange', handleRouteChange);
    globalThis.addEventListener('popstate', handleRouteChange);
    return () => {
      globalThis.removeEventListener('routechange', handleRouteChange);
      globalThis.removeEventListener('popstate', handleRouteChange);
    };
  }, []);

  return (
    <div
      ref={overlayRef}
      className="page-transition-overlay"
    />
  );
}
