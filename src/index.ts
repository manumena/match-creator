import { Router } from '@tsndr/cloudflare-worker-router'

const router = new Router()

/// Example Route
router.get('/', ({ res }) => {
   res.body = 'Hello World'
})


/// Example Route for splitting into multiple files
//
// const hiHandler: RouteHandler<Env> = ({ res }) => {
//     res.body = 'Hello World'
// }
//
// router.get('/hi', hiHandler)

addEventListener('fetch', (event: FetchEvent) => {
  event.respondWith(router.handle({}, event.request));
});
