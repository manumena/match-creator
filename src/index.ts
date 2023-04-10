import router from "./controller/routes";

addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(router.handle({}, event.request));
});
