const { ObjectId } = require('mongodb')
const getDatabase = require('utils/db').getDatabase

module.exports = async function (req, reply) {
  const { userId } = req.params
  // TODO : validate

  const db = await getDatabase()
  const collection = await db.collection('data__users')

  const user = await collection.findOne({
    '_id': ObjectId(userId),
  })

  return {
    item: user,
  }
}
