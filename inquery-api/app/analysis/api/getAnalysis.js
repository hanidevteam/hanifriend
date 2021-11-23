const getDatabase = require('utils/db').getDatabase
const { ObjectId } = require('mongodb')

module.exports = async function (req, reply) {
  const { id } = req.params
  // TODO : validate

  const db = await getDatabase()
  const collection = await db.collection('meta__analysis')
  return await collection.findOne({
    '_id': ObjectId(id),
  })
}
