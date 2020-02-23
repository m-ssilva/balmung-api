const emailServices = require('../../../services/email.service')
const resendValidator = require('./resend.validator')

module.exports = [{
  method: 'get',
  path: '/api/email/resend',
  action: emailServices.resendEmail,
  middleware: [resendValidator.validator]
}]