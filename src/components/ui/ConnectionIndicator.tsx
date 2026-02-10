import { useState, useEffect, useRef } from 'preact/hooks';

interface ConnectionIndicatorProps {
  showText?: boolean;
  className?: string;
}

export function ConnectionIndicator({ showText = true, className = '' }: ConnectionIndicatorProps) {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );
  const pingRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Periodic ping to verify actual connectivity (every 30s)
    const checkConnectivity = async () => {
      try {
        const response = await fetch('/manifest.webmanifest', {
          method: 'HEAD',
          cache: 'no-store',
        });
        if (response.ok) {
          setIsOnline(true);
        }
      } catch {
        // Network error - no connectivity
        if (navigator.onLine) {
          // Browser says online but fetch failed - likely no real internet
          setIsOnline(false);
        }
      }
    };

    // Initial check after 2s delay (avoid blocking startup)
    const initialTimeout = setTimeout(checkConnectivity, 2000);
    pingRef.current = setInterval(checkConnectivity, 30000);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      clearTimeout(initialTimeout);
      if (pingRef.current) clearInterval(pingRef.current);
    };
  }, []);

  return (
    <div
      className={`flex items-center gap-1.5 ${className}`}
      role="status"
      aria-live="polite"
      aria-label={isOnline ? 'Connecte' : 'Hors ligne'}
    >
      {/* Icon + dot combined */}
      <span className="relative flex items-center justify-center">
        {isOnline ? (
          <svg className="w-5 h-5 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
          </svg>
        ) : (
          <svg className="w-5 h-5 text-bdc-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3l18 18" />
          </svg>
        )}
        {/* Status dot */}
        <span
          className={`absolute -top-0.5 -right-0.5 w-2 h-2 rounded-full border border-white dark:border-bdc-black ${
            isOnline ? 'bg-green-500' : 'bg-red-500 animate-pulse'
          }`}
        />
      </span>

      {/* Text label */}
      {showText && (
        <span
          className={`text-sm font-medium ${
            isOnline ? 'text-green-700 dark:text-green-400' : 'text-bdc-red'
          }`}
        >
          {isOnline ? 'En ligne' : 'Hors ligne'}
        </span>
      )}
    </div>
  );
}
