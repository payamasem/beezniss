module.exports = function(sequelize, DataTypes) {
  var Staff = sequelize.define("Staff", {
    first_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING
    },
    // student_id: {
    //   type: DataTypes.INTEGER,
    // },
    username: {
      type: DataTypes.STRING
    },
    password: {
      type: DataTypes.STRING
    },
    isAdmin: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    },
    isTeacher: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false
    }
  }, {underscored: true, timestamps: false});

  Staff.associate = function(models) {
    Staff.hasMany(models.Student, {
      // foreignKey: 'teacher_id'//,
  //     // sourceKey: 'student_id'
    });
  };

  // Staff.associate = function(models) {
  //   Staff.hasMany(models.Student, {
  //     foreignKey: 'teacher_id',
  //     sourceKey: 'student_id'
  //   });
  // };

  return Staff;
};