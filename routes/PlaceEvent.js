'use strict'

var express = require('express');
var placeEventController = require('../controllers/PlaceEvent');

var router = express.Router();

router.get('/:page/:limit/:type', placeEventController.getAll);
router.post('/', placeEventController.create);
router.get('/:id', placeEventController.get);
router.patch('/:id', placeEventController.put);
router.delete('/:id', placeEventController.delete);

module.exports = router;