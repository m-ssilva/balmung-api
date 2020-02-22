'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('users', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
      },
      verified: {
        type: Sequelize.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false
      },
      createdAt: {
        field: 'created_at',
        type: Sequelize.DataTypes.DATE
      },
      updatedAt: {
        field: 'updated_at',
        type: Sequelize.DataTypes.DATE
      },
    }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('users')
}
