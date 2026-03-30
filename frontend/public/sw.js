const addResourcesToCache = async () => {
    const cache = await caches.open("v1");
    await cache.addAll([
        "/", // Tu ruta raíz
        "/index.html", // El punto de entrada
        "/manifest.json", // El archivo que dice que es una PWA
        "/icons/192.png", // Tus iconos (ajusta los nombres según tu carpeta /icons)
        "/icons/512.png",
    ]);
};

self.addEventListener("install", (event) => {
    event.waitUntil(addResourcesToCache());
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        (async () => {
            // 1. Intentamos buscar en el caché (bodega)
            const cache = await caches.open("v1");
            const cachedResponse = await cache.match(event.request);

            if (cachedResponse) {
                return cachedResponse; // ¡Lo encontramos!
            }

            // 2. Si no está en caché, intentamos ir a la red
            try {
                const networkResponse = await fetch(event.request);

                // Si la respuesta es buena, la guardamos en el caché para la próxima
                if (networkResponse && networkResponse.status === 200) {
                    cache.put(event.request, networkResponse.clone());
                }

                return networkResponse;
            } catch (error) {
                // 3. Si no hay red Y no estaba en caché...
                console.error(
                    "Error: No hay internet ni copia guardada para:",
                    event.request.url,
                );
                // Aquí podrías retornar una página de error personalizada
            }
        })(),
    );
});
