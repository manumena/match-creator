import { connect } from '@planetscale/database'
import { Env } from './env'

function getDBConnection(env: Env) {
  const config = {
    username: env.DB_USERNAME,
    host: env.DB_HOST,
    password: env.DB_PASSWORD
  }
  return connect(config)
}

export { getDBConnection }
