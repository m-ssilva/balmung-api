const emailConfirmationModel = require('../models/email-confirmation.model')

const createConfirmationRegistry = async (email, token) => emailConfirmationModel.create({ email, token })

const getConfirmationRegistry = async token => emailConfirmationModel.findOne({ where: { token } })

const deleteConfirmationRegistryByEmail = async email => emailConfirmationModel.destroy({ where: { email } })

module.exports = { createConfirmationRegistry, getConfirmationRegistry, deleteConfirmationRegistryByEmail }