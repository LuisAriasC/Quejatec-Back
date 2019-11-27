'use strict'
var NetPromoterScore = require('../models/NetPromoterScore');
var Notification = require('../models/Notification');

var clientNetPromoterScoreController = {};

//CREATE A NET PROMOTER SCORE
/*
*/
clientNetPromoterScoreController.create = (req, res) => {

    console.log('in');
    console.log(req.body);

    var nps = new NetPromoterScore();
    var params = req.body;
    nps.score = params.score;
    nps.placeEvent = params.placeEvent;

    console.log(nps);
    
    if (nps.score != null && nps.placeEvent != null) {
        nps.save((err, npsStored) => {
            if (err) {
                res.status(500).send({message: 'ERROR AL REGISTRAR SCORE'});
            }  else {
                if (!npsStored) {
                    res.status(400).send({message: 'NO SE HA REGISTRADO EL SCORE'});
                } else {
                    // res.status(200).send({message: 'SCORE GUARDADO SATISFACTORIAMENTE'});
                    var now = new Date();
                    var startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
                    NetPromoterScore.count({registerDate: {$gte: startOfToday}, score: {$lte: 5}}, function (err, num) {
                      if(err){
                        res.status(500).send({message: 'ERROR INTERNO DEL SERVIDOR'});
                      } else {
                        if(num >= 10){
                          var not = new Notification();
                          not.placeEvent = params.placeEvent;
                          not.message = 'Existen ' + num +' quejas malas';
                          not.save((err, notification) => {
                            if(err){
                              res.status(500).send({message: 'ERROR AL REGISTRAR NOTIFICACION'}); 
                            } else {
                              res.status(200).send({message: 'SCORE GUARDADO SATISFACTORIAMENTE'});
                            }
                          });
                        } else {
                          res.status(200).send({message: 'SCORE GUARDADO SATISFACTORIAMENTE'});
                        }
                      }
                    });
                }
            }
        });
    }
    else {
        res.status(300).send({message: 'INTRODUCE TODOS LOS CAMPOS'});
    }
}

module.exports = clientNetPromoterScoreController