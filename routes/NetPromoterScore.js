'use strict'

var express = require('express');
var netPromoterScoreController = require('../controllers/NetPromoterScore');

var router = express.Router();

router.get('/stats/:id', netPromoterScoreController.getStats);
router.get('/:page/:limit', netPromoterScoreController.getAll);
router.post('/', netPromoterScoreController.create);
router.get('/:id', netPromoterScoreController.get);

module.exports = router;