const emailLib = require('../../../lib/email-confirmation.lib')

const emailConfirmationValidator = async query => {
  const errors = []
  const tokenExists = await emailLib.getConfirmationRegistry(query.token).catch(() => null)
  if (!query.token) { errors.push({ message: 'Informe um token de confirmação válido', path: 'query.token' }) }
  if (query.token && !tokenExists) { errors.push({ message: 'Token de confirmação inválido ou expirado', path: 'query.token' }) }

  return errors
}

const validator = async (ctx, next) => {
  const result = await emailConfirmationValidator(ctx.request.query)
  if (result.length) {
    ctx.status = 400
    ctx.body = { errors: result }
  }
  else return next()
}

module.exports = { validator }