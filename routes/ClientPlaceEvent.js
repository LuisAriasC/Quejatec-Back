'use strict'

var express = require('express');
var clientPlaceEventController = require('../controllers/ClientPlaceEvent');

var router = express.Router();

router.get('/', clientPlaceEventController.getAll);

module.exports = router;