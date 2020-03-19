'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.createTable('emailConfirmations', {
      id: {
        type: Sequelize.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      email: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      token: {
        type: Sequelize.DataTypes.STRING,
        allowNull: false
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
  down: (queryInterface) => queryInterface.dropTable('emailConfirmations')
}
