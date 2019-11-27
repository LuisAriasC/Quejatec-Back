'use strict'
var User = require('../models/User');

var userController = {};


//CREATE A NEW USER
/*
*/
userController.create = (req, res) => {

    var user = new User();
    var params = req.body;
    user.name = params.name;
    user.lastname = params.lastname;
    user.email = params.email.toLowerCase();

    if (user.name != null && user.lastname != null && user.email != null) {

        user.save((err, userStored) => {
            if (err) {
                switch(err.code){
                    case 11000:
                        res.status(500).send({message: 'ERROR: EL correo ya se encuentra registrado'});   
                }
            }  else {
                if (!userStored) {
                    res.status(404).send({message: 'NO SE HA REGISTRADO AL EMPLEADO'});
                } else {
                    res.status(200).send({item: userStored});
                }
            }
        });
    }
    else {
        res.status(200).send({message: 'Introduce todos los campos'});
    }
}


//GET USER BY ID
/*
*/
userController.get = (req, res) => {
    var userId = req.params.id;
    User.findById(userId, (err, user) => {
        if (err) {
            res.status(500).send({message: 'ERROR EN LA PETICION'});
        } else {
            if (!user) {
            res.status(404).send({message: 'EL USUARIO NO EXISTE'});
            } else {
                res.status(200).send({item: user});
            }
        }
    });
}

//READ USERS
/*
*/
userController.getAll = (req, res) => {

  var page = parseInt(req.query.page, 10) ? parseInt(req.query.page, 10) : 1;
  var itemsPerPage = parseInt(req.query.limit, 10) ? parseInt(req.query.limit, 10) : 5;
  const filterField = req.query.field;
    var query = {};
    if (filterField) {
      query[filterField] = req.query.filter;
    }
    User.find(query).sort('name').limit(itemsPerPage).skip((page-1) * itemsPerPage).exec(function(err, users){
      if (err) {
        res.status(500).send({message: err});
      } else {
        if (users) {
          User.count(query, function(err, count) {
             if (err) {
               res.status(500).send({message: 'ERROR EN LA PETICION'});
             } else {
               return res.status(200).send({
                 total: count,
                 users
               });
             }
          });
        } else {
          res.status(404).send({message: 'NO HAY USUARIOS'});
        }
      }
    });
}



//UPDATE USER
/*
*/
userController.put = (req, res) => {

    var userId = req.params.id;
    var update = req.body;
  
    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if (err) {
          res.status(500).send({message: 'Error al actualizar usuario'});
        } else {
            if (!userUpdated) {
                res.status(404).send({message: 'No se ha podido actualizar al usuario'});
            } else {
            
                User.findOne({_id: userId}, (err, user) => {
                    if (err) {
                        res.status(500).send({message: 'ERROR EN LA PETICION'});
                    } else {
                        if (!user) {
                            res.status(404).send({message: 'EL EMPLEADO NO EXISTE'});
                        } else {
                            res.status(200).send({item: user});
                        }
                    }
                });
            }
        }
    });
}



//DELETE USER
/*
*/
userController.delete = (req, res) => {

    var userId = req.params.id;
    var update = { status : 'inactive' };
  
    User.findByIdAndUpdate(userId, update, (err, userUpdated) => {
        if (err) {
          res.status(500).send({message: 'Error al actualizar usuario'});
        } else {
            if (!userUpdated) {
                res.status(404).send({message: 'No se ha podido actualizar al usuario'});
            } else {
            
                User.findOne({_id: userId}, (err, user) => {
                    if (err) {
                        res.status(500).send({message: 'ERROR EN LA PETICION'});
                    } else {
                        if (!user) {
                            res.status(404).send({message: 'EL EMPLEADO NO EXISTE'});
                        } else {
                            res.status(200).send({success: true, message: 'USUARIO ELIMINADO CORRECTAMENTE'});
                        }
                    }
                });
            }
        }
    });
}


module.exports = userController

