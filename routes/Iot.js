'use strict'

var express = require('express');
var iotController = require('../controllers/Iot');

var router = express.Router();

router.get('/stats', iotController.getStats);

module.exports = router;