import { RouterHandler } from '@tsndr/cloudflare-worker-router'

const hiHandler: RouterHandler<any> = ({ res }) => {
  res.body = 'Hi'
}

export default hiHandler