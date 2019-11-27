'use strict'
// var Home = require('../models/Home');
var dummyData = require('../dummy-data/home-dummy');

var homeController = {};
//CREATE A NEW HOME
/*
*/
homeController.getStats = (req, res) => {
  console.log()
  const groupId = req.params.id;
  return res.status(200).send({items: dummyData});
};

module.exports = homeController;