module.exports = function(sequelize, DataTypes) {
  var Project_User = sequelize.define("Project_User", {}, 
    {underscored: true, timestamps: false});
  
  var Project = sequelize.define("Project", {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    due_date: {
      type: DataTypes.DATE, //<––– ???????
      allowNull: true
    }
  }, {underscored: true, timestamps: false});


  Project.associate = function(models) {
    Project.hasMany(models.Task, {
      // foreignKey: 'task_id',
      // sourceKey: 'project_id'
    });
    Project.belongsToMany(models.User, {
      through: 'Project_User' //,
      // foreignKey: "project_id",    // ???????????
      // otherKey: "project_id"
    });
  };

  return Project;
};
