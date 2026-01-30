import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/preact';
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
