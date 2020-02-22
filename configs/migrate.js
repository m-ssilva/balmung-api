module.exports = {
  database: process.env.DB_DATABASE || 'node_api',
  host: process.env.DB_HOST || 'localhost',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'root',
  dialect: 'mysql'
}