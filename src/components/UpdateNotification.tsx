import { useServiceWorkerUpdate } from '../hooks/useServiceWorkerUpdate';

export function UpdateNotification() {
  const { needRefresh, offlineReady, updateNow, dismissUpdate, dismissOfflineReady } = useServiceWorkerUpdate();

  if (offlineReady) {
    return (
      <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[1000] max-w-[90%] bg-bdc-blue text-white px-5 py-3 rounded-xl shadow-lg shadow-bdc-blue/20 animate-[slideUp_0.3s_ease-out]">
        <p className="text-sm font-semibold">Application prête en mode offline</p>
        <div className="flex gap-2 mt-2">
          <button
            onClick={dismissOfflineReady}
            className="px-3 py-1.5 text-xs font-semibold bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
          >
            OK
          </button>
        </div>
      </div>
    );
  }

  if (!needRefresh) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-[1000] max-w-[90%] bg-bdc-blue text-white px-5 py-3 rounded-xl shadow-lg shadow-bdc-blue/20 animate-[slideUp_0.3s_ease-out]">
      <p className="text-sm font-semibold">Nouvelle version disponible !</p>
      <p className="text-xs mt-1 text-white/70">Mettez à jour pour profiter des dernières fonctionnalités.</p>
      <div className="flex gap-2 mt-2">
        <button
          onClick={updateNow}
          className="px-3 py-1.5 text-xs font-semibold bg-white text-bdc-blue rounded-lg hover:bg-white/90 active:scale-[0.97] transition-all"
        >
          Mettre à jour
        </button>
        <button
          onClick={dismissUpdate}
          className="px-3 py-1.5 text-xs font-semibold border border-white/30 rounded-lg hover:bg-white/10 transition-colors"
        >
          Plus tard
        </button>
      </div>
    </div>
  );
}
