const router = require("express").Router();
const controller = require("../controllers/itemController");
router.post("/", controller.createItem);
router.get("/", controller.listItems);
router.get("/:id", controller.getItem);
router.post("/:id/interactions", controller.recordInteraction);
module.exports = router;
