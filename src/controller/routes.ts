import { Router, RouterHandler } from '@tsndr/cloudflare-worker-router'
import hiHandler from './handlers/hi-handler'

const router = new Router()

router.get('/hi', hiHandler)

export default router