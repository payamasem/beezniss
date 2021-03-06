const router = require("express").Router();
const salesController = require("../../controllers/salesController");

// Matches with "/api/sales"

router.route("/")
  .get(salesController.findAll)

// Matches with "/api/sales/cookies"
router.route("/cookies")
  .post(salesController.createCookie);

// =======================----------------------------
// for FUTURE DEVELOPMENT:  inputting new sales data
// =======================----------------------------


// Matches with "/api/sales/:id"
router
  .route("/:id")
  .get()
  .put(salesController.update)
  .delete(salesController.remove);

module.exports = router;
