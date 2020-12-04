const router = require("express").Router();
const path = require("path");

router.get("/", (req, res)=> res.render("homepage"));
router.get("/googlemap", (req, res)=> res.render("googlemap"));
router.get("/harvardart", (req, res)=> res.render("harvardart"));
router.get("/metropolitanart", (req, res)=> res.render("metropolitanart"));

module.exports = router
