'use strict'

var express = require('express');
var userController = require('../controllers/User');

var router = express.Router();

router.get('/', userController.getAll);
router.post('/', userController.create);
router.get('/:id', userController.get);
router.patch('/:id', userController.put);
router.delete('/:id', userController.delete);

module.exports = router;