const router = require("express").Router();
const taskController = require("../../controllers/taskController");
const projectController = require("../../controllers/projectController");
const checklistController = require("../../controllers/checklistController");

// Matches with "/api/tasks"
router.route("/")
  .get(taskController.findAll)
  .post(taskController.create);

// Matches with "api/tasks/checklistitem"
router.route("/checklistitem")
	.post(checklistController.create);

router.route("/checklistitem/:id")
  .get(checklistController.findById)
  .post(checklistController.update);

// Matches with "api/tasks/project"
router.route("/project")
	.post(projectController.create);

// Matches with "api/tasks/users"
router.route("/users")
  .get(projectController.getUsers);

// Matches with "/api/tasks/:id"
router.route("/:id")
  .get(taskController.findById)
  .post(taskController.update)
  .delete(taskController.remove);

module.exports = router;
