const healthService = require('../../services/health.service')

module.exports = [{
  method: 'get',
  path: '/api/health',
  action: healthService.get
}]