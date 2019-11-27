'use strict'

const {BigQuery} = require('@google-cloud/bigquery');
const bigquery = new BigQuery();

var iotController = {};

iotController.getStats = async (req, res) => {
  console.log('getStats', BigQuery);
  // Queries the U.S. given names dataset for the state of Texas.
  const query = `SELECT  timestamp, Sw0, Sw1
      FROM \`proyectointegrador-253221.avriot.sensordata\`
      ORDER BY timestamp DESC`;

  // For all options, see https://cloud.google.com/bigquery/docs/reference/rest/v2/jobs/query
  const options = {
    query: query,
    // Location must match that of the dataset(s) referenced in the query.
    location: 'US',
  };

  // Run the query as a job
  const [job] = await bigquery.createQueryJob(options);
  console.log(`Job ${job.id} started.`);

  // Wait for the query to finish
  const [rows] = await job.getQueryResults();

  // Print the results
  console.log('Rows:');
  rows.forEach(row => console.log(row));
  let result = [];
  let temp = rows.reduce((acc, val) => {
    const date = new Date(val.timestamp.value);
    const formatedDate = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`;
    (acc[formatedDate] = acc[formatedDate] || []).push({sw0: val.Sw0, sw1: val.Sw1});
    return acc;
  }, {});
  console.log('temp',temp);

  for ( let key of Object.keys(temp)) {
    result.push({name: key, series: temp[key].reduce((acc,val)=>{
      acc[0].value+=val.sw0;
      acc[1].value+=val.sw1;
      return acc;
    },[{name: 'sw0',value:0}, {name: 'sw1',value:0}])});
  }
  res.status(200).send({items:result});
}

module.exports = iotController;