'use strict'
var NetPromoterScore = require('../models/NetPromoterScore');

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

    var page = parseInt(req.params.page, 10);
    var itemsPerPage = parseInt(req.params.limit, 10);
  
    NetPromoterScore.find().limit(itemsPerPage).skip(page * itemsPerPage).exec(function(err, issues){
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

module.exports = netPromoterScoreController