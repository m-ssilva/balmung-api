module.exports = {
  API: {
    PORT: process.env.PORT || 3000
  },
  SQL: {
    database: process.env.DB_DATABASE || 'node_api',
    host: process.env.DB_HOST || 'localhost',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'root',
    dialect: 'mysql'
  },
  SEND_GRID: {
    token: process.env.SEND_GRID_TOKEN
  },
  JWT: {
    secretKey: process.env.SECRET_KEY_JWT || `secretToken`,
    expirationTime: process.env.EXPIRATION_TIME_JWT || 86400
  }
}