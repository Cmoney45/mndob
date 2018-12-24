// controllers.userControls.currentUserWatchlist.js

const db = require("../../models");

function currentUserWatchlist (req, res) {
    db.User
        .findById(req.user.id)
        .populate("watchList", "show")
        .then(populatedUser => {

            res.json({
                watchList: populatedUser.watchList,
                name: populatedUser.name,
                // email: populatedUser.email
            });
        })
        .catch(function (err) {
            // If an error occurred, send it to the client
            res.json(err);
        });
}

module.exports = currentUserWatchlist;
