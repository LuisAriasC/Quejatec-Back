'use strict'
var PlaceEvent = require('../models/PlaceEvent');
var PlaceEventGroup = require('../models/PlaceEventGroup');

var placeEventController = {};

//CREATE A NEW PLACE EVENT
/*
*/
placeEventController.create = async (req, res) => {

    var placeEvent = new PlaceEvent();
    var params = req.body;
    placeEvent.name = params.name;
    placeEvent.type = params.type;
    if(params.dueDate) {
        placeEvent.dueDate = new Date(params.dueDate);
    }
    
    if (placeEvent.name != null && placeEvent.type != null) {

        placeEvent.save((err, placeEventStored) => {
            if (err) {
                res.status(500).send({message: 'ERROR AL REGISTRAR LUGAR/EVENTO'});
            }  else {
                if (!placeEventStored) {
                    res.status(404).send({message: 'NO SE HA REGISTRADO AL LUGAR/EVENTO'});
                } else {
                    res.status(200).send({item: placeEventStored});
                }
            }
        });
        const placeEventGroupId = req.params.id;
        try {
          await PlaceEventGroup.update({_id: placeEventGroupId}, {$push: {placeEvents: placeEvent._id}});
        } catch (error) {
          return res.status(500).send({message: error.message ? error.message : 'ERROR EN LA PETICION'});
        }
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
                res.status(200).send({item: placeEvent});
            }
        }
    });
}

//READ PLACE/EVENTS
/*
*/
placeEventController.getAll = async (req, res) => {

    // var placeEventType = req.params.type;
    var page = req.query.page ? parseInt(req.query.page, 10) - 1 : 0;
    var itemsPerPage = req.query.limit ? parseInt(req.query.limit, 10) : 5 ;
    const filterField = req.query.field;
    const placeEventGroupId = req.params.id;
    let placeEventGroup;
    try {
      placeEventGroup = await PlaceEventGroup.findById(placeEventGroupId);
    } catch (error) {
      return res.status(500).send({message: error.message ? error.message : 'ERROR EN LA PETICION'});
    }

    var query = {_id: {$in: placeEventGroup.placeEvents}};
    // console.log('query',query);
    if (filterField) {
      query[filterField] = req.query.filter;
    }

    PlaceEvent.find(query).sort('name').limit(itemsPerPage).skip(page * itemsPerPage).exec(function(err, placeEvents){
      if (err) {
        res.status(500).send({message: err});
      } else {
        if (placeEvents) {
            PlaceEvent.count(query, function(err, count) {
             if (err) {
               res.status(500).send({message: 'ERROR EN LA PETICION'});
             } else {
               return res.status(200).send({
                 totalDocs: count,
                 docs: placeEvents
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
                            res.status(200).send({item: placeEvent});
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
                            res.status(200).send({success: true, message: 'LUGAR/EVENTO ELIMINADO CORRECTAMENTE'});
                        }
                    }
                });
            }
        }
    });
}

module.exports = placeEventController