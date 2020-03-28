const userLib = require('../lib/user.lib')
const sendGridLib = require('../lib/send-grid.lib')

const createUser = async ctx => {
  const user = ctx.request.body
  await Promise.all([
    userLib.createUser(user),
    sendGridLib.sendConfirmationEmail(user.email)
  ])
  ctx.status = 201
  ctx.body = { message: 'User created' }
}

module.exports = {
  createUser
}