import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/preact';
// @ts-ignore - fake-indexeddb doesn't have proper types
import 'fake-indexeddb/auto';

vi.mock('virtual:pwa-register/preact', () => ({
  useRegisterSW: () => ({
    needRefresh: [false, () => {}],
    offlineReady: [false, () => {}],
    updateServiceWorker: () => Promise.resolve(),
  }),
}));

afterEach(() => {
  cleanup();
});
