// controllers.userControls.getCurrentUser.js

function getCurrentUser (req, res) {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
    });
}

module.exports = getCurrentUser;
