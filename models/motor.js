// var models = require("./");

'use strict';
module.exports = function(sequelize, DataTypes) {
  var Motor = sequelize.define("Motor", {
    elecMotor_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    Sales_1Q2018: {
      type: DataTypes.DECIMAL(16, 2)
    },
    Sales_2Q2018: {
      type: DataTypes.DECIMAL(16, 2)
    },
    Sales_3Q2018: {
      type: DataTypes.DECIMAL(16, 2)
    },
    Sales_4Q2018: {
      type: DataTypes.DECIMAL(16, 2)
    },
    Sales_YearTotal_2018: {
      type: DataTypes.DECIMAL(16,2)
    },
    // last_modified: {
    //   type: DataTypes.DATETIME
    // }
  }, {underscored: true, timestamps: false});

  return Motor;
};