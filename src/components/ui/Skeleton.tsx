/** Reusable skeleton shimmer blocks for loading states */

export function SkeletonBlock({ className = '' }: Readonly<{ className?: string }>) {
  return (
    <div
      className={`animate-pulse bg-gray-200 dark:bg-gray-700/50 rounded-xl ${className}`}
    />
  );
}

export function SkeletonText({ lines = 3, className = '' }: Readonly<{ lines?: number; className?: string }>) {
  return (
    <div className={`space-y-2.5 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={`skel-line-${i}`}
          className={`animate-pulse bg-gray-200 dark:bg-gray-700/50 rounded h-3 ${
            i === lines - 1 ? 'w-2/3' : 'w-full'
          }`}
        />
      ))}
    </div>
  );
}

export function SkeletonCard({ className = '' }: Readonly<{ className?: string }>) {
  return (
    <div className={`bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-2xl overflow-hidden ${className}`}>
      <SkeletonBlock className="w-full aspect-[3/4] rounded-none" />
      <div className="p-4 space-y-3">
        <SkeletonBlock className="h-5 w-3/4" />
        <SkeletonText lines={2} />
        <div className="flex gap-2">
          <SkeletonBlock className="h-6 w-16 rounded-full" />
          <SkeletonBlock className="h-6 w-20 rounded-full" />
        </div>
      </div>
    </div>
  );
}

export function SkeletonImage({ className = '' }: Readonly<{ className?: string }>) {
  return (
    <div className={`animate-pulse bg-gray-200 dark:bg-gray-700/50 rounded-2xl flex items-center justify-center ${className}`}>
      <svg className="w-10 h-10 text-gray-300 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 15.75 5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z" />
      </svg>
    </div>
  );
}

/** Full BrandDetail skeleton — shown while data/images are loading */
export function BrandDetailSkeleton() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-bdc-black pt-12">
      {/* Sub-header skeleton */}
      <div className="sticky top-12 z-40 bg-white/80 dark:bg-bdc-black/80 backdrop-blur-xl border-b border-gray-100 dark:border-white/10">
        <div className="px-4 h-12 flex items-center gap-3">
          <SkeletonBlock className="w-8 h-8 rounded-xl" />
          <SkeletonBlock className="h-5 w-32" />
        </div>
      </div>

      {/* Hero image skeleton */}
      <SkeletonImage className="w-full aspect-[3/4]" />

      {/* Info panel skeleton */}
      <div className="px-5 py-6 space-y-4">
        <SkeletonBlock className="h-7 w-48" />
        <SkeletonBlock className="h-4 w-64" />
        <div className="flex gap-2">
          <SkeletonBlock className="h-8 w-20 rounded-full" />
          <SkeletonBlock className="h-8 w-24 rounded-full" />
          <SkeletonBlock className="h-8 w-16 rounded-full" />
        </div>
        <SkeletonText lines={4} />
      </div>

      {/* Sections skeleton */}
      <div className="px-5 space-y-6 pb-24">
        <div>
          <SkeletonBlock className="h-6 w-36 mb-3" />
          <div className="bg-white/60 dark:bg-white/5 rounded-2xl border border-white/50 dark:border-white/10 p-4">
            <SkeletonText lines={5} />
          </div>
        </div>
        <div>
          <SkeletonBlock className="h-6 w-28 mb-3" />
          <div className="bg-white/60 dark:bg-white/5 rounded-2xl border border-white/50 dark:border-white/10 p-4">
            <SkeletonText lines={3} />
          </div>
        </div>
      </div>
    </div>
  );
}

/** Offline banner shown when content cannot load */
export function OfflineBanner() {
  return (
    <div className="mx-4 my-4 p-4 bg-bdc-yellow/10 border border-bdc-yellow/20 rounded-2xl flex items-start gap-3">
      <div className="w-9 h-9 rounded-xl bg-bdc-yellow/20 flex items-center justify-center flex-shrink-0">
        <svg className="w-5 h-5 text-bdc-yellow" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.8}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M8.288 15.038a5.25 5.25 0 017.424 0M5.106 11.856c3.807-3.808 9.98-3.808 13.788 0M1.924 8.674c5.565-5.565 14.587-5.565 20.152 0M12.53 18.22l-.53.53-.53-.53a.75.75 0 011.06 0z" />
        </svg>
      </div>
      <div>
        <p className="text-xs font-bold text-bdc-black dark:text-bdc-yellow">Hors connexion</p>
        <p className="text-[11px] text-gray-500 dark:text-gray-400 mt-0.5 leading-relaxed">
          Certains contenus ne peuvent pas etre charges sans connexion internet. Connectez-vous pour obtenir les dernieres mises a jour.
        </p>
      </div>
    </div>
  );
}
