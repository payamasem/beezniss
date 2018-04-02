const router = require("express").Router();
const taskController = require("../../controllers/taskController");

// Matches with "/api/tasks"
router.route("/")
  .get(taskController.findAll)
  .post(taskController.create);

// Matches with "/api/tasks/:id"
router
  .route("/:id")
  .get(taskController.findById)
  .post(taskController.update)
  .delete(taskController.remove);

module.exports = router;
