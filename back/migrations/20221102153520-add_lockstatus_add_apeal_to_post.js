"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.addColumn("Posts", "lockStatus", {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0,
      }),

      queryInterface.addColumn("Posts", "appeal", {
        type: Sequelize.TEXT,
        allowNull: true,
      }),
    ]);
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
