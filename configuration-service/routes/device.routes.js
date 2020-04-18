const deviceController = require('../controllers').deviceController
var express = require('express')
var router = express.Router()

router.get("/siteId/:siteId/isOnline/:isOnline", deviceController.findDevices)
router.post("/", deviceController.createDevice)
router.put("/id/:id", deviceController.updateDevice)
router.delete("/id/:id", deviceController.deleteDevice)


module.exports = router;