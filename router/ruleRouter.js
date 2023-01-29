const express = require("express");
const router = require("../../nodeProject/serverCode/routes/blogRoute");
const { requireAdminAuth } = require("../authMiddleware");
const controller = require("../controllers/controller");

ruleRouter = express.Router();

ruleRouter.get("/", controller.show_rules_get)

ruleRouter.get("/create", requireAdminAuth,controller.create_rules_get);

ruleRouter.post("/create", requireAdminAuth, controller.create_rules_post);

module.exports = ruleRouter;