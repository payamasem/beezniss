// Requiring bcrypt for password hashing. Using the bcrypt-nodejs version as the regular bcrypt module
// sometimes causes errors on Windows machines

var bcrypt = require("bcrypt-nodejs");

// Creating our User model
module.exports = function (sequelize, DataTypes) {
    var User = sequelize.define("User", {

        // The email cannot be null, and must be a proper email before creation
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
            // validate: {
            //   isUsername: true
            // }
        },

        // The password cannot be null
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false
        }

        // LATER:  this is where we'd add permissions boooleans

    }, {underscored: true, timestamps: false});



    User.associate = function(models) {
        User.belongsToMany(models.Project, {
            through: 'Project_User'//,
            // foreignKey: "user_id",
            // otherKey: "project_id"
        });
        User.belongsToMany(models.Task, {
            through: 'Task_User'//,
            // foreignKey: "user_id",
            // otherKey: "task_id"
        });
        User.belongsTo(models.Checklist_Item, {
            foreignKey: "user_id"
        });
    }


    // Creating a custom method for our User model. This will check if an unhashed password entered by the user can be compared to the hashed password stored in our database
    User.prototype.validPassword = function (password) {
        return bcrypt.compareSync(password, this.password);
    };
    // Hooks are automatic methods that run during various phases of the User Model lifecycle
    // In this case, before a User is created, we will automatically hash their password
    User.hook("beforeCreate", function (user) {
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    });

    return User;
};
