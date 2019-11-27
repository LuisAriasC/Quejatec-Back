'use strict'

var express = require('express');
var notificationController = require('../controllers/Notification');

var router = express.Router();

router.get('/', notificationController.getAll);
router.patch('/:id', notificationController.put);

module.exports = router;