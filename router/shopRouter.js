const express = require("express");
const controller = require("../controllers/shopController.js")
const Router = express.Router()
const multer = require("multer");
const { requireAdminAuth } = require("../authMiddleware.js");
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
      cb(null, 'media/images/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const extension = imageMimeTypes[file.mimetype]
      cb(null, file.fieldname + '-' + uniqueSuffix + extension)
    }
  })
  
const upload = multer({ storage: storage })

Router.get("/", controller.shop_index_get);

Router.get("/create", requireAdminAuth,controller.shop_create_product_get);

Router.post("/create", requireAdminAuth, upload.single("image"), controller.shop_create_product_post);

module.exports = Router;