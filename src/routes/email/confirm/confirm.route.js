const emailServices = require('../../../services/email.service')
const emailValidator = require('./confirm.validator')

module.exports = [{
  method: 'get',
  path: '/api/email/confirm',
  action: emailServices.confirmEmail,
  middleware: [emailValidator.validator]
}]