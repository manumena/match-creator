import { Router, RouterHandler } from '@tsndr/cloudflare-worker-router'
import hiHandler from './handlers/hi-handler'
import generateMatchHandler from './handlers/generate-match-handler'

const router = new Router()

router.cors({
  allowOrigin: '*',
  allowMethods: '*',
  allowHeaders: '*'
})

router.get('/', hiHandler)
router.get('/hi', hiHandler)
router.get('/generate-match', generateMatchHandler)

export default router