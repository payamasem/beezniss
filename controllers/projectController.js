const db = require("../models");

// Defining methods for the taskController
module.exports = {
  findAll: function(req, res) {

    console.log("findAll in controller triggered");

    db.Project
      .findAll({
        include: {
          all: true
        }
      })
      .then(Project_data => {

        console.log("db.Project findAll Project_data: \n", Project_data);
        console.log("db.Project findAll res data: \n", Project_data[0].dataValues);

        db.Project
          .findAll({
            include: {
              all: true
            }
          }).then(project_data => {
            let d_object = {
              Projects: project_data,
              Projects: Project_data//,
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
      .then(data => res.json(data))
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
  }
};
