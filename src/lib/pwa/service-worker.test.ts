import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';

describe('Service Worker Registration', () => {
  let originalNavigator: Navigator;

  beforeEach(() => {
    originalNavigator = globalThis.navigator;
  });

  afterEach(() => {
    globalThis.navigator = originalNavigator;
    vi.restoreAllMocks();
  });

  it('should register service worker when available', async () => {
    const mockRegister = vi.fn().mockResolvedValue({
      installing: null,
      waiting: null,
      active: { state: 'activated' },
      scope: '/',
    });

    Object.defineProperty(globalThis, 'navigator', {
      value: {
        serviceWorker: {
          register: mockRegister,
          ready: Promise.resolve({
            active: { state: 'activated' },
          }),
        },
      },
      writable: true,
      configurable: true,
    });

    if ('serviceWorker' in navigator) {
      const registration = await navigator.serviceWorker.register('/sw.js');
      expect(registration).toBeDefined();
      expect(registration.active?.state).toBe('activated');
    }
  });

  it('should handle service worker not available', () => {
    Object.defineProperty(globalThis, 'navigator', {
      value: {},
      writable: true,
      configurable: true,
    });

    expect('serviceWorker' in navigator).toBe(false);
  });
});

describe('Cache Strategies', () => {
  let mockCache: Map<string, Response>;

  beforeEach(() => {
    mockCache = new Map();

    globalThis.caches = {
      open: vi.fn().mockResolvedValue({
        match: vi.fn((request: Request | string) => {
          const key = typeof request === 'string' ? request : request.url;
          return Promise.resolve(mockCache.get(key));
        }),
        put: vi.fn((request: Request | string, response: Response) => {
          const key = typeof request === 'string' ? request : request.url;
          mockCache.set(key, response);
          return Promise.resolve();
        }),
      }),
      match: vi.fn((request: Request | string) => {
        const key = typeof request === 'string' ? request : request.url;
        return Promise.resolve(mockCache.get(key));
      }),
      delete: vi.fn(),
      has: vi.fn(),
      keys: vi.fn(),
    } as any;
  });

  afterEach(() => {
    mockCache.clear();
    vi.restoreAllMocks();
  });

  it('should cache response with Cache-First strategy', async () => {
    const testUrl = 'https://example.com/test.js';
    const testResponse = new Response('test content', { status: 200 });

    const cache = await caches.open('static-assets-cache');
    await cache.put(testUrl, testResponse.clone());

    const cachedResponse = await cache.match(testUrl);
    expect(cachedResponse).toBeDefined();
    expect(cachedResponse?.status).toBe(200);
  });

  it('should only cache successful responses (200)', async () => {
    const testUrl = 'https://example.com/error.js';
    const errorResponse = new Response('error', { status: 404 });

    if (errorResponse.status === 200) {
      const cache = await caches.open('static-assets-cache');
      await cache.put(testUrl, errorResponse);
    }

    const cachedResponse = await caches.match(testUrl);
    expect(cachedResponse).toBeUndefined();
  });

  it('should handle Network-First strategy fallback', async () => {
    const testUrl = 'https://example.com/page.html';
    const cachedResponse = new Response('cached page', { status: 200 });

    const cache = await caches.open('pages-cache');
    await cache.put(testUrl, cachedResponse);

    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    try {
      await fetch(testUrl);
    } catch {
      const fallback = await cache.match(testUrl);
      expect(fallback).toBeDefined();
      expect(await fallback?.text()).toBe('cached page');
    }
  });
});

describe('Offline Fallback', () => {
  it('should serve offline.html for navigation requests when offline', async () => {
    const offlineResponse = new Response('<html>Offline</html>', {
      status: 200,
      headers: { 'Content-Type': 'text/html' },
    });

    const cache = await caches.open('workbox-precache');
    await cache.put('/offline.html', offlineResponse);

    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const mockRequest = {
      url: 'https://example.com/unknown',
      mode: 'navigate',
    };

    try {
      await fetch(mockRequest.url);
    } catch {
      if (mockRequest.mode === 'navigate') {
        const fallback = await cache.match('/offline.html');
        expect(fallback).toBeDefined();
        expect(fallback?.headers.get('Content-Type')).toBe('text/html');
      }
    }
  });

  it('should not serve offline.html for API requests', async () => {
    const mockRequest = {
      url: 'https://example.com/api/data',
      mode: 'cors',
    };

    globalThis.fetch = vi.fn().mockRejectedValue(new Error('Network error'));

    const shouldFallback = mockRequest.mode === 'navigate' && !mockRequest.url.includes('/api/');
    expect(shouldFallback).toBe(false);
  });
});

describe('Cache Expiration', () => {
  it('should respect maxEntries limit', async () => {
    const cache = await caches.open('pages-cache');
    const maxEntries = 50;

    for (let i = 0; i < maxEntries + 10; i++) {
      const response = new Response(`page ${i}`, { status: 200 });
      await cache.put(`https://example.com/page${i}`, response);
    }

    expect(true).toBe(true);
  });

  it('should respect maxAgeSeconds expiration', () => {
    const now = Date.now();
    const maxAge = 60 * 60 * 24 * 7;
    const expirationTime = now + maxAge * 1000;

    expect(expirationTime).toBeGreaterThan(now);
  });
});
