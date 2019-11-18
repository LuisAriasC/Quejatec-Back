'use strict'
var Issue = require('../models/Issue');

var issueController = {};

//CREATE A NEW ISSUE
/*
*/
issueController.create = (req, res) => {

    var issue = new Issue();
    var params = req.body;
    issue.uId = params.uId;
    issue.placeEvent = params.placeEvent;
    issue.description = params.description;
    issue.manager = params.manager;
    
    if (issue.uId != null && issue.placeEvent != null && issue.description && issue.manager) {
        issue.save((err, issueStored) => {
            if (err) {
                res.status(500).send({message: 'ERROR AL REGISTRAR ISSUE'});
            }  else {
                if (!issueStored) {
                    res.status(404).send({message: 'NO SE HA REGISTRADO EL ISSUE'});
                } else {
                    res.status(200).send({issue: issueStored._id});
                }
            }
        });
    }
    else {
        res.status(200).send({message: 'INTRODUCE TODOS LOS CAMPOS'});
    }
}

//GET ISSUE BY ID
/*
*/
issueController.get = (req, res) => {
    var issueId = req.params.id;
    Issue.findById(issueId, (err, issue) => {
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
issueController.getAll = (req, res) => {

    var issueStatus = req.params.status;
    var page = parseInt(req.params.page, 10);
    var itemsPerPage = parseInt(req.params.limit, 10);
  
    Issue.find({status: issueStatus}).sort('name').limit(itemsPerPage).skip(page * itemsPerPage).exec(function(err, issues){
      if (err) {
        res.status(500).send({message: err});
      } else {
        if (issues) {
            Issue.count( {status: issueStatus} , function(err, count) {
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
          res.status(404).send({message: 'NO HAY ISSUES'});
        }
      }
    });
}

//UPDATE ISSUE
/*
*/
issueController.put = (req, res) => {

    var issueId = req.params.id;
    var update = {};
    update.status = req.body.status;
    
    Issue.findByIdAndUpdate(issueId, update, (err, issueUpdated) => {
        if (err) {
          res.status(500).send({message: 'ERROR AL ACTUALIZAR ISSUE'});
        } else {
            if (!issueUpdated) {
                res.status(404).send({message: 'NO SE HA PODIDO ACTUALIZAR ISSUE'});
            } else {
                Issue.findOne({_id: issueId}, (err, issue) => {
                    if (err) {
                        res.status(500).send({message: 'ERROR EN LA PETICION'});
                    } else {
                        if (!issue) {
                            res.status(404).send({message: 'ISSUE NO EXISTE'});
                        } else {
                            res.status(200).send({issue});
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
issueController.delete = (req, res) => {

    var issueId = req.params.id;
    var update = { status : 'inactive' };
  
    Issue.findByIdAndUpdate(issueId, update, (err, issueUpdated) => {
        if (err) {
          res.status(500).send({message: 'ERROR AL ACTUALIZAR ISSUE'});
        } else {
            if (!issueUpdated) {
                res.status(404).send({message: 'ERROR: ISSUE NO EXISTE'});
            } else {
            
                Issue.findOne({_id: issueId}, (err, issue) => {
                    if (err) {
                        res.status(500).send({message: 'ERROR EN LA PETICION'});
                    } else {
                        if (!issue) {
                            res.status(404).send({message: 'EL ISSUE NO EXISTE'});
                        } else {
                            res.status(200).send({message: 'ISSUE ELIMINADO CORRECTAMENTE'});
                        }
                    }
                });
            }
        }
    });
}

module.exports = issueController