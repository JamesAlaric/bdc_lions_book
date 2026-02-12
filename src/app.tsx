import Router from 'preact-router';
import { useEffect, useState } from 'preact/hooks';
import { Home } from './routes/Home';
import { Settings } from './routes/Settings';
import { Catalogue } from './routes/Catalogue';
import { BrandDetail } from './routes/BrandDetail';
import { Segments } from './routes/Segments';
import { Objections } from './routes/Objections';
import { Promos } from './routes/Promos';
import { Assets } from './routes/Assets';
import { PricingGrid } from './routes/PricingGrid';
import { NotFound } from './routes/NotFound';
import { Navigation } from './components/layout/Navigation';
import { PageTransition } from './components/layout/PageTransition';
import { UpdateNotification } from './components/UpdateNotification';
import PWABadge from './PWABadge.tsx';
import { getAllProducts } from './lib/storage/catalogue';
import { initDatabase } from './lib/storage/database';
import { clearStaticCache } from './lib/storage/staticCache';
import { loadInitialCatalogue, type LoadProgress } from './lib/data/loader';
import { LoadingScreen } from './components/catalogue/LoadingScreen';
import './app.css';
// CSS import - no type declaration needed

const isTestEnv = typeof process !== 'undefined' && process.env.NODE_ENV === 'test';

export function App() {
  const [isLoadingCatalogue, setIsLoadingCatalogue] = useState(!isTestEnv);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [progress, setProgress] = useState<LoadProgress | undefined>(undefined);

  useEffect(() => {
    let cancelled = false;
    async function ensureCatalogue() {
      // Environnements de test : on bypass le chargement initial pour laisser les tests DOM passer.
      if (isTestEnv) return;

      try {
        await initDatabase();

        // Invalidate IDB static cache when app version changes
        const currentVersion = __APP_VERSION__;
        const storedVersion = localStorage.getItem('lions-book-data-version');
        if (storedVersion !== currentVersion) {
          await clearStaticCache();
          localStorage.setItem('lions-book-data-version', currentVersion);
        }

        const existingProducts = await getAllProducts();
        if (existingProducts.length === 0) {
          await loadInitialCatalogue({ onProgress: (p) => !cancelled && setProgress(p) });
        }
      } catch (error) {
        if (!cancelled) {
          setLoadError((error as Error).message);
        }
      } finally {
        if (!cancelled) {
          setIsLoadingCatalogue(false);
        }
      }
    }
    ensureCatalogue();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loadError) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-gray-50 dark:bg-bdc-black transition-colors">
        <h1 className="text-xl font-bold text-bdc-red mb-2 font-display">Erreur de chargement</h1>
        <p className="text-muted dark:text-gray-400 text-sm mb-4">{loadError}</p>
        <button
          className="px-4 py-2 bg-bdc-red text-white rounded-xl text-sm font-semibold active:scale-95 transition"
          onClick={() => location.reload()}
        >
          Réessayer
        </button>
      </div>
    );
  }

  if (isLoadingCatalogue) {
    return <LoadingScreen progress={progress} />;
  }

  return (
    <>
      <Router onChange={(e: { url: string }) => window.dispatchEvent(new CustomEvent('routechange', { detail: e.url }))}>
        <Home path="/" />
        <Catalogue path="/catalogue" />
        <Segments path="/segments" />
        <Objections path="/objections" />
        <PricingGrid path="/prix" />
        <BrandDetail path="/brand/:id" />
        <Promos path="/promos" />
        <Assets path="/assets" />
        <Settings path="/settings" />
        <NotFound default />
      </Router>
      <div className="nav-bottom-fade" />
      <Navigation />
      <PageTransition />
      <UpdateNotification />
      <PWABadge />
    </>
  );
}
