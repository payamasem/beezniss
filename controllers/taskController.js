const db = require("../models");

// Defining methods for the taskController
module.exports = {
  findAll: function(req, res) {

    console.log("findAll in controller triggered");

    db.Task
      .findAll(
      // {
        // order: ['due_date', 'DESC'],
        // include: [
        //   { model: User,
        //     as: "users",
        //     required: false,
        //     attributes: ['id', 'username', 'first_name', 'last_name']}, 
        //   { model: Project,
        //     as: "projects",
        //     required: false,
        //     attributes: ['id', 'name', 'due_date'] }, 
        //   { model: Checklist_Item,
        //     as: "checklist_items" }
        // ]
      // }
      )
      .then(task_data => {

        console.log("db.Task findAll res data: \n", task_data[0].dataValues);
        console.log("db.Task findAll res data: \n", task_data[1].dataValues);
        console.log("db.Task findAll res data: \n", task_data);

        // res.json(task_data);

        db.Project.findAll({
          // include: [
          // {
          //   model: Users,
          //   as: "users",
          //   required: false
          // },
          // {
          //   model: Tasks,
          //   as: "tasks",
          //   required: false
          // }]
        })
        .then(project_data => {

          console.log("project_data = ", project_data);
          db.Project.findAll({}).then(checklist_data => {

              let d_object = {
                projects: project_data,
                tasks: task_data,
                checklist_items: checklist_data
              };

              console.log("full d_object to be sent back: ", d_object);
              res.json(d_object);
              
          });
        }).catch(err => res.status(422).json(err));

        console.log("outer layer (db.Task.findAll) –– can you still see this task_data ? ", task_data);
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
