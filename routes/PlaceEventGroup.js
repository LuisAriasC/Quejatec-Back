'use strict'

var express = require('express');
var placeEventGroupController = require('../controllers/PlaceEventGroup');

var router = express.Router();

router.get('/:page/:limit', placeEventGroupController.getAll);
router.post('/', placeEventGroupController.create);
router.get('/:id', placeEventGroupController.get);
router.patch('/:id', placeEventGroupController.put);
router.delete('/:id', placeEventGroupController.delete);

module.exports = router;
