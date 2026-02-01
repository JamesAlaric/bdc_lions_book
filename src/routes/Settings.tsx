import { useState, useEffect } from 'preact/hooks';
import type { RouteProps } from 'preact-router';
import packageJson from '../../package.json';
import { rollbackToPreviousVersion, getVersionInfo, type VersionInfo } from '../lib/rollback';
import { featureFlags, isFeatureEnabled, setFeatureEnabled, type FeatureFlag } from '../lib/featureFlags';
import { ConnectionIndicator } from '../components/ui/ConnectionIndicator';
import { LastSyncIndicator } from '../components/ui/LastSyncIndicator';
import { AlertTriangle, Loader2, ChevronDown, ChevronRight } from '../components/ui/Icon';

export function Settings(_props: RouteProps) {
  const [versionInfo, setVersionInfo] = useState<VersionInfo | null>(null);
  const [showDevMode, setShowDevMode] = useState(false);
  const [isRollingBack, setIsRollingBack] = useState(false);

  useEffect(() => {
    getVersionInfo().then(setVersionInfo);
  }, []);

  const handleRollback = async () => {
    if (!confirm('Êtes-vous sûr de vouloir revenir à la version précédente ?\n\nCette action rechargera l\'application.')) {
      return;
    }

    setIsRollingBack(true);
    try {
      await rollbackToPreviousVersion();
    } catch (error) {
      setIsRollingBack(false);
      alert('Erreur lors du rollback: ' + (error as Error).message);
    }
  };

  return (
    <div className="min-h-screen bg-off-white p-6 pb-20">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Paramètres</h1>
      </header>

      {/* Section Version */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">Version</h2>
        <p className="text-gray-600">
          Version actuelle: <span className="font-mono font-bold text-bdc-yellow">v{packageJson.version}</span>
        </p>
      </section>

      {/* Section Connexion et Synchronisation */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Connexion et Synchronisation</h2>
        <div className="space-y-4">
          {/* Connection Status */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">Statut de connexion</span>
            <ConnectionIndicator showText={true} />
          </div>

          {/* Last Sync */}
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-gray-700">Synchronisation</span>
            <LastSyncIndicator store="products" />
          </div>
        </div>
      </section>

      {/* Section Gestion des versions */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Gestion des versions</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div>
              <p className="text-sm text-gray-500">Version actuelle</p>
              <p className="font-mono font-bold text-lg text-bdc-yellow">
                v{versionInfo?.current || packageJson.version}
              </p>
            </div>
            {versionInfo?.previous && (
              <div className="text-right">
                <p className="text-sm text-gray-500">Version précédente</p>
                <p className="font-mono text-gray-700">v{versionInfo.previous}</p>
              </div>
            )}
          </div>

          {versionInfo?.canRollback && (
            <button
              onClick={handleRollback}
              disabled={isRollingBack}
              className="w-full bg-red-500 text-white px-4 py-3 rounded-lg hover:bg-red-600 transition-colors font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isRollingBack ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={18} className="animate-spin" />
                  Rollback en cours...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <AlertTriangle size={18} />
                  Revenir à la version précédente
                </span>
              )}
            </button>
          )}

          {!versionInfo?.canRollback && (
            <p className="text-sm text-gray-500 text-center p-3">
              Aucune version précédente disponible pour le rollback
            </p>
          )}
        </div>
      </section>

      {/* Section Changelog */}
      <section className="bg-white rounded-lg shadow-md p-6 mb-4">
        <h2 className="text-xl font-semibold mb-4 text-gray-800">Historique des versions</h2>
        <div className="space-y-4">
          <ChangelogEntry 
            version="1.0.0"
            date="2026-01-29"
            changes={[
              "Initialisation du projet PWA",
              "Configuration Tailwind + Emotion",
              "Ajout des icônes PWA",
              "Mode fullscreen et splash screen",
              "Page Paramètres avec changelog",
              "Système de mise à jour PWA"
            ]}
          />
          <ChangelogEntry 
            version="0.0.0"
            date="2026-01-29"
            changes={[
              "Setup initial du projet"
            ]}
          />
        </div>
      </section>

      {/* Section Feature Flags (Mode développeur) */}
      <div className="mb-4">
        <button
          onClick={() => setShowDevMode(!showDevMode)}
          className="text-sm text-gray-500 hover:text-gray-700 transition-colors flex items-center gap-2"
        >
          {showDevMode ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          <span>Mode développeur</span>
        </button>
      </div>

      {showDevMode && (
        <section className="bg-white rounded-lg shadow-md p-6 mb-4">
          <h2 className="text-xl font-semibold mb-4 text-gray-800">Feature Flags</h2>
          <p className="text-sm text-gray-600 mb-4">
            Activez ou désactivez des fonctionnalités spécifiques sans recharger l'application.
          </p>
          <div className="space-y-3">
            {Object.values(featureFlags).map(flag => (
              <FeatureFlagToggle key={flag.key} flag={flag} />
            ))}
          </div>
        </section>
      )}

      {/* Section À propos */}
      <section className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold mb-2 text-gray-800">À propos</h2>
        <p className="text-gray-600">
          Lions' Book - Guide du vendeur BDC
        </p>
        <p className="text-sm text-gray-500 mt-2">
          © 2026 BDC. Tous droits réservés.
        </p>
      </section>
    </div>
  );
}

interface ChangelogEntryProps {
  version: string;
  date: string;
  changes: string[];
}

function ChangelogEntry({ version, date, changes }: ChangelogEntryProps) {
  return (
    <div className="border-l-4 border-bdc-yellow pl-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="font-mono font-bold text-gray-800">v{version}</h3>
        <span className="text-sm text-gray-500">{date}</span>
      </div>
      <ul className="list-disc list-inside space-y-1">
        {changes.map((change, i) => (
          <li key={i} className="text-gray-600 text-sm">{change}</li>
        ))}
      </ul>
    </div>
  );
}

function FeatureFlagToggle({ flag }: { flag: FeatureFlag }) {
  const [enabled, setEnabled] = useState(() => isFeatureEnabled(flag.key));

  const handleToggle = () => {
    const newValue = !enabled;
    setEnabled(newValue);
    setFeatureEnabled(flag.key, newValue);
  };

  return (
    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
      <div className="flex-1">
        <p className="font-semibold text-gray-800">{flag.name}</p>
        <p className="text-sm text-gray-600">{flag.description}</p>
      </div>
      <button
        onClick={handleToggle}
        className={`relative w-12 h-6 rounded-full transition-colors ${
          enabled ? 'bg-bdc-yellow' : 'bg-gray-300'
        }`}
        aria-label={`Toggle ${flag.name}`}
      >
        <div
          className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow-md transform transition-transform ${
            enabled ? 'translate-x-6' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}
