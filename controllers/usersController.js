// controllers.usersController.js

module.exports = {

    // Control for registering a new user
    registerUser: require("./userControls/registerUser"),

    // Control for logging in a user
    loginUser: require("./userControls/loginUser"),

    //  Control for pulling the current user info
    currentUser: require("./userControls/currentUser"),

    //  Control for pulling in a user's favorites
    currentUserFavoritedShows: require("./userControls/currentUserFavorites"),

    //  Control for adding to favorites
    addToFavorites: require("./userControls/addToFavorites"),

    // Control for removing from a user's favorites
    currentUserRemoveFromFavorites: require("./userControls/currentUserRemoveFromFavorites"),
    
    //  Control for pulling in a user's Watchlist
    currentUserWatchlist: require("./userControls/currentUserWatchlist"),

    //  Control for adding to Watchlist
    addToWatchlist: require("./userControls/addToWatchlist"),

    // Control for removing from a user's watchlist
    currentUserRemoveFromWatchlist: require("./userControls/currentUserRemoveFromWatchlist"),

    // Control for pulling a user's needed data for the search function
    currentUserSearchResponse: require("./userControls/currentUserSearchResponse")
}
