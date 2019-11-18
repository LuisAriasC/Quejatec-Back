'use strict'
var PlaceEventGroup = require('../models/PlaceEventGroup');

var placeEventGroupController = {};

//CREATE A NEW PLACE EVENT GROUP
/*
*/
placeEventGroupController.create = (req, res) => {
    
    var placeEventGroup = new PlaceEventGroup();
    var params = req.body;
    placeEventGroup.name = params.name;

    if (placeEventGroup.name != null) {

        placeEventGroup.save((err, placeEventGroupStored) => {
            if (err) {
                res.status(500).send({message: 'ERROR AL REGISTRAR RUPO DE LUGARES/EVENTOS'});
            }  else {
                if (!placeEventGroupStored) {
                    res.status(404).send({message: 'NO SE HA REGISTRADO AL GRUPO DE LUGARES/EVENTOS'});
                } else {
                    res.status(200).send({placeEventGroup: placeEventGroupStored._id});
                }
            }
        });
    }
    else {
        res.status(200).send({message: 'Introduce todos los campos'});
    }
}


//GET PLACE/EVENT GROUP BY ID
/*
*/
placeEventGroupController.get = (req, res) => {
    var placeEventGroupId = req.params.id;
    PlaceEventGroup.findById(placeEventGroupId, (err, placeEventGroup) => {
        if (err) {
            res.status(500).send({message: 'ERROR EN LA PETICION'});
        } else {
            if (!placeEventGroup) {
            res.status(404).send({message: 'EL LUGAR/EVENTO NO EXISTE ...'});
            } else {
                res.status(200).send({placeEventGroup});
            }
        }
    });
}


//READ PLACE/EVENTS GROUPS
/*
*/
placeEventGroupController.getAll = (req, res) => {

    var page = parseInt(req.params.page, 10);
    var itemsPerPage = parseInt(req.params.limit, 10);
  
    PlaceEventGroup.find({status: 'active'}).sort('name').limit(itemsPerPage).skip(page * itemsPerPage).exec(function(err, placeEventGroups){
      if (err) {
        res.status(500).send({message: err});
      } else {
        if (placeEventGroups) {
            PlaceEventGroup.count({status: 'active'}, function(err, count) {
             if (err) {
               res.status(500).send({message: 'ERROR EN LA PETICION'});
             } else {
               return res.status(500).send({
                 total: count,
                 placeEventGroups
               });
             }
          });
        } else {
          res.status(404).send({message: 'NO HAY USUARIOS'});
        }
      }
    });
}


//UPDATE PLACE/EVENT GROUP
/*
*/
placeEventGroupController.put = (req, res) => {

    var placeEventGroupId = req.params.id;
    var update = req.body;
  
    PlaceEventGroup.findByIdAndUpdate(placeEventGroupId, update, (err, placeEventGroupUpdated) => {
        if (err) {
          res.status(500).send({message: 'Error al actualizar lugar/evento'});
        } else {
            if (!placeEventGroupUpdated) {
                res.status(404).send({message: 'No se ha podido actualizar al lugar/evento'});
            } else {
                PlaceEventGroup.findOne({_id: placeEventGroupId}, (err, placeEventGroup) => {
                    if (err) {
                        res.status(500).send({message: 'ERROR EN LA PETICION'});
                    } else {
                        if (!placeEventGroup) {
                            res.status(404).send({message: 'EL EMPLEADO NO EXISTE'});
                        } else {
                            res.status(200).send({placeEventGroup});
                        }
                    }
                });
            }
        }
    });
}


//DELETE PLACE/EVENT GROUP
/*
*/
placeEventGroupController.delete = (req, res) => {

    var placeEventGroupId = req.params.id;
    var update = { status : 'inactive' };
  
    PlaceEventGroup.findByIdAndUpdate(placeEventGroupId, update, (err, placeEventGroupUpdated) => {
        if (err) {
          res.status(500).send({message: 'Error al actualizar usuario'});
        } else {
            if (!placeEventGroupUpdated) {
                res.status(404).send({message: 'No se ha podido actualizar al lugar/evento'});
            } else {
            
                PlaceEventGroup.findOne({_id: placeEventGroupId}, (err, placeEventGroup) => {
                    if (err) {
                        res.status(500).send({message: 'ERROR EN LA PETICION'});
                    } else {
                        if (!placeEventGroup) {
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

module.exports = placeEventGroupController
