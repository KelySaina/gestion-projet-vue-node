'use strict';
const {
  Model
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // Define a one-to-many relationship between User and Task
      User.hasMany(models.Task, {
        foreignKey: 'Pid_person',
        as: 'tasks'
      });
    }
  }
  
  User.init({
    name: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING // 'admin' or 'normal'
  }, {
    sequelize,
    modelName: 'User',
  });
  
  return User;
};
