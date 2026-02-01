import { useState, useEffect, useRef } from 'preact/hooks';
import { getLastSyncTimestamp } from '../../lib/storage/sync';
import { Clock } from './Icon';

interface LastSyncIndicatorProps {
  className?: string;
  store?: string;
}

/**
 * Format relative time in French
 * e.g., "il y a 2 heures", "il y a 5 minutes", "à l'instant"
 */
function formatRelativeTime(timestamp: number): string {
  if (!timestamp || timestamp === 0) {
    return 'Jamais synchronisé';
  }

  const now = Date.now();
  const diff = now - timestamp;

  // Less than 1 minute
  if (diff < 60000) {
    return "À l'instant";
  }

  // Less than 1 hour
  const minutes = Math.floor(diff / 60000);
  if (diff < 3600000) {
    return `il y a ${minutes} minute${minutes > 1 ? 's' : ''}`;
  }

  // Less than 24 hours
  const hours = Math.floor(diff / 3600000);
  if (diff < 86400000) {
    return `il y a ${hours} heure${hours > 1 ? 's' : ''}`;
  }

  // Less than 30 days
  const days = Math.floor(diff / 86400000);
  if (diff < 2592000000) {
    return `il y a ${days} jour${days > 1 ? 's' : ''}`;
  }

  // More than 30 days
  const months = Math.floor(diff / 2592000000);
  return `il y a ${months} mois`;
}

/**
 * Format full date/time for tooltip
 */
function formatFullDate(timestamp: number): string {
  if (!timestamp || timestamp === 0) {
    return 'Aucune synchronisation enregistrée';
  }

  const date = new Date(timestamp);
  return date.toLocaleString('fr-FR', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
}

export function LastSyncIndicator({ className = '', store = 'products' }: LastSyncIndicatorProps) {
  const [lastSync, setLastSync] = useState<number>(0);
  const [relativeTime, setRelativeTime] = useState<string>('Chargement...');
  const lastSyncRef = useRef<number>(0);

  // Keep ref in sync with state
  useEffect(() => {
    lastSyncRef.current = lastSync;
  }, [lastSync]);

  useEffect(() => {
    async function loadLastSync() {
      try {
        const timestamp = await getLastSyncTimestamp(store);
        setLastSync(timestamp);
        setRelativeTime(formatRelativeTime(timestamp));
      } catch (error) {
        console.error('Failed to load last sync timestamp:', error);
        setRelativeTime('Erreur de chargement');
      }
    }

    loadLastSync();

    // Update relative time every minute using ref to avoid stale closure
    const interval = setInterval(() => {
      setRelativeTime(formatRelativeTime(lastSyncRef.current));
    }, 60000);

    return () => clearInterval(interval);
  }, [store]);

  return (
    <div
      className={`flex items-center gap-2 text-gray-600 ${className}`}
      title={formatFullDate(lastSync)}
    >
      {/* Clock icon */}
      <Clock size={16} className="text-gray-500" />

      {/* Label */}
      <span className="text-sm">
        {/* TODO(i18n): sync.lastSync */}
        Dernière sync:{' '}
        <span className={lastSync === 0 ? 'text-red-600 font-medium' : ''}>
          {relativeTime}
        </span>
      </span>
    </div>
  );
}
