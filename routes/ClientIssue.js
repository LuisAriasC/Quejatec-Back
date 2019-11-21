'use strict'

var express = require('express');
var clientIssueController = require('../controllers/ClientIssue');

var router = express.Router();

router.get('/', clientIssueController.getAll);
router.post('/:id', clientIssueController.create);
router.get('/:id', clientIssueController.get);

module.exports = router;