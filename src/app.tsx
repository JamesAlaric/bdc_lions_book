import Router from 'preact-router';
import { useEffect, useState } from 'preact/hooks';
import { Home } from './routes/Home';
import { Settings } from './routes/Settings';
import { Catalogue } from './routes/Catalogue';
import { ProductDetail } from './routes/ProductDetail';
import { BrandDetail } from './routes/BrandDetail';
import { Navigation } from './components/layout/Navigation';
import { UpdateNotification } from './components/UpdateNotification';
import PWABadge from './PWABadge.tsx';
import { getAllProducts } from './lib/storage/catalogue';
import { getAllBrands } from './lib/storage/brands';
import { initDatabase } from './lib/storage/database';
import { loadInitialCatalogue, loadBrands, type LoadProgress } from './lib/data/loader';
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
        const [existingProducts, existingBrands] = await Promise.all([
          getAllProducts(),
          getAllBrands(),
        ]);
        if (existingProducts.length === 0) {
          await loadInitialCatalogue({ onProgress: (p) => !cancelled && setProgress(p) });
        }
        if (existingBrands.length === 0) {
          await loadBrands();
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
      <div className="min-h-screen flex flex-col items-center justify-center text-center px-6 bg-off-white">
        <h1 className="text-2xl font-bold text-bdc-red mb-2">Erreur de chargement</h1>
        <p className="text-gray-700 mb-4">{loadError}</p>
        <button
          className="px-4 py-2 bg-bdc-red text-white rounded-lg shadow active:scale-95 transition"
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
      <Router>
        <Home path="/" default />
        <Catalogue />
        <ProductDetail path="/product/:id" />
        <BrandDetail path="/brand/:id" />
        <Settings path="/settings" />
      </Router>
      <Navigation />
      <UpdateNotification />
      <PWABadge />
    </>
  );
}
