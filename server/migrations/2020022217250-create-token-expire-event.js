'use strict';

module.exports = {
  up: (queryInterface) =>
    queryInterface.sequelize.query(`
      CREATE EVENT expireToken
      ON SCHEDULE AT CURRENT_TIMESTAMP + INTERVAL 1 DAY
      DO
      DELETE FROM email_confirmation WHERE created_at < DATE_SUB(NOW(), INTERVAL 1 DAY);
    `),
  down: (queryInterface) =>
    queryInterface.sequelize.query(`DROP EVENT IF EXISTS expireToken`)
}
