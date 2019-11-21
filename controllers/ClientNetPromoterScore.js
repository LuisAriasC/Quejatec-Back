'use strict'
var NetPromoterScore = require('../models/NetPromoterScore');

var clientNetPromoterScoreController = {};

//CREATE A NET PROMOTER SCORE
/*
*/
clientNetPromoterScoreController.create = (req, res) => {

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
                    res.status(200).send({message: 'SCORE GUARDADO SATISFACTORIAMENTE'});
                }
            }
        });
    }
    else {
        res.status(200).send({message: 'INTRODUCE TODOS LOS CAMPOS'});
    }
}

module.exports = clientNetPromoterScoreController