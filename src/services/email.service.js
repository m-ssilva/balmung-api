const emailLib = require('../lib/email-confirmation.lib')
const userLib = require('../lib/user.lib')

const confirmEmail = async ctx => {
  const { token } = ctx.request.query
  const emailConfirmationDb = await emailLib.getConfirmationRegistry(token)
  if (!emailConfirmationDb) throw new Error('EXPIRED_CONFIRMATION_TOKEN')
  const userDb = await userLib.getUserByEmail(emailConfirmationDb.email)
  if (userDb.verified) throw new Error('EMAIL_ALREADY_VERIFIED')
  await userLib.validateEmail(userDb.email)
  ctx.status = 200
  ctx.body = { message: 'O seu email foi verificado' }
}

module.exports = { confirmEmail }