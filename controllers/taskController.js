const db = require("../models");

// Defining methods for the taskController
module.exports = {
  findAll: function(req, res) {
    console.log("findAll in controller triggered");
    db.Task
      .findAll({
        order: ['due_date', 'DESC'],
        include: [
          { model: User }, 
          { model: Project }, 
          { model: Checklist_Item }
        ]
      })
      .then(data => {
        console.log("db.Task findAll res data: \n", data[0].dataValues);
        res.json(data[0].dataValues);
      })
      .catch(err => res.status(422).json(err));
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
    console.log("req.body to be used for creating new: ", req.body);
    db.Task
      .create({
        heading: req.body.heading,
        description: req.body.description,
        due_date: req.body.due_date,
        checklist_item_id: req.body.checklist_item_id,
        project_id: req.body.project_id,
        user_id: req.body.user_id
      })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
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
