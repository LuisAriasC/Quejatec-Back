'use strict'

var express = require('express');
var issueController = require('../controllers/Issue');

var router = express.Router();

router.get('/:page/:limit/:status', issueController.getAll);
router.post('/', issueController.create);
router.get('/:id', issueController.get);
router.patch('/:id', issueController.put);
//router.delete('/:id', issueController.delete);

module.exports = router;