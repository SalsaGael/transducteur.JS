// This is the service worker with the Cache-first network //
var version = "1.18.06.24"
var CACHE = 'sw-precache';
var precacheFiles = [
  './',
  './index.html',
  './css/reset.css',
  'https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
  'https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css',
  './css/style.css',
  './data.json',
  './images/logo.png',
  './images/android-chrome-192x192.png',
  './images/android-chrome-512x512.png',
  './images/apple-icon-144x144.png',
  './images/apple-icon-120x120.png',
  './images/apple-icon-114x114.png',
  './images/apple-icon-152x152.png',
  './images/apple-icon-180x180.png',
  './images/apple-icon-precomposed.png',
  './images/apple-touch-icon.png',
  './images/favicon-16x16.png',
  './images/favicon-32x32.png',
  './images/safari-pinned-tab.svg',
  './images/favicon.ico',
  './win-tiles/large.png',
  './win-tiles/medium.png',
  './win-tiles/small.png',
  './win-tiles/wide.png',
  './AppImages/ios/ios-appicon-180-180.png',
  './dist/bundle.js'
];

function precache() {
  return caches.open(CACHE).then(function (cache) {
    return cache.addAll(precacheFiles);
  });
}

function fromCache(request) {
  // we pull files from the cache first thing so we can show them fast //
  return caches.open(CACHE).then(function (cache) {
    return cache.match(request).then(function (matching) {
      return matching || Promise.reject('no-match');
    });
  });
}

function fromServer(request) {
  // this is the fallback if it is not in the cache to go to the server and get it //
  return fetch(request).then(function (response) {
    return response
  });
}

function update(request) {
  // this is where we call the server to get the newest version of the file to use the next time we show view //
  return caches.open(CACHE).then(function (cache) {
    return fetch(request).then(function (response) {
      return cache.put(request, response);
    });
  });
}




// Install stage sets up the cache-array to configure pre-cache content //
self.addEventListener('install', function (evt) {
  console.log('The service worker is being installed.');
  evt.waitUntil(precache().then(function () {
    console.log('[ServiceWorker] Skip waiting on install');
    return self.skipWaiting();

  }));
});


// allow sw to control of current page //
self.addEventListener('activate', function (event) {
  console.log('[ServiceWorker] Claiming clients for current page');
  return self.clients.claim();

});

self.addEventListener('fetch', function (evt) {
  console.log('The service worker is serving the asset.' + evt.request.url);
  evt.respondWith(fromCache(evt.request).catch(fromServer(evt.request)));
  evt.waitUntil(update(evt.request));
});