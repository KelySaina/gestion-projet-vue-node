'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const users = [
      {
        name: 'Alice',
        lastname: 'Smith',
        email: 'alice.smith@example.com',
        password: 'alice.password',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Bob',
        lastname: 'Johnson',
        email: 'bob.johnson@example.com',
        password: 'bob.password',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ];

    // Hash passwords
    for (let user of users) {
      user.password = await bcrypt.hash(user.password, 10);
    }

    await queryInterface.bulkInsert('Users', users, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
