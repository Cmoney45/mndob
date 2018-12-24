// controllers.usersController.js

const db = require("../../models");

function currentUserFavorites (req, res) {
    db.User
        .findById(req.user.id)
        .populate("favoritedShows", "show")
        .then(populatedUser => {

            res.json({
                watchList: populatedUser.favoritedShows,
                name: populatedUser.name,
                // email: populatedUser.email
            });
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
}

module.exports = currentUserFavorites;
