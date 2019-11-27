'use strict'

var express = require('express');
var placeEventGroupController = require('../controllers/PlaceEventGroup');

var router = express.Router();

router.get('/', placeEventGroupController.getAll);
router.get('/all', placeEventGroupController.getFull);
router.post('/', placeEventGroupController.create);
router.get('/:id', placeEventGroupController.get);
router.patch('/:id', placeEventGroupController.put);
router.delete('/:id', placeEventGroupController.delete);

module.exports = router;
