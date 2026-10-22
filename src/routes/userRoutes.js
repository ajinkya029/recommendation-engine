const router = require("express").Router();
const controller = require("../controllers/userController");
router.post("/", controller.createUser);
router.get("/:id", controller.getUser);
router.patch("/:id/preferences", controller.updatePreferences);
module.exports = router;
