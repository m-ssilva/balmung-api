const sendgrid = require('@sendgrid/mail')
const emailConfirmationLib = require('./email-confirmation.lib')
const { SEND_GRID: { token } } = require('../../configs')
const crypto = require('crypto')
sendgrid.setApiKey(token)

const sendConfirmationEmail = async email => {
  const current_date = new Date().valueOf().toString()
  const random = Math.random().toString()
  const tokenHash = await crypto.createHash('sha1').update(current_date + random).digest('hex')
  await emailConfirmationLib.createConfirmationRegistry(email, tokenHash)
  sendgrid.send({
    to: email,
    from: 'balmung@email-confirmation.com',
    templateId: 'd-3882205804c249578579d4693acfffaf',
    dynamic_template_data: {
      subject: 'Confirmação de email - Balmung',
      token: tokenHash
    }
  })
}

module.exports = { sendConfirmationEmail }