const emailConfirmationModel = require('../models/email-confirmation.model')

const createConfirmationRegistry = async (email, token) => emailConfirmationModel.create({ email, token })

const getConfirmationRegistry = async token => emailConfirmationModel.findOne({ where: { token } })

module.exports = { createConfirmationRegistry, getConfirmationRegistry }