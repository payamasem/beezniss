
module.exports = function(sequelize, DataTypes) {
  var Checklist_Item = sequelize.define("Checklist_Item", {
    text: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  }, {underscored: true, timestamps: false});
  
  return Checklist_Item;
};
