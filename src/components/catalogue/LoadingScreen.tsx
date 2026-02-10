import type { LoadProgress } from '../../lib/data/loader';

interface LoadingScreenProps {
  progress?: LoadProgress;
  message?: string;
}

export function LoadingScreen({ progress, message }: LoadingScreenProps) {
  const percentage = progress?.percentage ?? 0;
  const stage = progress?.stage ?? 'chargement';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 dark:bg-bdc-black transition-colors duration-300">
      <h1 className="text-xl font-bold text-bdc-red mb-2 font-display">Chargement du catalogue</h1>
      <p className="text-sm text-muted dark:text-gray-400 mb-4">{message ?? 'Initialisation des données produits...'}</p>
      <div className="w-64 h-1.5 bg-gray-200 dark:bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-bdc-red rounded-full transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-muted dark:text-gray-500 mt-2">{percentage}% - {stage}</p>
    </div>
  );
}
