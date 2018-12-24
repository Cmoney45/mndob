// controllers.userControls.currentUserSearchResponse.js

const db = require("../../models");

function currentUserSearchResponse (req, res) {
    const userID = req.user.id;

    db.User
        .findById(userID)
        // .populate("favoritedShows", "show")
        .populate("watchList", "show")
        .then(populatedUser => {
            watchlistShowIdArray = [];

            const usersWatchlist = populatedUser.watchList;
            // res.json(typeof usersWatchlist[0]);

            for (i of usersWatchlist) {
                // console.log(usersWatchlist[i])
                watchlistShowIdArray.push(i.show.id);
            }

            res.send(watchlistShowIdArray)
        })
}

module.exports = currentUserSearchResponse;
