'use strict'
var Notification = require('../models/Notification');

var notificationController = {};

//READ NOTIFICATIONS
/*
*/
notificationController.getAll = (req, res) => {
  // console.log('getAll');
  var page = parseInt(req.query.page, 10) ? parseInt(req.query.page, 10) : 1;
  var itemsPerPage = parseInt(req.query.limit, 10) ? parseInt(req.query.limit, 10) : 5;
  const filterField = req.query.field;
    var query = {};
    if (filterField) {
      query[filterField] = req.query.filter;
    }
    Notification.find(query).sort('registerDate').limit(itemsPerPage).skip((page-1) * itemsPerPage)
    .populate('placeEvent', '_id name').exec(function(err, notifications){
      if (err) {
        res.status(500).send({message: err});
      } else {
        if (notifications) {
          Notification.countDocuments(query, function(err, count) {
             if (err) {
               res.status(500).send({message: 'ERROR EN LA PETICION'});
             } else {
               return res.status(200).send({
                 total: count,
                 notifications
               });
             }
          });
        } else {
          res.status(404).send({message: 'NO HAY ADMINISTRADORES'});
        }
      }
    });
}

//UPDATE NOTIFICATION
/*
*/
notificationController.put = (req, res) => {

    var notificationId = req.params.id;
    var update = {};
    update.status = req.body.status;

    Notification.findByIdAndUpdate(notificationId, update, (err, notificationUpdated) => {
        if (err) {
          res.status(500).send({message: 'ERROR AL ACTUALIZAR ADMINISTRADOR'});
        } else {
            if (!notificationUpdated) {
                res.status(404).send({message: 'NO SE HA PODIDO ACTUALIZAR AL AMINISTRADOR'});
            } else {
            
                Notification.findOne({_id: notificationId}, (err, notification) => {
                    if (err) {
                        res.status(500).send({message: 'ERROR EN LA PETICION'});
                    } else {
                        if (!notification) {
                            res.status(404).send({message: 'EL ADMINISTRADOR NO EXISTE'});
                        } else {
                            res.status(200).send({success: true});
                        }
                    }
                });
            }
        }
    });
}



module.exports = notificationController