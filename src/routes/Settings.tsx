import type { RouteProps } from 'preact-router';
import packageJson from '../../package.json';

export function Settings(_props: RouteProps) {
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
              "Page Paramètres avec changelog"
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
