'use strict'
var Admin = require('../models/Admin');

var adminController = {};


//CREATE A NEW USER
/*
*/
adminController.create = (req, res) => {

    var admin = new Admin();
    var params = req.body;
    admin.name = params.name;
    admin.lastname = params.lastname;
    admin.email = params.email.toLowerCase();

    if (admin.name != null && admin.lastname != null && admin.email != null) {

        admin.save((err, adminStored) => {
            if (err) {
                switch(err.code){
                    case 11000:
                        res.status(500).send({message: 'ERROR: EL CORREO YA SE ENCUENTRA REGISTRADO'});   
                }
            }  else {
                if (!adminStored) {
                    res.status(404).send({message: 'NO SE HA REGISTRADO AL ADMINISTRADOR'});
                } else {
                    res.status(200).send({admin: adminStored});
                }
            }
        });
    }
    else {
        res.status(200).send({message: 'INTRODUCE TODOS LOS CAMPOS'});
    }
}


//GET USER BY ID
/*
*/
adminController.get = (req, res) => {
    var adminId = req.params.id;
    Admin.findById(adminId, (err, admin) => {
        if (err) {
            res.status(500).send({message: 'ERROR EN LA PETICION'});
        } else {
            if (!admin) {
            res.status(404).send({message: 'EL ADMINISTRADOR NO EXISTE'});
            } else {
                res.status(200).send({admin});
            }
        }
    });
}

//READ USERS
/*
*/
adminController.getAll = (req, res) => {
  console.log('getAll');
  var page = parseInt(req.query.page, 10) ? parseInt(req.query.page, 10) : 1;
  var itemsPerPage = parseInt(req.query.limit, 10) ? parseInt(req.query.limit, 10) : 5;
  const filterField = req.query.field;
    var query = {};
    if (filterField) {
      query[filterField] = req.query.filter;
    }
    Admin.find(query).sort('name').limit(itemsPerPage).skip((page-1) * itemsPerPage).exec(function(err, admins){
      if (err) {
        res.status(500).send({message: err});
      } else {
        if (admins) {
          Admin.countDocuments(query, function(err, count) {
             if (err) {
               res.status(500).send({message: 'ERROR EN LA PETICION'});
             } else {
               return res.status(200).send({
                 total: count,
                 admins
               });
             }
          });
        } else {
          res.status(404).send({message: 'NO HAY ADMINISTRADORES'});
        }
      }
    });
}

adminController.getFull = (req, res) => {
  console.log('getFull');
    var query = {status: 'active'};
    Admin.find(query, '_id name').exec(function(err, admins){
      if (err) {
        res.status(500).send({message: err});
      } else {
        if (admins) {
          return res.status(200).send({
            items: admins
          });
        } else {
          res.status(404).send({message: 'NO HAY ADMINISTRADORES'});
        }
      }
    });
}



//UPDATE USER
/*
*/
adminController.put = (req, res) => {

    var adminId = req.params.id;
    var update = req.body;
  
    Admin.findByIdAndUpdate(adminId, update, (err, adminUpdated) => {
        if (err) {
          res.status(500).send({message: 'ERROR AL ACTUALIZAR ADMINISTRADOR'});
        } else {
            if (!adminUpdated) {
                res.status(404).send({message: 'NO SE HA PODIDO ACTUALIZAR AL AMINISTRADOR'});
            } else {
            
                Admin.findOne({_id: adminId}, (err, admin) => {
                    if (err) {
                        res.status(500).send({message: 'ERROR EN LA PETICION'});
                    } else {
                        if (!admin) {
                            res.status(404).send({message: 'EL ADMINISTRADOR NO EXISTE'});
                        } else {
                            res.status(200).send({admin});
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
adminController.delete = (req, res) => {

    var adminId = req.params.id;
    var update = { status : 'inactive' };
  
    Admin.findByIdAndUpdate(adminId, update, (err, adminUpdated) => {
        if (err) {
          res.status(500).send({message: 'ERROR AL ACTUALIZAR ADMINISTRADOR'});
        } else {
            if (!adminUpdated) {
                res.status(404).send({message: 'NO SE HA PODIDO ACTUALIZAR ADMINISTRADOR'});
            } else {
            
                Admin.findOne({_id: adminId}, (err, admin) => {
                    if (err) {
                        res.status(500).send({message: 'ERROR EN LA PETICION'});
                    } else {
                        if (!admin) {
                            res.status(404).send({message: 'EL ADMINISTRADOR NO EXISTE'});
                        } else {
                            res.status(200).send({success: true, message: 'ADMINISTRADOR ELIMINADO CORRECTAMENTE'});
                        }
                    }
                });
            }
        }
    });
}


module.exports = adminController