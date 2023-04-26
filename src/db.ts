import { Connection, connect } from '@planetscale/database'

const config = {
  host: '',
  username: '',
  password: ''
  
}

const conn: Connection = connect(config)

export { conn }