// controllers.userControls.currentUserRemoveFromWatchlist.js

const db = require("../../models");

function currentUserRemoveFromWatchlist (req, res) {
    const userID = req.user.id;

    // Find show and pull the user's ID from the show's watchlist
    db.Show.findOneAndUpdate(
        {
            "show.id": req.body.show.id

        },
        { $pull: { usersWhoHaveOnWatchlist: userID } },
        { new: true }
    )
        .then(show => {
            // Then find user and pull the show's ID from the 
            db.User
                .findByIdAndUpdate(
                    userID,
                    { $pull: { watchList: show._id } },
                    { new: true }
                )
                .then(
                    res.json({
                        watchlist: "User Removed from Watchlist",
                        user: "Show removed from user watchlist"
                    })
                )
                .catch(err => res.status(422).json(err));
        })
        .catch(err => res.status(422).json(err))
}

module.exports = currentUserRemoveFromWatchlist;
