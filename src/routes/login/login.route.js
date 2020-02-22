const loginServices = require('../../services/login.service')
const loginValidator = require('./login.validator')

module.exports = [{
  method: 'post',
  path: '/api/login',
  action: loginServices.authenticateUser,
  middleware: [loginValidator.validator]
}]