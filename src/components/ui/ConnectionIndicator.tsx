import { useState, useEffect } from 'preact/hooks';
import { Wifi, WifiOff } from './Icon';

interface ConnectionIndicatorProps {
  showText?: boolean;
  className?: string;
}

export function ConnectionIndicator({ showText = true, className = '' }: ConnectionIndicatorProps) {
  const [isOnline, setIsOnline] = useState<boolean>(
    typeof navigator !== 'undefined' ? navigator.onLine : true
  );

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return (
    <div
      className={`flex items-center gap-2 ${className}`}
      role="status"
      aria-live="polite"
      aria-label={isOnline ? 'Connecté' : 'Hors ligne'}
    >
      {/* Status dot */}
      <span
        className={`w-2.5 h-2.5 rounded-full ${
          isOnline ? 'bg-green-500' : 'bg-red-500'
        }`}
        style={{
          boxShadow: isOnline
            ? '0 0 8px rgba(34, 197, 94, 0.6)'
            : '0 0 8px rgba(239, 68, 68, 0.6)',
        }}
      />

      {/* Icon */}
      {isOnline ? (
        <Wifi size={16} className="text-green-600" />
      ) : (
        <WifiOff size={16} className="text-red-600" />
      )}

      {/* Text label */}
      {showText && (
        <span
          className={`text-sm font-medium ${
            isOnline ? 'text-green-700' : 'text-red-700'
          }`}
        >
          {/* TODO(i18n): connection.online / connection.offline */}
          {isOnline ? 'En ligne' : 'Hors ligne'}
        </span>
      )}
    </div>
  );
}
