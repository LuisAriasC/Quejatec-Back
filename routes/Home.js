'use strict'

var express = require('express');
var homeController = require('../controllers/Home');

var router = express.Router();

router.get('/stats/:id', homeController.getStats);

module.exports = router;