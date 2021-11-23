const { ObjectId } = require('mongodb')
const getDatabase = require('utils/db').getDatabase

module.exports = async function (req, reply) {
  const { userId } = req.params

  const db = await getDatabase()
  const collection = await db.collection('data__events')
  const result = await collection
    .find({
      'user._id': ObjectId(userId),
    })
    .sort({
      ts: -1,
    })
    .limit(200)
  const items = await result.toArray()

  return {
    items,
  }
}
