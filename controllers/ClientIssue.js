'use strict'
var Issue = require('../models/Issue');

var clientIssueController = {};

//CREATE A NEW ISSUE
/*
*/
clientIssueController.create = (req, res) => {
    var userId = req.headers.authorization;

    var issue = new Issue();
    var params = req.body;
    issue.uId = userId;
    issue.placeEvent = params.placeEvent;
    issue.description = params.description;
    //issue.manager = params.manager;
    
    if (issue.uId != null && issue.placeEvent != null && issue.description/* && issue.manager*/) {
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
clientIssueController.get = (req, res) => {
    var userId = req.headers.authorization;
    console.log(req.headers.authorization);

    var issueId = req.params.id;
    Issue.find({_id: issueId})
         .select('-uId -manager -__v')
         .populate('placeEvent', 'name -_id')
         .exec(function(err, issue){
            if (err) {
                res.status(500).send({message: 'ERROR EN LA PETICION'});
            } else {
                if (!issue) {
                res.status(404).send({message: 'EL ISSUE NO EXISTE'});
                } else {
                    res.status(200).send(issue);
                }
            }
         });
}

//READ ISSUES
/*
*/
clientIssueController.getAll = (req, res) => {
    var userId = req.headers.authorization;
    //var issueStatus = req.params.status;
    //var page = parseInt(req.params.page, 10);
    //var itemsPerPage = parseInt(req.params.limit, 10);
  
    Issue.find({uId: userId})
         .sort('registerDate')
         .select('_id registerDate description status')
         //.populate('placeEvent', 'name -_id')
         .exec(function(err, issues){
            if (err) {
              //console.log(err);
              res.status(500).send({message: err});
            } else {
              if (issues) {
                  //console.log(issues);
                  return res.status(200).send({
                      issues
                  });
              } else {
                res.status(404).send({message: 'NO HAY ISSUES'});
              }
            }
         });
}

module.exports = clientIssueController