import { route } from 'preact-router';
import type { RouteProps } from 'preact-router';

export function NotFound(_props: RouteProps) {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bdc-black flex items-center justify-center px-6 pt-12 pb-24">
      <div className="text-center max-w-sm">
        {/* Big 404 */}
        <div className="relative mb-6">
          <span className="text-[120px] font-black text-gray-100 dark:text-white/[0.04] leading-none font-display select-none">
            404
          </span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-20 h-20 rounded-2xl bg-bdc-red/10 flex items-center justify-center">
              <svg className="w-10 h-10 text-bdc-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-xl font-bold text-bdc-black dark:text-white font-display mb-2">
          Page introuvable
        </h1>

        {/* Description */}
        <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed mb-8">
          La page que vous cherchez n'existe pas ou a ete deplacee.
        </p>

        {/* Actions */}
        <div className="flex flex-col gap-3">
          <button
            onClick={() => route('/')}
            className="w-full py-3 px-6 bg-bdc-red text-white text-sm font-semibold rounded-xl hover:bg-bdc-red/90 active:scale-[0.98] transition-all shadow-lg shadow-bdc-red/20"
          >
            Retour a l'accueil
          </button>
          <button
            onClick={() => history.back()}
            className="w-full py-3 px-6 bg-gray-100 dark:bg-white/10 text-bdc-black dark:text-white text-sm font-semibold rounded-xl hover:bg-gray-200 dark:hover:bg-white/15 active:scale-[0.98] transition-all"
          >
            Page precedente
          </button>
        </div>
      </div>
    </div>
  );
}
