// routes.api.currentUser.index.js

const router = require("express").Router();
const passport = require("passport");
const usersController = require("../../../controllers/usersController");

// @route GET api/users/currentUser
// @desc Return current user
// @access Private
router
    .route("/")
    .get(
        passport.authenticate("jwt", { session: false }),
        usersController.currentUser
    )

// @route GET api/users/currentUser/favorites
// @desc Return current user
// @access Private
router
    .route("/favorites")
    .get(
        passport.authenticate("jwt", { session: false }),
        usersController.currentUserFavoritedShows
    )
    .post(
        passport.authenticate("jwt", { session: false }),
        usersController.addToFavorites
    )

// @route GET api/users/currentUser/search
// @desc Return current user
// @access Private
router
    .route("/search")
    .get(
        passport.authenticate("jwt", { session: false }),
        usersController.currentUserSearchResponse
    )

// @route GET/POST api/users/currentUser/watchlist
// @desc Return current user
// @access Private
router
    .route("/watchlist")
    .get(
        passport.authenticate("jwt", { session: false }),
        usersController.currentUserWatchlist
    )
    .post(
        passport.authenticate("jwt", { session: false }),
        usersController.addToWatchlist
    )
    .put(
        passport.authenticate("jwt", { session: false }),
        usersController.currentUserRemoveFromWatchlist
    )

module.exports = router;
