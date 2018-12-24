// controllers.userControls.currentUserRemoveFromFavorites.js

const db = require("../../models");

function currentUserRemoveFromFavorites (req, res) {
    const userID = req.user.id;

    // Find show and pull the user's ID from the show's favorites
    db.Show.findOneAndUpdate(
        {
            "show.id": req.body.show.id

        },
        { $pull: { usersWhoHaveFavorited: userID } },
        { new: true }
    )
        .then(show => {
            console.log(show);
            // Then find user and pull the show's ID from the favorites
            db.User
                .findByIdAndUpdate(
                    userID,
                    { $pull: { favoritedShows: show._id } },
                    { new: true }
                )
                .then(
                    res.json({
                        watchlist: "User Removed from Favorites",
                        user: "Show removed from user's Favorites"
                    })
                )
                .catch(err => res.status(422).json(err));
        })
        .catch(err => res.status(422).json(err))
}

module.exports = currentUserRemoveFromFavorites;
