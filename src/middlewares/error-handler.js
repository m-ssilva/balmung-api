const errorSchema = require('../helpers/error-schemas')

const errorHandler = async (ctx, next) => {
  try {
    await next()
  } catch (err) {
    ctx.status = errorSchema[err.message] ? errorSchema[err.message].status : errorSchema['DEFAULT'].status
    ctx.body = errorSchema[err.message] ? errorSchema[err.message].body : errorSchema['DEFAULT'].bo
  }
}

module.exports = errorHandler