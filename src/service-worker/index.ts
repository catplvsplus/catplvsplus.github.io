/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope;

import { build, files, version } from '$service-worker';

const cacheName = `cache-${version}`;
const assets = [...files, ...build];

self.addEventListener('install', (event) => {
    event.waitUntil(addFilesToCache());
});

self.addEventListener('activate', (event) => {
    event.waitUntil(clearOldCache());
});

self.addEventListener('fetch', (event) => {
    if (event.request.method !== 'GET') return;

    event.respondWith(serveFromCache(event));
});

self.addEventListener('message', async (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') await self.skipWaiting();
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

async function serveFromCache(event: FetchEvent) {
    const { request } = event;
    const url = new URL(request.url);
    const isCors = url.hostname !== self.location.hostname && url.protocol.startsWith('http');

    if (isCors && request.method === 'GET') {
        const cached = await caches.match(request);

        if (cached) {
            console.log('Serving from cache', url.href);
            return cached;
        } else {
            console.warn('Cache miss for CORS request', url.href);
        }
    }

    try {
        const response = await fetch(request);
        const clone = response.clone();

        if (response.ok && url.protocol.startsWith('http')) {
            console.log('Serving from network' + (isCors ? ' and caching it' : ''), url.href);

            event.waitUntil((async () => {
                const cache = await caches.open(cacheName);
                await cache.put(request, clone);
            })());
        }

        return response;
    } catch (error) {
        console.log('Falling back to cache', url.href);
        const cached = await caches.match(request);
        if (cached) {
            console.log('Serving from cache', url.href);
            return cached;
        } else {
            console.error('Cache miss', url.href);
        }
    }

    return new Response(null, { status: 404 });
}