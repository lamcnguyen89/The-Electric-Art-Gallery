const router = require("express").Router();
const htmlRoutes = require("./htmlRoutes");

//html routes
router.use("/", htmlRoutes);

module.exports = router;