const { Sequelize: { INTEGER, STRING, DATE }, sequelize } = require('./index')

const emailConfirmation = sequelize.define('emailConfirmations', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  token: {
    type: STRING,
    allowNull: false
  },
  createdAt: {
    field: 'created_at',
    type: DATE
  },
  updatedAt: {
    field: 'updated_at',
    type: DATE
  }
})

module.exports = emailConfirmation