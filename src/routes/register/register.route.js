const userServices = require('../../services/register.service')
const userValidator = require('./register.validator')

module.exports = [{
  method: 'post',
  path: '/api/register',
  action: userServices.createUser,
  middleware: [userValidator.validator]
}]