// routes.api.index.js

const router = require("express").Router();
const showRoutes = require("./shows");
const externalRoutes = require("./external");
const userRoutes = require("./users");

// router.use("/shows", showRoutes);
router.use("/external", externalRoutes);
router.use("/users", userRoutes);

module.exports = router;
