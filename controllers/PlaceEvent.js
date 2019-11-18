'use strict'
var PlaceEvent = require('../models/PlaceEvent');

var placeEventController = {};

//CREATE A NEW PLACE EVENT
/*
*/
placeEventController.create = (req, res) => {

    var placeEvent = new PlaceEvent();
    var params = req.body;
    placeEvent.name = params.name;
    placeEvent.type = params.type;
    placeEvent.placeEventGroup = params.placeEventGroup
    if(params.dueDate) {
        placeEvent.dueDate = new Date(params.dueDate);
    }
    
    if (placeEvent.name != null && placeEvent.type != null && placeEvent.placeEventGroup) {

        placeEvent.save((err, placeEventStored) => {
            if (err) {
                res.status(500).send({message: 'ERROR AL REGISTRAR LUGAR/EVENTO'});
            }  else {
                if (!placeEventStored) {
                    res.status(404).send({message: 'NO SE HA REGISTRADO AL LUGAR/EVENTO'});
                } else {
                    res.status(200).send({placeEvent: placeEventStored._id});
                }
            }
        });
    }
    else {
        res.status(200).send({message: 'Introduce todos los campos'});
    }
}

//GET PLACE/EVENT BY ID
/*
*/
placeEventController.get = (req, res) => {
    var placeEventId = req.params.id;
    PlaceEvent.findById(placeEventId, (err, placeEvent) => {
        if (err) {
            res.status(500).send({message: 'ERROR EN LA PETICION'});
        } else {
            if (!placeEvent) {
            res.status(404).send({message: 'EL LUGAR/EVENTO NO EXISTE'});
            } else {
                res.status(200).send({placeEvent});
            }
        }
    });
}

//READ PLACE/EVENTS
/*
*/
placeEventController.getAll = (req, res) => {

    var placeEventType = req.params.type;
    var page = parseInt(req.params.page, 10);
    var itemsPerPage = parseInt(req.params.limit, 10);
  
    PlaceEvent.find({$or: [{status: 'active', type: placeEventType}, {status: 'draft', type: placeEventType}]}).sort('name').limit(itemsPerPage).skip(page * itemsPerPage).exec(function(err, placeEvents){
      if (err) {
        res.status(500).send({message: err});
      } else {
        if (placeEvents) {
            PlaceEvent.count({$or: [{status: 'active', type: placeEventType}, {status: 'draft', type: placeEventType}]}, function(err, count) {
             if (err) {
               res.status(500).send({message: 'ERROR EN LA PETICION'});
             } else {
               return res.status(500).send({
                 total: count,
                 placeEvents
               });
             }
          });
        } else {
          res.status(404).send({message: 'NO HAY USUARIOS'});
        }
      }
    });
}

//UPDATE PLACE/EVENT
/*
*/
placeEventController.put = (req, res) => {

    var placeEventId = req.params.id;
    var update = req.body;
  
    PlaceEvent.findByIdAndUpdate(placeEventId, update, (err, placeEventUpdated) => {
        if (err) {
          res.status(500).send({message: 'Error al actualizar lugar/evento'});
        } else {
            if (!placeEventUpdated) {
                res.status(404).send({message: 'No se ha podido actualizar al lugar/evento'});
            } else {
                PlaceEvent.findOne({_id: placeEventId}, (err, placeEvent) => {
                    if (err) {
                        res.status(500).send({message: 'ERROR EN LA PETICION'});
                    } else {
                        if (!placeEvent) {
                            res.status(404).send({message: 'EL EMPLEADO NO EXISTE'});
                        } else {
                            res.status(200).send({placeEvent});
                        }
                    }
                });
            }
        }
    });
}

//DELETE PLACE/EVENT
/*
*/
placeEventController.delete = (req, res) => {

    var placeEventId = req.params.id;
    var update = { status : 'inactive' };
  
    PlaceEvent.findByIdAndUpdate(placeEventId, update, (err, placeEventUpdated) => {
        if (err) {
          res.status(500).send({message: 'Error al actualizar usuario'});
        } else {
            if (!placeEventUpdated) {
                res.status(404).send({message: 'No se ha podido actualizar al lugar/evento'});
            } else {
            
                PlaceEvent.findOne({_id: placeEventId}, (err, placeEvent) => {
                    if (err) {
                        res.status(500).send({message: 'ERROR EN LA PETICION'});
                    } else {
                        if (!placeEvent) {
                            res.status(404).send({message: 'EL LUGAR/EVENTO NO EXISTE'});
                        } else {
                            res.status(200).send({message: 'LUGAR/EVENTO ELIMINADO CORRECTAMENTE'});
                        }
                    }
                });
            }
        }
    });
}

module.exports = placeEventController