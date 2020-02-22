const { Sequelize: { INTEGER, STRING, BOOLEAN, DATE }, sequelize } = require('./index')
const bcrypt = require('bcryptjs')

const user = sequelize.define('user', {
  id: {
    type: INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: STRING,
    allowNull: false
  },
  email: {
    type: STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: STRING,
    allowNull: false
  },
  verified: {
    type: BOOLEAN,
    allowNull: false,
    defaultValue: false
  },
  createdAt: {
    field: 'created_at',
    type: DATE
  },
  updatedAt: {
    field: 'updated_at',
    type: DATE
  }
}, {
    hooks: {
      beforeCreate: async user => {
        const salt = await bcrypt.genSalt()
        user.password = await bcrypt.hash(user.password, salt)
      }
    }
  })

module.exports = user