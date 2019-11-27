//INDEX
'use strict'

var mongoose = require('mongoose');

var express = require('express');
var dotenv = require('dotenv');
var bodyParser = require('body-parser');
const CorsService = require('./services/cors.services');

var indexRouter = require('./routes/index');
const {BigQuery} = require('@google-cloud/bigquery');

async function queryShakespeare() {
  // Queries a public Shakespeare dataset.
  
      // Create a client
      //console.log(process.env.BQ_PROJECT);
      let a = process.env.BQ_PROJECT;
      console.log(a);
      

      const bigqueryClient = new BigQuery({
        projectId: process.env.BQ_PROJECT,
        keyFilename: process.env.BQ_SERVICE_ACCOUNT,
        location: process.env.LOCATION
      });

      console.log(a);
  
      // The SQL query to run
      const sqlQuery = `SELECT word, word_count
          FROM \`bigquery-public-data.samples.shakespeare\`
          WHERE corpus = @corpus
          AND word_count >= @min_word_count
          ORDER BY word_count DESC`;
  
      const options = {
      query: sqlQuery,
      // Location must match that of the dataset(s) referenced in the query.
      location: 'US',
      params: {corpus: 'romeoandjuliet', min_word_count: 250},
      };
  
      // Run the query
      const [rows] = await bigqueryClient.query(options);
  
      console.log('Rows:');
      //rows.forEach(row => console.log(row));
}

async function main(){
  dotenv.config();

  //const database = await DatabaseService.connect();
  const app = express();
  app.use(bodyParser.urlencoded({extended: false}));
  app.use(bodyParser.json());

  app.use(CorsService.getCorsMiddleware());
  app.use('/', indexRouter);

  const port = process.env.PORT || 3800;
  

  await queryShakespeare();
  
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
