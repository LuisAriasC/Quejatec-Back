'use strict'
var dummyData = require('../dummy-data/home-dummy');
var Issue = require('../models/Issue');
var PlaceEventGroup = require('../models/PlaceEventGroup');
var PlaceEvent = require('../models/PlaceEvent');

var homeController = {};
//CREATE A NEW HOME
/*
*/
homeController.getStats = async (req, res) => {
  const groupId = req.params.id;
  let issues;
  try {
      let group = await PlaceEventGroup.findById(groupId);
      if (!group) {
        res.status(500).send({message: 'GRUPO NO ENCONTRADO'});
      }
      issues = await Issue.aggregate([
        {$match: { placeEvent: {$in: group.placeEvents}}},
        // { $lookup: {from: 'PlaceEvents', localField: 'placeEvent', foreignField: '_id', as: 'placeEvent'} },
        {$group: {
          _id: "$placeEvent",
          series : {$push : {registerDate: '$registerDate'}}
       }},
      ]);
      issues = await PlaceEvent.populate(issues, {path: '_id'});

      issues.forEach(issue => {
        issue.name = issue._id.name;
        let temp = issue.series.reduce((acc, val) => {
          const date = new Date(val.registerDate);
          const formatedDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
          (acc[formatedDate] = acc[formatedDate] || []).push(1);
          return acc;
        }, {});
        issue.series = [];
        for ( let key of Object.keys(temp)) {
          const length = temp[key].length;
          issue.series.push({name: key, value: Math.floor(temp[key].reduce((acc,val)=>acc+=val,0))});
        }
      });
  } catch (error) {
    res.status(500).send({message: error.message ? error.message : 'ERROR EN LA PETICION'});
  }
  return res.status(200).send({items: issues ? issues : dummyData});
};

module.exports = homeController;