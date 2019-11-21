'use strict'

var express = require('express');
var clientNetPromoterScoreController = require('../controllers/NetPromoterScore');

var router = express.Router();

router.post('/', clientNetPromoterScoreController.create);

module.exports = router;