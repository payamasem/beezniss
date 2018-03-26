const router = require("express").Router();
const taskRoutes = require("./taskRouter");
const salesRoutes = require("./salesRouter");

// TaskManager & SalesTracker routes
router.use("/tasks", taskRoutes);
router.use("/sales", salesRoutes);

module.exports = router;
