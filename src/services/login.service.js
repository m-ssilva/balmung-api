const userLib = require('../lib/user.lib')

const authenticateUser = async ctx => {
  const user = ctx.request.body
  const userDb = await userLib.getUserByEmail(user.email)
  if (!userDb.verified) throw new Error('NOT_VERIFIED')
  const isPasswordCorrect = await userLib.comparePassword(user.password, userDb.password)
  if (!isPasswordCorrect) throw new Error('INCORRECT_PASSWORD')
  ctx.status = 200
  ctx.body = { message: 'Seja bem vindo!' }
}

module.exports = {
  authenticateUser
}