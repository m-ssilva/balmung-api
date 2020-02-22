const userModel = require('../models/user.model')
const bcrypt = require('bcryptjs')

const createUser = async user => userModel.create(user)

const getUserByEmail = async email => userModel.findOne({ where: { email: email } })

const comparePassword = async (password, hash) => bcrypt.compare(password, hash)

const validateEmail = async email => userModel.update({ verified: true }, { where: { email: email } })

module.exports = {
  createUser,
  getUserByEmail,
  comparePassword,
  validateEmail
}