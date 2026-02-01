import type { LoadProgress } from '../../lib/data/loader';

interface LoadingScreenProps {
  progress?: LoadProgress;
  message?: string;
}

export function LoadingScreen({ progress, message }: LoadingScreenProps) {
  const percentage = progress?.percentage ?? 0;
  const stage = progress?.stage ?? 'chargement';

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-off-white text-gray-800">
      <h1 className="text-2xl font-bold text-bdc-red mb-2">Chargement du catalogue</h1>
      <p className="text-sm text-gray-600 mb-4">{message ?? 'Initialisation des données produits...'}</p>
      <div className="w-64 h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="h-full bg-bdc-red transition-all duration-300"
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-xs text-gray-500 mt-2">{percentage}% - {stage}</p>
    </div>
  );
}
