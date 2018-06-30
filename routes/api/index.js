const router = require("express").Router();
const newsRoutes = require("./news");

// News routes
router.use("/news", newsRoutes);

module.exports = router;
