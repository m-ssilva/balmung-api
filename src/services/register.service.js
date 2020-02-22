const userLib = require('../lib/user.lib')
const sendGridLib = require('../lib/send-grid.lib')

const createUser = async ctx => {
  const user = ctx.request.body
  await userLib.createUser(user)
  await sendGridLib.sendConfirmationEmail(user.email)
  ctx.status = 201
  ctx.body = { message: 'User created' }
}

module.exports = {
  createUser
}