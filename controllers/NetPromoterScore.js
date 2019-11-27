'use strict'
var NetPromoterScore = require('../models/NetPromoterScore');
var PlaceEventGroup = require('../models/PlaceEventGroup');
var PlaceEvent = require('../models/PlaceEvent');

var dummyData = require('../dummy-data/score-dummy');

var netPromoterScoreController = {};

//CREATE A NET PROMOTER SCORE
/*
*/
netPromoterScoreController.create = (req, res) => {

    var nps = new NetPromoterScore();
    var params = req.body;
    nps.score = params.score;
    nps.placeEvent = params.placeEvent;
    
    if (nps.score != null && nps.placeEvent != null) {
        nps.save((err, npsStored) => {
            if (err) {
                res.status(500).send({message: 'ERROR AL REGISTRAR SCORE'});
            }  else {
                if (!npsStored) {
                    res.status(404).send({message: 'NO SE HA REGISTRADO EL SCORE'});
                } else {
                    res.status(200).send({netPromoterScore: npsStored._id});
                }
            }
        });
    }
    else {
        res.status(200).send({message: 'INTRODUCE TODOS LOS CAMPOS'});
    }
}

//GET NET PROMOTER SCORE BY ID
/*
*/
netPromoterScoreController.get = (req, res) => {
    var issueId = req.params.id;
    NetPromoterScore.findById(issueId, (err, issue) => {
        if (err) {
            res.status(500).send({message: 'ERROR EN LA PETICION'});
        } else {
            if (!issue) {
            res.status(404).send({message: 'EL ISSUE NO EXISTE'});
            } else {
                res.status(200).send({issue});
            }
        }
    });
}

//READ ISSUES
/*
*/
netPromoterScoreController.getAll = (req, res) => {
  var page = parseInt(req.query.page, 10) ? parseInt(req.query.page, 10) : 1;
  var itemsPerPage = parseInt(req.query.limit, 10) ? parseInt(req.query.limit, 10) : 5;
  const filterField = req.query.field;
  var query = {};
  if (filterField) {
    query[filterField] = req.query.filter;
  }
    NetPromoterScore.find(query).limit(itemsPerPage).skip((page-1) * itemsPerPage).exec(function(err, issues){
      if (err) {
        res.status(500).send({message: err});
      } else {
        if (issues) {
            NetPromoterScore.count( {} , function(err, count) {
             if (err) {
               res.status(500).send({message: 'ERROR EN LA PETICION'});
             } else {
               return res.status(500).send({
                 total: count,
                 issues
               });
             }
          });
        } else {
          res.status(404).send({message: 'NO HAY SCORES'});
        }
      }
    });
}



netPromoterScoreController.getStats = async (req, res) => {
  const groupId = req.params.id;
  let scores;
  try {
      let group = await PlaceEventGroup.findById(groupId);
      if (!group) {
        res.status(500).send({message: 'GRUPO NO ENCONTRADO'});
      }
      scores = await NetPromoterScore.aggregate([
        {$match: { placeEvent: {$in: group.placeEvents}}},
        // { $lookup: {from: 'PlaceEvents', localField: 'placeEvent', foreignField: '_id', as: 'placeEvent'} },
        {$group: {
          _id: "$placeEvent",
          series : {$push : {registerDate: '$registerDate', score: '$score'}}
       }},
      ]);
      scores = await PlaceEvent.populate(scores, {path: '_id'});

      scores.forEach(score => {
        score.name = score._id.name;
        let temp = score.series.reduce((acc, val) => {
          const date = new Date(val.registerDate);
          const formatedDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
          (acc[formatedDate] = acc[formatedDate] || []).push(val.score);
          return acc;
        }, {});
        score.series = [];
        for ( let key of Object.keys(temp)) {
          const length = temp[key].length;
          score.series.push({name: key, value: Math.floor(temp[key].reduce((acc,val)=>acc+=val,0) / length)});
        }
      });
  } catch (error) {
    res.status(500).send({message: error.message ? error.message : 'ERROR EN LA PETICION'});
  }
  return res.status(200).send({items: scores ? scores : dummyData});
};

module.exports = netPromoterScoreController