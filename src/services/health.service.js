const { sequelize: db } = require('../models')

const checkDbHealth = () =>
  db.authenticate()
    .then(() => true)
    .catch(() => false)

const get = async ctx => {
  ctx.status = 200
  ctx.body = {
    api: true,
    database: await checkDbHealth()
  }
}

module.exports = { get }