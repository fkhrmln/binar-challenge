'use strict';

const bcrypt = require('bcrypt');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Users', [
      {
        id: '34b108e0-684f-468f-a472-ef363e391ec2',
        email: 'superadmin@gmail.com',
        password: await bcrypt.hash('superadmin', 10),
        name: 'Super Admin',
        role: 'superadmin',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
