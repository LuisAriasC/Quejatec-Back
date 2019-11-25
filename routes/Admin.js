'use strict'

var express = require('express');
var adminController = require('../controllers/Admin');

var router = express.Router();

router.get('/', adminController.getAll);
router.post('/', adminController.create);
router.get('/:id', adminController.get);
router.patch('/:id', adminController.put);
router.delete('/:id', adminController.delete);

module.exports = router;