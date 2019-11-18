const { MongoClient } = require('mongodb');

async function connect() {
  let connection = await MongoClient.connect(
    process.env.MONGO_URL,
    {
      auth: {
        password: process.env.MONGO_PWD,
        user: process.env.MONGO_USER
      }
    }
  );

  return connection.db(process.env.MONGO_DB);
}

module.exports = { connect };