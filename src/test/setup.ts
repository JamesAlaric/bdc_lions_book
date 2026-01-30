import { afterEach } from 'vitest';
import { cleanup } from '@testing-library/preact';
import 'fake-indexeddb/auto';

afterEach(() => {
  cleanup();
});
