const dejuleController = require('../controllers').dejuleController
var express = require('express')
var router = express.Router()

router.get("/operation/addition", dejuleController.safeToAdd)
router.get("/operation/update", dejuleController.safeToUpdate)
router.get("/operation/delete", dejuleController.safeToDelete)

module.exports = router;