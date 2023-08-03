const { warmStrategyCache } = require('workbox-recipes');
const { CacheFirst, StaleWhileRevalidate } = require('workbox-strategies');
const { registerRoute } = require('workbox-routing');
const { CacheableResponsePlugin } = require('workbox-cacheable-response');
const { ExpirationPlugin } = require('workbox-expiration');
const { precacheAndRoute } = require('workbox-precaching/precacheAndRoute');

precacheAndRoute(self.__WB_MANIFEST);

const pageCache = new CacheFirst({
  cacheName: 'page-cache',
  plugins: [
    new CacheableResponsePlugin({
      statuses: [0, 200],
    }),
    new ExpirationPlugin({
      maxAgeSeconds: 30 * 24 * 60 * 60,
    }),
  ],
});

warmStrategyCache({
  urls: ['/index.html', '/'],
  strategy: pageCache,
});

registerRoute(({ request }) => request.mode === 'navigate', pageCache);

// TODO: Implement asset caching
// Register a custom route using the 'workbox.routing.registerRoute' method
registerRoute(
  ({ request }) => {
    // Check if the destination of the request is one of ['style', 'script', 'worker']
    const isAssetRequest = ['style', 'script', 'worker'].includes(request.destination);
    return isAssetRequest;
  },
  // Use the 'workbox.strategies.StaleWhileRevalidate' strategy for caching assets
  new StaleWhileRevalidate({
    cacheName: 'asset-cache', // Name of the cache to store assets
    plugins: [
      // Add a CacheableResponsePlugin to cache responses with statuses 0 and 200
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
    ],
  })
);

