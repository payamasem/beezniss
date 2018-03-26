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
      allowNull: false
    },
    due_date: {
      type: DataTypes.DATE,  //<–– ????
      allowNull: false
    }
  }, {underscored: true, timestamps: false});


  Task.associate = function(models) {
    Task.belongsToMany(models.Checklist_Item, {
      through: [Checklist_User],
      // foreignKey: "checklist_item_id"
    });
  };

  return Task;
};