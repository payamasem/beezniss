const db = require("../models");

// Defining methods for the taskController
module.exports = {
  findAll: function(req, res) {

    console.log("findAll in controller triggered");

    db.Task
      .findAll({
        include: {
          all: true
        }
      })
      .then(task_data => {

        console.log("db.Task findAll task_data: \n", task_data);
        console.log("db.Task findAll res data: \n", task_data[0].dataValues);

        db.Project
          .findAll({
            include: {
              all: true
            }
          }).then(project_data => {
            let d_object = {
              Projects: project_data,
              Tasks: task_data//,
              // checklist_items: checklist_data,
              // users: user_data
            };

            console.log("full d_object to be sent back: ", d_object);
            res.json(d_object);
          });

      })
      .catch(err => console.log("findAll error = ", err));

      // .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
    db.Task
      .findOne({
        where: {
          id: req.params.id
        }
      })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
    console.log("taskController ––> req.body to be used for creating new: ", req.body);
    db.Task
      .create({
        heading: req.body.heading,
        description: req.body.description,
        due_date: req.body.due_date,
        checklist_item_id: req.body.checklist_item_id,
        project_id: req.body.project_id,
        user_id: req.body.user_id
      })
      .then(data => res.json(data))
      .catch(err => {
        console.log("taskController ––> the .catch: ", err);
        res.status(422).json(err)
      });
  },
  update: function(req, res) {
    db.Task
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
    db.Task
      .destroy({ 
        where: { 
          id: req.params.id 
        }
      })
      .then(data => res.json(data))
      .catch(err => res.status(422).json(err));
  }
};
