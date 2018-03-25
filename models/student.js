
module.exports = function(sequelize, DataTypes) {
  var Student = sequelize.define("Student", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birth_date: {
      type: DataTypes.STRING,
      allowNull: false
    },
    // parent_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true
    // },
    // teacher_id: {
    //   type: DataTypes.INTEGER,
    //   allowNull: true
    // },
    asthma: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    allergy: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    epi_pen: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    chronic_condition: {
      type: DataTypes.TEXT,
      allowNull: true
    // },
    // created_at: {
    //   type: DataTypes.DTIME
    // },
    // updated_at: {
    //   type: DataTypes.TIME
    }
  }, {underscored: true, timestamps: false});

  Student.associate = function(models) {
  //   // Student.belongsToMany(models.Parent, {
  //     // through: "family",
  //     // foreignKey: "student_id",
  //     // otherKey: "parent_id"
  //   // });
    // Student.belongsTo(models.Staff, {
    //   foreignKey: "teacher_id",
    //   // targetKey: "student_id"
    // });
    
    Student.belongsTo(models.Parent, {
      foreignKey: "student_id"
    });
  };

  return Student;
};
