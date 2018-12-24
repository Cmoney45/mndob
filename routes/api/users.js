// routes.api.users.js

const router = require("express").Router();
const usersController = require("../../controllers/usersController");
const currentUserRoutes = require("./currentUser");

// @route POST api/users/register
// @desc Register user
// @access Public
router
    .route("/register")
    .post(usersController.registerUser)

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router
    .route("/login")
    .post(usersController.loginUser);

// @route api/users/currentUser
// @desc Return current user
// @access Private
router.use("/currentUser", currentUserRoutes)

module.exports = router;
