const accessTokenController = require('../controllers').accessTokenController
var express = require('express')
var router = express.Router()

router.post("/", accessTokenController.createAccessToken)
router.get("/all", accessTokenController.findAllAccessTokens)

module.exports = router;