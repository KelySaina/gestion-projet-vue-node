'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define a belongs-to relationship between Task and User
      Task.belongsTo(models.User, {
        foreignKey: 'Pid_person',
        as: 'owner'
      });
    }
  }

  Task.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.STRING, // 'to do', 'in progress', 'completed'
    Pid_person: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });

  return Task;
};
