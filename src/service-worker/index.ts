/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope;

import { build, files, version } from '$service-worker';

const cacheName = `cache-v${version}`;
const assets = [...files, ...build];

self.addEventListener('install', (event) => {
    event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clearOldCache());
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    event.respondWith(serveFromCache(event.request));
});

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting();
});

async function addFilesToCache(files?: RequestInfo[]) {
    const cache = await caches.open(cacheName);
    await cache.addAll([...assets, ...files || []]);
}

async function clearOldCache() {
    const keys = await caches.keys();

    for (const key of keys) {
        if (key !== cacheName) await caches.delete(key);
    }
}

async function serveFromCache(request: Request) {
    const url = new URL(request.url);
    const cache = await caches.open(cacheName);
    const isGithubRequest = url.hostname === 'api.github.com';

    if (isGithubRequest && request.method === 'GET') {
        const cached = await cache.match(request);

        if (cached) {
            console.log('Serving from cache', url.href);
            return cached;
        } else {
            console.warn('Cache miss', url.href);
        }
    }

    try {
        let response = await fetch(request);

        if (response.ok && url.protocol.startsWith('http')) {
            cache.put(request.url, response.clone());
            console.log('Serving from network', url.href);
        }

        return response;
    } catch (error) {
        console.log('Falling back to cache', url.href);
        const cached = await cache.match(request);
        if (cached) {
            console.log('Serving from cache', url.href);
            return cached;
        } else {
            console.error('Cache miss', url.href);
        }
    }

    return new Response(null, { status: 404 });
}