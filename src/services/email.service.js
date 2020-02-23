const emailLib = require('../lib/email-confirmation.lib')
const userLib = require('../lib/user.lib')
const sendGridLib = require('../lib/send-grid.lib')

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

const resendEmail = async ctx => {
  const { email } = ctx.request.query
  const userDb = await userLib.getUserByEmail(email)
  if (!userDb) throw new Error('EMAIL_NOT_REGISTERED')
  if (userDb.verified) throw new Error('EMAIL_ALREADY_VERIFIED')
  await emailLib.deleteConfirmationRegistryByEmail(email)
  await sendGridLib.sendConfirmationEmail(email)
  ctx.status = 200
  ctx.body = { message: 'Foi enviado um novo código de confirmação para o seu email' }
}

module.exports = { confirmEmail, resendEmail }