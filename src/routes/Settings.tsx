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
    <div className="min-h-screen bg-gray-50 dark:bg-bdc-black transition-colors duration-300 pt-14 pb-24 px-5">
      <header className="pt-5 pb-4">
        <h1 className="text-2xl font-bold text-bdc-black dark:text-white font-display">Paramètres</h1>
        <p className="text-xs text-muted dark:text-gray-400 mt-1">Configuration de l'application</p>
      </header>

      {/* Section Version */}
      <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-xl p-4 mb-3">
        <h2 className="text-sm font-bold text-bdc-black dark:text-white font-display uppercase tracking-wider mb-2">Version</h2>
        <p className="text-sm text-muted dark:text-gray-400">
          Version actuelle: <span className="font-mono font-bold text-bdc-yellow">v{packageJson.version}</span>
        </p>
      </section>

      {/* Section Connexion et Synchronisation */}
      <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-xl p-4 mb-3">
        <h2 className="text-sm font-bold text-bdc-black dark:text-white font-display uppercase tracking-wider mb-3">Connexion</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
            <span className="text-sm text-muted dark:text-gray-400">Statut</span>
            <ConnectionIndicator showText={true} />
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
            <span className="text-sm text-muted dark:text-gray-400">Synchronisation</span>
            <LastSyncIndicator store="products" />
          </div>
        </div>
      </section>

      {/* Section Gestion des versions */}
      <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-xl p-4 mb-3">
        <h2 className="text-sm font-bold text-bdc-black dark:text-white font-display uppercase tracking-wider mb-3">Gestion des versions</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
            <div>
              <p className="text-[11px] text-muted dark:text-gray-500 uppercase tracking-wider">Actuelle</p>
              <p className="font-mono font-bold text-base text-bdc-yellow">
                v{versionInfo?.current || packageJson.version}
              </p>
            </div>
            {versionInfo?.previous && (
              <div className="text-right">
                <p className="text-[11px] text-muted dark:text-gray-500 uppercase tracking-wider">Précédente</p>
                <p className="font-mono text-sm text-muted dark:text-gray-400">v{versionInfo.previous}</p>
              </div>
            )}
          </div>

          {versionInfo?.canRollback && (
            <button
              onClick={handleRollback}
              disabled={isRollingBack}
              className="w-full bg-bdc-red text-white px-4 py-3 rounded-xl font-semibold text-sm disabled:opacity-50 disabled:cursor-not-allowed active:scale-[0.98] transition-all"
            >
              {isRollingBack ? (
                <span className="flex items-center justify-center gap-2">
                  <Loader2 size={16} className="animate-spin" />
                  Rollback en cours...
                </span>
              ) : (
                <span className="flex items-center justify-center gap-2">
                  <AlertTriangle size={16} />
                  Revenir à la version précédente
                </span>
              )}
            </button>
          )}

          {!versionInfo?.canRollback && (
            <p className="text-xs text-muted dark:text-gray-500 text-center p-2">
              Aucune version précédente disponible
            </p>
          )}
        </div>
      </section>

      {/* Section Changelog */}
      <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-xl p-4 mb-3">
        <h2 className="text-sm font-bold text-bdc-black dark:text-white font-display uppercase tracking-wider mb-3">Historique</h2>
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
      <div className="mb-3">
        <button
          onClick={() => setShowDevMode(!showDevMode)}
          className="text-xs text-muted dark:text-gray-500 hover:text-bdc-blue transition-colors flex items-center gap-1.5"
        >
          {showDevMode ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          <span>Mode développeur</span>
        </button>
      </div>

      {showDevMode && (
        <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-xl p-4 mb-3">
          <h2 className="text-sm font-bold text-bdc-black dark:text-white font-display uppercase tracking-wider mb-2">Feature Flags</h2>
          <p className="text-xs text-muted dark:text-gray-400 mb-3">
            Activez ou désactivez des fonctionnalités.
          </p>
          <div className="space-y-2">
            {Object.values(featureFlags).map(flag => (
              <FeatureFlagToggle key={flag.key} flag={flag} />
            ))}
          </div>
        </section>
      )}

      {/* Section À propos */}
      <section className="bg-white/70 dark:bg-white/5 backdrop-blur-md border border-gray-100 dark:border-white/10 rounded-xl p-4">
        <h2 className="text-sm font-bold text-bdc-black dark:text-white font-display uppercase tracking-wider mb-2">À propos</h2>
        <p className="text-sm text-muted dark:text-gray-400">
          Lions' Book - Guide du vendeur BDC
        </p>
        <p className="text-xs text-muted dark:text-gray-500 mt-1">
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
    <div className="border-l-2 border-bdc-yellow pl-3">
      <div className="flex justify-between items-center mb-1.5">
        <h3 className="font-mono font-bold text-sm text-bdc-black dark:text-white">v{version}</h3>
        <span className="text-[11px] text-muted dark:text-gray-500">{date}</span>
      </div>
      <ul className="list-disc list-inside space-y-0.5">
        {changes.map((change, i) => (
          <li key={i} className="text-muted dark:text-gray-400 text-xs">{change}</li>
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
    <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-white/5 rounded-lg">
      <div className="flex-1">
        <p className="text-sm font-semibold text-bdc-black dark:text-white">{flag.name}</p>
        <p className="text-xs text-muted dark:text-gray-400">{flag.description}</p>
      </div>
      <button
        onClick={handleToggle}
        className={`relative w-10 h-5 rounded-full transition-colors ${
          enabled ? 'bg-bdc-blue' : 'bg-gray-300 dark:bg-white/20'
        }`}
        aria-label={`Toggle ${flag.name}`}
      >
        <div
          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transform transition-transform ${
            enabled ? 'translate-x-5' : 'translate-x-0.5'
          }`}
        />
      </button>
    </div>
  );
}
