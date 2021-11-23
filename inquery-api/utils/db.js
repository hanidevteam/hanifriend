const { MongoClient, ObjectId } = require('mongodb')

const { MONGODB_URI } = process.env

const getDatabase = async () => {
  const client = new MongoClient(MONGODB_URI)
  await client.connect()
  return client.db('companion')
}

module.exports = {
  getDatabase,
}
