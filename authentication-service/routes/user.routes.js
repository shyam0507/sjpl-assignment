const userController = require('../controllers').userController
var express = require('express')
var router = express.Router()

router.post("/", userController.createUser)
router.post("/login", userController.loginUser)
router.post("/verify", userController.verifyToken)

module.exports = router;