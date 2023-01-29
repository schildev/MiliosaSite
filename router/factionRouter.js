const express = require("express");
const Router = express.Router();
const multer = require("multer");
const { requireAdminAuth, requireFactionAuth, checkUser } = require("../authMiddleware");

const imageMimeTypes = {
    "image/jpg": ".jpg",
    "image/jpeg": ".jpeg",
    "image/png": ".png",
    "image/gif": ".gif",
    "image/svg+xml": ".svg",
    "image/x-icon": ".ico",
    "image/tiff": ".tiff",
    "image/bmp": ".bmp",
    "image/webp": ".webp"
  };
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'media/factions/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const extension = imageMimeTypes[file.mimetype]
      cb(null, file.fieldname + '-' + uniqueSuffix + extension)
    }
  })
const upload = multer({ storage: storage })

const controller = require("../controllers/factionController");

Router.get("/", controller.factions_index_get);

Router.get("/faction/:id", controller.faction_info_get);

Router.get("/create", requireAdminAuth,controller.factions_create_get);

Router.get("/modificate/:id", requireFactionAuth, controller.faction_modificate_get);

Router.post("/modificate/:id", checkUser, requireFactionAuth, upload.single("image"), controller.faction_modificate_post);

Router.post("/create", requireAdminAuth, upload.single("image"), controller.factions_create_post);

Router.get("/admin/faction/changemembers/:id", requireAdminAuth, controller.faction_members_change_get);

Router.post("/admin/faction/changemembers/:id", requireAdminAuth, controller.faction_members_change_post);

module.exports = Router;