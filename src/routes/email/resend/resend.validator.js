const EMAIL_REGEX = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/

const validateEmail = email => EMAIL_REGEX.test(email)

const resendEmailValidator = async query => {
  const errors = []
  if (!query.email || !validateEmail(query.email)) { errors.push({ message: 'Informe um email válido', path: 'query.email' }) }

  return errors
}

const validator = async (ctx, next) => {
  const result = await resendEmailValidator(ctx.request.query)
  if (result.length) {
    ctx.status = 400
    ctx.body = { errors: result }
  }
  else return next()
}

module.exports = { validator }