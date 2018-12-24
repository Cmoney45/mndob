// controllers.usersControls.addToFavorites.js

const db = require("../../models");

function addToFavorites (req, res) {
    const userID = req.user.id;

    // See if the show exists in the Show Collection
    db.Show.findOne({ "show.id": req.body.show.id })
        .then(show => {
            // If the show exists, stringify the list of users who have included
            if (show) {
                const showID = show._id;

                showFavoritesUsers = JSON.stringify(show.usersWhoHaveFavorited);

                // If the user has included it already send back message.
                if (showFavoritesUsers.includes(userID)) {
                    const alreadyOnFavoritesResponse = "User is already on favorited list";

                    // Then check the show's _id is on their Favorited
                    db.User.findById(userID)
                        .then(foundUser => {
                            // Save user's favorites as an array
                            usersFavorites = JSON.stringify(foundUser.favoritedShows);

                            // If the show is in the user's Favorites send back basic response
                            if (usersFavorites.includes(showID)) {
                                // console.log("Step 1")
                                res.send(
                                    {
                                        showsFavorites: alreadyOnFavoritesResponse,
                                        usersFavorites: "User has Favorited too."
                                    });
                            } else {
                                // If user does not have on Favorites, add it
                                db.User
                                    .findByIdAndUpdate(userID,
                                        { $push: { favoritedShows: showID } },
                                        { new: true }
                                    )
                                    .then(userWithShow => {
                                        // console.log("Step 2")
                                        res.send({
                                            showsFavorites: alreadyOnFavoritesResponse,
                                            usersFavorites: "Show was not on user's favorites but was added."
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
                    // If user is not already on show's user favorites
                    db.Show.findOneAndUpdate(
                        // Search for the show object being pushed
                        {
                            "show.id": req.body.show.id
                        },
                        // Push the user's ID to the "Has on favorites" array
                        { $push: { usersWhoHaveFavorited: userID } }
                    )
                        .then(initialSearchRes => {
                            // Then check the show's _id is on their favorites
                            db.User.findById(userID)
                                .then(foundUser => {
                                    // Save user's favorites as an array
                                    usersFavorites = JSON.stringify(foundUser.favoritedShows);

                                    // If the show is in the user's favorites send back basic response
                                    if (usersFavorites.includes(showID)) {
                                        // console.log("Step 5")
                                        res.send(
                                            {
                                                showsFavorites: "User was not on Favorites",
                                                usersFavorites: "User has on their Favorites already."
                                            }
                                        );
                                    } else {
                                        // Else update user's favorites to include show
                                        db.User
                                            .findByIdAndUpdate(userID,
                                                { $push: { favoritedShows: showID } },
                                                { new: true }
                                            )
                                            .then(userWithShow => {
                                                // console.log("Step 6")
                                                res.send(
                                                    {
                                                        showsFavorites: "Added user to show's favorites",
                                                        usersFavorites: "Added show to user's favorites"
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
                // If the show does not exist, add to the database with and update user's Favorites
            } else {
                db.Show
                    .create({
                        usersWhoHaveOnFavorites: userID,
                        show: req.body.show
                    })
                    // After it is added, add the show's ID to the user's Favorites
                    .then(dbShow => db.User.findByIdAndUpdate(userID,
                        { $push: { favoritedShows: dbShow._id } },
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

module.exports = addToFavorites;
