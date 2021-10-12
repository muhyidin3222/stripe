'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const transaction = await queryInterface.sequelize.transaction()
    try {
      await queryInterface.createTable('auths', {
        id: {
          type: Sequelize.INTEGER,
          primaryKey: true,
          allowNull: false,
          unique: true,
          autoIncrement: true
        },
        email: {
          type: Sequelize.STRING,
          allowNull: false
        },
        role_auth_id: {
          type: Sequelize.STRING,
          // primaryKey: true,
          allowNull: false
        },
        lasts_login: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        last_activity: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
          defaultValue: Sequelize.NOW
        }
      });
      transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err
    }
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('auths');
  }
};