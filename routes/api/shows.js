// routes.api.shows.js

const router = require("express").Router();
const showsController = require("../../controllers/showsController");

// Matches with "/api/shows"
router.route("/")
  .get(showsController.findAll)
  .post(showsController.create);

// Matches with "/api/shows/:id"
router
  .route("/:id")
  .get(showsController.findById)
  .put(showsController.update)
  .delete(showsController.remove);

module.exports = router;
