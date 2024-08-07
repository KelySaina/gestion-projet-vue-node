'use strict';

const bcrypt = require('bcryptjs');

module.exports = {
  up: async (queryInterface, Sequelize) => {

    const users = [
      {
        name: 'Test',
        lastname: 'User',
        email: 'test.user@project.management',
        password: 'user',
        role: 'user',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Test',
        lastname: 'Admin',
        email: 'test.admin@project.management',
        password: 'admin',
        role: 'admin',
        createdAt: new Date(),
        updatedAt: new Date()
      },
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
