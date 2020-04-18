const siteController = require('../controllers').siteController
var express = require('express')
var router = express.Router()

router.post("/", siteController.createSite)
router.get("/:id?", siteController.findAllSites)
router.put("/:id", siteController.updateSite)
router.delete("/:id", siteController.deleteSite)

module.exports = router;