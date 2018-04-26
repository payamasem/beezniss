const db = require("../models");

// Defining methods for the taskController
module.exports = {
  findAll: function(req, res) {
    db.Project
      .findAll({
        include: {
          all: true
        }
      })
      .then(project_data => {
        let d_object = {
          Projects: project_data,
        };
        res.json(d_object);
      })
      .catch(err => console.log(err));
  },
  findById: function(req, res) {
    db.Project
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log("projectController ––> req.body to be used for creating new: ", req.body);
    db.Project
      .create({
        name: req.body.name,
        due_date: req.body.due_date
      })
      .then(newProjectData => {
        for (let i = 0; i < req.body.users.length; i++) {
          db.User.findOne({ where: {id: req.body.users[i]} }).then(user => {
            db.Project.findOne({ where: {id: newProjectData.id} }).then(project => {
              project.addUser([user]).then(data => {
                console.log('newProjUserData: ', data);
                res.json(newProjectData);
              });
            });
          });
        }
      })
      .catch(err => {
        console.log("projectController ––> the .catch: ", err);
        res.status(422).json(err)
      });
  },
  update: function(req, res) {
    db.Project
      .update({
          heading: req.body.heading,
          description: req.body.description,
          due_date: req.body.due_date,
          checklist_item_id: req.body.checklist_item_id,
          project_id: req.body.project_id,
          user_id: req.body.user_id
        }, { 
          where: {
            id: req.params.id
          }
        })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
    db.Project
      .destroy({ 
        where: { 
          id: req.params.id 
        }
      })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  getUsers: function(req, res) {
    db.User
      .findAll({})
      .then(user_data => res.json(user_data))
      .catch(err => console.log(err));
  }
};
