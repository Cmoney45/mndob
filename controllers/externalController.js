const axios = require("axios");

module.exports = {
    searchShows: function (req, res) {
        axios
            .get(`http://api.tvmaze.com/search/shows?q=${req.params.title}`)
            .then(({ data: result }) => res.json(result))
            .catch(err => res.status(422).json(err));
    }
}
