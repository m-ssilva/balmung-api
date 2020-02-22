const Sequelize = require('sequelize')
const config = require('../../configs')

let client

const getInstance = () =>
  client = new Sequelize(config.SQL.DATABASE, config.SQL.USERNAME, config.SQL.PASSWORD, {
    host: config.SQL.HOST,
    dialect: 'mysql',

    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  })

const sequelize = getInstance => client || getInstance()

module.exports = sequelize(getInstance)