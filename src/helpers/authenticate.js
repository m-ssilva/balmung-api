const jwt = require('jsonwebtoken')
const { JWT: { secretKey, expirationTime } } = require('../../configs')

const signToken = async ({ id }) =>
  jwt.sign({ id }, secretKey, {
    expiresIn: expirationTime
  })

module.exports = { signToken }