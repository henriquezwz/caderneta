// Caderneta: sempre busca a versão nova na rede; se estiver sem internet, abre a última guardada.
const CACHE = "caderneta-v1";
self.addEventListener("install", e => { self.skipWaiting(); });
self.addEventListener("activate", e => { e.waitUntil(self.clients.claim()); });
self.addEventListener("fetch", e => {
  const r = e.request; if (r.method !== "GET") return;
  const u = new URL(r.url); if (u.origin !== location.origin) return;
  e.respondWith(fetch(r).then(res => { if (res.ok && r.mode === "navigate") { const c = res.clone(); caches.open(CACHE).then(k => k.put("./", c)); } return res; })
    .catch(() => caches.match(r).then(x => x || caches.match("./"))));
});
