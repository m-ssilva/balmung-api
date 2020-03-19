const userLib = require('../../lib/user.lib')
const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

const validateEmail = email => EMAIL_REGEX.test(email)

const createAccountValidator = async body => {
  const errors = []
  const emailValidator = await userLib.getUserByEmail(body.email).catch(() => null)
  if (!body.email || !validateEmail(body.email)) { errors.push({ message: 'Informe um email válido', path: 'body.email' }) }
  if (!body.password) { errors.push({ message: 'Informe uma senha válida', path: 'body.password' }) }
  if (!body.name) { errors.push({ message: 'Informe um nome válido', path: 'body.name' }) }
  if (emailValidator) { errors.push({ message: 'Email já está em uso', path: 'body.email' }) }

  return errors
}

const validator = async (ctx, next) => {
  const result = await createAccountValidator(ctx.request.body)
  if (result.length) {
    ctx.status = 400
    ctx.body = { errors: result }
  }
  else return next()
}

module.exports = { validator }