//INDEX
'use strict'

var mongoose = require('mongoose');

var express = require('express');
var dotenv = require('dotenv');
var bodyParser = require('body-parser');
const CorsService = require('./services/cors.services');

var indexRouter = require('./routes/index');

async function main(){
  dotenv.config();

  //const database = await DatabaseService.connect();
  const app = express();
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  app.use(CorsService.getCorsMiddleware());
  app.use('/', indexRouter);

  const port = process.env.PORT || 3800;

  
  mongoose.Promise = global.Promise;

  mongoose.connect('mongodb+srv://admin:8ULCBWpxR6cSq541@cluster0-jexdn.gcp.mongodb.net/test?retryWrites=true&w=majority', (err, res) => {
    if (err)
      throw err;
    else {
      console.log('CONEXION CORRECTA A LA BD');
      app.listen(port, () => {
        console.log('Servidor del API rest escuchando en http://localhost:' + port);
      });
    }
  });
}

main();
