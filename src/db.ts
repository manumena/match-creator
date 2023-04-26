import { Connection, connect } from '@planetscale/database'

const config = {
  host: 'aws.connect.psdb.cloud',
  username: 'my8rosgp4sj0w579mbxy',
  password: 'pscale_pw_sLIvnvEaktswRFx4F4fZaIeRX7qbGQl2BHqd0lexF8b'
}

const conn: Connection = connect(config)

export { conn }