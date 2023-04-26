import { Connection, connect } from '@planetscale/database'

const config = {
  database: 'otaku-db',
  username: '85ozcgqdw0yi3ukhvilq',
  host: 'aws.connect.psdb.cloud',
  password: 'pscale_pw_SfiFzJQlax5q9tzdVV3s3nbQ7viGzuz9CUAqaxERNVh'
}

const conn: Connection = connect(config)

export { conn }