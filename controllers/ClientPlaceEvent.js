'use strict'
var PlaceEventGroup = require('../models/PlaceEventGroup');
var PlaceEvent = require('../models/PlaceEvent');

var clientPlaceEventGroupController = {};

//READ PLACE/EVENTS GROUPS WITH PLACE EVENTS
/*
*/
clientPlaceEventGroupController.getAll = (req, res) => {
  console.log('clientPlaceEventGroupController');
    var page = parseInt(req.params.page, 10);
    var itemsPerPage = parseInt(req.params.limit, 10);
  
      PlaceEventGroup.find({status: 'active'})
                    .sort('name')
                    .limit(itemsPerPage)
                    .skip(page * itemsPerPage)
                    .populate('placeEvents', 'name type')
                    .select('name')
                    .exec(function(err, placeEventGroups){
                          if (err) {
                            res.status(500).send({message: err});
                          } else {
                            if (placeEventGroups) {
                              return res.status(200).send({
                                  placeEventGroups
                              });
                            } else {
                              res.status(404).send({message: 'NO HAY USUARIOS'});
                            }
                          }
                      });
}

module.exports = clientPlaceEventGroupController