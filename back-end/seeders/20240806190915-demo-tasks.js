'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Tasks', [
      {
        name: 'Task 1',
        description: 'Description for Task 1',
        status: 'to do',
        Pid_person: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Task 2',
        description: 'Description for Task 2',
        status: 'in progress',
        Pid_person: 2, 
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Task 3',
        description: 'Description for Task 3',
        status: 'completed',
        Pid_person: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Tasks', null, {});
  }
};
