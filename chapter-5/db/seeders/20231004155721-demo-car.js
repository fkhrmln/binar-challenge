'use strict';

const uuidv4 = require('uuid').v4;

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('Cars', [
      {
        id: uuidv4(),
        name: 'Toyota Avanza',
        type: 'small',
        image: './1697979369531.jpeg',
        capacity: 2,
        rentPerDay: 1000000,
        description:
          'Toyota Avanza is a versatile and compact MPV (Multi-Purpose Vehicle) that combines style, space, and practicality. With its sleek design, comfortable interior, and advanced features, the Avanza is the perfect choice for families and individuals alike.',
        availableAt: new Date(),
        createdBy: '34b108e0-684f-468f-a472-ef363e391ec2',
        updatedBy: '34b108e0-684f-468f-a472-ef363e391ec2',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Cars', null, {});
  },
};
