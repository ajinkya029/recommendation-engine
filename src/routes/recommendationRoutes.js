const router = require("express").Router();
const controller = require("../controllers/recommendationController");
router.get("/:userId", controller.getRecommendations);
module.exports = router;
