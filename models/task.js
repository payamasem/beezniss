// var models = require("./");

'use strict';
module.exports = function(sequelize, DataTypes) {
  var Task = sequelize.define("Task", {
    heading: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      default: null
    },
    due_date: {
      type: DataTypes.DATE,  //<–– ????
      allowNull: true
    }
  }, {underscored: true, timestamps: false});


  Task.associate = function(models) {
    Task.belongsToMany(models.User, {
      through: 'Task_User',
      // foreignKey: "checklist_item_id"
    });
    Task.hasMany(models.Checklist_Item);
  };

  return Task;
};