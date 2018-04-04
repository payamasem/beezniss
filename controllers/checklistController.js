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
      .catch(err => console.log('THIS is the effing error: ', err));

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
    console.log("checklistController ––> req.body to be used for creating new: ", req.body);
    db.Checklist_Item
      .create({
        text: req.body.text,
        task_id: req.body.task_id
      })
      .then(data => res.json(data))
      .catch(err => {
        console.log("checklistController ––> the .catch: ", err);
        res.status(422).json(err)
      });
  },
  update: function(req, res) {
    db.Task
      .update({
          completed: req.body.completed,
          due_date: req.body.due_date,
          text: req.body.text
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
