// controllers.usersControls.addToWatchlist.js

const db = require("../../models");

function addtoWatchlist(req, res) {
    const userID = req.user.id;

    // See if the show exists in the Show Collection
    db.Show.findOne({ "show.id": req.body.show.id })
        .then(show => {
            // If the show exists, stringify the list of users who have included
            if (show) {
                const showID = show._id;

                showWatchlistUsers = JSON.stringify(show.usersWhoHaveOnWatchlist);

                // If the user has included it already send back message.
                if (showWatchlistUsers.includes(userID)) {
                    const alreadyOnWatchlistResponse = "User is already on Watch list";

                    // Then check the show's _id is on their watchlist
                    db.User.findById(userID)
                        .then(foundUser => {
                            // Save user's watchlist as an array
                            usersWatchlist = JSON.stringify(foundUser.watchList);

                            // If the show is in the user's watchlist send back basic response
                            if (usersWatchlist.includes(showID)) {
                                // console.log("Step 1")
                                res.send(
                                    {
                                        showsWatchlist: alreadyOnWatchlistResponse,
                                        usersWatchList: "User has on watchlist too."
                                    });
                            } else {
                                // If user does not have on watchlist, add it
                                db.User
                                    .findByIdAndUpdate(userID,
                                        { $push: { watchList: showID } },
                                        { new: true }
                                    )
                                    .then(userWithShow => {
                                        // console.log("Step 2")
                                        res.send({
                                            showsWatchlist: alreadyOnWatchlistResponse,
                                            usersWatchList: "Show was not on user's watchlist but was added."
                                        })
                                    })
                                    .catch(error => {
                                        // console.log("Step 3")
                                        res.json(error)
                                    })
                            }
                        })
                        .catch(error => {
                            // console.log("Step 4")
                            res.send(error)
                        })

                } else {
                    // If user is not already on show's user Watchlist
                    db.Show.findOneAndUpdate(
                        // Search for the show object being pushed
                        {
                            "show.id": req.body.show.id
                        },
                        // Push the user's ID to the "Has on watchlist" array
                        { $push: { usersWhoHaveOnWatchlist: userID } }
                    )
                        .then(initialSearchRes => {
                            // Then check the show's _id is on their watchlist
                            db.User.findById(userID)
                                .then(foundUser => {
                                    // Save user's watchlist as an array
                                    usersWatchlist = JSON.stringify(foundUser.watchList);

                                    // If the show is in the user's watchlist send back basic response
                                    if (usersWatchlist.includes(showID)) {
                                        // console.log("Step 5")
                                        res.send(
                                            {
                                                showsWatchlist: "User was not on watchlist",
                                                usersWatchList: "User has on their watchlist already."
                                            }
                                        );
                                    } else {
                                        // Else update user's watchlist to include show
                                        db.User
                                            .findByIdAndUpdate(userID,
                                                { $push: { watchList: showID } },
                                                { new: true }
                                            )
                                            .then(userWithShow => {
                                                // console.log("Step 6")
                                                res.send(
                                                    {
                                                        showsWatchlist: "Added user to show's watchlist",
                                                        usersWatchList: "Added show to user's watchlist"
                                                    }
                                                )
                                            })
                                            .catch(error => {
                                                // console.log("Step 7")
                                                res.json(error)
                                            })
                                    }
                                })
                                .catch(error => {
                                    // console.log("Step 8")
                                    res.json(error)
                                })
                        })
                        .catch(error => {
                            // console.log("Step 9")
                            res.json(error)
                        })
                }
                // If the show does not exist, add to the database with and update user's watchlist
            } else {
                db.Show
                    .create({
                        usersWhoHaveOnWatchlist: userID,
                        show: req.body.show
                    })
                    // After it is added, add the show's ID to the user's watchlist
                    .then(dbShow => db.User.findByIdAndUpdate(userID,
                        { $push: { watchList: dbShow._id } },
                        { new: true })
                    )
                    .catch(error => {
                        // console.log("Step 10");
                        res.json(error)
                    })
                    .then(updatedUser => {
                        // console.log("Step 11");
                        res.json(updatedUser);
                    })
                    .catch(error => {
                        // console.log("Step 12");
                        res.json(error);
                    })
            }
        })
}

module.exports = addtoWatchlist;
