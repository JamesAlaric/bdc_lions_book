import { render } from 'preact'
import './index.css'
import { App } from './app.tsx'
import { initDatabase, cleanupOldVersions } from './lib/storage/database'
import { runMigrations } from './lib/storage/migrations'
import { trackVersion } from './lib/rollback'
import packageJson from '../package.json'

async function initApp() {
  try {
    console.log('[INIT] Initializing Lions Book v' + packageJson.version);
    
    trackVersion(packageJson.version);
    console.log('[OK] Version tracked');

    const db = await initDatabase();
    console.log('[OK] Database initialized');

    await runMigrations(db);
    console.log('[OK] Migrations completed');

    await cleanupOldVersions();
    console.log('[OK] Old versions cleaned up');

    render(<App />, document.getElementById('app')!);
    console.log('[OK] App rendered');
  } catch (error) {
    console.error('[ERROR] Failed to initialize app:', error);
    document.getElementById('app')!.innerHTML = `
      <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; padding: 2rem; background: #fafafa;">
        <div style="max-width: 500px; background: white; padding: 2rem; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);">
          <h1 style="color: #ff7323; margin-bottom: 1rem;">Erreur d'initialisation</h1>
          <p style="color: #666; margin-bottom: 1rem;">L'application n'a pas pu démarrer correctement.</p>
          <p style="color: #999; font-size: 0.875rem; font-family: monospace;">${error}</p>
          <button onclick="location.reload()" style="margin-top: 1rem; padding: 0.75rem 1.5rem; background: #ffc627; border: none; border-radius: 8px; font-weight: 600; cursor: pointer;">
            Recharger l'application
          </button>
        </div>
      </div>
    `;
  }
}

initApp();
