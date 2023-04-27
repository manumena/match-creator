import { RouterHandler } from '@tsndr/cloudflare-worker-router'
import { Env } from '../../env'

const hiHandler: RouterHandler<Env> = ({ res }) => {
  res.body = 'Hi'
}

export default hiHandler